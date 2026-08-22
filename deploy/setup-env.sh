#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/cinem-tech}"
ENV_FILE="$APP_DIR/.env.production"

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory not found: $APP_DIR" >&2
  exit 1
fi

if [[ ! -w "$APP_DIR" ]]; then
  echo "App directory is not writable by $(id -un)." >&2
  exit 1
fi

read -r -p "Admin email [admin@cinem.tech]: " admin_email
admin_email="${admin_email:-admin@cinem.tech}"

read -r -s -p "Create admin password (minimum 16 characters): " admin_password
echo
if (( ${#admin_password} < 16 )); then
  echo "Password must contain at least 16 characters." >&2
  exit 1
fi
if [[ "$admin_password" == *'"'* || "$admin_password" == *'\'* ]]; then
  echo 'For safe environment-file storage, do not use double quotes or backslashes.' >&2
  exit 1
fi

session_secret="$(openssl rand -base64 48 | tr -d '\n')"
encryption_key="$(openssl rand -base64 32 | tr -d '\n')"

umask 077
cat > "$ENV_FILE" <<EOF
ADMIN_EMAIL="$admin_email"
ADMIN_PASSWORD="$admin_password"
ADMIN_SESSION_SECRET="$session_secret"
ADMIN_COOKIE_SECURE=true
ADMIN_TOTP_SECRET=
ENQUIRY_ENCRYPTION_KEY="$encryption_key"
CINEM_DB_PATH=/var/lib/cinem-tech/cinem.sqlite
OPENAI_API_KEY=
OPENAI_PROPOSAL_MODEL=gpt-5.4
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_PROJECT_ID=
EOF

chmod 600 "$ENV_FILE"
unset admin_password session_secret encryption_key

echo "Created $ENV_FILE with private permissions."
echo "AI proposal refinement, 2FA and analytics can be enabled later."
