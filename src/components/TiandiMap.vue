<template>
    <div class="map-wrapper">
        <div id="mapDiv"></div>
        <div class="wellList">
            <el-menu default-active="1" :default-openeds="[1]">
                <el-submenu index="1">
                    <template slot="title">
                        <span>机井列表</span>
                    </template>
                    <el-menu-item
                        :index="well.Id"
                        v-for="well in wellList"
                        :key="well.Id"
                        @click="handleWellClick(well)"
                    >
                        <i class="el-icon-location"></i>{{ well.DeviceName }}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { TMapKey } from '../Keys'
import { GETLIVEDATALIST } from '../store/types'

let TMap = {}
let map = {}

export default {
    name: 'TiandiMMap',
    data() {
        return {
            wellList: [],
            center: { lng: 107.24526077541903, lat: 34.37034480939997 },
            zoom: 12,
            minZoom: 1,
            maxZoom: 18,
        }
    },
    created() {
        this.loadJScript()
        this.$store.dispatch(GETLIVEDATALIST)
        this.wellList = this.$store.getters.getWellList
    },
    methods: {
        loadJScript() {
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `http://api.tianditu.gov.cn/api?v=4.0&tk=${TMapKey}`
            script.onload = () => {
                this.init()
            }
            document.body.appendChild(script)
        },
        init() {
            TMap = window.T
            map = new TMap.Map('mapDiv')
            map.centerAndZoom(
                new TMap.LngLat(this.center.lng, this.center.lat),
                this.zoom
            ) // 初始化地图

            this.addLayer()
            this.addControl()
            this.addMarker(this.wellList)
            this.getLocation()
        },
        addLayer() {
            const imageURL =
                'http://t0.tianditu.gov.cn/img_w/wmts?' +
                'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
                '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' +
                TMapKey
            //创建自定义图层对象
            const lay = new TMap.TileLayer(imageURL, {
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
            })
            //将图层增加到地图上
            map.addLayer(lay)
        },
        addControl() {
            const ctrl = new TMap.Control.MapType()
            //添加控件
            map.addControl(ctrl)
        },
        addMarker(wellList) {
            if (!wellList) return
            //get markers images
            const wellOkUrl = require('../assets/wellOk.png')
            const wellError = require('../assets/warning.gif')
            let iconUrl
            for (let i = 0; i < wellList.length; i++) {
                if (wellList[i].status === 1) {
                    iconUrl = wellOkUrl
                } else {
                    iconUrl = wellError
                    // this.playWarning()
                }
                const icon = new TMap.Icon({
                    iconUrl: iconUrl,
                    iconSize: new TMap.Point(25, 25),
                    iconAnchor: new TMap.Point(30, 30),
                })
                const marker = new TMap.Marker(
                    new TMap.LngLat(
                        wellList[i].Longitude,
                        wellList[i].Latitude
                    ),
                    { icon: icon }
                )

                const infoWin = new TMap.InfoWindow()
                const that = this
                let sContent = `
<div style="border-radius: 10px; background: #ffffff; width: 450px;" >
<h1 style="color: white; background:#53b09a; margin: 0; padding: 5px;">${
                    wellList[i].DeviceName + '井详细信息'
                }</h1>
<table border="1px" style="border-collapse:collapse; text-align: center;" id="infoWin">
<tbody>
<tr>
<th style="background: #cccccc;">机井设备名称：</th>
<td>${wellList[i].DeviceName}
</td>
<th style="background: #cccccc;">采集时间:</th>
<td>${wellList[i].CollectTime}
</td>
</tr>
<tr>
<th style="background: #cccccc;">当前用水量(m³)：</th><td>太公庙三号井</td><th style="background: #cccccc;">剩余水量(m³)：</th><td>${
                    wellList[i].RemainWater
                }</td>
</tr>
<tr>
<th style="background: #cccccc;">网络状态：</th><td>${
                    wellList[i].NetState
                }</td><th style="background: #cccccc;">上卡状态：</th><td>${
                    wellList[i].CardState
                }</td>
</tr>
<tr>
<th style="background: #cccccc;">设备版本：</th><td>${
                    wellList[i].DeviceModel
                }</td><th style="background: #cccccc;">报警状态：</th><td>${
                    wellList[i].AlarmState
                }</td>
</tr>
<tr>
<th style="background: #cccccc;">箱门状态：</th><td>${
                    wellList[i].DoorState
                }</td><th style="background: #cccccc;">水泵状态：</th><td>${
                    wellList[i].PumpState
                }</td>
</tr>
<tr>
<th style="background: #cccccc;">安装前现场照片：</th><td><a href="">预览</a></td><th style="background: #cccccc;">安装后现场照片：</th><td><a href="">预览</a></td>
</tr>
</tbody>
</table>
</div>`
                infoWin.setContent(sContent)
                marker.addEventListener('click', function () {
                    that.center.lng = wellList[i].Longitude
                    that.center.lat = wellList[i].Latitude + 0.0001
                    map.centerAndZoom(that.center, 18)
                    marker.openInfoWindow(infoWin)
                })
                //向地图上添加标注
                map.addOverLay(marker)
            }
        },
        getLocation() {
            const lo = new TMap.Geolocation()
            const fn = function (e) {
                if (this.getStatus() == 0) {
                    map.centerAndZoom(e.lnglat, 15)
                    console.log(
                        '获取定位坐标：' + e.lnglat.lat + ',' + e.lnglat.lng
                    )
                    const marker = new TMap.Marker(e.lnglat)
                    map.addOverLay(marker)
                }
                if (this.getStatus() == 1) {
                    map.centerAndZoom(e.lnglat, e.level)
                    console.log(
                        '获取定位坐标：' + e.lnglat.lat + ',' + e.lnglat.lng
                    )
                    const marker = new TMap.Marker(e.lnglat)
                    map.addOverLay(marker)
                }
            }
            lo.getCurrentPosition(fn)
        },
        handleWellClick(well) {
            this.center.lng = well.Longitude
            this.center.lat = well.Latitude
            map.centerAndZoom(
                new TMap.LngLat(this.center.lng, this.center.lat),
                18
            )
        },
    },
}
</script>

<style lang="less" scoped>
.map-wrapper {
    height: inherit;
    width: 100%;
    display: flex;
    #mapDiv {
        height: 100%;
        width: 85%;
    }
    .wellList {
        width: 15%;
    }
}

.el-menu-item {
    padding: 0 0 0 15px !important;
    margin: 0 !important;
}

.tdt-marker-icon {
    height: 50px;
}
#bgMusic {
    z-index: 9999;
}
</style>
