<template>
  <div id="app">
    <nav class="nav navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <!--在移动端的时候导航条折叠起来，三横的样式出现，点击该样式可以显示或隐藏导航条上的内容-->
          <button class="navbar-toggle" data-toggle="collapse" data-target="#menu">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="menu" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/" exact>首页</router-link></li>
            <li class="dropdown"><router-link to="/uncertainty" class="dropdown-toggle" data-toggle="dropdown">不确定度分析<span class="caret"></span></router-link>
              <ul class="dropdown-menu">
                <li><router-link to="/uncertainty/single">单变量不确定度分析</router-link></li>
              </ul>
            </li>
            <li class="dropdown"><router-link to="/regression" class="dropdown-toggle" data-toggle="dropdown">回归分析<span class="caret"></span></router-link>
              <ul class="dropdown-menu">
                <li><router-link to="/regression/liner">线性回归</router-link></li>
              </ul>
            </li>
            <li class="dropdown"><router-link to="/stat" class="dropdown-toggle" data-toggle="dropdown">数理统计分析<span class="caret"></span></router-link>
              <ul class="dropdown-menu">
                <li><router-link to="/stat/sd">单变量数理统计</router-link></li>
              </ul>
            </li>
            <li class="dropdown"><router-link to="/pedia" class="dropdown-toggle" data-toggle="dropdown">大雾百科<span class="caret"></span></router-link>
              <ul class="dropdown-menu">
                <li><router-link to="/pedia/constant">物理学常数表</router-link></li>
              </ul>
            </li>
            <li><router-link to="/about">关于</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    <header>
      <div class="container">
        <div class="row clearfix">
          <div class="col-md-12 column" style="text-align: center;">
            <img style="margin:30px auto;margin-top:80px;" src="./assets/logo-white.png" height="200px" width="230px"></img>
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
          <div class="col-md-3 column"><ul class="list-unstyled">
            <li><a href="https://www.ustc.edu.cn/">中国科学技术大学</a></li>
          </ul></div>
          <div class="col-md-3 column"><ul class="list-unstyled">
            <li><a href="http://jxzy.ustc.edu.cn/">中国科大物理实验教学中心</a></li>
          </ul></div>
          <div class="col-md-3 column"><ul class="list-unstyled">
            <li><a href="http://ustcaaa.ml/">中国科大天文爱好者协会</a></li>
          </ul></div>
          <div class="col-md-3 column"><ul class="list-unstyled"><li>
            <a href="http://home.ustc.edu.cn/~violinwang/donate">捐助作者</a>
          </li></ul></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /* 页面体样式 */
  body {
    min-width: 80%;
    padding:0;
    margin:0;
    font:normal 20px "\5FAE\8F6F\96C5\9ED1";
    color:#444;
    background-image:url(./assets/background.png);
    background-repeat:no-repeat;
    background-size:cover;
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
  .page-article h2 {
    text-align: center;
  }
  .page-article p {
    text-indent: 2em;
  }
</style>
