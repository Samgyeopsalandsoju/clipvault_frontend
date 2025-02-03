#!/bin/bash
DEPLOY_DIR=/home/ec2-user/frontend/releases/$(date +%Y%m%d%H%M%S)
CURRENT_LINK=/home/ec2-user/frontend/current

# 새로운 배포 폴더로 이동
mkdir -p "$DEPLOY_DIR"
mv /home/ec2-user/frontend/releases/new-release/* "$DEPLOY_DIR"
mv /home/ec2-user/frontend/releases/new-release/.* "$DEPLOY_DIR/" 2>/dev/null || true

# nginx 그룹에 필요한 디렉토리만 접근 권한 부여
if ! id -nG nginx | grep -qw "ec2-user"; then
    sudo usermod -a -G ec2-user nginx
fi

# 배포 폴더 전체 권한 설정
sudo chown -R ec2-user:ec2-user "$DEPLOY_DIR"
sudo chmod -R 750 "$DEPLOY_DIR"

# 심볼릭 링크 변경
ln -nfs "$DEPLOY_DIR" "$CURRENT_LINK"

echo "Deployment completed. Current version: $DEPLOY_DIR"
