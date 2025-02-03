#!/bin/bash
DEPLOY_DIR=/home/ec2-user/frontend/releases/$(date +%Y%m%d%H%M%S)
CURRENT_LINK=/home/ec2-user/frontend/current

# 새로운 배포 폴더로 이동
mkdir -p "$DEPLOY_DIR"
mv /home/ec2-user/frontend/releases/new-release/* "$DEPLOY_DIR"

mv /home/ec2-user/frontend/releases/new-release/.* "$DEPLOY_DIR/" 2>/dev/null || true

# 심볼릭 링크 변경
ln -nfs "$DEPLOY_DIR" "$CURRENT_LINK"


# 정적 파일 권한 설정
# $DEPLOY_DIR을 사용하여 정확한 새 배포 경로의 파일 권한을 설정합니다
sudo chmod -R 755 "$DEPLOY_DIR/.next"

echo "Deployment completed. Current version: $DEPLOY_DIR"