<template>
  <div class="container">
    <div class="chart" ref="echartAMap"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartAMap',
  data() {
    return {
      chartInstance: null,
      mapInstance: null,
      allData: null
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.init()
    this.mapInit()
    this.chartInstance.resize()
  },
  methods: {
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.echartAMap)
      const initOption = {
        // 加载 amap 组件
        amap: {
          // 3D模式，无论你使用的是1.x版本还是2.x版本，都建议开启此项以获得更好的渲染体验
          viewMode: '3D',
          // 高德地图支持的初始化地图配置
          // 高德地图初始中心经纬度
          center: [107.14487, 34.369315],
          // 高德地图初始缩放级别
          zoom: 8.15,
          zooms: [8, 20],
          // 是否开启resize
          resizeEnable: true,
          // 自定义地图样式主题
          mapStyle: 'amap://styles/light',
          // 移动过程中实时渲染 默认为true 如数据量较大 建议置为false
          renderOnMoving: true,
          // ECharts 图层的 zIndex 默认 2000
          // 从 v1.9.0 起 此配置项已被弃用 请使用 `echartsLayerInteractive` 代替
          // echartsLayerZIndex: 2019,
          // 设置 ECharts 图层是否可交互 默认为 true
          // 设置为 false 可实现高德地图自身图层交互
          // 此配置项从 v1.9.0 起开始支持
          echartsLayerInteractive: false,
          // 是否启用大数据模式 默认为 false
          // 此配置项从 v1.9.0 起开始支持
          largeMode: false
          // 说明：如果想要添加卫星、路网等图层
          // 暂时先不要使用layers配置，因为存在Bug
          // 建议使用amap.add的方式，使用方式参见最下方代码
        },
        series: [
          {
            type: 'effectScatter',
            rippleEffect: { scaleX: 5, scaleY: 5, brushType: 'stroke' },
            // 使用高德地图坐标系
            coordinateSystem: 'amap',
            // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [
              [120, 30, 8],
              [120.1, 30.2, 20]
            ],
            encode: {
              value: 2
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    mapInit() {
      const amapComponent = this.chartInstance.getModel().getComponent('amap')
      // 获取高德地图实例，使用高德地图自带的控件
      this.mapInstance = amapComponent.getAMap()
      let that = this
      new that.$AMap.DistrictSearch({
        extensions: 'all',
        subdistrict: 0
      }).search('宝鸡市', function(status, result) {
        // 外多边形坐标数组和内多边形坐标数组
        const outer = [
          new that.$AMap.LngLat(-360, 90, true),
          new that.$AMap.LngLat(-360, -90, true),
          new that.$AMap.LngLat(360, -90, true),
          new that.$AMap.LngLat(360, 90, true)
        ]
        const holes = result.districtList[0].boundaries
        const pathArray = [outer]
        pathArray.push.apply(pathArray, holes)
        const polygon = new that.$AMap.Polygon({
          pathL: pathArray,
          //线条颜色，使用16进制颜色代码赋值。默认值为#006600
          strokeColor: 'gray',
          strokeWeight: 4,
          //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
          strokeOpacity: 0.5,
          //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
          fillColor: '#68b9b6',
          //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
          fillOpacity: 0.9,
          //轮廓线样式，实线:solid，虚线:dashed
          strokeStyle: 'solid',
          /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在
                          ie9+浏览器有效 取值：
                          实线：[0,0,0]
                          虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
                          点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实
                          线和10个像素的空白 （如此反复）组成的虚线*/
          strokeDasharray: [10, 2, 10]
        })
        polygon.setPath(pathArray)
        that.mapInstance.add(polygon)
        /*   var polyline = new AMap.Polyline({
                     strokeColor: '#3366FF',   // 线颜色
                     strokeOpacity: 1,         // 线透明度
                     strokeWeight: 2,          // 线宽
                     strokeStyle: 'solid',     // 线样式
                     strokeDasharray: [10, 5], // 补充线样式
                     geodesic: false            // 绘制大地线
                 });
                    polyline.setPath(pathArray);
                    map.add(polyline);*/
      })
      // 添加控件 和高德地图API用法相同
      that.mapInstance.addControl(new this.$AMap.Scale())
      // that.mapInstance.addControl(new this.$AMap.ToolBar())
      // 添加图层
      const satelliteLayer = new this.$AMap.TileLayer.Satellite()
      // // const roadNetLayer = new this.$AMap.TileLayer.RoadNet()
      that.mapInstance.add([satelliteLayer])
      //  添加一个 Marker
      // amap.add(new AMap.Marker({
      //   position: [115, 35]
      // }));
      // 禁用 ECharts 图层交互，从而使高德地图图层可以点击交互
      amapComponent.setEChartsLayerInteractive(false)
    },
    async getData() {
      const { data: res } = await this.$http.get('/api/devices')
      if (res.meta.status !== 200) {
        return this.$message.error('获取散点数据失败')
      }
      this.allData = res.data
      this.updateChart()
    },
    updateChart() {
      const seriesArr = this.allData.map(v => {
        return {
          type: 'effectScatter',
          rippleEffect: { scale: 5, brushType: 'stroke' },
          coordinateSystem: 'amap',
          data: [
            {
              name: v.DeviceName,
              value: [v.Longitude, v.Latitude]
            }
          ]
        }
      })
      const dataOption = {
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
