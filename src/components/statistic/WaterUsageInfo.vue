<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>机井用水信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="card-header">
        <template>
          <el-form label-width="auto" :model="formSearch" ref="formSearch">
            <el-form-item label="选择时间：" prop="dataArr">
              <el-date-picker
                v-model="formSearch.dataArr"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="机井名称:" prop="DeviceName">
              <el-input
                size="mini"
                v-model.trim="formSearch.DeviceName"
                @input="handleInputKeyIn('DeviceName')"
              ></el-input>
            </el-form-item>
            <el-form-item label="机井编码:" prop="DeviceCode">
              <el-input
                size="mini"
                v-model.trim="formSearch.DeviceCode"
                @input="handleInputKeyIn('DeviceCode')"
              ></el-input>
            </el-form-item>
            <el-form-item label="水卡卡号:" prop="CardCode">
              <el-input
                size="mini"
                v-model.trim="formSearch.CardCode"
                @input="handleInputKeyIn('CardCode')"
              ></el-input>
            </el-form-item>
            <el-button
              type="success"
              size="small"
              icon="el-icon-search"
              @click="handleSearch"
              :disabled="this.$store.getters.getDisabled"
              >查询
            </el-button>
            <el-button
              type="info"
              size="small"
              icon="el-icon-eleme"
              @click="handleReset"
              >重置
            </el-button>
          </el-form>
        </template>
      </div>
      <div class="chart">
        <h3>{{ '总用水量：' + totalUsage + '吨' }}</h3>

        <el-tag
          type="primary"
          size="mini"
          effect="dark"
          @click="UsageDialogVisible = true"
          ><i class="el-icon-data-analysis"></i>图表显示</el-tag
        >
        <el-tag size="mini">
          {{ searchDate }}
        </el-tag>
      </div>
      <v-simple-table>
        <thead>
          <tr>
            <th>机井编码</th>
            <th>机井名称</th>
            <th>水卡卡号</th>
            <th>已用水量（m³）</th>
            <th>剩余水量（m³）</th>
            <th>开泵时间</th>
            <th>关泵时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in useWaterInfo" :key="item.Id">
            <td>{{ item.DeviceCode }}</td>
            <td>{{ deviceNames[index] }}</td>
            <td>{{ item.CardCode }}</td>
            <td>{{ item.UseWater }}</td>
            <td>{{ item.RemainWater }}</td>
            <td>{{ item.OpenPumpTime }}</td>
            <td>{{ item.StopPumpTime }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="UsageDialogVisible" width="60%">
      <WaterUsageBarChart></WaterUsageBarChart>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="UsageDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import getDeviceNames from '../../utils/getDeviceNames'
import getYMDHMS from '../../utils/time'
import WaterUsageBarChart from '@/components/charts/WaterUsageBarChart'
import { GETDISABLED } from '@/store/types'
export default {
  components: { WaterUsageBarChart },
  data() {
    return {
      totalUsage: 0,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      formSearch: {
        searchType: '',
        dataArr: [],
        DeviceName: '',
        DeviceCode: '',
        CardCode: ''
      },
      useWaterInfo: [],
      deviceList: [],
      deviceNames: [],
      value: '',
      UsageDialogVisible: false,
      pagination: { total: 0, pageNum: 0 }
    }
  },
  comments: {
    WaterUsageBarChart
  },
  computed: {
    searchDate() {
      if (this.formSearch.dataArr.length === 0) {
        return (
          '时间区间：2021年1月-' +
          this.currentYear +
          '年' +
          this.currentMonth +
          '月'
        )
      } else {
        return (
          getYMDHMS(this.formSearch.dataArr[0]) +
          '-' +
          getYMDHMS(this.formSearch.dataArr[1])
        )
      }
    }
  },
  created() {
    this.deviceList = this.$store.getters.getWellList
  },
  mounted() {
    this.getUseWaterInfo()
  },
  methods: {
    async getUseWaterInfo() {
      const { data: res } = await this.$http.get('/api/useWaterInfo')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.useWaterInfo = res.data.userWaterDetailList
      this.pagination.total = res.data.item
      this.totalUsage = res.data.totalUsage
      this.exportJson.data = res.data.userWaterDetailList
      this.deviceNames = getDeviceNames(
        this.deviceList,
        this.useWaterInfo,
        'DeviceName'
      )
    },
    async handlePageChange(pageNum) {
      this.formSearch.pageNum = pageNum
      const { data: res } = await this.$http.post(
        '/api/useWaterInfoSearch',
        this.formSearch
      )
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.useWaterInfo = res.data
      this.exportJson.data = res.data
      this.deviceNames = getDeviceNames(
        this.deviceList,
        this.useWaterInfo,
        'DeviceName'
      )
    },
    handleInputKeyIn(key) {
      switch (key) {
        case 'DeviceCode':
          this.formSearch.CardCode = ''
          this.formSearch.DeviceName = ''
          this.formSearch.searchType = key
          break
        case 'CardCode':
          this.formSearch.DeviceCode = ''
          this.formSearch.DeviceName = ''
          this.formSearch.searchType = key
          break
        case 'DeviceName':
          this.formSearch.DeviceCode = ''
          this.formSearch.CardCode = ''
          this.formSearch.searchType = key
          break
      }
    },
    async handleSearch() {
      await this.$store.dispatch(GETDISABLED)
      //convert DeviceName back to search by DeviceCode
      this.pageNum = 1
      let deviceCodeArr = []
      if (this.formSearch.DeviceName !== '') {
        deviceCodeArr.push(this.formSearch)
        deviceCodeArr = getDeviceNames(
          this.deviceList,
          deviceCodeArr,
          'DeviceCode'
        )
        this.formSearch.searchType = 'DeviceCode'
        this.formSearch.DeviceCode = deviceCodeArr[0]
      }
      this.formSearch.pageNum = this.pagination.pageNum
      const { data: res } = await this.$http.post(
        '/api/useWaterInfoSearch',
        this.formSearch
      )
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res.data)
      this.useWaterInfo = res.data
      this.pagination.total = res.data[1].item
      this.totalUsage = res.data[1].totalUsage
      this.deviceNames = getDeviceNames(
        this.deviceList,
        this.useWaterInfo,
        'DeviceName'
      )
    },
    handleReset() {
      this.$refs.formSearch.resetFields()
      this.pagination.pageNum = 1
      this.getUseWaterInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.card-header {
  display: flex;
  .region {
    .el-select {
      width: 120px;
    }
  }
  .el-form {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    .el-form-item {
      margin: 0 0 0 15px;
      padding: 0;
      .el-input {
        width: 120px;
      }
      .el-select {
        width: 120px;
      }
    }
    .el-button:first-of-type {
      margin-left: 15px;
    }
  }
}
.chart {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
  h3 {
    margin-right: 15px;
  }
  .el-tag {
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
