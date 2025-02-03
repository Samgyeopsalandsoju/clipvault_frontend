module.exports = {
  apps: [
    {
      name: 'clipvault',
      script: '.next/standalone/server.js', // standalone 모드 사용
      instances: 1, // 단일 인스턴스
      exec_mode: 'fork', // fork 모드 사용
      watch: false, // 리소스 절약을 위해 watch 비활성화
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: 1,
      },
      error_file: '/home/ec2-user/frontend/logs/error.log',
      out_file: '/home/ec2-user/frontend/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      max_memory_restart: '512M', // t2.micro는 1GB 메모리이므로 512MB로 제한
      autorestart: true,
      restart_delay: 4000,
      wait_ready: true,
      kill_timeout: 5000,
    },
  ],
};
