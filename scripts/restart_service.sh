#!/bin/bash

cd /home/ec2-user/frontend/current

# PM2 프로세스 확인 후 실행 또는 재시작
if pm2 list | grep -q "clipvault"; then
    echo "Restarting Next.js server..."
    pm2 restart clipvault
else
    echo "Starting Next.js server..."
    pm2 start "pnpm start" --name clipvault
fi

# PM2 프로세스 리스트 저장 (재부팅 후 자동 실행 가능)
pm2 save

echo "Next.js server restarted successfully!"