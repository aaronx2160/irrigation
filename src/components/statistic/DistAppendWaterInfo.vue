<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>阶梯性水量分配信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <div class="region">
          <template>
            用水类型：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
          <template>
            配水年份：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </div>
        <el-form label-width="100px">
          <el-form-item label="机井名称:" prop="roleName">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="机井编码:" prop="roleName">
            <el-input></el-input>
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
        <template>
          <el-table style="width: 100%;" border stripe>
            <el-table-column type="selection" align="center">
              ></el-table-column
            >
            <el-table-column label="机井编码" align="center"> </el-table-column>
            <el-table-column label="机井名称" align="center"> </el-table-column>
            <el-table-column label="配水名称" align="center"> </el-table-column>
            <el-table-column label="配水年份" align="center"> </el-table-column>
            <el-table-column label="配水类型" align="center"> </el-table-column>
            <el-table-column label="每亩地分配水量" align="center">
            </el-table-column>
            <el-table-column label="轮次" align="center"> </el-table-column>
            <el-table-column label="配水机井" align="center"> </el-table-column>
            <el-table-column label="配水价格(元)" align="center">
            </el-table-column>
            <el-table-column label="操作人员" align="center"> </el-table-column>
            <el-table-column label="是否为阶梯性追加水量" align="center">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card></div
></template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        },
        {
          value: '2022',
          label: '2022'
        },
        {
          value: '2023',
          label: '2023'
        },
        {
          value: '2024',
          label: '2024'
        },
        {
          value: '2025',
          label: '2025'
        }
      ],
      value: '',
      addPlanDialogVisible: false,
      editPlanDialogVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;

  justify-content: space-around;
  .region {
    .el-select {
      width: 120px;
    }
  }
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
      margin-left: 15px;
    }
  }
}
</style>
