#!/bin/bash
DEPLOY_DIR=/home/ec2-user/frontend/releases/$(date +%Y%m%d%H%M%S)
CURRENT_LINK=/home/ec2-user/frontend/current

# 새로운 배포 폴더로 이동
mkdir -p "$DEPLOY_DIR"
mv /home/ec2-user/frontend/releases/new-release/* "$DEPLOY_DIR"

mv /home/ec2-user/frontend/releases/new-release/.* "$DEPLOY_DIR/" 2>/dev/null || true

# 심볼릭 링크 변경
ln -nfs "$DEPLOY_DIR" "$CURRENT_LINK"

echo "Deployment completed. Current version: $DEPLOY_DIR"