<template>
  <div class="container">
    <div class="page-article">
      <h2>一元方程数值求解器</h2>
    </div>
    <div class="row clearfix">
      <div class="col-md-4 column">
        <div class="well" style="height:280px">
          <div class="display-area" id="display-area"></div>
          <input class="input-area" v-model="input" @keyup.enter="inputExecute" @keyup.up="inputCallBack" @keyup.down="inputCallForward">
          <!-- TODO main task: solver -->
        </div>
      </div>
      <div class="col-md-4 column">
        <div class="well" style="height:280px;overflow: scroll;">
          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title">Function 1</h3>
            </div>
            <div class="panel-body">

            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 column">
        <div class="well" style="height:280px">
          PLOT
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as math from 'mathjs'
import $ from 'jquery'

export default {
  data: function () {
    return {
      input: '',
      display: '',
      inputHistory: {
        index: 0,
        buffer: []
      }
    }
  },
  methods: {
    inputCallBack: function () {
      if (this.inputHistory.index > 0) {
        this.inputHistory.index--
        this.input = this.inputHistory.buffer[this.inputHistory.index]
      }
    },
    inputCallForward: function () {
      if (this.inputHistory.index < this.inputHistory.buffer.length) {
        this.inputHistory.index++
        this.input = this.inputHistory.buffer[this.inputHistory.index]
      }
    },
    inputExecute: function () {
      this.inputHistory.buffer.push(this.input)
      this.inputHistory.index = this.inputHistory.buffer.length
      $('#display-area').append('<p class="input">' + this.input + '</p>')
      if (this.input.indexOf(':func:') === 0) {

      }
      this.input = ''
      $('#display-area').get(0).scrollTop = $('#display-area').get(0).scrollHeight
    }
  }
}
</script>

<style scoped>
  .input-area {
    background-color: #000000;
    color: #999999;
    font-family: "Courier New", Courier, monospace;
    width: 100%;
    height: 30px;
  }
  .display-area {
    background-color: #000000;
    color: #999999;
    font-family: "Courier New", Courier, monospace;
    height: 212px;
    width: 100%;
    overflow: scroll;
  }
  .display-area>>>p.output {
    text-align: right;
    margin-top: 0;
    margin-bottom: 0;
  }.display-area>>>p.input {
    text-align: left;
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
