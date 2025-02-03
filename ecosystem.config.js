module.exports = {
  apps: [
    {
      name: 'clipvault',
      // standalone 서버 파일을 직접 실행하도록 변경합니다.
      script: 'node',
      args: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: 1,
      },
      error_file: '/home/ec2-user/frontend/logs/error.log',
      out_file: '/home/ec2-user/frontend/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      max_memory_restart: '512M',
      autorestart: true,
      restart_delay: 4000,
      wait_ready: true,
      kill_timeout: 5000,
    },
  ],
};
