#!/bin/bash

# nvm 환경 설정
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# npm 전체 경로 설정
NPM_PATH="/home/ec2-user/.nvm/versions/node/v22.13.1/bin/npm"

# 현재 환경 정보 출력
echo "Current environment:"
echo "Node version: $(node -v)"
echo "NPM path: $(which npm)"

# EC2 사용자 설정
EC2_USER="ec2-user"
EC2_GROUP="ec2-user"
APP_DIR="/home/ec2-user/frontend"

# 배포 디렉토리 준비
if [ -d $APP_DIR ]; then
    sudo rm -rf $APP_DIR
fi
sudo mkdir -p $APP_DIR
sudo chown $EC2_USER:$EC2_GROUP $APP_DIR
sudo chmod 755 $APP_DIR

cd $APP_DIR

# pnpm 설치 (전체 경로 사용)
echo "Installing pnpm..."
$NPM_PATH install -g pnpm

# pnpm 경로를 환경 변수에 추가
export PATH="/home/ec2-user/.nvm/versions/node/v22.13.1/bin:$PATH"

# PM2 설치 (전체 경로 사용)
echo "Installing PM2..."
$NPM_PATH install -g pm2

# 의존성 설치 (pnpm 전체 경로 사용)
echo "Installing dependencies..."
/home/ec2-user/.nvm/versions/node/v22.13.1/bin/pnpm install --production

# 애플리케이션 시작/재시작 (pm2 전체 경로 사용)
echo "Restarting application..."
/home/ec2-user/.nvm/versions/node/v22.13.1/bin/pm2 restart clipvault || /home/ec2-user/.nvm/versions/node/v22.13.1/bin/pm2 start npm --name "clipvault" -- start

echo "Deployment complete!"