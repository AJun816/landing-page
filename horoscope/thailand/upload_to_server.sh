#!/bin/sh

# ==================== 配置信息（请修改为你的服务器信息） ====================
REMOTE_USER="root"       # 服务器用户名（如 root）
REMOTE_IP="[2401:c080:1400:4087:5400:05ff:fe9c:b476]"              # 服务器 IPv6 地址
REMOTE_PATH="/home/landing-page"    # 服务器项目目录（如 /opt/music-landing）

# 需要排除的文件/目录（支持通配符）
EXCLUDE_FILES=(
  "--exclude=*.log"
  "--exclude=.git"
  "--exclude=.DS_Store"
  "--exclude=*.swp"
  "--exclude=*.bak"
)
# ======================================================================

# 检查 scp 和 ssh 是否可用
if ! command -v scp &> /dev/null; then
  echo "错误：未找到 scp 工具，请安装 Git Bash 等环境"
  exit 1
fi
if ! command -v ssh &> /dev/null; then
  echo "错误：未找到 ssh 工具，请安装 Git Bash 等环境"
  exit 1
fi

# 处理 IPv6 地址格式
if echo "$REMOTE_IP" | grep -q ":" && ! echo "$REMOTE_IP" | grep -q "\[.*\]"; then
  echo "提示：自动为 IPv6 地址添加方括号..."
  REMOTE_IP="[$REMOTE_IP]"
fi

# 显示上传配置
echo "===== 上传配置 ====="
echo "本地目录：当前目录"
echo "远程目标：$REMOTE_USER@$REMOTE_IP:$REMOTE_PATH"
echo "排除列表："
for item in "${EXCLUDE_LIST[@]}"; do
  echo "  - $item"
done
echo "===================="
read -p "确认上传？(y/n) " -n 1 -r
echo
if [ "$REPLY" != "y" ] && [ "$REPLY" != "Y" ]; then
  echo "已取消上传"
  exit 0
fi

# 手动遍历所有文件（避开 find 命令）
FILES=()
traverse_directory() {
  local dir="$1"
  # 遍历目录下的所有条目
  for entry in "$dir"/*; do
    # 处理 Windows 路径（替换反斜杠为正斜杠）
    entry=$(echo "$entry" | sed 's/\\/\//g')
    
    # 跳过空条目（目录为空时）
    [ -e "$entry" ] || continue
    
    # 检查是否需要排除
    local exclude=0
    for pattern in "${EXCLUDE_LIST[@]}"; do
      # 通配符匹配
      if echo "$entry" | grep -qE "$pattern"; then
        exclude=1
        break
      fi
    done
    if [ $exclude -eq 1 ]; then
      continue
    fi
    
    # 如果是目录则递归遍历，否则添加到文件列表
    if [ -d "$entry" ]; then
      traverse_directory "$entry"
    else
      FILES+=("$entry")
    fi
  done
}

# 从当前目录开始遍历
echo "正在扫描文件（排除指定内容）..."
traverse_directory "."

# 检查是否有文件需要上传
if [ ${#FILES[@]} -eq 0 ]; then
  echo "警告：未找到符合条件的文件（可能全部被排除）"
  exit 1
fi

# 显示待上传文件数量
echo "发现 ${#FILES[@]} 个文件待上传"

# 执行上传
echo "开始上传文件..."
for file in "${FILES[@]}"; do
  # 获取相对路径（去掉开头的 ./）
  relative_path=$(echo "$file" | sed 's/^\.\///')
  # 远程目录路径
  remote_dir="$REMOTE_USER@$REMOTE_IP:$REMOTE_PATH/$(dirname "$relative_path")"
  
  # 创建远程目录（忽略错误）
  ssh "$REMOTE_USER@$REMOTE_IP" "mkdir -p '$REMOTE_PATH/$(dirname "$relative_path")'" > /dev/null 2>&1
  
  # 上传文件
  echo "上传: $file"
  scp "$file" "$remote_dir/"
  
  # 检查单个文件上传是否失败
  if [ $? -ne 0 ]; then
    echo "错误：文件 $file 上传失败"
    exit 1
  fi
done

echo "===== 所有文件上传成功 ====="
echo "项目已上传至：$REMOTE_USER@$REMOTE_IP:$REMOTE_PATH"
echo "登录服务器：ssh $REMOTE_USER@$REMOTE_IP"
