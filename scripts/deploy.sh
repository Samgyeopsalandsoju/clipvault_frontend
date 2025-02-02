#!/bin/bash
# 기존 배포 디렉토리가 있다면 제거하고 새로 생성
if [ -d /home/ec2-user/frontend ]; then
    rm -rf /home/ec2-user/frontend
fi
mkdir -p /home/ec2-user/frontend

# 배포 디렉토리로 이동
cd /home/ec2-user/frontend

# pnpm이 설치되어 있는지 확인하고, 없으면 설치
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# 프로덕션 의존성만 설치 (개발 의존성 제외)
echo "Installing dependencies..."
pnpm install --production

#배포 디렉토리로 이동
cd /home/ec2-user/frontend

# PM2가 설치되어 있는지 확인하고, 없으면 설치
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# 애플리케이션 재시작 또는 새로 시작
echo "Restarting application..."
pm2 restart my-next-app || pm2 start npm --name "my-next-app" -- start

echo "Deployment complete!"