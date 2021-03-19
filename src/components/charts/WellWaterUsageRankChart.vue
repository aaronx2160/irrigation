<template>
  <div class="container">
    <div id="chart" ref="wellWaterUsageRef"></div>
  </div>
</template>

<script>
export default {
  name: 'wellWaterUsageRank',
  data() {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0,
      endValue: 9,
      timeId: null,
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.screenAdapter)
    this.chartInstance.resize()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timeId)
  },
  methods: {
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.wellWaterUsageRef)
      const initOption = {
        title: { text: '| 水井实时用水排行', top: 20, left: 20 },
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
        series: [{ type: 'bar', label: { show: true, position: 'top' } }],
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
      this.getData()
      this.chartInstance.resize()
    },
    getData() {
      this.allData = this.$store.getters.getLiveData
      this.updateChart()
      this.screenAdapter()
      this.startInterval()
    },
    updateChart() {
      const colorArr = [
        ['#0BA82C', '#4ff778'],
        ['#2e72bf', '#23e5e5'],
        ['#5052ee', '#ab6ee5'],
      ]
      let wellArr = []
      const valueArr = []
      this.allData = this.allData.filter((v) => {
        return v.UseWater !== 0
      })
      this.allData.sort((a, b) => {
        return b.UseWater - a.UseWater
      })
      this.allData.map((v) => {
        wellArr.push(v.DeviceName)
        valueArr.push(v.UseWater)
      })
      const dataOption = {
        xAxis: { data: wellArr },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColor = null
                if (arg.value > 1000) {
                  targetColor = colorArr[0]
                } else if (arg.value > 500) {
                  targetColor = colorArr[1]
                } else {
                  targetColor = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: targetColor[0] },
                  { offset: 1, color: targetColor[1] },
                ])
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontSize =
        (this.$refs.wellWaterUsageRef.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: 20,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: function () {
                return [titleFontSize / 2, titleFontSize / 2, 0, 0]
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateChart()
      }, 2000)
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  #chart {
    height: 100%;
    width: 100%;
  }
}
</style>
