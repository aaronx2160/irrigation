<template>
  <div class="wrapper">
    <el-form class="filter-header" :model="filterForm" label-width="auto">
      <el-form-item prop="DeviceName" label="机井名称：">
        <el-select
          size="mini"
          v-model="filterForm.DeviceCode"
          @change="getData"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.DeviceCode"
            :value="item.DeviceCode"
            :label="item.DeviceName"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--        <el-form-item prop="villageName" label="乡村：">-->
      <!--          <el-select size="mini" v-model="filterForm.villageName">-->
      <!--            <el-option></el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
    </el-form>
    <div class="chart" ref="waterUsage_bar"></div>
  </div>
</template>

<script>
export default {
  name: 'WaterUsageBarChart',
  mounted() {
    this.deviceList = this.$store.getters.getWellList
    this.init()
  },
  data() {
    return {
      deviceList: [],
      areaList: [],
      filterForm: {
        DeviceCode: '',
        villageName: '',
      },
      chartInstance: null,
      allData: null,
      currentMonth: 0,
      monthArr: [],
    }
  },
  methods: {
    init() {
      this.chartInstance = new this.$echarts.init(this.$refs.waterUsage_bar)
      this.currentMonth = new Date().getMonth()
      for (let i = 0; i <= this.currentMonth; i++) {
        this.monthArr.push(i + 1 + '月')
      }
      const initOption = {
        yAxis: { type: 'value' },
        xAxis: { type: 'category', data: this.monthArr },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top',
            },
            itemStyle: {
              color: '#019F89',
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
      this.getData()
    },
    async getData() {
      if (this.filterForm.DeviceCode !== '') {
        const { data: res } = await this.$http.get(
          '/api/rptusewaterdetail/' + this.filterForm.DeviceCode
        )
        if (res.meta.status !== 200) {
          this.$message.error('获取机井用水信息失败')
        } else {
          this.allData = res.data
          this.setChartData()
        }
      }
    },
    setChartData() {
      const dataArr = new Array(this.currentMonth + 1).fill(0)
      for (let i = 0; i < this.allData.length; i++) {
        dataArr[this.allData[i]['InMonth'] - 1] += this.allData[i]['UseWater']
      }
      const dataOption = {
        series: [
          {
            data: dataArr,
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  .filter-header {
    display: flex;
    .el-form-item {
    }
  }
  .chart {
    height: 300px;
    width: 100%;
  }
}
</style>
