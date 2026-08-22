module.exports = {
  apps: [
    {
      name: "cinem-tech",
      cwd: "/var/www/cinem-tech",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3001",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "750M",
      time: true,
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        HOSTNAME: "127.0.0.1",
        CINEM_DB_PATH: "/var/lib/cinem-tech/cinem.sqlite",
      },
    },
  ],
};
