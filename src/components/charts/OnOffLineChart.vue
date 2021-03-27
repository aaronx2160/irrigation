<template>
  <div class="container">
    <div id="chart" ref="onOffLineRef"></div>
    <span
      class="iconfont icon-right toRight"
      @click="handleDataChange(1)"
    ></span>
    <span
      class="iconfont icon-left toLeft"
      @click="handleDataChange(-1)"
    ></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'OnOffLine',
  data() {
    return {
      chartInstance: null,
      allData: null,
      seriesData: {},
      dataIndex: 0,
      tittleArr: ['网络', '水卡', '水泵'],
      titleFontSize: 0,
      socketType:'getLiveData'
    }
  },
  created() {
    this.$ws.registerCallback(this.socketType,this.getData)
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.screenAdaptor)
    this.$ws.send({
      action: 'getData',
      socketType: this.socketType,
      value: ''
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdaptor)
    this.$ws.unregisterCallback(this.socketType,this.getData)
  },
  methods: {
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.onOffLineRef)
      const initOption = {
        title: {
          text: '| 机井状态',
          left: 20,
          top: 20
        },
        legend: {
          icon: 'circle'
        },
        tooltip: {
          show: true
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: true
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.resize()
      this.screenAdaptor()
    },
    getData(ret) {
      console.log(ret)
      // this.allData = this.$store.getters.getLiveData
      this.allData=ret
      this.allData.map(v => {
        v.NetState = v.NetState === 1 ? '在线' : '离线'
        v.PumpState = v.PumpState === 1 ? '开启' : '关闭'
        v.CardState = v.CardState === 1 ? '上卡' : '下卡'
      })

      const netData = {
        netLegend: ['在线', '离线'],
        netArr: [
          {
            name: '在线',
            value: 0,
            itemStyle: {
              color: '#67C23A'
            }
          },
          {
            name: '离线',
            value: 0,
            itemStyle: {
              color: '#F56C6C'
            }
          }
        ]
      }
      const cardData = {
        cardLegend: ['上卡', '下卡'],
        cardArr: [
          {
            name: '上卡',
            value: 0,
            itemStyle: {
              color: '#67C23A'
            }
          },
          {
            name: '下卡',
            value: 0,
            itemStyle: {
              color: '#F56C6C'
            }
          }
        ]
      }
      const pumpData = {
        pumpLegend: ['开启', '关闭'],
        pumpArr: [
          {
            name: '开启',
            value: 0,
            itemStyle: {
              color: '#67C23A'
            }
          },
          {
            name: '关闭',
            value: 0,
            itemStyle: {
              color: '#F56C6C'
            }
          }
        ]
      }
      this.allData.map(v => {
        v.NetState === '在线'
          ? netData.netArr[0].value++
          : netData.netArr[1].value++
        v.CardState === '上卡'
          ? cardData.cardArr[0].value++
          : cardData.cardArr[1].value++
        v.PumpState === '开启'
          ? pumpData.pumpArr[0].value++
          : pumpData.pumpArr[1].value++
      })
      this.seriesData.netData = netData
      this.seriesData.cardData = cardData
      this.seriesData.pumpData = pumpData
      this.upDateChart(this.dataIndex)
    },
    upDateChart(dataIndex) {
      let legendData, seriesData
      if (dataIndex === 0) {
        legendData = this.seriesData.netData.netLegend
        seriesData = this.seriesData.netData.netArr
      } else if (dataIndex === 1) {
        legendData = this.seriesData.cardData.cardLegend
        seriesData = this.seriesData.cardData.cardArr
      } else {
        legendData = this.seriesData.pumpData.pumpLegend
        seriesData = this.seriesData.pumpData.pumpArr
      }
      const dataOption = {
        title: {
          text: '| ' + this.tittleArr[dataIndex] + '状态'
        },
        legend: {
          data: legendData
        },
        series: [{ data: seriesData }]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdaptor() {
      this.titleFontSize = (this.$refs.onOffLineRef.offsetWidth / 100) * 3.6

      const adaptOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        legend: {
          top: 35,
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        series: [
          {
            radius: this.titleFontSize * 7.5
            // center: ['50%', '50%'],
          }
        ]
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    },
    handleDataChange(num) {
      this.dataIndex += num
      if (this.dataIndex >= 3) this.dataIndex = 0
      if (this.dataIndex < 0) this.dataIndex = 2
      this.upDateChart(this.dataIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: relative;
  #chart {
    height: 100%;
    width: 100%;
  }
  .toRight {
    color: white;
    position: absolute;
    top: 50%;
    right: 2%;
    cursor: pointer;
  }
  .toLeft {
    color: white;
    position: absolute;
    top: 50%;
    left: 2%;
    cursor: pointer;
  }
}
</style>