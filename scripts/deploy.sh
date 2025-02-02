#!/bin/bash

# EC2 사용자와 그룹 설정
EC2_USER="ec2-user"
EC2_GROUP="ec2-user"
APP_DIR="/home/ec2-user/frontend"

# 기존 배포 디렉토리가 있다면 제거하고 새로 생성
if [ -d $APP_DIR ]; then
    sudo rm -rf $APP_DIR
fi

# 디렉토리 생성 및 권한 설정
sudo mkdir -p $APP_DIR
sudo chown $EC2_USER:$EC2_GROUP $APP_DIR
sudo chmod 755 $APP_DIR

# 배포 디렉토리로 이동
cd $APP_DIR

# pnpm이 설치되어 있는지 확인하고, 없으면 설치
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    sudo npm install -g pnpm
fi

# PM2가 설치되어 있는지 확인하고, 없으면 설치
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# 프로덕션 의존성 설치 (ec2-user 권한으로)
echo "Installing dependencies..."
sudo -u $EC2_USER pnpm install --production

# 애플리케이션 재시작 또는 새로 시작 (ec2-user 권한으로)
echo "Restarting application..."
sudo -u $EC2_USER pm2 restart clipvault || sudo -u $EC2_USER pm2 start npm --name "clipvault" -- start

echo "Deployment complete!"