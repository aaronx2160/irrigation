<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>告警查询</el-breadcrumb-item>
            <el-breadcrumb-item>异常机井智能分析</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div slot="header" class="card-header">
                <template>
                    <el-form label-width="auto">
                        <el-form-item label="水卡编号:" prop="roleName">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="设备编号:" prop="roleName">
                            <el-input></el-input>
                        </el-form-item>
                        <el-button
                            type="success"
                            size="small"
                            icon="el-icon-search"
                        >
                            查询
                        </el-button>
                        <el-button
                            type="info"
                            size="small"
                            icon="el-icon-eleme"
                        >
                            重置
                        </el-button>
                    </el-form>
                </template>
            </div>
            <div>
                <template>
                    <el-table style="width: 100%;" border stripe>
                        <el-table-column label="卡号" align="center">
                        </el-table-column>
                        <el-table-column label="设备编码" align="center">
                        </el-table-column>
                        <el-table-column label="设备名称" align="center">
                        </el-table-column>
                        <el-table-column label="异常情况" align="center">
                        </el-table-column>
                        <el-table-column
                            label="异常机井处理状态"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card></div
></template>

<script>
export default {
    data() {
        return {}
    },
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
        }
        .el-button:first-of-type {
            margin-left: 15px;
        }
    }
}
</style>
