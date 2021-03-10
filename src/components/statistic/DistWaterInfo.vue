<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>配水信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <div class="region">
          <template>
            用水类型：
            <el-select v-model="wellUseVal" placeholder="请选择" size="mini">
              <el-option
                v-for="item in wellUse"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
          <template>
            配水年份：
            <el-select v-model="yearVal" placeholder="请选择" size="mini">
              <el-option
                v-for="item in yearArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </div>
        <el-form label-width="100px">
          <el-form-item label="机井名称:" prop="roleName">
            <el-input
              size="mini"
              v-model.trim="searchBy.DeviceName"
              @input="handleInputKeyIn('DeviceName')"
            ></el-input>
          </el-form-item>
          <el-form-item label="机井编码:" prop="roleName">
            <el-input
              size="mini"
              v-model.trim="searchBy.DeviceCode"
              @input="handleInputKeyIn('DeviceCode')"
            ></el-input>
          </el-form-item>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click="handleInputSearch"
            >查询</el-button
          >
          <el-button
            type="info"
            size="mini"
            icon="el-icon-eleme"
            @click="searchReset"
            >重置</el-button
          >
        </el-form>
      </div>
      <div>
        <template>
          <v-simple-table>
            <thead>
              <tr>
                <th>
                  机井编码
                </th>
                <th>
                  机井名称
                </th>
                <th>
                  配水名称
                </th>
                <th>
                  配水年份
                </th>
                <th>
                  配水类型
                </th>
                <th>
                  每亩地分配水量
                </th>
                <th>
                  轮次
                </th>
                <th>
                  配水价格（元）
                </th>
                <th>
                  操作人员
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pageData" :key="item.Id">
                <td>{{ item.DeviceCode }}</td>
                <td>{{ item.DeviceName }}</td>
                <td>实际灌溉面积配水</td>
                <td>{{ item.DistYear }}</td>
                <td>{{ item.WellUse }}</td>
                <td>{{ item.DistRatio }}</td>
                <td>{{ item.DistRound }}</td>
                <td>{{ item.DistPrice }}</td>
                <td>
                  {{ item.UserId }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </template>
      </div>

      <el-pagination
        v-show="!filterOn"
        layout="prev, pager, next"
        :total="waterPlan.length"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </el-card></div
></template>

<script>
import pageNation from '../../utils/pagenation'
export default {
  data() {
    return {
      wellUse: null,
      wellUseVal: '灌溉',
      yearArr: [],
      yearVal: '',
      addPlanDialogVisible: false,
      editPlanDialogVisible: false,
      waterPlan: [],
      pageData: null,
      pageNum: 1,
      filterOn: false,
      searchBy: { DeviceCode: null, DeviceName: null },
      searchFlag: ''
    }
  },
  mounted() {
    this.getUsageType()
    this.getYear()
    this.getAgriWaterPlan()
  },
  methods: {
    getYear() {
      const currentYear = new Date().getFullYear()
      this.yearVal = currentYear
      for (let i = currentYear - 4; i < currentYear + 6; i++) {
        this.yearArr.push(i)
      }
    },
    async getUsageType() {
      const { data: res } = await this.$http.get('/api/wellUse')
      this.wellUse = res.data
    },
    async getAgriWaterPlan() {
      const { data: res } = await this.$http.get('/api/AgriUsagePlan')
      this.waterPlan = res.data
      this.getPageData()
    },
    getPageData() {
      this.pageData = pageNation(this.waterPlan, this.pageNum, 10).newArr
    },
    handlePageChange(pageNum) {
      this.pageNum = pageNum
      this.getPageData()
    },
    handleInputKeyIn(flag) {
      this.searchFlag = flag
      flag === 'DeviceName'
        ? (this.searchBy.DeviceCode = '')
        : (this.searchBy.DeviceName = '')
    },
    handleInputSearch() {
      this.pageData = this.waterPlan.filter(item => {
        return item[this.searchFlag] === this.searchBy[this.searchFlag]
      })
      this.filterOn = true
    },
    handleSelectSearch() {},
    searchReset() {
      this.wellUseVal = '灌溉'
      this.yearVal = new Date().getFullYear()
      this.searchBy.DeviceCode = ''
      this.searchBy.DeviceName = ''
      this.getPageData()
      this.filterOn = false
    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;

  justify-content: space-around;
  .region {
    .el-select {
      width: 120px;
    }
  }
  .el-form {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    .el-form-item {
      margin: 0;
      padding: 0;
      .el-input,
      .el-select {
        width: 120px;
      }
    }
    .el-button:first-of-type {
      margin-left: 15px;
    }
  }
}
</style>
