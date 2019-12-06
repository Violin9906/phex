#!/bin/dash

export PKG_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
git tag $PKG_VERSION
if [ $? -eq 0 ]; then
    export RELEASE=true
    if [ $PKG_VERSION=~\.0$ ]; then
        export PRE_RELEASE=false
    else
        export PRE_RELEASE=true
    fi
    tar -czvf $PKG_VERSION.tar.gz ./dist/*
fi