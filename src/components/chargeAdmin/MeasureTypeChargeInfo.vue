<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收费管理</el-breadcrumb-item>
      <el-breadcrumb-item>水资源费统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-form label-width="100px">
          <el-form-item class="data-picker" label="征收年份:" prop="roleDesc">
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
          <el-form-item class="data-picker" label="水井用途:" prop="roleDesc">
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
          <el-button type="success" size="small" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="info" size="small" icon="el-icon-eleme"
            >导出</el-button
          >
        </el-form>
      </div>
      <div>
        <template>
          <el-table style="width: 100%;" border stripe>
            <el-table-column type="selection" align="center">
              ></el-table-column
            >
            <el-table-column label="设备名称" align="center"> </el-table-column>
            <el-table-column label="水资源收费金额" align="center">
            </el-table-column>
            <el-table-column label="缴费方式" align="center"> </el-table-column>
            <el-table-column label="是否已缴费" align="center">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card></div
></template>

<script>
export default {
  name: 'AgriUsagePlan',
  data() {
    return {
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
      addPlanDialogVisible: false,
      editPlanDialogVisible: false,
    }
  },
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
    }
    .el-button:first-of-type {
      margin-left: 50px;
    }
  }
}
</style>
