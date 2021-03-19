<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>机井用电统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form label-width="auto">
        <el-form-item label="统计类型">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用水机井">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="com-container">
        <div class="com-chart" ref="rank_ref" id="chart"></div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      options: [
        {
          value: 'year',
          label: '年',
        },
        {
          value: 'month',
          label: '月',
        },
        {
          value: 'day',
          label: '日',
        },
      ],
      value: 'day',
    }
  },
  mounted() {
    this.init()
    this.getData()
  },
  methods: {
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref)
      const initOption = {
        title: { text: '| 地区销售排行', top: 20, left: 20 },
        grid: {
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        tooltip: { show: true },
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [{ type: 'bar' }],
      }
      this.chartInstance.setOption(initOption)
      // this.chartInstance.on('mouseover', () => {
      //     clearInterval(this.timeId)
      // })
      // this.chartInstance.on('mouseout', () => {
      //     this.startInterval()
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  .el-form-item {
    margin-right: 15px;
    padding: 0;
    .el-input {
      width: 120px;
    }
    .el-select {
      width: 120px;
    }
  }
}
.com-container {
  height: 530px;
  width: 100%;
  .com-chart {
    height: 530px;
    width: 100%;
  }
}
</style>
