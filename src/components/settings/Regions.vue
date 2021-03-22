<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>行政区域</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="addAreaDialogVisible = true"
          >新增</el-button
        >
      </div>
      <div>
        <v-simple-table class="water-admin-table">
          <thead>
            <tr>
              <th>区域编码</th>
              <th>省</th>
              <th>市</th>
              <th>区(县)</th>
              <th>乡镇</th>
              <th>村</th>
              <th>添加时间</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in areaList" :key="item.id">
              <td>{{ item.areaCode }}</td>
              <td>{{ item.province }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.district }}</td>
              <th>{{ item.town }}</th>
              <th>{{ item.village }}</th>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.note }}</td>

              <td>
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEditArea(item)"
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
      :title="'新增区域-所属区域【' + areaAddForm.province + '】'"
      :visible.sync="addAreaDialogVisible"
      width="30%"
    >
      <el-form
        label-width="auto"
        label-position="left"
        ref="areaAddForm"
        :model="areaAddForm"
      >
        <el-form-item label="省:">
          <el-input
            size="mini"
            v-model="areaAddForm.province"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="市:">
          <el-input size="mini" v-model="areaAddForm.city" disabled></el-input>
        </el-form-item>
        <el-form-item label="区(县):">
          <el-input size="mini" v-model="areaAddForm.district"></el-input>
        </el-form-item>
        <el-form-item label="乡镇:">
          <el-input size="mini" v-model="areaAddForm.town"></el-input>
        </el-form-item>
        <el-form-item label="村:">
          <el-input size="mini" v-model="areaAddForm.village"></el-input>
        </el-form-item>
        <el-form-item label="区域编码:">
          <el-input size="mini" v-model="areaAddForm.areaCode"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="areaAddForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAreaDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddArea">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="'修改' + areaEditForm.village + '信息'"
      :visible.sync="editRegionDialogVisible"
      width="30%"
    >
      <el-form
        label-width="auto"
        label-position="left"
        ref="areaEditForm"
        :model="areaEditForm"
      >
        <el-form-item label="省:">
          <el-input
            size="mini"
            v-model="areaEditForm.province"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="市:">
          <el-input size="mini" v-model="areaEditForm.city" disabled></el-input>
        </el-form-item>
        <el-form-item label="区(县):">
          <el-input size="mini" v-model="areaEditForm.district"></el-input>
        </el-form-item>
        <el-form-item label="乡镇:">
          <el-input size="mini" v-model="areaEditForm.town"></el-input>
        </el-form-item>
        <el-form-item label="村:">
          <el-input size="mini" v-model="areaEditForm.village"></el-input>
        </el-form-item>
        <el-form-item label="区域编码:">
          <el-input size="mini" v-model="areaEditForm.areaCode"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="areaEditForm.remark"></el-input>
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
import { GETAREAS } from '../../store/types'

export default {
  data() {
    return {
      areaList: [],
      areaAddForm: {
        province: '陕西省',
        city: '宝鸡市',
        district: '',
        town: '',
        village: '',
        areaCode: '',
        remark: ''
      },
      areaEditForm: {
        province: '陕西省',
        city: '宝鸡市',
        district: '',
        town: '',
        village: '',
        areaCode: '',
        remark: ''
      },
      addAreaDialogVisible: false,
      editRegionDialogVisible: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch(GETAREAS).then(() => {
        this.areaList = this.$store.getters.getAreas
      })
    },
    async handleAddArea() {
      const { data: res } = await this.$http.post(
        '/api/addArea',
        this.areaAddForm
      )

      if (res.meta.status !== 200)
        return this.$message.error('添加行政区域失败')

      this.$message.success('成功添加行政区域')
      this.addAreaDialogVisible = false
      this.$refs.areaAddForm.resetFields()
      this.getData()
    },
    async handleEditArea(itemToEdit) {
      this.editRegionDialogVisible = true
      this.areaEditForm = JSON.parse(JSON.stringify(itemToEdit))
    },
    async handleEditSubmit() {
      const { data: res } = await this.$http.put(
        '/api/editArea',
        this.areaEditForm
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
        type: 'warning'
      })
        .then(async value => {
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
        .catch(err => {
          if (err) return this.$message.error('已取消删除水管区域')
        })
    },
    handleProvinceChange(value) {
      this.citySelected = ''
      const provinceSelected = this.provinces.filter(item => {
        return item.value === value
      })
      this.cities = provinceSelected[0].children
      this.citySelected = this.cities[0].label
    }
  }
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
