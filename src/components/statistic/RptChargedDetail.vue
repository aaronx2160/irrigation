<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>机井充值统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="el-card__header">
        <el-form label-width="auto" :model="searchForm">
          <el-form-item prop="dateArr">
            <el-date-picker
              v-model="searchForm.dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="DeviceCode" label="机井编码:">
            <el-input size="mini" v-model="searchForm.DeviceCode"></el-input>
          </el-form-item>
          <el-form-item prop="CardCode" label="水卡卡号:">
            <el-input size="mini" v-model="searchForm.CardCode"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="success" size="mini">查询</el-button>
          <el-button type="info" size="mini">重置</el-button>
        </div>
      </div>
      <v-simple-table>
        <thead>
          <tr>
            <th>机井编码</th>
            <th>水卡卡号</th>
            <th>充值金额</th>
            <th>单价</th>
            <th>购买水量</th>
            <th>轮次</th>
            <th>年份</th>
            <th>操作员</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageData" :key="item.Id">
            <td>{{ item.DeviceCode }}</td>
            <td>{{ item.CardCode }}</td>
            <td>{{ item.ChargeAmount }}</td>
            <td>{{ item.UnitPrice }}</td>
            <td>{{ item.WaterAmount }}</td>
            <td>{{ item.DistRound }}</td>
            <td>{{ item.DistYear }}</td>
            <td>{{ item.Operator }}</td>
            <td>{{ item.CreateTime }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'RptChargedDetail',
  data() {
    return {
      searchForm: {
        CardCode: '',
        DeviceCode: '',
        dateArr: [],
      },

      total: 0,
      pageNum: 1,
      pageData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.pageData = await http('get', '/api/rptchargeddetail', null)
      this.total = this.pageData[0]['total']
    },
    async handlePage(pageNum) {
      this.pageNum = pageNum
      this.pageData = await http('post', '/api/rptchargeddetail', {
        pageNum: this.pageNum,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .el-card {
    .el-card__header {
      display: flex;
      .el-form {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-form-item {
          margin-left: 10px;
        }
      }
      .btn {
        margin: 5px 0 0 20px;
      }
    }
  }
}
</style>
