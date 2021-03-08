<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>统计分析</el-breadcrumb-item>
            <el-breadcrumb-item>配水信息查询</el-breadcrumb-item>
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
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>
                                    机井编码
                                </th>
                                <th>
                                    机井名称
                                </th>
                                <th>
                                    配水名称
                                </th>
                                <th>
                                    配水年份
                                </th>
                                <th>
                                    配水类型
                                </th>
                                <th>
                                    每亩地分配水量
                                </th>
                                <th>
                                    轮次
                                </th>
                                <th>
                                    配水价格（元）
                                </th>
                                <th>
                                    操作人员
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in waterPlan" :key="item.Id">
                                <td>{{ item.DeviceCode }}</td>
                                <td>{{ item.DeviceName }}</td>
                                <td>实际灌溉面积配水</td>
                                <td>{{ item.DistYear }}</td>
                                <td>{{ item.WellUse }}</td>
                                <td>{{ item.DistRatio }}</td>
                                <td>{{ item.DistRound }}</td>
                                <td>{{ item.DistPrice }}</td>
                                <td>
                                    {{ item.UserId }}
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </template>
            </div>
        </el-card>
    </div></template
>

<script>
export default {
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
            waterPlan: [],
        }
    },
    mounted() {
        this.getAgriWaterPlan()
    },
    methods: {
        async getAgriWaterPlan() {
            const { data: res } = await this.$http.get('/api/AgriUsagePlan')
            this.waterPlan = res.data
            console.log(this.waterPlan)
        },
    },
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
