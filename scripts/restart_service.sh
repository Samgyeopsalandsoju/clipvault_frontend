#!/bin/bash

# NVM 환경 변수 로드 (Node.js 및 PNPM을 사용하기 위해 필요)
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# PNPM & PM2 경로 추가 (PM2가 전역 설치되지 않은 경우를 대비)
export PATH="/home/ec2-user/.local/share/pnpm:$PATH"

# 실행할 디렉토리로 이동
cd /home/ec2-user/frontend/current

# PM2의 정확한 실행 경로 설정
PM2_CMD="/home/ec2-user/.local/share/pnpm/pm2"

# PM2가 정상적으로 설치되어 있는지 확인
if ! command -v $PM2_CMD &> /dev/null
then
    echo "PM2 is not installed. Installing PM2..."
    pnpm add -g pm2
fi

# PM2 프로세스 확인 후 실행 또는 재시작
if $PM2_CMD list | grep -q "clipvault"; then
    echo "Restarting Next.js server..."
    $PM2_CMD restart clipvault
else
    echo "Starting Next.js server..."
    $PM2_CMD start "pnpm start" --name clipvault
fi

# PM2 프로세스 리스트 저장 (재부팅 후 자동 실행 가능)
$PM2_CMD save

echo "Next.js server restarted successfully!"
