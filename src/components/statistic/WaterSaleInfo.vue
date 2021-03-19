<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页 </el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>售水信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <template>
          <el-form label-width="auto">
            <el-form-item label="机井名称:" prop="roleName">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="水卡卡号:" prop="roleName">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="起始时间:">
              <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束时间:" size="mini">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="success" icon="el-icon-search" size="mini"
              >查询
            </el-button>
            <el-button type="info" icon="el-icon-eleme" size="mini"
              >重置
            </el-button>
          </el-form>
        </template>
      </div>
      <div>
        <v-simple-table class="table">
          <thead>
            <tr>
              <th>设备编码</th>
              <th>设备名称</th>
              <th>水卡卡号</th>
              <th>水卡类型</th>
              <th>水卡操作类型</th>
              <th>水卡操作记录</th>
              <!--              <th>所属行政区域</th>-->
              <!--              <th>所属水管区域</th>-->
              <th>操作员</th>
              <th>操作时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageData" :key="item.Id">
              <td>{{ item.DeviceCode }}</td>
              <td>{{ item.DeviceName }}</td>
              <td>{{ item.CardCode }}</td>
              <td>{{ item.CardType }}</td>
              <td>充值</td>
              <td>{{ item.OperateDetail }}</td>
              <!--              <td>所属行政区域</td>-->
              <!--              <td>所属水管区域</td>-->
              <td>{{ item.Operator }}</td>
              <td>{{ item.CreateTime }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="waterChargeInfoArr.length"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="机井用水图表"
      :visible.sync="UsageDialogVisible"
      width="80%"
    >
      <template>
        <el-form label-width="auto">
          <el-form-item label="统计类型">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用水机井">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UsageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UsageDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import getDeviceNames from '../../utils/getDeviceNames'
import pageNation from '@/utils/pagenation'
export default {
  data() {
    return {
      deviceInfo: [],
      waterChargeInfoArr: [],
      deviceNames: [],
      options: [
        {
          value: '2020',
          label: '2020',
        },
        {
          value: '2021',
          label: '2021',
        },
        {
          value: '2022',
          label: '2022',
        },
        {
          value: '2023',
          label: '2023',
        },
        {
          value: '2024',
          label: '2024',
        },
        {
          value: '2025',
          label: '2025',
        },
      ],
      value: '',
      UsageDialogVisible: false,
      pageNum: 1,
      pageData: null,
      filterOn: false,
      filteredData: null,
    }
  },
  mounted() {
    this.deviceInfo = this.$store.getters.getWellList
    this.getData()
  },
  methods: {
    async getData() {
      const devices = this.deviceInfo.slice(0)
      const deviceId = devices.map((v) => {
        return v.DeviceCode
      })
      const { data: res } = await this.$http.post('/api/rptcardoperatedetail', {
        deviceId,
      })
      if (res.meta.status !== 200) {
        this.$message.error('获取售水信息失败')
      } else {
        this.deviceNames = getDeviceNames(
          this.deviceInfo,
          res.data,
          'DeviceName'
        )
        res.data.map((item, index) => {
          item.DeviceName = this.deviceNames[index]
          this.waterChargeInfoArr.push(item)
        })
        this.handlePage(this.pageNum)
      }
    },
    handlePage(pageNum) {
      this.pageData = pageNation(this.waterChargeInfoArr, pageNum, 10).newArr
    },
  },
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;

  .el-form {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;

    .el-form-item {
      margin: 0;
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

.table {
  tr {
    th {
      text-align: center;
    }

    td {
      text-align: center;
    }
  }
}
</style>
