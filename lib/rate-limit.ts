type Bucket = { count: number; resetAt: number };

const globalBuckets = globalThis as typeof globalThis & {
  __cinemRateLimits?: Map<string, Bucket>;
};

const buckets = globalBuckets.__cinemRateLimits ?? new Map<string, Bucket>();
globalBuckets.__cinemRateLimits = buckets;

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  current.count += 1;
  buckets.set(key, current);
  const allowed = current.count <= limit;

  if (buckets.size > 2_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  return {
    allowed,
    remaining: Math.max(0, limit - current.count),
    retryAfter: allowed ? 0 : Math.ceil((current.resetAt - now) / 1000),
  };
}

export function requestIdentity(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const forwardedHost = request.headers
      .get("x-forwarded-host")
      ?.split(",")[0]
      ?.trim()
      .toLowerCase();
    const host = request.headers.get("host")?.trim().toLowerCase();
    const requestHost = new URL(request.url).host.toLowerCase();

    return [forwardedHost, host, requestHost].some(
      (candidate) => candidate === originHost,
    );
  } catch {
    return false;
  }
}
