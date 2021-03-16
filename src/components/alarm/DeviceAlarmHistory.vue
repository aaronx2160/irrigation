<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>告警查询</el-breadcrumb-item>
      <el-breadcrumb-item>设备告警历史</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-form label-width="auto">
          <el-form-item label="设备编码:" prop="roleName">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="起始时间:">
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
          <el-form-item label="结束时间:">
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
          <el-form-item label="报警类型:">
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in options2"
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
            >重置</el-button
          >
          <el-button
            type="warning"
            size="small"
            icon="el-icon-search"
            @click="alarmDialogVisible = true"
            >图表</el-button
          >
        </el-form>
      </div>
      <div>
        <el-table style="width: 100%;" border stripe>
          <el-table-column label="设备编码" align="center"> </el-table-column>
          <el-table-column label="警报详情" align="center"> </el-table-column>
          <el-table-column label="警报时间" align="center"> </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="报警图表" :visible.sync="alarmDialogVisible" width="80%">
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
      <el-image src="https://s3.ax1x.com/2021/01/04/sPLhNV.png"></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UsageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UsageDialogVisible = false"
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
      options2: [
        {
          value: '水泵异常',
          label: '水泵异常'
        },
        {
          value: '水表异常',
          label: '水表异常'
        },
        {
          value: '电表异常',
          label: '电表异常'
        },
        {
          value: '语音模块异常',
          label: '语音模块异常'
        },
        {
          value: '开关门异常',
          label: '开关门异常'
        },
        {
          value: '三相电压不平衡异常',
          label: '三相电压不平衡异常'
        }
      ],
      value: '',
      value2: '',
      alarmDialogVisible: false
    }
  }
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
</style>
