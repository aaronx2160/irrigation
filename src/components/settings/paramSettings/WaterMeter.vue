<template>
  <div class="wrapper">
    <div slot="header" class="card-header">
      <div class="header-btn">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="addWaterMeterVisible = true"
          >新增</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="handleDeleteRegion"
          >删除</el-button
        >
      </div>
      <template>
        井水用途：
        <el-select
          v-model="provinceSelected"
          placeholder="请选择"
          @change="handleProvinceChange"
        >
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <el-button type="info" icon="el-icon-search" size="small">搜索</el-button>
    </div>
    <div>
      <template>
        <el-table :data="regionData" style="width: 100%;" border stripe>
          <el-table-column type="selection" align="center"> </el-table-column>
          <el-table-column label="征收年份" prop="regionCode" align="center">
          </el-table-column>
          <el-table-column
            label="计量水费征收费"
            prop="regionName"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作时间" prop="regionLevel" align="center">
          </el-table-column>
          <el-table-column label="操作" prop="" align="center">
            <template>
              <el-button size="mini" type="danger" @click="handleDeleteRegion"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog
      title="新增计量水费信息"
      :visible.sync="addWaterMeterVisible"
      width="30%"
    >
      <el-form ref="form" label-width="auto">
        <el-form-item label="*水井用途:">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="征收年份:">
          <el-date-picker type="year" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="水资源征收费:">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWaterMeterVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWaterMeterVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="修改区域"
      :visible.sync="editRegionDialogVisible"
      width="80%"
    >
      <el-form label-width="auto" label-position="left">
        <el-form-item>
          <el-image src="https://s3.ax1x.com/2021/01/06/sEEmM4.png"></el-image>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editRegionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRegionDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div></template
>

<script>
export default {
  data() {
    return {
      provinces: [
        {
          value: '灌溉',
          label: '灌溉'
        },
        {
          value: '工业',
          label: '工业'
        },
        {
          value: '生活',
          label: '生活'
        }
      ],
      provinceSelected: '',

      addWaterMeterVisible: false,
      editRegionDialogVisible: false
    }
  },
  methods: {
    handleDeleteRegion() {
      this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
.wrapper {
  margin-top: 15px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: left;

  .el-select {
    width: 120px;
    margin-right: 15px;
  }

  .header-btn {
    margin-right: 15px;
  }
}
</style>
