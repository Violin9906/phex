<template>
  <div class="page-article">
    <h2>关于PHEX</h2>
    <p>
      PHEX最初的想法来自我读大一的时候，发现大物实验的不确定度计算既繁琐又机械。于是萌生了用软件进行计算的想法。当时我对前端了解不多，第一个版本的PHEX是用PHP写成的，界面丑陋不堪，使用非常不便。然而，它得到了我身边的不少人的欢迎。大二，我有了一些前端开发的经验后，决定重新构建这个项目。当时随随便便将Physics Experiment两个单词凑起来的名字PHEX，也沿用至今。
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'About us'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
