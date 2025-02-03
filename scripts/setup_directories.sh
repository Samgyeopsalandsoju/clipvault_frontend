#!/bin/bash

# 기본 디렉토리 구조 생성
mkdir -p /home/ec2-user/frontend/releases/new-release
mkdir -p /home/ec2-user/frontend/releases/initial

# 처음에는 initial 폴더를 current로 링크
ln -sfn /home/ec2-user/frontend/releases/initial /home/ec2-user/frontend/current

echo "Directory structure created successfully!"