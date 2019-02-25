<template>
  <div class="container">
    <div class="page-article">
      <h2>线性回归分析</h2>
    </div>
    <div class="row clearfix">
      <div class="col-md-6 column">
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label for="data-n" class="col-md-4 control-label" style="margin:-4px">数据组数</label>
            <div class="col-md-3">
              <input type="number" min="2" class="form-control" id="data-n" v-model="parameter.n" @input="ChgN"/>
            </div>
          </div>
          <div class="form-group">
            <label for="chart-title" class="col-md-4 control-label" style="margin:-4px">图表标题</label>
            <div class="col-md-3">
              <input type="text" class="form-control" id="chart-title" v-model="HighchartsSet.title.text" @change="ChgTitle"/>
            </div>
          </div>
          <div class="form-group">
            <label for="x-title" class="col-md-4 control-label" style="margin:-4px">横轴标题</label>
            <div class="col-md-3">
              <input type="text" class="form-control" id="x-title" v-model="HighchartsSet.xAxis.title.text" @change="ChgTitle"/>
            </div>
          </div>
          <div class="form-group">
            <label for="y-title" class="col-md-4 control-label" style="margin:-4px">纵轴标题</label>
            <div class="col-md-3">
              <input type="text" class="form-control" id="y-title" v-model="HighchartsSet.yAxis.title.text" @change="ChgTitle"/>
            </div>
          </div>
        </form>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a data-toggle="collapse" data-parent="#accordion"
                 href="#collapseOne">
                高级绘图设置
              </a>
            </h4>
          </div>
          <div id="collapseOne" class="panel-collapse collapse">
            <div class="panel-body">
              <p class="text-danger">
                硬核警告：这将直接编辑图表主题的JSON对象。可参考<a href="https://api.hcharts.cn/highcharts">HighCharts的API文档</a>进行设置。如果您不知道您在干什么，请不要对此进行设置。
              </p>
              <vue-json-editor v-model="HighchartsSet"></vue-json-editor>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-block" :disabled="ParameterCompleted===false || DataCompleted===false" style="margin-bottom:15px" @click="Analyze">绘图</button>
      </div>
      <div class="col-md-6 column">
        <hot-table :settings="settings" class="ht-responsive"></hot-table>
      </div>
    </div>
    <div class="row clearfix">
      <div class="col-md-12 column">
        <div id="report" v-show="ReportCompleted"></div>
        <p v-show="ReportCompleted">
          斜率m：{{ result.m }}<br>
          截距b：{{ result.b }}<br>
          相关系数r：{{ result.r.toFixed(4) }}<br>
          协方差：{{ result.corr }}<br>
          R平方值：{{ result.rSquare.toFixed(4) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { HotTable } from '@handsontable-pro/vue'
import * as ss from 'simple-statistics'
import * as Highcharts from 'highcharts'
import * as Exporting from 'highcharts/modules/exporting'
import vueJsonEditor from 'vue-json-editor'

export default {
  data: function () {
    return {
      settings: {
        data: [
          ['', ''], ['', '']
        ],
        colWidths: 150,
        rowHeaders: true,
        colHeaders: ['X', 'Y'],
        filters: false,
        dropdownMenu: false,
        afterChange: () => {
          this.ReportCompleted = false
          if (this.isMounted && (this.$children[1].hotInstance.countEmptyRows() !== 0)) {
            this.DataCompleted = false
          } else this.DataCompleted = this.isMounted
        }
      },
      HighchartsSet: {
        lang:{
          contextButtonTitle:"图表导出菜单",
          decimalPoint:".",
          downloadJPEG:"下载JPEG图片",
          downloadPDF:"下载PDF文件",
          downloadPNG:"下载PNG文件",
          downloadSVG:"下载SVG文件",
          drillUpText:"返回 {series.name}",
          loading:"加载中",
          months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
          noData:"没有数据",
          numericSymbols: [ "k" , "M" , "G" , "T" , "P" , "E"],
          printChart:"打印图表",
          resetZoom:"恢复缩放",
          resetZoomTitle:"恢复图表",
          shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
          thousandsSep:",",
          weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
        },
        colors: ['black', 'red', 'blue', 'green'],
        chart: {
          backgroundColor: 'white',
        },
        title: {
          text: '图表标题',
          style: {
            color: 'black',
            font: 'bold 20px "Times New Roman", Times, serif'
          }
        },
        subtitle: {
          style: {
            color: '#666666',
            font: 'bold 16px "Times New Roman", Times, serif'
          }
        },
        xAxis:{
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor:"black",
          lineWidth: 1,
          tickColor:"black",
          tickWidth: 1,
          labels:{
            style:{
              color:"black",
              font:"11px 'Times New Roman', Times, serif"
            }
          },
          title:{
            text: 'X',
            style:{
              color:"black",
              fontWeight:"bold",
              fontSize:"12px",
              fontFamily:"Times New Roman, Times, serif"
            }
          }
        },
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          minorTickInterval: "auto",
          lineColor: "black",
          lineWidth: 1,
          tickColor: "black",
          tickWidth: 1,
          labels: {
            style: {
              color: "black",
              font: "11px Times New Roman, Times, serif"
            }
          },
          title:{
            text: 'Y',
            style:{
              color:"black",
              fontWeight:"bold",
              fontSize:"12px",
              fontFamily:"Times New Roman, Times, serif"
            }
          }
        },
        series: [
          {
            type: 'scatter',
            name: '观测值',
            marker: {
              symbol: 'diamond',
              radius: 4
            }
          },
          {
            type: 'line',
            name: '回归线',
            lineWidth: 1,
            marker: {
              enabled: false
            },
            states: {
              hover: {
                lineWidth: 0
              }
            },
            enableMouseTracking: false
          }
        ],
        legend: {
          itemStyle: {
            font: '9pt Times New Roman, Times, serif',
            color: 'black'
          },
          itemHoverStyle:{
            color: 'gray'
          }
        }
      },
      parameter: {
        n: 2
      },
      result: {
        b: 0,
        m: 0,
        r: 0,
        cov: 0,
        rSquare: 0
      },
      isMounted: false,
      DataCompleted: true,
      ReportCompleted: false,
    }
  },
  components: {
    HotTable,
    vueJsonEditor
  },
  computed: {
    /**
     * @return {boolean}
     */
    ParameterCompleted: function () {
      if (this.parameter.n < 2) {
        return false
      }
      if (this.parameter.n == null) {
        return false
      }
      return !(this.parameter.n === '')
    }
  },
  methods: {
    ChgN: function () {
      if (this.parameter.n >= 2) {
        this.settings.data = []
        for (let i = 0; i < this.parameter.n; i++) {
          this.settings.data.splice(i, 0, ['', ''])
        }
      }
    },
    ChgTitle: function () {
      this.ReportCompleted = false
    },
    Analyze: function () {
      let data = []
      let dataX = []
      let dataY = []
      let line = []
      for (let i = 0; i < this.parameter.n; i++) {
        if (isNaN(parseFloat(this.settings.data[i][0])) || isNaN(parseFloat(this.settings.data[i][1]))) {
          alert('数据不完整！')
          return
        }
        data[i] = [parseFloat(this.settings.data[i][0]), parseFloat(this.settings.data[i][1])]
        dataX[i] = parseFloat(this.settings.data[i][0])
        dataY[i] = parseFloat(this.settings.data[i][1])
      }
      line[0] = [ss.min(dataX), ss.linearRegressionLine(ss.linearRegression(data))(ss.min(dataX))]
      line[1] = [ss.max(dataX), ss.linearRegressionLine(ss.linearRegression(data))(ss.max(dataX))]
      Exporting(Highcharts)
      this.HighchartsSet.series[0].data = data
      this.HighchartsSet.series[1].data = line
      Highcharts.chart('report',this.HighchartsSet)
      this.result.m = ss.linearRegression(data).m
      this.result.b = ss.linearRegression(data).b
      this.result.r = ss.sampleCorrelation(dataX, dataY)
      this.result.corr = ss.sampleCorrelation(dataX, dataY)
      this.result.rSquare = ss.rSquared(data, ss.linearRegressionLine(ss.linearRegression(data)))

      this.ReportCompleted = true
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>
