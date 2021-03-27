<template>
  <div class="container">
    <div id="chart" ref="monthlyUsageRef"></div>
  </div>
</template>

<script>
import getWellInfoArr from '../../utils/getWellInfo'
export default {
  name: 'MonthlyUsage',
  data() {
    return {
      chartInstance: null,
      allData: null,
      area: null,
      waterUsageData: null,
      titleFontSize: 0,
      socketType:'monthlyUsage'
    }
  },
  created() {
    this.$ws.registerCallback(this.socketType,this.getData)
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
    const wellList = this.$store.getters.getWellList
    const deviceCode = getWellInfoArr(wellList, 'DeviceCode')
    const year = new Date().getFullYear()
    this.$ws.send({
      action: 'getData',
      socketType: this.socketType,
      value: {
        deviceCode,
        year
      }
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
    this.$ws.unregisterCallback(this.socketType)
  },
  methods: {
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.monthlyUsageRef)
      const initOption = {
        title: {
          text: '每月用水趋势',
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: { left: 20, top: '15%', icon: 'circle' },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }

      this.chartInstance.setOption(initOption)
    },
    async getData(ret) {
      //http改造成websocket链接
      // const wellList = this.$store.getters.getWellList
      // const deviceCode = getWellInfoArr(wellList, 'DeviceCode')
      // const year = new Date().getFullYear()
      // const { data: res } = await this.$http.post('/api/waterUsage', {
      //   deviceCode,
      //   year
      // })
      this.allData = ret
      this.updateChart()
    },
    updateChart() {
      const colorArr1 = [
        'rgba(11,168,44,1)',
        'rgba(44,110,255,1)',
        'rgba(22,242,217,1)',
        'rgba(254,33,30,1)',
        'rgba(250,105,0,1)'
      ]
      const colorArr2 = [
        'rgba(11,168,44,0.5)',
        'rgba(44,110,255,0.5)',
        'rgba(22,242,217,0.5)',
        'rgba(254,33,30,0.5)',
        'rgba(250,105,0,0.5)'
      ]
      const monthArr = []
      let currentMonth = new Date().getMonth() + 1
      for (let i = 1; i <= currentMonth; i++) {
        monthArr.push(i + '月')
      }
      let chartSeriesData = {}
      const areaNames = []
      this.allData.map(v => {
        if (areaNames.indexOf(v.village) === -1) {
          areaNames.push(v.village)
        }
      })

      for (let i = 0; i < areaNames.length; i++) {
        chartSeriesData[areaNames[i]] = [0, 0, 0, 0, 0]
      }
      for (let i = 0; i < this.allData.length; i++) {
        chartSeriesData[this.allData[i].village][
          this.allData[i].InMonth
        ] += this.allData[i].UseWater
      }
      const seriesArr = []
      const legendArr = []
      Object.keys(chartSeriesData).forEach((key, index) => {
        chartSeriesData[key].shift()
        legendArr.push(key)
        seriesArr.push({
          name: key,
          type: 'line',
          data: chartSeriesData[key],
          stack: 'trend',
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] },
              { offset: 1, color: colorArr2[index] }
            ])
          }
        })
      })

      const dataOption = {
        xAxis: {
          data: monthArr
        },
        legend: { data: legendArr },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
      this.chartInstance.resize()
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.monthlyUsageRef.offsetWidth / 100) * 3.6

      const adaptOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize
          }
        }
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  #chart {
    width: 100%;
    height: 100%;
  }
}
</style>