#!/bin/bash

# nvm 환경 설정
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 현재 환경 정보 출력
echo "Current environment:"
echo "Node version: $(node -v)"

# EC2 사용자 설정
EC2_USER="ec2-user"
APP_DIR="/home/ec2-user/frontend"

# 최신 배포 디렉토리 찾기
LATEST_DEPLOYMENT=$(find /opt/codedeploy-agent/deployment-root -name "deployment-archive" -type d | sort -r | head -n 1)
echo "Latest deployment directory: $LATEST_DEPLOYMENT"

# 배포 디렉토리 준비
echo "Preparing deployment directory..."
sudo rm -rf "$APP_DIR"
sudo mkdir -p "$APP_DIR"
sudo chown $EC2_USER:$EC2_USER "$APP_DIR"

# 빌드된 파일 복사
echo "Copying deployment files..."
sudo cp -rf "$LATEST_DEPLOYMENT"/* "$APP_DIR"/
sudo chown -R $EC2_USER:$EC2_USER "$APP_DIR"

# PM2로 애플리케이션 시작
echo "Starting application with PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

pm2 restart clipvault || pm2 start npm --name "clipvault" -- start

echo "Deployment complete!"