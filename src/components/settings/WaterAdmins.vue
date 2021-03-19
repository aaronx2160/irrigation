<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>水管区域</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="addWaterAreaDialogVisible = true"
          >新增</el-button
        >
      </div>
      <div>
        <v-simple-table class="water-admin-table">
          <thead>
            <tr>
              <th>水管区域编码</th>
              <th>省</th>
              <th>市</th>
              <th>区(县)</th>
              <th>水利局</th>
              <th>添加时间</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in waterAreaList" :key="item.id">
              <td>{{ item.areaCode }}</td>
              <td>{{ item.province }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.district }}</td>
              <td>{{ item.admin }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.note }}</td>

              <td>
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEditWaterArea(item)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteWaterArea(item.id)"
                  >删除</el-button
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </el-card>
    <el-dialog
      :title="'新增区域-所属区域【' + waterAreaAddForm.province + '】'"
      :visible.sync="addWaterAreaDialogVisible"
      width="30%"
    >
      <el-form
        label-width="auto"
        label-position="left"
        ref="waterAreaAddForm"
        :model="waterAreaAddForm"
      >
        <el-form-item label="省:">
          <el-input
            size="mini"
            v-model="waterAreaAddForm.province"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="市:">
          <el-input
            size="mini"
            v-model="waterAreaAddForm.city"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="区(县):">
          <el-input size="mini" v-model="waterAreaAddForm.district"></el-input>
        </el-form-item>
        <el-form-item label="水利局:">
          <el-input
            size="mini"
            v-model="waterAreaAddForm.waterAdmin"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域编码:">
          <el-input size="mini" v-model="waterAreaAddForm.areaCode"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            v-model="waterAreaAddForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWaterAreaDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddWaterArea">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="'修改' + waterAreaEditForm.admin + '信息'"
      :visible.sync="editRegionDialogVisible"
      width="30%"
    >
      <el-form
        label-width="auto"
        label-position="left"
        ref="waterAreaAddForm"
        :model="waterAreaEditForm"
      >
        <el-form-item label="省:">
          <el-input
            size="mini"
            v-model="waterAreaEditForm.province"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="市:">
          <el-input
            size="mini"
            v-model="waterAreaEditForm.city"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="区(县):">
          <el-input size="mini" v-model="waterAreaEditForm.district"></el-input>
        </el-form-item>
        <el-form-item label="水利局:">
          <el-input size="mini" v-model="waterAreaEditForm.admin"></el-input>
        </el-form-item>
        <el-form-item label="区域编码:">
          <el-input size="mini" v-model="waterAreaEditForm.areaCode"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            v-model="waterAreaEditForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editRegionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div></template
>

<script>
import { GETWATERAREAS } from '../../store/types'

export default {
  data() {
    return {
      waterAreaList: [],
      waterAreaAddForm: {
        province: '陕西省',
        city: '宝鸡市',
        district: '',
        waterAdmin: '',
        areaCode: '',
        remark: '',
      },
      waterAreaEditForm: {
        province: '陕西省',
        city: '宝鸡市',
        district: '',
        admin: '',
        areaCode: '',
        remark: '',
      },
      addWaterAreaDialogVisible: false,
      editRegionDialogVisible: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch(GETWATERAREAS).then(() => {
        this.waterAreaList = this.$store.getters.getWaterAreas
      })
    },
    async handleAddWaterArea() {
      const { data: res } = await this.$http.post(
        '/api/waterArea',
        this.waterAreaAddForm
      )

      if (res.meta.status !== 200)
        return this.$message.error('添加水管区域失败')

      this.$message.success('成功添加水管区域')
      this.addWaterAreaDialogVisible = false
      this.$refs.waterAreaAddForm.resetFields()
      this.getData()
    },
    async handleEditWaterArea(itemToEdit) {
      this.editRegionDialogVisible = true
      this.waterAreaEditForm = JSON.parse(JSON.stringify(itemToEdit))
    },
    async handleEditSubmit() {
      const { data: res } = await this.$http.put(
        '/api/editWaterArea',
        this.waterAreaEditForm
      )
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.$message.success(res.meta.msg)
        this.editRegionDialogVisible = false
        this.getData()
      }
    },
    handleDeleteWaterArea(id) {
      this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async (value) => {
          if (value === 'confirm') {
            const { data: res } = await this.$http.delete(
              '/api/waterArea/' + id
            )
            if (res.meta.status !== 200) {
              this.$message.error(res.meta.msg)
            } else {
              this.$message.success(res.meta.msg)
              this.getData()
            }
          }
        })
        .catch((err) => {
          if (err) return this.$message.error('已取消删除水管区域')
        })
    },
    handleProvinceChange(value) {
      this.citySelected = ''
      const provinceSelected = this.provinces.filter((item) => {
        return item.value === value
      })
      this.cities = provinceSelected[0].children
      this.citySelected = this.cities[0].label
    },
  },
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: right;
}
.water-admin-table {
  thead {
    tr {
      th {
        text-align: center;
      }
      td {
        text-align: center;
      }
    }
  }
}
</style>
