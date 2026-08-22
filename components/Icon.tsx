import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  code: (
    <>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2.5 14.2 9 21 11.2 14.2 13.4 12 20l-2.2-6.6L3 11.2 9.8 9z" />
      <path d="M19 16.5 19.8 19l2.5.8-2.5.8-.8 2.5-.8-2.5-2.5-.8 2.5-.8z" />
    </>
  ),
  growth: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20V12" />
      <path d="M11 20V7" />
      <path d="M16 20v-5" />
      <path d="M21 20V4" />
    </>
  ),
  browser: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 9h19" />
      <path d="M6 6.5h.01M8.5 6.5h.01M11 6.5h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M19.07 4.93l-1.77 1.77M6.7 17.3l-1.77 1.77M19.07 19.07l-1.77-1.77M6.7 6.7 4.93 4.93" />
    </>
  ),
  link: (
    <>
      <path d="M10.5 13.5a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 0 0-5.66-5.66l-1.4 1.41" />
      <path d="M13.5 10.5a4 4 0 0 0-5.66 0L5 13.33a4 4 0 1 0 5.66 5.66l1.4-1.41" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z" />
      <path d="M9 11h6M9 14.5h3.5" />
    </>
  ),
  "phone-call": (
    <>
      <path d="M5 3.5h3l2 5-2.5 1.5a12 12 0 0 0 6.5 6.5L15.5 14l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.7 2 2 0 0 1 5 3.5z" />
      <path d="M15 3.5a5.5 5.5 0 0 1 5.5 5.5" />
    </>
  ),
  bolt: <path d="M13.5 2 4 13.5h6.5L10 22l9.5-11.5H13z" />,
  share: (
    <>
      <circle cx="18" cy="5.5" r="2.8" />
      <circle cx="6" cy="12" r="2.8" />
      <circle cx="18" cy="18.5" r="2.8" />
      <path d="m8.5 10.6 7-3.6M8.5 13.4l7 3.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.8l1.3-2.2h6.8L16.7 6h1.8A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="12.8" r="3.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a2 2 0 0 0 2 2h2l9 5V4L7 9H5a2 2 0 0 0-2 2z" />
      <path d="M19.5 9a4 4 0 0 1 0 6" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  shield: (
    <>
      <path d="M12 2.8 20 6v5.3c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" />
      <path d="m8.8 12 2 2 4.5-4.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2M12 20v2M22 12h-2M4 12H2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  quote: (
    <path d="M9 6.5C6 8 4.5 10.5 4.5 14v3.5h6V11H8c0-1.8.6-3 2-3.8zM19.5 6.5C16.5 8 15 10.5 15 14v3.5h6V11h-2.5c0-1.8.6-3 2-3.8z" />
  ),
};

type IconProps = SVGProps<SVGSVGElement> & { name: string };

export function Icon({ name, ...props }: IconProps) {
  const content = paths[name] ?? paths.spark;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {content}
    </svg>
  );
}
