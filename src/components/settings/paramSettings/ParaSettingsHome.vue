<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        unique-opened
        router
        default-active="/paraSettingsHome/waterFee"
      >
        <el-menu-item
          v-for="menuItem in basicInfoMenuList"
          :key="menuItem.Id"
          :index="'/' + menuItem.MenuUrl"
          >{{ menuItem.MenuName }}</el-menu-item
        >
      </el-menu>
      <router-view></router-view>
    </el-card></div
></template>

<script>
export default {
  name: 'ParaSettingsHome',
  data() {
    return {
      basicInfoMenuList: [],
    }
  },
  mounted() {
    const menuList = this.$store.getters.getMenuList
    console.log(menuList)
    this.basicInfoMenuList = menuList[4]['children'][4]['children']
  },
}
</script>

<style scoped></style>
