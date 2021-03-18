<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实时监测</el-breadcrumb-item>
      <el-breadcrumb-item>实时数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div slot="header" class="card-header">
        <el-form label-width="90px" ref="search_form">
          <el-form-item label="筛选查看">
            <el-select
              v-model="catSelected"
              placeholder="请选择"
              size="mini"
              @change="handleCatChange"
            >
              <el-option
                v-for="option in selectCats"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="statusSelected"
              placeholder="请选择"
              size="mini"
              @change="handleStatusSelectChange"
            >
              <el-option
                v-for="option in status"
                :key="option[catSelected + 'Label']"
                :label="option[catSelected + 'Label']"
                :value="option.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机井编码:" prop="roleName">
            <el-input
              size="mini"
              v-model="searchBy.DeviceCode"
              @input="handleInputKeyIn('code')"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="机井名称:" prop="roleName">
            <el-input
              size="mini"
              v-model="searchBy.DeviceName"
              @input="handleInputKeyIn('name')"
              clearable
            ></el-input>
          </el-form-item>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click="handleInputSearch"
            :disabled="this.$store.getters.getDisabled"
            >查询</el-button
          >
          <el-button
            type="info"
            size="mini"
            icon="el-icon-eleme"
            @click="resetSearchForm"
            >重置</el-button
          >
        </el-form>
      </div>
      <div>
        <template>
          <v-simple-table>
            <thead>
              <tr>
                <th>机井编码</th>
                <th>机井名称</th>
                <th>卡号</th>
                <th>采集时间</th>
                <th>当前用水量(m³)</th>
                <th>剩余水量(m³)</th>
                <th>网络状态</th>
                <th>水泵状态</th>
                <th>上卡状态</th>
                <!--                                <th>A相电压</th>-->
                <!--                                <th>B相电压</th>-->
                <!--                                <th>C相电压</th>-->
                <!--                                <th>A相电流</th>-->
                <!--                                <th>B相电流</th>-->
                <!--                                <th>C相电流</th>-->
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentPageData" :key="item.Id">
                <td>{{ item.DeviceCode }}</td>
                <td>{{ item.DeviceName }}</td>
                <td>{{ item.CardCode }}</td>
                <td>{{ item.CollectTime }}</td>
                <td>{{ item.InstantFlow }}</td>
                <td>{{ item.RemainWater }}</td>
                <td>
                  <span
                    v-if="item.NetState === 1"
                    class="iconfont icon-zaixian1"
                    style="color: #409eff;"
                  ></span>
                  <span
                    v-else
                    class="iconfont icon-lixian3"
                    style="color: #f56c6c;"
                  ></span>
                </td>
                <td>
                  <span
                    v-if="item.PumpState === 1"
                    class="iconfont icon-shuibeng bounceText"
                    style="color: #409eff;"
                  ></span>
                  <span
                    v-else
                    class="iconfont icon-shuibeng"
                    style="color: #f56c6c;"
                  ></span>
                </td>
                <td :style="item.CardState === 1 ? 'color:green;' : ''">
                  <span
                    v-if="item.CardState === 1"
                    class="iconfont icon-kaiqi"
                    style="color: #409eff;"
                  ></span>
                  <span
                    v-else
                    class="iconfont icon-guanbi"
                    style="color: #f56c6c;"
                  ></span>
                </td>
                <!--                                <td>{{ item.APhaseVoltage }}</td>-->
                <!--                                <td>{{ item.BPhaseVoltage }}</td>-->
                <!--                                <td>{{ item.CPhaseVoltage }}</td>-->
                <!--                                <td>{{ item.APhaseCurrent }}</td>-->
                <!--                                <td>{{ item.BPhaseCurrent }}</td>-->
                <!--                                <td>{{ item.CPhaseCurrent }}</td>-->
                <td>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="详情"
                    placement="right"
                  >
                    <el-button
                      type="success"
                      icon="el-icon-s-data"
                      @click="handleMoreInfoDialogOPen(item)"
                      circle
                      size="mini"
                    ></el-button>
                  </el-tooltip>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </template>
        <el-pagination
          layout="prev, pager, next"
          :total="
            this.filterOn ? this.wellListFiltered.length : this.wellList.length
          "
          :page-size="scale"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </el-card>

    <div class="info-dialog-wrapper">
      <v-dialog
        v-model="wellDetailDialogOPen"
        :width="this.wellDetailDialogNavActive ? '50%' : '70%'"
        @close="handleWellDetailDialogClose"
        persistent
      >
        <v-card>
          <div class="dialog-menu">
            <h3
              class="dialog-menu-item"
              :class="{ 'item-over': wellDetailDialogNavActive }"
              @click="handleDetailDialogNavClick('detail')"
            >
              水井详情
            </h3>
            <h3
              class="dialog-menu-item"
              :class="{ 'item-over': !wellDetailDialogNavActive }"
              @click="handleDetailDialogNavClick('history')"
            >
              历史记录
            </h3>
          </div>
          <v-simple-table
            class="info-tbl"
            dense
            v-if="wellDetailDialogNavActive === true"
          >
            <tr class="thead">
              <th colspan="4"></th>
            </tr>

            <tbody>
              <tr>
                <th>机井编码：</th>
                <td>{{ wellDetailDialogData.DeviceCode }}</td>
                <th>机井名称：</th>
                <td>{{ wellDetailDialogData.DeviceName }}</td>
              </tr>
              <tr>
                <th>采集时间：</th>
                <td>
                  {{ wellDetailDialogData.CollectTime }}
                </td>
                <th>设备版本：</th>
                <td>
                  {{ wellDetailDialogData.DeviceVersion }}
                </td>
              </tr>
              <tr>
                <th>当前用水量(m³)：</th>
                <td>{{ wellDetailDialogData.UseWater }}</td>
                <th>累计用水量(m³)：</th>
                <td>{{ wellDetailDialogData.TotalWater }}</td>
              </tr>
              <tr>
                <th>当前用电量(度)：</th>
                <td>{{ wellDetailDialogData.UsePower }}</td>
                <th>累计用电量(度)：</th>
                <td>{{ wellDetailDialogData.TotalPower }}</td>
              </tr>
              <tr>
                <th>网络状态：</th>
                <td>
                  <span
                    v-if="wellDetailDialogData.NetState === 1"
                    class="iconfont icon-kaiqi"
                    style="color: #56bd78;"
                    >在线</span
                  >
                  <span
                    v-else
                    class="iconfont icon-guanbi"
                    style="color: #f56c6c;"
                    >离线</span
                  >
                </td>
                <th>报警状态：</th>
                <td>
                  <span
                    v-if="wellDetailDialogData.AlarmState === 0"
                    class="iconfont icon-kaiqi"
                    style="color: #56bd78;"
                    >无报警</span
                  >
                  <span
                    v-else
                    class="iconfont icon-guanbi"
                    style="color: #f56c6c;"
                    >有报警</span
                  >
                </td>
              </tr>
              <tr>
                <th>水泵状态：</th>
                <td>
                  <span
                    v-if="wellDetailDialogData.PumpState === 1"
                    class="iconfont icon-kaiqi"
                    style="color: #56bd78;"
                    >开启</span
                  >
                  <span
                    v-else
                    class="iconfont icon-guanbi"
                    style="color: #f56c6c;"
                    >关闭</span
                  >
                </td>
                <th>箱门状态：</th>
                <td>
                  <span
                    v-if="wellDetailDialogData.DoorState === 0"
                    class="iconfont icon-kaiqi"
                    style="color: #56bd78;"
                    >关闭</span
                  >
                  <span
                    v-else
                    class="iconfont icon-guanbi"
                    style="color: #f56c6c;"
                    >打开</span
                  >
                </td>
              </tr>
              <tr>
                <th>上卡状态：</th>
                <td>
                  <span
                    v-if="wellDetailDialogData.CardState === 1"
                    class="iconfont icon-kaiqi"
                    style="color: #56bd78;"
                    >上卡</span
                  >
                  <span
                    v-else
                    class="iconfont icon-guanbi"
                    style="color: #f56c6c;"
                    >下卡</span
                  >
                </td>
                <th>安装地点：</th>
                <td>
                  {{ wellDetailDialogData.InstallAddress }}
                </td>
              </tr>
              <tr>
                <th>A相电压：</th>
                <td>
                  {{ wellDetailDialogData.APhaseVoltage }}
                </td>
                <th>B相电压：</th>
                <td>
                  {{ wellDetailDialogData.BPhaseVoltage }}
                </td>
              </tr>
              <tr>
                <th>C相电压：</th>
                <td>
                  {{ wellDetailDialogData.CPhaseVoltage }}
                </td>
                <th>A相电流：</th>
                <td>
                  {{ wellDetailDialogData.APhaseCurrent }}
                </td>
              </tr>
              <tr>
                <th>B相电流：</th>
                <td>
                  {{ wellDetailDialogData.BPhaseCurrent }}
                </td>
                <th>C相电流：</th>
                <td>
                  {{ wellDetailDialogData.CPhaseCurrent }}
                </td>
              </tr>
              <tr>
                <th>A相功率：</th>
                <td>{{ wellDetailDialogData.APhasePower }}</td>
                <th>B相功率：</th>
                <td>{{ wellDetailDialogData.BPhasePower }}</td>
              </tr>
              <tr>
                <th>C相功率：</th>
                <td>{{ wellDetailDialogData.CPhasePower }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-simple-table v-else class="history-data-tbl" dense>
            <tr class="thead">
              <th :colspan="this.wellDetailDialogNavActive ? 4 : 6"></th>
            </tr>
            <tbody>
              <tr>
                <th>机井编码</th>
                <th>机井名称</th>
                <th>当前用水量</th>
                <th>剩余水量</th>
                <th>开泵时间</th>
                <th>关泵时间</th>
              </tr>
              <tr
                v-for="item in wellDetailDialogHistoryPageData"
                :key="item.Id"
              >
                <td>
                  {{ item.DeviceCode }}
                </td>
                <td>
                  {{ wellDetailDialogData.DeviceName }}
                </td>
                <td>
                  {{ item.UseWater }}
                </td>
                <td>
                  {{ item.RemainWater }}
                </td>
                <td>
                  {{ item.OpenPumpTime }}
                </td>
                <td>
                  {{ item.StopPumpTime }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <el-pagination
            v-if="!wellDetailDialogNavActive"
            layout="prev, pager, next"
            :total="wellDetailDialogWaterUseHistoryData.length"
            @current-change="handleWellDetailDialogHistoryPageChange"
          >
          </el-pagination>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#019f89"
              class="white--text"
              @click="handleWellDetailDialogClose"
            >
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div></template
>

<script>
import pageNation from '../../utils/pagenation'
import { GETDISABLED, GETLIVEDATALIST } from '@/store/types'

export default {
  name: 'liveData',
  data() {
    return {
      wellList: [],
      wellListFiltered: [],
      totalPage: 0,
      scale: 10,
      pageNum: 1,
      currentPageData: [],
      selectCats: [
        { label: '网络状态', value: 'NetState' },
        { label: '水泵状态', value: 'PumpState' },
        { label: '上卡状态', value: 'CardState' }
      ],
      catSelected: '',
      status: [
        {
          NetStateLabel: '在线',
          PumpStateLabel: '开启',
          CardStateLabel: '上卡',
          value: 1
        },
        {
          NetStateLabel: '离线',
          PumpStateLabel: '关闭',
          CardStateLabel: '下卡',
          value: 0
        }
      ],
      statusSelected: null,
      searchBy: { DeviceCode: '', DeviceName: '' },
      filterOn: false,
      wellDetailDialogOPen: false,
      wellDetailDialogData: {},
      wellDetailDialogNavActive: true,
      wellDetailDialogWaterUseHistoryData: null,
      wellDetailDialogHistoryPageData: null
    }
  },
  mounted() {
    this.$store.dispatch(GETLIVEDATALIST).then(() => {
      this.wellList = this.$store.getters.getLiveData
      this.handlePageChange(this.pageNum)
    })
  },
  methods: {
    handlePageChange(pageNum) {
      let arrToPagenate = this.filterOn ? this.wellListFiltered : this.wellList
      const pageData = pageNation(arrToPagenate, pageNum, this.scale)
      this.totalPage = pageData.totalPage
      this.currentPageData = pageData.newArr
    },
    handleCatChange() {
      this.statusSelected = null
    },
    handleStatusSelectChange() {
      let that = this
      const dataToFilter = this.wellList.slice(0)
      this.wellListFiltered = dataToFilter.filter(value => {
        return value[that.catSelected] === that.statusSelected
      })
      this.filterOn = true
      this.handlePageChange(1)
    },
    handleInputKeyIn(flag) {
      flag === 'code'
        ? (this.searchBy.DeviceName = '')
        : (this.searchBy.DeviceCode = '')
      if (
        this.searchBy.DeviceCode.trim() === '' &&
        this.searchBy.DeviceName.trim() === ''
      ) {
        this.filterOn = false
        this.handlePageChange(1)
      }
    },
    handleInputSearch() {
      this.$store.dispatch(GETDISABLED)
      if (
        this.searchBy.DeviceCode.trim() === '' &&
        this.searchBy.DeviceName.trim() === ''
      ) {
        return
      }

      let flag =
        this.searchBy.DeviceCode.trim() === '' ? 'DeviceName' : 'DeviceCode'
      const dataToFilter = this.wellList.slice(0)
      this.wellListFiltered = dataToFilter.filter(v => {
        return v[flag] === this.searchBy[flag]
      })
      this.filterOn = true
      this.handlePageChange(1)
    },
    resetSearchForm() {
      this.catSelected = null
      this.statusSelected = null
      this.searchBy.DeviceCode = ''
      this.searchBy.DeviceName = ''
      this.filterOn = false
      this.handlePageChange(1)
    },
    async handleMoreInfoDialogOPen(item) {
      this.wellDetailDialogOPen = true
      this.wellDetailDialogData = item
      const { data: res } = await this.$http.get(
        '/api/wellUseWater/' + item.DeviceCode
      )
      if (res.meta.status !== 200) {
        return this.$message.error('获取机井用水信息失败')
      } else {
        this.wellDetailDialogWaterUseHistoryData = res.data
      }
    },
    handleDetailDialogNavClick(index) {
      this.wellDetailDialogNavActive = index === 'detail'

      this.wellDetailDialogHistoryPageData = pageNation(
        this.wellDetailDialogWaterUseHistoryData,
        1,
        10
      ).newArr
    },
    handleWellDetailDialogHistoryPageChange(pageNum) {
      this.wellDetailDialogHistoryPageData = pageNation(
        this.wellDetailDialogWaterUseHistoryData,
        pageNum,
        10
      ).newArr
    },
    handleWellDetailDialogClose() {
      this.wellDetailDialogOPen = false
      this.wellDetailDialogNavActive = true
      this.wellDetailDialogHistoryPageData = null
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  .el-form-item {
    margin: 0;
    padding: 0;
    .el-select {
      width: 120px;
    }
    .el-input {
      width: 120px;
      margin-right: 10px;
    }
  }
  .el-button {
  }
}

.dialog-menu {
  text-align: center;
  display: flex;
  background: #019f89;
  box-sizing: border-box;

  .dialog-menu-item {
    padding: 10px 0;
    margin: 0;
    width: 50%;
    color: white;
    cursor: pointer;
  }

  .dialog-menu-item:first-child {
    border-right: 1px solid #ccc;
  }
}

.info-tbl {
  border-radius: 5px;
  width: 100%;
  border-collapse: collapse;
  /*margin: 5px auto;*/

  .thead {
    th {
      height: 10px;
      text-align: center;
      background: #16b399;
      color: #16b399;
      border-bottom: 1px solid #ccc;
    }
  }

  tbody {
    tr {
      th {
        height: 30px;
      }
    }
  }
}
.history-data-tbl {
  border-radius: 5px;
  width: 100%;
  border-collapse: collapse;
  /*margin: 5px auto;*/

  .thead {
    th {
      height: 10px;
      text-align: center;
      background: #16b399;
      color: #16b399;
      border-bottom: 1px solid #ccc;
    }
  }
}
.item-over {
  background-color: #16b399;
}
.bounceText {
  text-align: left;
  color: green;
  font-weight: bold;

  -webkit-animation: bounce 1.2s ease-out;
  -moz-animation: bounce 800ms ease-out;
  -o-animation: bounce 800ms ease-out;
  animation: bounce 1.2s;
  animation-iteration-count: infinite;
}

/* Webkit, Chrome and Safari */

@-webkit-keyframes bounce {
  0% {
    -webkit-transform: translateY(-100%);
  }
  5% {
    -webkit-transform: translateY(-100%);
  }
  15% {
    -webkit-transform: translateY(0);
    padding: 4px auto;
  }
  20% {
    -webkit-transform: translateY(-80%);
  }
  25% {
    -webkit-transform: translateY(0%);
    padding: 4px auto;
  }
  30% {
    -webkit-transform: translateY(-70%);
  }
  35% {
    -webkit-transform: translateY(0%);
    padding: 5px auto;
  }
  40% {
    -webkit-transform: translateY(-60%);
  }
  45% {
    -webkit-transform: translateY(0%);
    padding: 5px auto;
  }
  50% {
    -webkit-transform: translateY(-50%);
  }
  55% {
    -webkit-transform: translateY(0%);
    padding: 6px auto;
  }
  60% {
    -webkit-transform: translateY(-30%);
  }
  65% {
    -webkit-transform: translateY(0%);
    padding: 6px auto;
  }
  70% {
    -webkit-transform: translateY(-15%);
  }
  75% {
    -webkit-transform: translateY(0);
    padding: 8px auto;
  }
  80% {
    -webkit-transform: translateY(-10%);
  }
  85% {
    -webkit-transform: translateY(0);
    padding: 8px auto;
  }
  90% {
    -webkit-transform: translateY(-5%);
  }
  95% {
    -webkit-transform: translateY(0);
    padding: 10px;
  }
  100% {
    -webkit-transform: translateY(0);
    padding: 10px;
  }
}

/* Mozilla Firefox 15 below */
@-moz-keyframes bounce {
  0% {
    -moz-transform: translateY(-100%);
    opacity: 0;
  }
  5% {
    -moz-transform: translateY(-100%);
    opacity: 0;
  }
  15% {
    -moz-transform: translateY(0);
    padding-bottom: 5px;
  }
  30% {
    -moz-transform: translateY(-50%);
  }
  40% {
    -moz-transform: translateY(0%);
    padding-bottom: 6px;
  }
  50% {
    -moz-transform: translateY(-30%);
  }
  70% {
    -moz-transform: translateY(0%);
    padding-bottom: 7px;
  }
  80% {
    -moz-transform: translateY(-15%);
  }
  90% {
    -moz-transform: translateY(0%);
    padding-bottom: 8px;
  }
  95% {
    -moz-transform: translateY(-10%);
  }
  97% {
    -moz-transform: translateY(0%);
    padding-bottom: 9px;
  }
  99% {
    -moz-transform: translateY(-5%);
  }
  100% {
    -moz-transform: translateY(0);
    padding-bottom: 9px;
    opacity: 1;
  }
}

/* Opera 12.0 */
@-o-keyframes bounce {
  0% {
    -o-transform: translateY(-100%);
    opacity: 0;
  }
  5% {
    -o-transform: translateY(-100%);
    opacity: 0;
  }
  15% {
    -o-transform: translateY(0);
    padding-bottom: 5px;
  }
  30% {
    -o-transform: translateY(-50%);
  }
  40% {
    -o-transform: translateY(0%);
    padding-bottom: 6px;
  }
  50% {
    -o-transform: translateY(-30%);
  }
  70% {
    -o-transform: translateY(0%);
    padding-bottom: 7px;
  }
  80% {
    -o-transform: translateY(-15%);
  }
  90% {
    -o-transform: translateY(0%);
    padding-bottom: 8px;
  }
  95% {
    -o-transform: translateY(-10%);
  }
  97% {
    -o-transform: translateY(0%);
    padding-bottom: 9px;
  }
  99% {
    -o-transform: translateY(-5%);
  }
  100% {
    -o-transform: translateY(0);
    padding-bottom: 9px;
    opacity: 1;
  }
}

/* W3, Opera 12+, Firefox 16+ */
@keyframes bounce {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  5% {
    transform: translateY(-100%);
    opacity: 0;
  }
  15% {
    transform: translateY(0);
    padding-bottom: 5px;
  }
  30% {
    transform: translateY(-50%);
  }
  40% {
    transform: translateY(0%);
    padding-bottom: 6px;
  }
  50% {
    transform: translateY(-30%);
  }
  70% {
    transform: translateY(0%);
    padding-bottom: 7px;
  }
  80% {
    transform: translateY(-15%);
  }
  90% {
    transform: translateY(0%);
    padding-bottom: 8px;
  }
  95% {
    transform: translateY(-7%);
  }
  97% {
    transform: translateY(0%);
    padding-bottom: 9px;
  }
  99% {
    transform: translateY(-3%);
  }
  100% {
    transform: translateY(0);
    padding-bottom: 9px;
    opacity: 1;
  }
}
</style>
