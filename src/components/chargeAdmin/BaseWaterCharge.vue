<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>收费管理</el-breadcrumb-item>
            <el-breadcrumb-item>基本水费收缴</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div slot="header" class="card-header">
                <div class="region">
                    <template>
                        省份：
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
                        市：
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
                        区：
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
                <div class="header-btn">
                    <el-button
                        type="success"
                        icon="el-icon-circle-plus-outline"
                        size="small"
                        @click="addPlanDialogVisible = true"
                        >新增</el-button
                    >
                    <el-button type="danger" icon="el-icon-delete" size="small"
                        >删除</el-button
                    >
                </div>

                <el-form label-width="100px">
                    <el-form-item label="机井名称:" prop="roleName">
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
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>
                                    设备名称
                                </th>
                                <th>
                                    实际地亩数
                                </th>
                                <th>
                                    收费金额
                                </th>
                                <th>
                                    缴费方式
                                </th>
                                <th>
                                    是否已缴费
                                </th>
                                <th>
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in baseWaterCharge" :key="item.Id">
                                <td>{{ item.DeviceName }}</td>
                                <td>{{ item.MonitorArea }}</td>
                                <td>{{ item.ChargeAmount }}</td>
                                <td>{{ item.ChargeMode }}</td>
                                <td>{{ item.IsCharge }}</td>
                                <td>
                                    <el-button
                                        type="warning"
                                        icon="el-icon-edit"
                                        circle
                                    ></el-button>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    <el-table style="width: 100%;" border stripe>
                        <el-table-column type="selection" align="center">
                            ></el-table-column
                        >
                        <el-table-column label="设备名称" align="center">
                        </el-table-column>
                        <el-table-column label="实际地亩数" align="center">
                        </el-table-column>
                        <el-table-column label="收费金额" align="center">
                        </el-table-column>
                        <el-table-column label="缴费方式" align="center">
                        </el-table-column>
                        <el-table-column label="是否已缴费" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <el-dialog
            title="新增机井基本收费"
            :visible.sync="addPlanDialogVisible"
            width="50%"
        >
            <el-form label-width="auto" :inline="true" label-position="left">
                <el-form-item label="配水年份：">
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
                <el-form-item label="轮次：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option> </el-select
                ></el-form-item>
                <el-form-item label="配水机井：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option> </el-select
                ></el-form-item>
                <el-form-item label="配水方式：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option> </el-select
                ></el-form-item>
                <el-form-item label="每亩地分配水量：">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="配水比例：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option> </el-select
                ></el-form-item>
                <el-form-item label="此轮配水价格：">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addPlanDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addPlanDialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div></template
>

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
            baseWaterCharge: [],
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            const { data: res } = await this.$http.get('/api/basewatercharge')
            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.baseWaterCharge = res.data
        },
    },
}
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    align-items: center;
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
            .el-input {
                width: 120px;
                margin-right: 50px;
            }
        }
        .el-button {
        }
    }
}
</style>
