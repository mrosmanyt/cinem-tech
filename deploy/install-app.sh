#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/cinem-tech"
DATA_DIR="/var/lib/cinem-tech"
APP_USER="cinemtech"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run this installer as root." >&2
  exit 1
fi

if [[ ! -f "$APP_DIR/.env.production" ]]; then
  echo "Missing $APP_DIR/.env.production. Run deploy/setup-env.sh first." >&2
  exit 1
fi

install -d -o "$APP_USER" -g "$APP_USER" -m 0750 "$DATA_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo "Installing locked dependencies and building CINEM..."
sudo -u "$APP_USER" -H bash -lc "cd '$APP_DIR' && npm ci && NODE_OPTIONS=--max-old-space-size=2048 npm run build"

echo "Configuring the dedicated PM2 service..."
pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER" >/dev/null
sudo -u "$APP_USER" -H bash -lc "cd '$APP_DIR' && pm2 startOrReload ecosystem.config.cjs --update-env && pm2 save"

sleep 3
curl --fail --silent --show-error http://127.0.0.1:3001/ >/dev/null

echo "CINEM is healthy on http://127.0.0.1:3001"
echo "The existing website on port 3333 was not changed."
