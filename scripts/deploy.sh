#!/bin/bash

# nvm 환경 설정을 로드합니다
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 현재 환경 정보를 로깅하여 디버깅을 돕습니다
echo "Current environment:"
echo "Node version: $(node -v)"
echo "NPM path: $(which npm)"

# EC2 사용자와 그룹을 설정합니다
EC2_USER="ec2-user"
EC2_GROUP="ec2-user"
APP_DIR="/home/ec2-user/frontend"

# 기존 배포 디렉토리를 정리하고 새로 준비합니다
if [ -d $APP_DIR ]; then
    sudo rm -rf $APP_DIR
fi

sudo mkdir -p $APP_DIR
sudo chown $EC2_USER:$EC2_GROUP $APP_DIR
sudo chmod 755 $APP_DIR

# 배포 디렉토리로 이동합니다
cd $APP_DIR

# pnpm이 없다면 설치합니다
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    $NVM_DIR/versions/node/v22.13.1/bin/npm install -g pnpm
fi

# PM2가 없다면 설치합니다
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    $NVM_DIR/versions/node/v22.13.1/bin/npm install -g pm2
fi

# 프로젝트 의존성을 설치합니다
echo "Installing dependencies..."
sudo -u $EC2_USER pnpm install --production

# 애플리케이션을 시작하거나 재시작합니다
echo "Restarting application..."
if pm2 list | grep -q "clipvault"; then
    sudo -u $EC2_USER pm2 restart clipvault
else
    sudo -u $EC2_USER pm2 start npm --name "clipvault" -- start
fi

echo "Deployment complete!"