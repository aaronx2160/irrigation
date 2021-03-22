<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>水权管理</el-breadcrumb-item>
      <el-breadcrumb-item>农业用水配水计划</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <div class="header-btn">
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="addPlanDialogVisible = true"
            >新增</el-button
          >
        </div>

        <el-form label-width="100px">
          <el-form-item label="机井名称:" prop="roleName">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="机井编码:" prop="roleDesc">
            <el-input></el-input>
          </el-form-item>
          <el-form-item class="data-picker" label="配水年份:" prop="roleDesc">
            <el-select v-model="yearSelected" placeholder="请选择">
              <el-option
                v-for="item in yearOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="success" size="small" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="info" size="small" icon="el-icon-eleme"
            >重置</el-button
          >
        </el-form>
      </div>
      <div>
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
                配水方式
              </th>
              <th>
                年份
              </th>
              <th>
                轮次
              </th>
              <th>
                每亩地分配水量
              </th>
              <th>
                配水比例
              </th>
              <th>
                配水价格
              </th>
              <th>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageData" :key="item.BaseDistWaterId">
              <td>{{ item.DeviceCode }}</td>
              <td>{{ item.DeviceName }}</td>
              <td>实际灌溉面积配水</td>
              <td>{{ item.DistYear }}</td>
              <td>{{ item.DistRound }}</td>
              <td>{{ item.DistWater }}</td>
              <td>{{ item.DistRatio }}</td>
              <td>{{ item.DistPrice }}</td>
              <td>
                <el-button type="warning" icon="el-icon-edit" circle></el-button
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <el-pagination
          layout="prev, pager, next"
          :total="AgriUsagePlan.length"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="添加配水计划"
      :visible.sync="addPlanDialogVisible"
      width="50%"
    >
      <el-form label-width="auto" :inline="true" label-position="right">
        <el-form-item label="配水年份：">
          <el-select
            v-model="addPlanForm.DistYear"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in yearOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轮次：">
          <el-input
            v-model="addPlanForm.DistRound"
            type="number"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="配水机井：">
          <el-select
            v-model="addPlanForm.DeviceId"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in wellList"
              :key="item.id"
              :label="item.DeviceName"
              :value="item.DeviceCode"
            >
            </el-option> </el-select
        ></el-form-item>

        <el-form-item label="每亩地分配水量(吨)：">
          <el-input size="mini" v-model="addPlanForm.DistWater"></el-input>
        </el-form-item>
        <el-form-item label="配水比例：">
          <el-input
            v-model="addPlanForm.DistRatio"
            size="mini"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="此轮配水价格(￥)：">
          <el-input
            v-model="addPlanForm.DistPrice"
            size="mini"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPlanDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddPlanSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改配水计划"
      :visible.sync="editPlanDialogVisible"
      width="50%"
    >
      <el-form label-width="auto" :inline="true" label-position="left">
        <el-form-item label="配水年份：">
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
        <el-form-item label="轮次：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item label="配水机井：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item label="配水方式：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item label="每亩地分配水量：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="配水比例：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item label="此轮配水价格：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPlanDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPlanDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div></template
>

<script>
import pageNation from '@/utils/pagenation'
export default {
  name: 'AgriUsagePlan',
  data() {
    return {
      yearSelected: '',
      pageData: [],
      pageNum: 1,
      addPlanDialogVisible: false,
      editPlanDialogVisible: false,
      AgriUsagePlan: [],
      wellList: [],
      addPlanForm: {
        DistYear: null,
        DistRound: 0,
        DistWater: 0,
        DistRatio: 0,
        DistPrice: 0,
        IsAppendWater: 0,
        DeviceId: null
      }
    }
  },
  computed: {
    yearOptions() {
      const yearArr = []
      let currentYear = new Date().getFullYear()
      for (let i = 0; i < 5; i++) {
        yearArr.push(currentYear++)
      }
      return yearArr
    }
  },
  mounted() {
    this.getAgriWaterPlan()
    this.wellList = this.$store.getters.getWellList
  },
  methods: {
    async getAgriWaterPlan() {
      const { data: res } = await this.$http.get('/api/AgriUsagePlan')
      this.AgriUsagePlan = res.data
      this.getPageData(1)
    },
    getPageData(pageNum) {
      this.pageData = pageNation(this.AgriUsagePlan, pageNum, 10).newArr
      console.log(this.pageData)
    },
    handlePageChange(e) {
      this.getPageData(e)
    },
    async handleAddPlanSubmit() {
      const { data: res } = await this.$http.post(
        '/api/addWaterPlan',
        this.addPlanForm
      )
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  align-items: center;
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
      .el-select {
        margin-right: 50px;
      }
    }
    .el-button {
    }
  }
}
.el-dialog {
  .el-form {
    .el-form-item {
      .el-select,
      .el-input {
        width: 120px;
      }
    }
  }
}
</style>
