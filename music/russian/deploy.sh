#!/bin/bash

IMAGE_NAME=music-russian-landing-page
CONTAINER_NAME=music-russian-landing-page

# 构建镜像
docker build -t $IMAGE_NAME .

# 停止并删除旧容器
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 启动新容器
docker run -d --name $CONTAINER_NAME -p 80:80 $IMAGE_NAME