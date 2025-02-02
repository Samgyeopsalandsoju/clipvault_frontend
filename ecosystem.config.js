module.exports = {
  apps: [
    {
      name: 'clipvault',
      script: 'pnpm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        // Next.js 관련 환경변수 추가
        NEXT_TELEMETRY_DISABLED: 1,
      },
      error_file: '/home/ec2-user/frontend/logs/error.log', // 절대 경로 사용
      out_file: '/home/ec2-user/frontend/logs/out.log', // 절대 경로 사용
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 4000,
      wait_ready: true,
      kill_timeout: 5000,
      // 추가 옵션
      max_memory_restart: '1G', // 메모리 제한
      autorestart: true, // 크래시 시 자동 재시작
    },
  ],
};
