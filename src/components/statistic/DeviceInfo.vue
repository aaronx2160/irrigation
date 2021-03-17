<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>机井基本信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-form label-width="100px">
          <el-form-item label="机井名称:" prop="roleName">
            <el-input
              v-model="searchBy.DeviceName"
              size="mini"
              @input="handleSearchInput('DeviceName')"
            ></el-input>
          </el-form-item>
          <el-form-item label="机井编码:" prop="roleName">
            <el-input
              v-model="searchBy.DeviceCode"
              size="mini"
              @input="handleSearchInput('DeviceCode')"
            ></el-input>
          </el-form-item>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click="handleSearch"
            :disabled="this.$store.getters.getDisabled"
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
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    机井编码
                  </th>
                  <th class="text-left">
                    机井名称
                  </th>
                  <th class="text-left">
                    安装地点
                  </th>
                  <th class="text-left">
                    所属行政区域
                  </th>
                  <th class="text-left">
                    所属水管区域
                  </th>
                  <th class="text-left">
                    设备型号
                  </th>
                  <th class="text-left">
                    安装前照片
                  </th>
                  <th class="text-left">
                    安装后照片
                  </th>
                  <th class="text-left">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in currentPageData" :key="item.Id">
                  <td>{{ item.DeviceCode }}</td>
                  <td>{{ item.DeviceName }}</td>
                  <td>{{ item.InstallAddress }}</td>
                  <td>{{ item.DeviceAreaCode }}</td>
                  <td>{{ item.DeviceWaterAreaCode }}</td>
                  <td>{{ item.DeviceModel }}</td>
                  <td>{{ item.PhotoBefore }}</td>
                  <td>{{ item.PhotoAfter }}</td>
                  <td>
                    <el-tooltip
                      class="item"
                      effect="light"
                      content="详细信息"
                      placement="right"
                    >
                      <el-button
                        circle
                        type="success"
                        size="mini"
                        icon="el-icon-s-data"
                        @click="showWellDetail(item.Id)"
                      ></el-button>
                    </el-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
        <el-pagination
          v-if="!this.filterOn"
          layout="prev, pager, next"
          :total="wellList.length"
          :page-size="scale"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </el-card>
    <v-dialog v-model="wellDetailDialogVisible" width="60%">
      <v-card>
        <v-simple-table dense class="well-detail-table">
          <tr>
            <th colspan="4" id="thead">
              {{ wellDetailData.DeviceName + '机井详情' }}
            </th>
          </tr>
          <tr>
            <th>所属水管区域：</th>
            <td>成仓区水利局</td>
            <th>所属行政区域：</th>
            <td>宁王村</td>
          </tr>
          <tr>
            <th>机井水管码：</th>
            <td>{{ wellDetailData.DeviceWaterAreaCode }}</td>
            <th>机井行政码：</th>
            <td>{{ wellDetailData.DeviceAreaCode }}</td>
          </tr>
          <tr>
            <th>设备编码：</th>
            <td>{{ wellDetailData.DeviceCode }}</td>
            <th>机井号牌：</th>
            <td>{{ wellDetailData.DevicePlate }}</td>
          </tr>
          <tr>
            <th>设备名称：</th>
            <td>{{ wellDetailData.DeviceName }}</td>
            <th>管道口径：</th>
            <td>{{ wellDetailData.PipeDiameter }}</td>
          </tr>
          <tr>
            <th>设备型号：</th>
            <td>{{ wellDetailData.DeviceModel }}</td>
            <th>井管内径(mm)：</th>
            <td>{{ wellDetailData.WellDiameter }}</td>
          </tr>
          <tr>
            <th>设备号：</th>
            <td>{{ wellDetailData.DeviceCode }}</td>
            <th>泵管材质：</th>
            <td>{{ wellDetailData.PumpMaterial }}</td>
          </tr>
          <tr>
            <th>DTU号码：</th>
            <td>{{ wellDetailData.DTUNo }}</td>
            <th>成井时间：</th>
            <td>{{ wellDetailData.MakeTime }}</td>
          </tr>
          <tr>
            <th>手机卡号：</th>
            <td>{{ wellDetailData.OwnerTelphone }}</td>
            <th>井深(m)：</th>
            <td>{{ wellDetailData.WellDepth }}</td>
          </tr>
          <tr>
            <th>手机卡运营商：</th>
            <td>{{ wellDetailData.SimOperator }}</td>
            <th>地下水埋深(m)：</th>
            <td>{{ wellDetailData.GroundWaterDepth }}</td>
          </tr>
          <tr>
            <th>取水类型：</th>
            <td>{{ wellDetailData.UseWaterType }}</td>
            <th>水泵型号：</th>
            <td></td>
          </tr>
          <tr>
            <th>纬度：</th>
            <td>{{ wellDetailData.Latitude }}</td>
            <th>水泵额定扬程(m)：</th>
            <td></td>
          </tr>
          <tr>
            <th>经度：</th>
            <td>{{ wellDetailData.Longitude }}</td>
            <th>水泵额定流量(m³)：</th>
            <td>{{ wellDetailData.RatedFlow }}</td>
          </tr>
          <tr>
            <th>安装时间：</th>
            <td>{{ wellDetailData.InstallTime }}</td>
            <th>水泵额定功率(KW)：</th>
            <td>{{ wellDetailData.RatedPower }}</td>
          </tr>
          <tr>
            <th>应用状况：</th>
            <td>{{ wellDetailData.ApplyStatus }}</td>
            <th>水井用途分类：</th>
            <td>{{ wellDetailData.WellUse }}</td>
          </tr>
          <tr>
            <th>灌溉模式：</th>
            <td>{{ wellDetailData.IrrigationMode }}</td>
            <th>控制面积(亩)：</th>
            <td>{{ wellDetailData.KZArea }}</td>
          </tr>
          <tr>
            <th>实际灌溉面积(亩)：</th>
            <td>{{ wellDetailData.SJArea }}</td>
            <th>实际供水人口：</th>
            <td>{{ wellDetailData.SJSupplyWaterPeople }}</td>
          </tr>
          <tr>
            <th>是否办理取水许可证：</th>
            <td>{{ wellDetailData.IsHandleDocument }}</td>
            <th>取水许可证编号：</th>
            <td>{{ wellDetailData.WaterIntakeNo }}</td>
          </tr>
          <tr>
            <th>年许可取水(m³)：</th>
            <td>{{ wellDetailData.YearWaterSum }}</td>
            <th>是否办理工业取水手续：</th>
            <td>{{ wellDetailData.IsIndustryProcedure }}</td>
          </tr>
          <tr>
            <th>年核定水量(m³)：</th>
            <td>{{ wellDetailData.IndustryApprovedWater }}</td>
            <th>生产规模(万元)：</th>
            <td>{{ wellDetailData.IndustryProductionCapacity }}</td>
          </tr>
          <tr>
            <th>工业区面积(亩)：</th>
            <td>{{ wellDetailData.IndustryArea }}</td>
            <th>是否安装水量计量设施：</th>
            <td>{{ wellDetailData.WaterMeterMeasurement }}</td>
          </tr>
          <tr>
            <th>水量计量设施类型：</th>
            <td>{{ wellDetailData.WaterMeterMeasurementType }}</td>
            <th>水表型号：</th>
            <td>{{ wellDetailData.MeterType }}</td>
          </tr>
          <tr>
            <th>水表口径(mm)：</th>
            <td>{{ wellDetailData.PipeDiameter }}</td>
            <th>水表编号：</th>
            <td>{{ wellDetailData.MeterSerialNo }}</td>
          </tr>
          <tr>
            <th>有无水表防护罩：</th>
            <td>{{ wellDetailData.MeterGuard }}</td>
            <th>所在地貌类型区：</th>
            <td>{{ wellDetailData.LandformType }}</td>
          </tr>
          <tr>
            <th>水资源区域：</th>
            <td>{{ wellDetailData.IrrigationMode }}</td>
            <th>所在灌区类型：</th>
            <td>{{ wellDetailData.IrrigationAreaType }}</td>
          </tr>
          <tr>
            <th>备注：</th>
            <td colspan="3">
              {{ wellDetailData.Note }}
            </td>
          </tr>
        </v-simple-table>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <el-button
            type="primary"
            size="small"
            @click="wellDetailDialogVisible = false"
          >
            确定
          </el-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div></template
>

<script>
import pageNation from '../../utils/pagenation'
import { GETDISABLED } from '@/store/types'
export default {
  data() {
    return {
      wellList: [],
      totalPage: 0,
      scale: 10,
      pageNum: 1,
      currentPageData: [],
      wellDetailDialogVisible: false,
      wellDetailData: { DeviceName: 'placeHolder' },
      searchBy: { DeviceName: null, DeviceCode: null },
      searchFlag: null,
      filterOn: false
    }
  },
  mounted() {
    this.wellList = this.$store.getters.getWellList
    this.handlePageChange(this.pageNum)
  },
  methods: {
    handlePageChange(pageNum) {
      const pageData = pageNation(this.wellList, pageNum, this.scale)
      this.totalPage = pageData.totalPage
      this.currentPageData = pageData.newArr
    },
    async showWellDetail(deviceId) {
      const { data: res } = await this.$http.get(
        '/api/deviceExpandInfo/' + deviceId
      )
      this.wellDetailData = res.data[0]
      this.wellDetailDialogVisible = true
    },
    handleSearchInput(flag) {
      this.searchFlag = flag
      flag === 'DeviceName'
        ? (this.searchBy.DeviceCode = '')
        : (this.searchBy.DeviceName = '')
    },
    handleSearch() {
      this.$store.dispatch(GETDISABLED)
      if (this.searchBy.DeviceCode === '' && this.searchBy.DeviceName === '')
        return
      this.filterOn = true
      let that = this
      this.currentPageData = this.wellList.filter(v => {
        return v[that.searchFlag] === that.searchBy[that.searchFlag].trim()
      })
    },
    searchReset() {
      this.filterOn = false
      this.searchBy.DeviceName = ''
      this.searchBy.DeviceCode = ''
      this.handlePageChange(1)
    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  align-items: center;
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
.well-detail-table {
  border: 0.5px solid #ccc;
  width: 100%;
  tr {
    #thead {
      text-align: center;
      padding: 10px 0;
      color: #ffffff;
      background: #469d8a;
    }
    th {
      text-align: right;
      border: 0.5px solid #ccc;
    }
    td {
      border: 0.5px solid #ccc;
      text-align: center;
    }
  }
}
</style>
