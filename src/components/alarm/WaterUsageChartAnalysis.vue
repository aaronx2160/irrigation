<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>告警查询</el-breadcrumb-item>
      <el-breadcrumb-item>用水指标图形分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h3>地下水位监测</h3>
      <el-table :data="undergroundWaterLevel" border stripe>
        <el-table-column
          label="观测点"
          prop="stationName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="水位"
          prop="waterLevel"
          align="center"
        ></el-table-column>
      </el-table>
      <h3>用水总指标：1.5亿</h3>
      <el-table :data="regionalWaterUsage" border stripe>
        <el-table-column
          label="观测点"
          prop="region"
          align="center"
        ></el-table-column>
        <el-table-column
          label="水位"
          prop="usage"
          align="center"
        ></el-table-column>
      </el-table>
      <el-card><div id="myChart"></div></el-card>
    </el-card></div
></template>

<script>
export default {
  name: 'WaterUsageChartAnalysis',
  data() {
    return {
      undergroundWaterLevel: [
        {
          stationName: '站点1:',
          waterLevel: 540.47
        },
        {
          stationName: '站点1:',
          waterLevel: 540.47
        },
        {
          stationName: '站点1:',
          waterLevel: 540.47
        }
      ],
      regionalWaterUsage: [
        { region: '城区用水量', usage: '0.00吨' },
        { region: '城区用水量', usage: '0.00吨' },
        { region: '城区用水量', usage: '0.00吨' },
        { region: '城区用水量', usage: '0.00吨' },
        { region: '城区用水量', usage: '0.00吨' }
      ]
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { text: '月用水量' },
        tooltip: {},
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {},
        series: [
          {
            name: '用水量：吨',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
#myChart {
  margin-top: 15px;
  height: 300px;
  width: 500px;
}
</style>
