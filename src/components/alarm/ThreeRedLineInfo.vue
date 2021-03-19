<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>告警查询</el-breadcrumb-item>
      <el-breadcrumb-item>三条红线</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h3>水资源开发利用控制红线</h3>
      <el-table :data="quotaRedLine" border stripe>
        <el-table-column
          label="所属区域"
          align="center"
          prop="region"
        ></el-table-column>
        <el-table-column
          label="三条红线指标"
          align="center"
          prop="threeLinePolicy"
        ></el-table-column>
        <el-table-column
          label="已用水量"
          align="center"
          prop="waterUsed"
        ></el-table-column>
        <el-table-column
          label="差额"
          prop="balance"
          align="center"
        ></el-table-column>
      </el-table>
      <h3>水效率控制红线</h3>

      <el-table :data="efficiencyRedLine" border stripe>
        <el-table-column
          align="center"
          label="当前效率达标指数"
          prop="currentEfficiency"
        ></el-table-column>
        <el-table-column
          align="center"
          label="效率达标下限"
          prop="lowestEffAllowed"
        ></el-table-column>
      </el-table>
      <h3>水功能区限制纳污红线</h3>
      <el-table :data="pollutionDischargeRedLine" border stripe>
        <el-table-column
          label="当前排污总量"
          align="center"
          prop="currentDischarge"
        ></el-table-column>
        <el-table-column
          label="排污总量上限"
          prop="dischargeLimit"
          align="center"
        ></el-table-column>
      </el-table>
    </el-card></div
></template>

<script>
export default {
  name: 'ThreeRedLineInfo',
  data() {
    return {
      quotaRedLine: [
        {
          region: '甘州区',
          threeLinePolicy: '1.5亿吨',
          waterUsed: '0.0吨',
          balance: '150000000.00吨',
        },
      ],
      efficiencyRedLine: [
        {
          currentEfficiency: 125,
          lowestEffAllowed: 5000,
        },
      ],
      pollutionDischargeRedLine: [
        {
          currentDischarge: 125,
          dischargeLimit: 5000,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
