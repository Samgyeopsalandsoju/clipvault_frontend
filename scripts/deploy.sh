#!/bin/bash

# 오류 발생 시 스크립트 중단
set -e

# 로깅 함수 정의
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# NVM 설정
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 환경 확인
log "Checking environment..."
log "Node version: $(node -v)"

# 애플리케이션 디렉토리 설정
APP_DIR="/home/ec2-user/frontend"

# 디렉토리 준비
log "Preparing application directory..."
sudo rm -rf "$APP_DIR"
sudo mkdir -p "$APP_DIR"
sudo chown ec2-user:ec2-user "$APP_DIR"

# 배포 파일 복사
log "Copying deployment files..."
LATEST_DEPLOYMENT=$(find /opt/codedeploy-agent/deployment-root -name "deployment-archive" -type d | sort -r | head -n 1)
sudo cp -raf "$LATEST_DEPLOYMENT/." "$APP_DIR/"
sudo chown -R ec2-user:ec2-user "$APP_DIR"

# PM2 설치 확인 및 설치
if ! command -v pm2 &> /dev/null; then
    log "Installing PM2..."
    npm install -g pm2
fi

# 애플리케이션 시작
log "Starting application..."
cd "$APP_DIR"
pm2 delete clipvault 2>/dev/null || true
pm2 start ecosystem.config.js --env production

log "Deployment completed successfully!"