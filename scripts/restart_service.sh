#!/bin/bash
cd /home/ec2-user/frontend/current

# pm2 명령어도 전체 경로로 변경합니다
if /home/ec2-user/.local/share/pnpm/pm2 list | grep -q "clipvault"; then
    /home/ec2-user/.local/share/pnpm/pm2 restart clipvault
else
    /home/ec2-user/.local/share/pnpm/pm2 start "pnpm start" --name clipvault
fi

echo "Next.js server restarted!"