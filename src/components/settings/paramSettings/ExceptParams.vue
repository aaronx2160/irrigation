<template>
    <div class="wrapper">
        <div slot="header" class="card-header">
            <div class="header-btn">
                <el-button
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    @click="addExceptParamsVisible = true"
                    >新增</el-button
                >
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="small"
                    @click="handleDeleteRegion"
                    >删除</el-button
                >
            </div>
        </div>
        <div>
            <template>
                <el-table :data="regionData" style="width: 100%;" border stripe>
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column
                        label="所属水管区域"
                        prop="regionCode"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="起始时间"
                        prop="regionName"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="结束时间"
                        prop="regionName"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="最长不不在线(天)"
                        prop="regionName"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="起始时间最长用水量不变天数(天)"
                        prop="regionName"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" prop="" align="center">
                        <template>
                            <el-button size="mini" type="warning"
                                >修改</el-button
                            >
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDeleteRegion"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <el-dialog
            title="新增机井异常参数"
            :visible.sync="addExceptParamsVisible"
            width="50%"
        >
            <el-form ref="form" label-width="auto" inline>
                <el-form-item label="水管区域:">
                    <template>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in provinces"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="起始时间:">
                    <el-date-picker type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-date-picker type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="最长不在线（天）:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="最长用水量不变天数（天）:">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addExceptParamsVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="addExceptParamsVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="修改区域"
            :visible.sync="editRegionDialogVisible"
            width="80%"
        >
            <el-form label-width="auto" label-position="left">
                <el-form-item>
                    <el-image
                        src="https://s3.ax1x.com/2021/01/06/sEEmM4.png"
                    ></el-image>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editRegionDialogVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="editRegionDialogVisible = false"
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
            provinces: [
                {
                    value: '陕西',
                    label: '陕西',
                },
                {
                    value: '山西',
                    label: '山西',
                },
                {
                    value: '河南',
                    label: '河南',
                },
            ],
            cities: [{ value: '', label: '' }],
            provinceSelected: '',
            citySelected: '',
            regionData: [
                {
                    regionCode: 0o1,
                    regionName: '宝鸡市',
                    regionLevel: 1,
                    parentRegion: '陕西省',
                    createdAt: Date.now(),
                    description: '',
                },
            ],
            addExceptParamsVisible: false,
            editRegionDialogVisible: false,
        }
    },
    methods: {
        handleDeleteRegion() {
            this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
        },
        handleProvinceChange(value) {
            this.citySelected = ''
            const provinceSelected = this.provinces.filter((item) => {
                return item.value === value
            })
            this.cities = provinceSelected[0].children
            this.citySelected = this.cities[0].label
        },
    },
}
</script>

<style lang="less" scoped>
.wrapper {
    margin-top: 15px;
}
.card-header {
    display: flex;
    align-items: center;
    justify-content: left;
}
</style>
