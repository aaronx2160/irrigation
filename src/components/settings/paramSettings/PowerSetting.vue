<template>
    <div class="wrapper">
        <div slot="header" class="card-header">
            <div class="header-btn">
                <el-button
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    @click="addPowerSettingVisible = true"
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
                        label="下行百分比"
                        prop="regionCode"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="上行百分比"
                        prop="regionName"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" prop="" align="center">
                        <template>
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
            title="新增功率信息"
            :visible.sync="addPowerSettingVisible"
            width="30%"
        >
            <el-form ref="form" label-width="auto">
                <el-form-item label="上行百分比:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="下行百分比:">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addPowerSettingVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="addPowerSettingVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="修改区域"
            :visible.sync="editThreePowerVoltageVisible"
            width="50%"
        >
            <el-form ref="form" label-width="auto" inline>
                <el-form-item label="电压值:">
                    <el-input></el-input>
                </el-form-item>
                <br />
                <el-form-item label="A相电压上限:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="A相电压下限:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="B相电压上限:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="B相电压下限:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="C相电压上限:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="C相电压下限:">
                    <el-input></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editThreePowerVoltageVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="editThreePowerVoltageVisible = false"
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
                    value: '灌溉',
                    label: '灌溉',
                },
                {
                    value: '工业',
                    label: '工业',
                },
                {
                    value: '生活',
                    label: '生活',
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
            addPowerSettingVisible: false,
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
