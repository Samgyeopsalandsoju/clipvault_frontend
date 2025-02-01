module.exports = {
  apps: [
    {
      name: 'clipVault',
      script: 'pnpm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 4000,
      wait_ready: true,
      kill_timeout: 5000,
    },
  ],
};
