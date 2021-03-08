<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>统计分析</el-breadcrumb-item>
            <el-breadcrumb-item>水卡信息查询</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div slot="header" class="card-header">
                <el-form label-width="100px">
                    <el-form-item label="用户名:" prop="roleName">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="卡号:" prop="roleName">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码:" prop="roleName">
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
                                    水卡编号
                                </th>
                                <th>
                                    持卡人姓名
                                </th>
                                <th>
                                    持卡人电话
                                </th>
                                <th>
                                    剩余金额
                                </th>
                                <th>
                                    执行水价
                                </th>
                                <th>
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cardInfo" :key="item.Id">
                                <td>{{ item.CardCode }}</td>

                                <td>{{ item.OwnerName }}</td>
                                <td>{{ item.OwnerTelphone }}</td>
                                <td>{{ item.RemainMoney }}</td>
                                <td>{{ item.ExecutePrice }}</td>
                                <td>
                                    <el-button
                                        type="danger"
                                        circle
                                        icon="el-icon-delete"
                                    ></el-button>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'WaterCardInfo',
    data() {
        return {
            deviceList: null,
            cardInfo: null,
        }
    },
    mounted() {
        this.deviceList = this.$store.getters.getWellList
        this.getData()
    },
    methods: {
        async getData() {
            const deviceId = this.deviceList.map((v) => {
                return v.Id
            })
            const { data: res } = await this.$http.post(
                '/api/waterCard',
                deviceId
            )
            this.cardInfo = res.data
        },
    },
}
</script>

<style lang="less" scoped>
.el-form {
    display: flex;
    align-items: center;
    /*justify-content: space-around;*/
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
</style>
