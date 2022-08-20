#!/bin/bash

mydir=$(pwd)

echo "UPX is not compatible with pkg currently, so executable packing (compression) is not available at this time."
exit 0

echo "Installing upx..."

isupx=$(which upx)
#isnexe=$(which nexe)

if [ -z "$isupx" ]; then
  if [ brew install upx ]; then
    echo "Upx installed"
  else
    curl -L -o upx.tar.xz https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz
    tar -xJf upx.tar.xz
    rm upx.tar.xz
    sudo cp upx-3.96-amd64_linux/upx /usr/local/bin
    rm -rf upx-3.96-amd64_linux
  fi
else 
  echo "upx installed already."
fi
#if [ -z "$isnexe" ]; then
#  npm i -g nexe
#  echo "Shrinking nexe binaries..." 
#  bash ./scripts/dl-node.sh
#  cd ~/.nexe/
#  chmod +x *
#  upx *
#else
#  echo "Nexe installed already."
#fi


cd $mydir

