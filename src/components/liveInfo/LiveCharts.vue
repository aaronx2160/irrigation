<template>
    <div class="screen-container" :class="{ fullscreen: fullScreenStatus }">
        <header class="screen-header">
            <div>
                <img src="../../assets/images/header_border_light.png" alt="" />
            </div>
            <h2 class="title">实时监控系统</h2>
            <div class="title-right">
                <span class="datetime">{{ timeNow }}</span>
                <span
                    v-if="fullScreenStatus === false"
                    class="iconfont icon-full-screen"
                    @click="handleFfullScreenClick(true)"
                ></span>
                <span
                    v-else
                    class="iconfont icon-pingmusuoxiao"
                    @click="handleFfullScreenClick(false)"
                ></span>
            </div>
        </header>
        <div class="screen-body">
            <el-row class="top">
                <el-col :span="7">
                    <div id="top-left">
                        <MonthlyUsageChart
                            ref="MonthlyUsageChart"
                        ></MonthlyUsageChart>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div id="top-middle">
                        <EchartAMap ref="MapChart"></EchartAMap>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div id="top-right">
                        <OnOffLineChart ref="OnOffLineChart"></OnOffLineChart>
                    </div>
                </el-col>
            </el-row>
            <el-row class="bottom">
                <el-col :span="24">
                    <div id="bottom-middle">
                        <!-- 地区销量排行图表 -->
                        <WellWaterUsageRankChart
                            ref="rank"
                        ></WellWaterUsageRankChart>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import WellWaterUsageRankChart from '../charts/WellWaterUsageRankChart'
import OnOffLineChart from '../charts/OnOffLineChart'
import MonthlyUsageChart from '../charts/MonthlyUsageChart'
import EchartAMap from '../charts/EchartAMap'
import getYMDHMS from '../../utils/time'
export default {
    data() {
        return {
            timeNow: null,
            getTimeNowId: null,
            // 定义每一个图表的全屏状态
            fullScreenStatus: false,
        }
    },
    mounted() {
        this.getTime()
    },
    destroyed() {
        clearInterval(this.getTimeNowId)
    },
    methods: {
        changeSize(chartName) {
            this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
            this.$refs[chartName].screenAdapter()
            this.$nextTick(() => {
                this.$refs[chartName].screenAdapter()
            })
        },
        getTime() {
            if (this.getTimeNowId) {
                clearInterval(this.getTimeNowId)
            }
            this.getTimeNowId = setInterval(() => {
                this.timeNow = getYMDHMS(Date.now())
            }, 1000)
        },
        handleFfullScreenClick(status) {
            this.fullScreenStatus = status
        },
    },
    components: {
        WellWaterUsageRankChart,
        OnOffLineChart,
        MonthlyUsageChart,
        EchartAMap,
    },
}
</script>
<style lang="less" scoped>
// 全屏样式的定义

.fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    z-index: 100;
}

.screen-container {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/screenBg.png');
    margin: 0;
    padding: 0;
    color: #fff;
    box-sizing: border-box;
}
.screen-header {
    width: 100%;
    height: 9.7%;
    font-size: 20px;
    position: relative;
    > div {
        img {
            width: 100%;
        }
    }
    .title {
        position: absolute;
        left: 50%;
        top: 50%;
        /*font-size: 20px;*/
        transform: translate(-50%, -50%);
    }
    .title-right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 1%;
        top: 50%;
        transform: translateY(-80%);
        span {
            cursor: pointer;
            margin-right: 10px;
        }
        background: radial-gradient(
            circle,
            rgba(105, 212, 159, 0.5),
            rgba(91, 202, 224, 0.5)
        );
        border-radius: 5px;
    }
    .qiehuan {
        width: 28px;
        height: 21px;
        cursor: pointer;
    }
    .datetime {
        font-size: 15px;
        margin-left: 10px;
    }
    .logo {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-80%);
        img {
            height: 35px;
            width: 128px;
        }
    }
}
.screen-body {
    width: 100%;
    height: 90.3%;
    .top {
        height: 60%;
        /*margin-left: 1.5%;*/
        display: flex;
        justify-content: space-between;
        .el-col {
            margin: 0 5px 5px 5px;
            animation: move 3s ease 0s infinite alternate;
            background: radial-gradient(
                circle,
                rgba(105, 212, 159, 0.5),
                rgba(91, 202, 224, 0.5)
            );
            border-radius: 15px;
            div {
                padding: 5px;
            }
            height: 100%;
            #top-left {
                height: 100%;
                width: 100%;
            }
            #top-middle {
                height: 100%;
                width: 100%;
            }
            #top-right {
                height: 100%;
                width: 100%;
            }
        }
    }
    .bottom {
        height: 38%;
        margin: 10px;

        .el-col {
            margin: 0 5px 5px 0;
            border-radius: 15px;
            animation: move 3s ease 0s infinite alternate;
            background: radial-gradient(
                circle,
                rgba(105, 212, 159, 0.5),
                rgba(91, 202, 224, 0.5)
            );
            div {
                padding: 5px;
            }
            height: 100%;
            #bottom-middle {
                height: 100%;
                width: 100%;
            }
        }
    }
}
.resize {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
@keyframes move {
    0% {
        box-shadow: 1px 1px 5px dodgerblue;
    }
    100% {
        box-shadow: 1px 1px 5px greenyellow;
    }
}
</style>
