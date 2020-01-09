# PHEX

[![Build Status](https://travis-ci.org/Violin9906/phex.svg?branch=master)](https://travis-ci.org/Violin9906/phex)
![GitHub](https://img.shields.io/github/license/Violin9906/phex)
![Language](https://img.shields.io/badge/language-vue-green.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Violin9906/phex)
![GitHub last commit](https://img.shields.io/github/last-commit/Violin9906/phex)
![GitHub issues](https://img.shields.io/github/issues-raw/Violin9906/phex)
![GitHub All Releases](https://img.shields.io/github/downloads/Violin9906/phex/total)
![GitHub stars](https://img.shields.io/github/stars/Violin9906/phex)

> A Toolkit of College Physics Experiment

## How to Use

### 1.通过Github Pages服务在线使用

我们已经构建了在线的PHEX并通过Travis-CI持续集成到Github Pages服务。访问[网址](//violin9906.github.io/phex/)即可使用，该网址内容与master分支保持同步。

### 2.下载预编译包

在[发布页](//github.com/Violin9906/phex/releases)下载最新的预编译包并解压到本地，在浏览器中打开`index.html`即可使用。你也可以将解压后的文件部署到自己的HTTP服务器上。预编译版本在每次master分支的版本号更新时自动发布。

### 3.从源代码构建

从源代码构建的详细说明，参加Build Setup。

#### 依赖项

* git
* node >= 12.13.0
* npm >= 6.12.0

#### 克隆源代码到本地

```bash
git clone https://github.com/Violin9906/phex.git
```

#### 安装依赖

```bash
npm install
```

#### 运行或构建

要在本地运行服务：
```bash
npm run dev
```
访问[localhost:8080](localhost:8080)即可

要构建预编译包：
```bash
npm run build
```
在./dist/目录下可找到生成的文件

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## LICENSE
MIT License

Copyright (c) 2019 王若麟

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
