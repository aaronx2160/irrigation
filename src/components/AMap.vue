<template>
    <div class="map_container">
        <div id="AMap" ref="map_ref"></div>
    </div>
</template>

<script>
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
        }
    },
    created() {
        this.wellList = this.$store.getters.getLiveData
    },
    mounted() {
        this.init()
        this.geoLocate()
        this.addMarker()
        console.log(this.markers)
        this.markers.forEach((v) => {
            v.on('click', this.openInfoWindow)
        })
    },
    destroyed() {
        this.markers.forEach((v) => {
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
                resizeEnable: true,
            }
            this.mapInstance = new this.$AMap.Map('AMap', initOption)
        },
        geoLocate() {
            let that = this
            this.$AMap.plugin('AMap.Geolocation', function () {
                const geolocation = new that.$AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000, //超过10秒后停止定位，默认：5s
                    buttonPosition: 'RB', //定位按钮的停靠位置
                    buttonOffset: new that.$AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    // zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
                })
                that.mapInstance.addControl(geolocation)
                geolocation.getCurrentPosition(function (status, result) {
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
                imageSize: new that.$AMap.Size(30, 38), // 根据所设置的大小拉伸或压缩图片
            })
            // let iconError = new that.$AMap.Icon({
            //     size: new that.$AMap.Size(30, 38), // 图标尺寸
            //     image: require('../assets/wellOk.png'),
            //     imageSize: new that.$AMap.Size(30, 38), // 根据所设置的大小拉伸或压缩图片
            // })
            for (let i = 0; i < that.wellList.length; i++) {
                let marker = new that.$AMap.Marker({
                    position: [
                        that.wellList[i].Longitude,
                        that.wellList[i].Latitude,
                    ],
                    offset: new that.$AMap.Pixel(-10, -10),
                    icon: iconOk, // 添加 Icon 实例
                    title: '自定义图标',
                    zoom: 13,
                    extData: that.wellList[i],
                })
                that.mapInstance.add(marker)
                that.markers.push(marker)
            }

            that.$AMap.plugin(['AMap.MarkerClusterer'], function () {
                that.cluster = new that.$AMap.MarkerClusterer(
                    that.mapInstance,
                    that.markers,
                    {
                        gridSize: 80,
                    }
                )
            })
        },
        openInfoWindow(v) {
            const wellData = v.target.Ce.extData
            let that = this
            const info = `
<div style="border-radius: 10px; background: #ffffff; width: 450px;" >
<h1 style="color: white; background:#53b09a; margin: 0; padding: 5px;">${
                wellData.DeviceName + '详细信息'
            }</h1>
<table border="1px" style="border-collapse:collapse; text-align: center;" id="infoWin">
<tbody>
<tr>
<th style="background: #cccccc;">机井设备名称：</th>
<td>${wellData.DeviceName}
</td>
<th style="background: #cccccc;">采集时间:</th>
<td>${wellData.CollectTime}
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
                wellData.NetState
            }</td><th style="background: #cccccc;">上卡状态：</th><td>${
                wellData.CardState
            }</td>
</tr>
<tr>
<th style="background: #cccccc;">设备版本：</th><td>${
                wellData.DeviceModel
            }</td><th style="background: #cccccc;">报警状态：</th><td>${
                wellData.AlarmState
            }</td>
</tr>
<tr>
<th style="background: #cccccc;">箱门状态：</th><td>${
                wellData.DoorState
            }</td><th style="background: #cccccc;">水泵状态：</th><td>${
                wellData.PumpState
            }</td>
</tr>
<tr>
<th style="background: #cccccc;">安装前现场照片：</th><td><a href="">预览</a></td><th style="background: #cccccc;">安装后现场照片：</th><td><a href="">预览</a></td>
</tr>
</tbody>
</table>
</div>`

            const infoWindow = new that.$AMap.InfoWindow({
                content: info, //使用默认信息窗体框样式，显示信息内容
            })

            infoWindow.open(that.mapInstance, [
                wellData.Longitude,
                wellData.Latitude,
            ])
            that.mapInstance.setCenter([wellData.Longitude, wellData.Latitude])
        },
    },
}
</script>

<style lang="less" scoped>
.map_container {
    height: 100%;
    width: 100%;
    #AMap {
        height: 100%;
        width: 100%;
    }
}
</style>
