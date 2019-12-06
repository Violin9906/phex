<template>
  <div id="app">
    <nav class="nav navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <!--在移动端的时候导航条折叠起来，三横的样式出现，点击该样式可以显示或隐藏导航条上的内容-->
          <button class="navbar-toggle" data-target="#menu" data-toggle="collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="nav navbar-nav">
            <li>
              <router-link exact to="/">首页</router-link>
            </li>
            <li class="dropdown">
              <router-link class="dropdown-toggle" data-toggle="dropdown" to="/uncertainty">
                不确定度分析
                <span class="caret"></span>
              </router-link>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/uncertainty/single">单变量不确定度分析</router-link>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <router-link class="dropdown-toggle" data-toggle="dropdown" to="/regression">
                回归分析
                <span class="caret"></span>
              </router-link>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/regression/linear">线性回归</router-link>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <router-link class="dropdown-toggle" data-toggle="dropdown" to="/stat">
                数理统计分析
                <span class="caret"></span>
              </router-link>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/stat/sd">单变量数理统计</router-link>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <router-link class="dropdown-toggle" data-toggle="dropdown" to="/pedia">
                大雾百科
                <span class="caret"></span>
              </router-link>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/pedia/constants">物理学常数表</router-link>
                </li>
                <!--<li><router-link to="/pedia/solver">一元方程数值求解器</router-link></li>-->
              </ul>
            </li>
            <li>
              <router-link to="/about">关于</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <header>
      <div class="container">
        <div class="row clearfix">
          <div class="col-md-12 column" style="text-align: center;">
            <img
              height="200px"
              src="./assets/logo-white.png"
              style="margin:30px auto;margin-top:80px;"
              width="230px"
            />
            <h1 style="color:white">中国滑稽大学大物实验数据处理系统</h1>
          </div>
        </div>
      </div>
    </header>
    <article>
      <div class="container">
        <div class="row clearfix">
          <div class="col-md-12 column">
            <div class="jumbotron">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </article>
    <footer>
      <div class="container">
        <div class="row clearfix" style="text-align:center;color:#fff;font-size:16px">
          <div class="col-md-3 column">
            <ul class="list-unstyled">
              <li>
                <a href="https://www.ustc.edu.cn/">中国科学技术大学</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 column">
            <ul class="list-unstyled">
              <li>
                <a href="http://jxzy.ustc.edu.cn/">中国科大物理实验教学中心</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 column">
            <ul class="list-unstyled">
              <li>
                <a href="http://ustcaaa.ml/">中国科大天文爱好者协会</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 column">
            <ul class="list-unstyled">
              <li>
                <a href="http://home.ustc.edu.cn/~violinwang/donate">捐助作者</a>
              </li>
            </ul>
          </div>
          <div class="col-md-12 column">
            <ul class="list-unstyled">
              <li>版本号：{{version}}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import config from '../package.json'
export default {
  name: 'App',
  data: function () {
    return {
      version: config.version
    }
  }
}
</script>

<style>
/* 页面体样式 */
body {
  min-width: 80%;
  padding: 0;
  margin: 0;
  font: normal 20px '\5FAE\8F6F\96C5\9ED1' !important;
  color: #444;
  background-image: url(../static/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
/* 导航栏样式 */
.router-link-active {
  background-color: black;
}
.nav li:hover {
  background-color: black;
}
/* 页面文章样式 */
.page-article {
  margin-bottom: 40px;
  margin-top: 20px;
}
.page-article h2 {
  text-align: center;
}
.page-article p {
  text-indent: 2em;
}
/* handsontable自定义样式 */
@media screen and (max-width: 600px) {
  .ht-responsive {
    min-height: 100px;
    max-height: 400px;
    max-width: 100%;
    overflow-x: scroll;
  }
}
</style>
