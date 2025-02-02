#!/bin/bash
# nvm 환경 설정 로드
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/ec2-user/frontend/current

if /home/ec2-user/.local/share/pnpm/pm2 list | grep -q "clipvault"; then
    /home/ec2-user/.local/share/pnpm/pm2 restart clipvault
else
    /home/ec2-user/.local/share/pnpm/pm2 start "pnpm start" --name clipvault
fi

echo "Next.js server restarted!"