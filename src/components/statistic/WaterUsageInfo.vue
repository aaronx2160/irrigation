<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>统计分析</el-breadcrumb-item>
            <el-breadcrumb-item>机井用水信息查询</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div class="card-header">
                <template>
                    <el-form
                        label-width="auto"
                        :model="formSearch"
                        ref="formSearch"
                    >
                        <el-form-item label="机井名称:">
                            <el-input
                                size="mini"
                                v-model="formSearch.DeviceCode"
                                @focus="handleInputFocus((key = 'DeviceCode'))"
                                @input="handleInput"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="机井编码:">
                            <el-input size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="水卡卡号:">
                            <el-input
                                size="mini"
                                v-model="formSearch.CardCode"
                                @focus="handleInputFocus((key = 'CardCode'))"
                                @input="handleInput"
                            ></el-input>
                        </el-form-item>
                        <!--                        <el-form-item label="起始时间:">-->
                        <!--                            <el-select v-model="" placeholder="请选择">-->
                        <!--                                &lt;!&ndash;                                <el-option> </el-option>&ndash;&gt;-->
                        <!--                            </el-select>-->
                        <!--                        </el-form-item>-->
                        <!--            <el-form-item label="结束时间:">-->
                        <!--                <el-select v-model="" placeholder="请选择">-->
                        <!--                    &lt;!&ndash;                                <el-option> </el-option>&ndash;&gt;-->
                        <!--                </el-select>-->
                        <!--            </el-form-item>-->
                        <el-button
                            type="success"
                            size="small"
                            icon="el-icon-search"
                            @click="handleSearch"
                            >查询
                        </el-button>
                        <el-button
                            type="info"
                            size="small"
                            icon="el-icon-eleme"
                            @click="handleReset"
                            >重置
                        </el-button>

                        <download-excel
                            :data="exportJson.data"
                            :fields="exportJson.fields"
                            type="xls"
                            name="filename.xls"
                        >
                            <el-button
                                type="warning"
                                size="small"
                                icon="el-icon-search"
                                >导出
                            </el-button>
                        </download-excel>
                        <el-button
                            type="warning"
                            size="small"
                            icon="el-icon-search"
                            >导入
                        </el-button>
                    </el-form>
                </template>
            </div>
            <div class="chart">
                <h3>总用水量：0吨</h3>

                <el-tag
                    type="primary"
                    size="mini"
                    effect="dark"
                    @click="UsageDialogVisible = true"
                    ><i class="el-icon-data-analysis"></i>图表显示</el-tag
                >
                <el-tag size="mini"
                    >时间区间：2020-12-04 14:29:01 ~ 2021-01-04 14:29:01</el-tag
                >
            </div>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>机井编码</th>
                        <th>机井名称</th>
                        <th>水卡卡号</th>
                        <th>已用水量</th>
                        <th>剩余水量</th>
                        <th>开泵时间</th>
                        <th>关泵时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in useWaterInfo" :key="item.Id">
                        <td>{{ item.DeviceCode }}</td>
                        <td>{{ item.DeviceCode }}</td>
                        <td>{{ item.CardCode }}</td>
                        <td>{{ item.UseWater }}</td>
                        <td>{{ item.RemainWater }}</td>
                        <td>{{ item.OpenPumpTime }}</td>
                        <td>{{ item.StopPumpTime }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
            <el-pagination
                small
                layout="prev, pager, next"
                :total="pagination.total"
                @current-change="handlePageChange"
            >
            </el-pagination>
        </el-card>
        <el-dialog
            title="机井用水图表"
            :visible.sync="UsageDialogVisible"
            width="80%"
        >
            <!--                <el-form label-width="auto">-->
            <!--                    <el-form-item label="统计类型">-->
            <!--                        <el-select v-model="" placeholder="请选择"> </el-select>-->
            <!--                    </el-form-item>-->
            <!--                    <el-form-item label="用水机井">-->
            <!--                        <el-select v-model="" placeholder="请选择">-->
            <!--                            &lt;!&ndash;                            <el-option> </el-option>&ndash;&gt;-->
            <!--                        </el-select>-->
            <!--                    </el-form-item>-->
            <!--                </el-form>-->

            <span slot="footer" class="dialog-footer">
                <!--                <el-button @click="UsageDialogVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="UsageDialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formSearch: { DeviceCode: '', CardCode: '' },
            useWaterInfo: [],
            value: '',
            UsageDialogVisible: false,
            pagination: { total: 0, pageNum: 0 },
            exportJson: {
                fields: {
                    机井编码: 'DeviceCode',
                    机井名称: 'DeviceCode',
                    水卡卡号: 'CardCode',
                    已用水量: 'UseWater',
                    剩余水量: 'RemainWater',
                    开泵时间: 'OpenPumpTime',
                    关泵时间: 'StopPumpTime',
                },
                data: [],
                meta: [
                    [
                        {
                            key: 'charset',
                            value: 'utf-8',
                        },
                    ],
                ],
            },
        }
    },
    created() {
        this.getUseWaterInfo()
    },
    methods: {
        async getUseWaterInfo() {
            const { data: res } = await this.$http.post(
                '/api/useWaterInfo',
                this.formSearch
            )
            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
            this.useWaterInfo = res.data.userWaterDetailList
            this.pagination.total = res.data.total
            this.exportJson.data = res.data.userWaterDetailList
        },
        async handlePageChange(pageNum) {
            this.formSearch.pageNum = pageNum
            const { data: res } = await this.$http.post(
                '/api/useWaterInfoPerPage',
                this.formSearch
            )
            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
            this.useWaterInfo = res.data
            this.exportJson.data = res.data
        },
        handleInputFocus(key) {
            switch (key) {
                case 'DeviceCode':
                    this.formSearch.CardCode = ''
                    break
                case 'CardCode':
                    this.formSearch.DeviceCode = ''
                    break
            }
        },
        handleInput() {
            if (
                this.formSearch.DeviceCode.trim() === '' &&
                this.formSearch.CardCode.trim() === ''
            ) {
                this.getUseWaterInfo()
            }
        },
        async handleSearch() {
            this.formSearch.pageNum = this.pagination.pageNum
            const { data: res } = await this.$http.post(
                '/api/useWaterInfo',
                this.formSearch
            )
            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
            this.useWaterInfo = res.data.userWaterDetailList
            this.pagination.total = res.data.total
            this.exportJson.data = res.data.userWaterDetailList
        },
        handleReset() {
            this.formSearch.CardCode = ''
            this.formSearch.DeviceCode = ''
            this.getUseWaterInfo()
            this.pagination.pageNum = 1
        },
    },
}
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    .region {
        .el-select {
            width: 120px;
        }
    }
    .el-form {
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        .el-form-item {
            margin: 0 0 0 15px;
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
.chart {
    display: flex;
    align-items: center;
    margin: 10px 0 0 0;
    h3 {
        margin-right: 15px;
    }
    .el-tag {
        margin: 0 5px;
        cursor: pointer;
    }
}
</style>
