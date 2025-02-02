#!/bin/bash

DEPLOY_DIR=~/frontend/releases/$(date +%Y%m%d%H%M%S)
CURRENT_LINK=~/frontend/current

# 새로운 배포 폴더로 이동
mkdir -p "$DEPLOY_DIR"
mv ~/frontend/releases/new-release/* "$DEPLOY_DIR"

# 심볼릭 링크 변경
ln -nfs "$DEPLOY_DIR" "$CURRENT_LINK"

echo "Deployment completed. Current version: $DEPLOY_DIR"