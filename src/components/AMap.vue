<template>
  <div class="map_container">
    <div id="AMap" ref="map_ref"></div>
    <div class="device_list">
      <v-card class="mx-auto card" max-width="300" tile>
        <v-list dense class="list">
          <v-subheader class="list-header">
            <h6>机井列表</h6>
            <span class="iconfont icon-left" @click="handlePage(-1)"></span>
            <span class="iconfont icon-right" @click="handlePage(1)"></span>
          </v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              class="list-item"
              v-for="item in pageData"
              :key="item.Id"
              @click="handleDeviceClick(item)"
            >
              <v-list-item-title v-text="item.DeviceName"></v-list-item-title>
              <el-tooltip
                class="item"
                effect="light"
                content="水泵开启"
                placement="top-start"
              >
                <span
                  v-show="item.PumpState === 1"
                  class="iconfont icon-kaiqi"
                  style="color: #67c23a;"
                ></span>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="水泵关闭"
                placement="top-start"
              >
                <span
                  v-show="item.PumpState === 0"
                  class="iconfont icon-guanbi"
                  style="color: #f56c6c;"
                ></span>
              </el-tooltip>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import pageNation from '@/utils/pagenation'
export default {
  name: 'AMap',
  data() {
    return {
      mapInstance: null,
      currentPosition: null,
      center: [0, 0],
      zoom: 12,
      wellList: null,
      markers: [],
      cluster: [],
      selectedItem: 1,
      pageData: [],
      pageNum: 1
    }
  },
  created() {
    this.wellList = this.$store.getters.getLiveData
  },
  mounted() {
    this.init()
    this.handlePage(0)
    this.geoLocate()
    this.addMarker()
    this.markers.forEach(v => {
      v.on('click', this.openInfoWindow)
    })
    let td = document.getElementById('preview')
    console.log(td)
  },
  destroyed() {
    this.markers.forEach(v => {
      v.off('click', this.openInfoWindow(v))
    })
  },
  methods: {
    init() {
      // const satellite = new this.$AMap.TileLayer.Satellite()

      const initOption = {
        zoom: this.zoom, //级别
        // layers: [satellite],
        center: this.center, //中心点坐标
        viewMode: '3D', //使用3D视图
        resizeEnable: true
      }
      this.mapInstance = new this.$AMap.Map('AMap', initOption)
    },
    geoLocate() {
      let that = this
      this.$AMap.plugin('AMap.Geolocation', function() {
        const geolocation = new that.$AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new that.$AMap.Pixel(10, 20) //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          // zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        })
        that.mapInstance.addControl(geolocation)
        geolocation.getCurrentPosition(function(status, result) {
          if (status === 'complete') {
            that.currentPosition = result
            that.center = [result.position.lng, result.position.lat]
            that.mapInstance.setZoom(11)
          } else {
            console.log('err:' + JSON.stringify(result))
          }
        })
      })
      this.currentPosition = that.currentPosition
    },
    addMarker() {
      let that = this
      let iconOk = new that.$AMap.Icon({
        size: new that.$AMap.Size(30, 38), // 图标尺寸
        image: require('../assets/wellOk.png'),
        imageSize: new that.$AMap.Size(30, 38) // 根据所设置的大小拉伸或压缩图片
      })
      for (let i = 0; i < that.wellList.length; i++) {
        let marker = new that.$AMap.Marker({
          position: [that.wellList[i].Longitude, that.wellList[i].Latitude],
          offset: new that.$AMap.Pixel(-10, -10),
          icon: iconOk, // 添加 Icon 实例
          title: '自定义图标',
          zoom: 13,
          extData: that.wellList[i]
        })
        that.mapInstance.add(marker)
        that.markers.push(marker)
      }

      that.$AMap.plugin(['AMap.MarkerClusterer'], function() {
        that.cluster = new that.$AMap.MarkerClusterer(
          that.mapInstance,
          that.markers,
          {
            gridSize: 80
          }
        )
      })
    },
    openInfoWindow(v) {
      const wellData = v.target.Ce.extData
      let that = this
      const info = `
<div style="border-radius: 10px; background: #ffffff; width: 450px;" >
<h1 style="color: white; background:#53b09a; margin: 0; padding: 5px;">${wellData.DeviceName +
        '详细信息'}</h1>
<table border="1px" style="border-collapse:collapse; text-align: center;" id="infoWin">
<tbody>
<tr>
<th style="background: #cccccc;">机井设备名称：</th>
<td>${wellData.DeviceName}
</td>
<th style="background: #cccccc;">采集时间:</th>
<td>${wellData.CollectTime === null ? '无' : wellData.CollectTime}
</td>
</tr>
<tr>
<th style="background: #cccccc;">当前用水量(m³)：</th><td>${
        wellData.UseWater
      }</td><th style="background: #cccccc;">剩余水量(m³)：</th><td>${
        wellData.RemainWater
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">网络状态：</th><td>${
        wellData.NetState === 1 ? '在线' : '下线'
      }</td><th style="background: #cccccc;">上卡状态：</th><td>${
        wellData.CardState === 1 ? '上卡' : '下卡'
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">设备版本：</th><td>${
        wellData.DeviceModel
      }</td><th style="background: #cccccc;">报警状态：</th><td>${
        wellData.AlarmState === 1 ? '有报警' : '无报警'
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">箱门状态：</th><td>${
        wellData.DoorState === 1 ? '开启' : '关闭'
      }</td><th style="background: #cccccc;">水泵状态：</th><td>${
        wellData.PumpState === 1 ? '开启' : '关闭'
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">安装前现场照片：</th><td id="preview">预览</td><th style="background: #cccccc;">安装后现场照片：</th><td><a href="">预览</a></td>
</tr>
</tbody>
</table>
</div>`

      const infoWindow = new that.$AMap.InfoWindow({
        content: info //使用默认信息窗体框样式，显示信息内容
      })

      infoWindow.open(that.mapInstance, [wellData.Longitude, wellData.Latitude])
      that.mapInstance.setCenter([wellData.Longitude, wellData.Latitude])
    },
    openInfoWindow2(v) {
      const wellData = v
      let that = this
      const info = `
<div style="border-radius: 10px; background: #ffffff; width: 450px;" >
<h1 style="color: white; background:#53b09a; margin: 0; padding: 5px;">${wellData.DeviceName +
        '详细信息'}</h1>
<table border="1px" style="border-collapse:collapse; text-align: center;" id="infoWin">
<tbody>
<tr>
<th style="background: #cccccc;">机井设备名称：</th>
<td>${wellData.DeviceName}
</td>
<th style="background: #cccccc;">采集时间:</th>
<td>${wellData.CollectTime === null ? '无' : wellData.CollectTime}
</td>
</tr>
<tr>
<th style="background: #cccccc;">当前用水量(m³)：</th><td>${
        wellData.UseWater
      }</td><th style="background: #cccccc;">剩余水量(m³)：</th><td>${
        wellData.RemainWater
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">网络状态：</th><td>${
        wellData.NetState === 1 ? '在线' : '下线'
      }</td><th style="background: #cccccc;">上卡状态：</th><td>${
        wellData.CardState === 1 ? '上卡' : '下卡'
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">设备版本：</th><td>${
        wellData.DeviceModel
      }</td><th style="background: #cccccc;">报警状态：</th><td>${
        wellData.AlarmState === 1 ? '有报警' : '无报警'
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">箱门状态：</th><td>${
        wellData.DoorState === 1 ? '开启' : '关闭'
      }</td><th style="background: #cccccc;">水泵状态：</th><td>${
        wellData.PumpState === 1 ? '开启' : '关闭'
      }</td>
</tr>
<tr>
<th style="background: #cccccc;">安装前现场照片：</th><td><a href="">预览</a></td><th style="background: #cccccc;">安装后现场照片：</th><td><a href="">预览</a></td>
</tr>
</tbody>
</table>
</div>`

      const infoWindow = new that.$AMap.InfoWindow({
        content: info //使用默认信息窗体框样式，显示信息内容
      })

      infoWindow.open(that.mapInstance, [wellData.Longitude, wellData.Latitude])
      that.mapInstance.setCenter([wellData.Longitude, wellData.Latitude])
    },
    handlePage(flag) {
      const totalPage = Math.ceil(this.wellList.length / 10)
      this.pageNum += flag
      if (this.pageNum < 1) {
        this.pageNum = totalPage
      } else if (this.pageNum > totalPage) {
        this.pageNum = 1
      }
      this.pageData = pageNation(this.wellList, this.pageNum, 10).newArr
    },
    handleDeviceClick(device) {
      this.openInfoWindow2(device)
    },
    handlePreview() {
      console.log('hi')
    }
  }
}
</script>

<style lang="less" scoped>
.map_container {
  height: 100%;
  width: 100%;
  position: relative;
  #AMap {
    height: 100%;
    width: 100%;
  }
  .device_list {
    position: absolute;
    border: #fff 1px solid;
    border-radius: 5px;
    top: 2%;
    left: 87%;
    background-color: rgba(255, 255, 255, 0.3);
    width: 10%;
    .card {
      background-color: rgba(255, 255, 255, 0.3);
      .list {
        background-color: rgba(255, 255, 255, 0.3);
        .list-header {
          display: flex;
          justify-content: space-evenly;
          span {
            cursor: pointer;
          }
          span:active {
            color: #0077aa;
          }
        }
      }
    }
  }
}
</style>
