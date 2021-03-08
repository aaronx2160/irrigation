<template>
    <div class="com-container" @dblclick="revertMap">
        <div class="com-chart" ref="map_ref" id="chart"></div>
    </div>
</template>

<script>
import deCodeBuffer from '../../utils/decodeBuffer'
export default {
    name: 'Map',
    data() {
        return {
            chartInstance: null,
            allData: null,
            provinceData: [],
        }
    },
    // created() {
    //     this.$socket.registerCallback('mapData', this.getData)
    // },
    mounted() {
        this.init()
        this.getData()
        // this.$socket.send({
        //     action: 'getData',
        //     socketType: 'mapData',
        //     chartName: 'map',
        //     value: '',
        // })
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
        // this.$socket.unRegisterCallback('mapData')
    },
    methods: {
        async init() {
            this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
            let { data: res } = await this.$http.get('/api/map')
            if (res.meta.status !== 200) {
                return this.$message.error('获取地图数据失败')
            }
            const data = JSON.parse(res.data)
            this.$echarts.registerMap('china', data)

            const initOption = {
                title: {
                    text: '| 水井分布',
                    left: 20,
                    top: 20,
                },
                geo: {
                    type: 'map',
                    map: 'china',
                    top: '5%',
                    bottom: '5%',
                    itemStyle: {
                        areaColor: '#2e72bf',
                        borderColor: '#333',
                    },
                },
                legend: {
                    left: '5%',
                    bottom: '5%',
                    orient: 'vertical',
                },
            }
            this.chartInstance.setOption(initOption)
            this.chartInstance.on('click', async () => {
                const { data: res } = await this.$http.get('/api/map/shaanxi')
                if (res.meta.status !== 200) {
                    return this.$message.error('获取地图数据失败')
                }
                const mapData = deCodeBuffer(res.data)
                this.$echarts.registerMap('shanxi', mapData)
                const changeOption = { geo: { map: 'shanxi' } }
                this.chartInstance.setOption(changeOption)
            })
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
            // const legendArr = this.allData.map((v) => {
            //     return v.name
            // })
            const seriesArr = this.allData.map((v) => {
                return {
                    type: 'effectScatter',
                    rippleEffect: { scale: 5, brushType: 'stroke' },
                    // name: v.DeviceName,
                    data: [
                        {
                            name: v.DeviceName,
                            value: [v.Longitude, v.Latitude],
                        },
                    ],
                    coordinateSystem: 'geo',
                }
            })

            const dataOption = {
                series: seriesArr,
                // legend: {
                //     data: legendArr,
                // },
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6
            const adaptOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
                    },
                },
                legend: {
                    itemWidth: titleFontSize / 2,
                    itemHeight: titleFontSize / 2,
                    itemGap: titleFontSize / 2,
                    textStyle: {
                        fontSize: titleFontSize / 2,
                    },
                },
            }
            this.chartInstance.setOption(adaptOption)
            this.chartInstance.resize()
        },
        revertMap() {
            const revertOption = {
                geo: {
                    map: 'china',
                },
            }
            this.chartInstance.setOption(revertOption)
        },
    },
}
</script>

<style lang="less" scoped>
.com-container {
    height: 100%;
    width: 100%;

    .com-chart {
        height: 100%;
        width: 100%;
    }
}
</style>
