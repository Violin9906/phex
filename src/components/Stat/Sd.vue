<template>
  <div class="container">
    <div class="page-article">
      <h2>单变量数理统计</h2>
    </div>
    <div class="row clearfix">
      <div class="col-md-6 column">
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label for="data_n" class="col-md-4 control-label" style="margin:-4px">数据组数</label>
            <div class="col-md-3">
              <input type="number" min="2" class="form-control" id="data_n" v-model="parameter.n" @input="ChgN" @change="ReportCompleted = false"/>
            </div>
          </div>
        </form>
        <button class="btn btn-primary btn-block" :disabled="ParameterCompleted===false || DataCompleted===false" style="margin-bottom:15px" @click="Analyze">开始分析</button>
      </div>
      <div class="col-md-6 column">
        <hot-table :settings="settings"></hot-table>
      </div>
    </div>
    <div class="row clearfix">
      <div class="col-md-12 column">
        <div id="report" v-show="ReportCompleted" style="position:relative; height:auto; overflow:auto;">
          <hr style="border-color: darkgray">
          <span>算数平均数：{{ result.mean }} <br></span>
          <span v-show="result.harmonicMean > 0">调和平均数：{{ result.harmonicMean }} <br></span>
          <span v-show="result.geometricMean > 0">几何平均数：{{ result.geometricMean }} <br></span>
          <span>方均根值：{{ result.rootMeanSquare }} <br></span>
          <span>中位数：{{ result.median }} <br></span>
          <hr style="border-color: darkgray">
          <span>最大值：{{ result.max }} <br></span>
          <span>最小值：{{ result.min }} <br></span>
          <span>总和：{{ result.sum }} <br></span>
          <span>总积：{{ result.product }} <br></span>
          <hr style="border-color: darkgray" v-show="parameter.n >= 3">
          <span v-show="parameter.n >= 3">样本偏度系数：{{ result.sampleSkewness }} <br></span>
          <span v-show="parameter.n >= 4">样本峰度系数：{{ result.sampleKurtosis }} <br></span>
          <hr style="border-color: darkgray">
          <span>极差：{{ result.max - result.min }} <br></span>
          <span>方差：{{ result.variance }} <br></span>
          <span>样本方差：{{ result.sampleVariance }} <br></span>
          <span>标准差：{{ result.standardDeviation }} <br></span>
          <span>样本标准差：{{ result.sampleStandardDeviation }} <br></span>
          <span>绝对中位差：{{ result.medianAbsoluteDeviation }} <br></span>
          <span>平均偏差：{{ result.meanDeviation }} <br></span>
          <span>相对平均偏差：{{ result.relativeMeanDeviation }} <br></span>
          <hr style="border-color: darkgray">
          <div v-show="ReportCompleted" id="DataPlot"></div>
          <!-- TODO <div v-show="ReportCompleted" id="DistributionPlot"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { HotTable } from '@handsontable-pro/vue'
import * as ss from 'simple-statistics'
import * as Highcharts from 'highcharts'
import * as HighchartsMore from 'highcharts/highcharts-more'
import * as Exporting from 'highcharts/modules/exporting'

export default {
  data: function () {
    return {
      settings: {
        data: [
          [''], ['']
        ],
        colWidths: 200,
        rowHeaders: true,
        colHeaders: true,
        filters: false,
        dropdownMenu: false,
        afterChange: () => {
          this.ReportCompleted = false
          if (this.isMounted && (this.$children[0].hotInstance.countEmptyRows() !== 0)) {
            this.DataCompleted = false
          } else this.DataCompleted = this.isMounted
        }
      },
      parameter: {
        n: 2
      },
      result: {
        mean: 0,
        harmonicMean: 0,
        geometricMean: 0,
        rootMeanSquare: 0,
        median: 0,
        max: 0,
        min: 0,
        sum: 0,
        product: 0,
        sampleSkewness: 0,
        sampleKurtosis: 0,
        variance: 0,
        sampleVariance: 0,
        standardDeviation: 0,
        sampleStandardDeviation: 0,
        medianAbsoluteDeviation: 0,
        meanDeviation: 0,
        relativeMeanDeviation: 0
      },
      isMounted: false,
      DataCompleted: false,
      ReportCompleted: false,
    }
  },
  components: {
    HotTable
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
          this.settings.data.splice(i, 0, [''])
        }
      }
    },
    CompileLaTeX: function () {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    },
    Analyze: function () {
      let data = []
      let plotdata = []
      for (let i = 0; i < this.parameter.n; i++) {
        if (isNaN(parseFloat(this.settings.data[i][0]))) {
          alert('数据不完整！')
          return
        }
        data[i] = parseFloat(this.settings.data[i][0])
        plotdata[i] = [i+1, data[i]]
      }
      this.result.mean = ss.mean(data)
      if (ss.min(data) > 0) {
        this.result.harmonicMean = ss.harmonicMean(data)
        this.result.geometricMean = ss.geometricMean(data)
      }
      this.result.rootMeanSquare = ss.rootMeanSquare(data)
      this.result.median = ss.median(data)
      this.result.max = ss.max(data)
      this.result.min = ss.min(data)
      this.result.sum = ss.sum(data)
      this.result.product = ss.product(data)
      if (this.parameter.n >= 3) {
        this.result.sampleSkewness = ss.sampleSkewness(data)
      }
      if (this.parameter.n >= 4) {
        this.result.sampleKurtosis = ss.sampleKurtosis(data)
      }
      this.result.variance = ss.variance(data)
      this.result.sampleVariance = ss.sampleVariance(data)
      this.result.standardDeviation = ss.standardDeviation(data)
      this.result.sampleStandardDeviation = ss.sampleStandardDeviation(data)
      this.result.medianAbsoluteDeviation = ss.medianAbsoluteDeviation(data)

      let deviAbs = []
      for (let i = 0; i < this.parameter.n; i++) {
        deviAbs[i] = Math.abs(data[i] - this.result.mean)
      }
      this.result.meanDeviation = ss.mean(deviAbs)
      this.result.relativeMeanDeviation = this.result.meanDeviation / this.result.mean

      HighchartsMore(Highcharts)
      Exporting(Highcharts)
      Highcharts.chart('DataPlot',{
        title: {
          text: '数据箱线图及散点图'
        },
        legend: {
          enabled: false
        },
        xAxis: {
          categories: ['box'],
          title: {
            text: 'Experiment No.'
          }
        },
        yAxis: {
          title: {
            text: 'Observations'
          },
          plotLines:[{
            color:'red',
            dashStyle:'longdashdot',
            value:this.result.mean,
            width:2,
            label: {
              text: 'mean:'+this.result.mean.toExponential(2).toString(),
              align: 'right'
            }
          }]
        },
        plotOptions: {
          boxplot: {
            fillColor: '#F0F0E0',
            lineWidth: 2,
            medianColor: '#0C5DA5',
            medianWidth: 3,
            stemColor: '#A63400',
            stemDashStyle: 'dot',
            stemWidth: 1,
            whiskerColor: '#3D9200',
            whiskerLength: '20%',
            whiskerWidth: 3
          }
        },
        series: [
          {
            name: '原始数据',
            type: 'scatter',
            data: plotdata
          },
          {
            name: 'Observations',
            type: 'boxplot',
            data: [
              ['box',this.result.min, ss.quantile(data,0.25), this.result.median, ss.quantile(data,0.75), this.result.max]
            ]
          }
        ]
      })

      this.ReportCompleted = true
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>
