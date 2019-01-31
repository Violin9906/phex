<template>
  <div class="container">
    <div class="page-article">
      <h2>单变量不确定度分析</h2>
    </div>
    <div class="row clearfix">
      <div class="col-md-6 column">
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label for="data_n" class="col-md-4 control-label" style="margin:-4px">数据组数</label>
            <div class="col-md-3">
              <input type="number" min="3" class="form-control" id="data_n" v-model="parameter.n" @input="ChgN()" @change="ReportCompleted = false"/>
            </div>
          </div>
          <div class="form-group">
            <label for="data_p" class="col-md-4 control-label" style="margin:-4px">置信概率P</label>
            <div class="col-md-3">
              <input type="text" list="data_p_list" v-model="parameter.p" @input="ChgP()" @change="ReportCompleted = false" id="data_p" class="form-control" />
              <datalist id="data_p_list">
                <option value="0.95">0.95</option>
                <option value="0.68">0.68</option>
                <option value="0.90">0.90</option>
                <option value="0.99">0.99</option>
              </datalist>
            </div>
          </div>
          <div class="form-group">
            <label for="data_c" class="col-md-4 control-label" style="margin:-4px">置信系数C</label>
            <div class="col-md-3">
              <input type="text" class="form-control" list="data_c_list" v-model="parameter.c" @input="ChgC()" @change="ReportCompleted = false" id="data_c" />
              <datalist id="data_c_list">
                <option label="正态分布" value="3">正态分布</option>
                <option label="均匀分布" value="1.73205080757">均匀分布</option>
                <option label="三角分布" value="2.44948974278">三角分布</option>
              </datalist>
            </div>
          </div>
          <div class="form-group">
            <label for="data_t" class="col-md-4 control-label" style="margin:-4px">t因子</label>
            <div class="col-md-3">
              <input type="number" class="form-control" v-model="parameter.t" @change="ReportCompleted = false" id="data_t">
            </div>
          </div>
          <div class="form-group">
            <label for="data_deltab" class="col-md-4 control-label" style="margin:-4px">测量误差</label>
            <div class="col-md-3">
              <input type="number" class="form-control" v-model="parameter.delta" @change="ReportCompleted = false" id="data_deltab">
            </div>
          </div>
          <div class="form-group">
            <label for="data_kp" class="col-md-4 control-label" style="margin:-4px">置信因子kp</label>
            <div class="col-md-3">
              <input type="number" class="form-control" v-model="parameter.kp" @change="ReportCompleted = false" id="data_kp">
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
          <strong><h2 style="font-family:Simsun;font-weight:900;text-decoration:underline;text-align:center">实   验   报   告</h2></strong>
          <p style="text-align:center;font-family:Simsun;">___________系__________级  姓名_______________________  日期__________________  NO.______________
          </p>
          <hr>
          <p>
            数据的平均值<br>
            $$ \bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i={ {{result.average}} } $$
          </p>
          <p>
            数据的样本标准差<br>
            $$ \sigma=\sqrt{\frac{\sum_{i=1}^{n}\lgroup x_i-\bar{x}\rgroup ^2}{n-1}}={{result.stdDevi}} $$
          </p>
          <p>
            数据的A类不确定度<br>
            $$ t_P u_A=\frac{t_P \sigma}{\sqrt{n}}={{result.tpUa}} $$
          </p>
          <p>
            数据的B类不确定度<br>
            $$ k_P u_B=k_P\frac{\Delta_{仪}}{C}={{result.kpUb}} $$
          </p>
          <p>
            数据的合成展伸不确定度<br>
            $$ U_{ {{ parameter.p }} }=\sqrt{\lgroup t_P u_A\rgroup ^2+\lgroup k_P u_B\rgroup ^2}={{result.u}} $$
          </p>
          <p>
            数据的最终测量结果<br>
            $$ x={{result.average}}\quad\pm\quad{{result.u}}\qquad P={{parameter.p}} $$
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HotTable } from '@handsontable-pro/vue'
var ArrayT = {
  '0.68': {3: 1.32, 4: 1.20, 5: 1.14, 6: 1.11, 7: 1.09, 8: 1.08, 9: 1.07, 10: 1.06, 15: 1.04, 20: 1.03},
  '0.90': {3: 2.92, 4: 2.35, 5: 2.13, 6: 2.02, 7: 1.94, 8: 1.86, 9: 1.83, 10: 1.76, 15: 1.73, 20: 1.71},
  '0.95': {3: 4.30, 4: 3.18, 5: 2.78, 6: 2.57, 7: 2.46, 8: 2.37, 9: 2.31, 10: 2.26, 15: 2.15, 20: 2.09},
  '0.99': {3: 9.93, 4: 5.84, 5: 4.60, 6: 4.03, 7: 3.71, 8: 3.50, 9: 3.36, 10: 3.25, 15: 2.98, 20: 2.86}
}
var ArrayKp = {
  '0.68': { '3': 1, '1.73205080757': 1.183, '2.44948974278': 1.064 },
  '0.90': { '3': 1.65, '1.73205080757': 1.559, '2.44948974278': 1.675 },
  '0.95': { '3': 1.96, '1.73205080757': 1.645, '2.44948974278': 1.901 },
  '0.99': { '3': 2.58, '1.73205080757': 1.715, '2.44948974278': 2.204 }
}
export default {
  data: function () {
    return {
      settings: {
        data: [
          [''], [''], [''], [''], ['']
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
          } else if (!this.isMounted) {
            this.DataCompleted = false
          } else {
            this.DataCompleted = true
          }
        }
      },
      parameter: {
        n: 5,
        p: 0.95,
        delta: '',
        c: 3,
        t: 2.78,
        kp: 1.96
      },
      result: {
        average: 0,
        stdDevi: 0,
        tpUa: 0,
        kpUb: 0,
        u: 0
      },
      isMounted: false,
      DataCompleted: false,
      ReportCompleted: false
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
      if (this.parameter.n < 3) {
        return false
      }
      if (this.parameter.n == null || this.parameter.p == null || this.parameter.delta == null || this.parameter.c == null || this.parameter.t == null || this.parameter.kp == null) {
        return false
      }
      return !(this.parameter.n === '' || this.parameter.p === '' || this.parameter.delta === '' || this.parameter.c === '' || this.parameter.t === '' || this.parameter.kp === '');

    }
  },
  methods: {
    ChgN: function () {
      this.parameter.t = ArrayT[this.parameter.p][this.parameter.n];
      this.settings.data = [];
      for (let i = 0; i < this.parameter.n; i++) {
        this.settings.data.splice(i, 0, [''])
      }
    },
    ChgP: function () {
      this.parameter.t = ArrayT[this.parameter.p][this.parameter.n];
      this.parameter.kp = ArrayKp[this.parameter.p][this.parameter.c]
    },
    ChgC: function () {
      this.parameter.kp = ArrayKp[this.parameter.p][this.parameter.c]
    },
    Analyze: function () {
      // TODO
      let sum=0;
      let sumsqr=0;
      for(let i = 0; i < this.parameter.n; i++) {
        sum += parseFloat(this.settings.data[i][0]);
        sumsqr += Math.pow(parseFloat(this.settings.data[i][0]),2)
      }

      console.log(sumsqr);

      this.result.average = sum / this.parameter.n;
      this.result.stdDevi = Math.sqrt((this.parameter.n / (this.parameter.n - 1)) * (sumsqr / this.parameter.n - Math.pow(this.result.average,2)));
      this.result.tpUa = this.parameter.t * this.result.stdDevi / Math.sqrt(this.parameter.n);
      this.result.kpUb = this.parameter.kp * this.parameter.delta / this.parameter.c;
      this.result.u = Math.sqrt(Math.pow(this.result.tpUa,2) + Math.pow(this.result.kpUb,2));

      setTimeout(function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); }, 100 * this.parameter.n);  // compile LaTeX too early may cause trouble

      this.ReportCompleted = true
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style src="../../../node_modules/handsontable-pro/dist/handsontable.full.css">
</style>
