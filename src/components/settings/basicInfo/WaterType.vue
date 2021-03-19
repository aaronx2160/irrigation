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
          <el-table-column label="取水类型" prop="UseWaterType" align="center">
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
      title="新增取水类型信息"
      :visible.sync="addProviderVisible"
      width="30%"
    >
      <el-form ref="form" label-width="auto">
        <el-form-item label="取水类型:">
          <el-input v-model.trim="UseWaterTypeName" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addProviderVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑取水类型信息"
      :visible.sync="editProviderVisible"
      width="30%"
    >
      <el-form ref="form" label-width="auto">
        <el-form-item label="取水类型:">
          <el-input v-model.trim="UseWaterTypeEdit.name" size="mini"></el-input>
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
      UseWaterTypeName: '',
      colName: 'UseWaterType',
      type: 'sysusewatertype',
      UseWaterTypeEdit: { id: '', name: '' },
      addProviderVisible: false,
      editProviderVisible: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.formData = await http('get', '/api/basicInfo/' + this.type)
    },
    handleAdd() {
      this.addProviderVisible = true
      if (!this.UseWaterTypeName) {
        this.$message.error('请输入取水类型名称！')
        return
      }
      http('post', '/api/basicInfo', {
        name: this.UseWaterTypeName,
        type: this.type,
        colName: this.colName
      }).then(() => {
        this.$message.success('添加成功！')
        this.addProviderVisible = false
        this.getData()
      })
    },
    handleEdit(row) {
      this.editProviderVisible = true
      this.UseWaterTypeEdit.id = row.Id
      this.UseWaterTypeEdit.name = row.UseWaterType.slice(0)
    },
    handleEditSubmit() {
      this.UseWaterTypeEdit.type = this.type
      this.UseWaterTypeEdit.colName = this.colName
      http('put', '/api/basicInfo', this.UseWaterTypeEdit).then(() => {
        this.$message.success('修改成功！')
        this.editProviderVisible = false
        this.getData()
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该取水类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http('delete', '/api/basicInfo/' + this.type + '/' + row.Id).then(
          () => {
            this.$message.success('删除成功！')
            this.getData()
          }
        )
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
