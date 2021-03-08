<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                unique-opened
                router
            >
                <el-menu-item
                    v-for="menuItem in menuList"
                    :key="menuItem.id"
                    :index="'/' + menuItem.path"
                    >{{ menuItem.authName }}</el-menu-item
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
            menuList: [],
        }
    },
    created() {
        const menuListObj = JSON.parse(
            window.sessionStorage.getItem('paramsSettingMenuList')
        )
        this.menuList = menuListObj.children
    },
}
</script>

<style scoped></style>
