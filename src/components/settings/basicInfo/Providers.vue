<template>
  <div class="wrapper">
    <div slot="header" class="card-header">
      <div class="header-btn">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="addProviderVisible = true"
          >新增</el-button
        >
      </div>
    </div>
    <div>
      <template>
        <el-table :data="formData" style="width: 100%;" border stripe>
          <el-table-column label="运营商" prop="Operator" align="center">
          </el-table-column>
          <el-table-column label="创建时间" prop="CreateTime" align="center">
          </el-table-column>
          <el-table-column label="修改时间" prop="EditTime" align="center">
          </el-table-column>
          <el-table-column label="操作" prop="" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog
      title="新增运营商信息"
      :visible.sync="addProviderVisible"
      width="30%"
    >
      <el-form ref="form" label-width="auto">
        <el-form-item label="运营商:">
          <el-input v-model.trim="operatorName" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addProviderVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑运营商信息"
      :visible.sync="editProviderVisible"
      width="30%"
    >
      <el-form ref="form" label-width="auto">
        <el-form-item label="运营商:">
          <el-input v-model.trim="operatorEdit.name" size="mini"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editProviderVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div></template
>

<script>
import http from '@/utils/http'

export default {
  data() {
    return {
      formData: [],
      operatorName: '',
      colName: 'Operator',
      operatorEdit: { id: '', name: '', type: 'sysoperator' },
      addProviderVisible: false,
      editProviderVisible: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.formData = await http('get', '/api/basicInfo/sysoperator')
    },
    handleAdd() {
      this.addProviderVisible = true
      if (!this.operatorName) {
        this.$message.error('请输入运营商名称！')
        return
      }
      http('post', '/api/basicInfo', {
        name: this.operatorName,
        colName: this.colName,
        type: 'sysoperator'
      }).then(() => {
        this.$message.success('添加成功！')
        this.addProviderVisible = false
        this.getData()
      })
    },
    handleEdit(row) {
      this.editProviderVisible = true
      this.operatorEdit.id = row.Id
      this.operatorEdit.name = row.Operator.slice(0)
    },
    handleEditSubmit() {
      this.operatorEdit.colName = this.colName
      http('put', '/api/basicInfo', this.operatorEdit).then(() => {
        this.$message.success('修改成功！')
        this.editProviderVisible = false
        this.getData()
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该运营商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http('delete', '/api/basicInfo/sysoperator/' + row.Id).then(() => {
          this.$message.success('删除成功！')
          this.getData()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 15px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: left;
}

.el-form {
  margin: 0 auto;
  width: 200px;
}
</style>
