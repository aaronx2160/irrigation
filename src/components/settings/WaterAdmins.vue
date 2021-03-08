<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>水管区域</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div slot="header" class="card-header">
                <div class="region">
                    <template>
                        省：
                        <el-select
                            v-model="provinceSelected"
                            placeholder="请选择"
                            @change="handleProvinceChange"
                        >
                            <el-option
                                v-for="item in provinces"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template>
                        市：
                        <el-select v-model="citySelected" placeholder="请选择">
                            <el-option
                                v-for="item in cities"
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
                        @click="addWaterAreaDialogVisible = true"
                        >新增</el-button
                    >
                </div>
            </div>
            <div>
                <template>
                    <el-table
                        :data="waterAreaList"
                        style="width: 100%;"
                        border
                        stripe
                    >
                        <el-table-column
                            label="水管区域编码"
                            prop="AreaCode"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="省"
                            prop="Province"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column label="市" prop="City" align="center">
                        </el-table-column>
                        <el-table-column
                            label="水利局"
                            prop="District"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="备注"
                            prop="Remark"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="添加时间"
                            prop="CreateAt"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column label="操作" prop="" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="warning"
                                    @click="editRegionDialogVisible = true"
                                    >修改</el-button
                                >
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDeleteWaterArea(scope.row.id)"
                                    >删除</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <el-dialog
            :title="'新增区域-所属区域【' + waterAreaAddForm.province + '】'"
            ref="waterAreaAddForm"
            :model="waterAreaAddForm"
            :visible.sync="addWaterAreaDialogVisible"
            width="30%"
        >
            <el-form label-width="auto" label-position="left">
                <el-form-item label="省:">
                    <el-input
                        size="mini"
                        v-model="waterAreaAddForm.province"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="市:">
                    <el-input
                        size="mini"
                        v-model="waterAreaAddForm.city"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="水利局:">
                    <el-input
                        size="mini"
                        v-model="waterAreaAddForm.district"
                    ></el-input>
                </el-form-item>
                <el-form-item label="区域编码:">
                    <el-input
                        size="mini"
                        v-model="waterAreaAddForm.areaCode"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input
                        type="textarea"
                        v-model="waterAreaAddForm.remark"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addWaterAreaDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="handleAddWaterArea"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="修改区域"
            :visible.sync="editRegionDialogVisible"
            width="30%"
        >
            <el-form label-width="auto" label-position="left">
                <el-form-item label="区域编码:" prop="">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="区域名称:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input></el-input>
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
import { GETWATERAREAS } from '../../store/types'

export default {
    data() {
        return {
            provinces: [
                {
                    value: '陕西省',
                    label: '陕西省',
                    children: [
                        {
                            value: '宝鸡市',
                            label: '宝鸡市',
                        },
                        {
                            value: '西安市',
                            label: '西安市',
                        },
                    ],
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
            cities: [{ value: '', label: '' }],
            provinceSelected: '',
            citySelected: '',
            waterAreaList: [],
            waterAreaAddForm: {
                province: '陕西省',
                city: '宝鸡市',
                district: '',
                areaCode: '',
                remark: '',
            },
            addWaterAreaDialogVisible: false,
            editRegionDialogVisible: false,
        }
    },
    mounted() {
        this.waterAreaList = this.$store.getters.getAreas
        console.log(this.waterAreaList)
    },
    methods: {
        async handleAddWaterArea() {
            const { data: res } = await this.$http.post(
                '/api/waterArea',
                this.waterAreaAddForm
            )

            if (res.meta.status !== 200)
                return this.$message.error('添加水管区域失败')

            this.$message.success('成功添加水管区域')
            this.addWaterAreaDialogVisible = false
            this.$refs.waterAreaAddForm.resetFields()
            await this.$store.dispatch(GETWATERAREAS)
        },
        handleDeleteWaterArea(id) {
            console.log(id)
            this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async (value) => {
                    if (value === 'confirm') {
                        const { data: res } = await this.$http.delete(
                            '/api/waterArea/' + id
                        )
                        if (res.meta.status !== 200) {
                            this.$message.error(res.meta.msg)
                        } else {
                            this.$message.success(res.meta.msg)
                            await this.$store.dispatch(GETWATERAREAS)
                        }
                    }
                })
                .catch((err) => {
                    if (err) return this.$message.error('已取消删除水管区域')
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
.card-header {
    display: flex;
    align-items: center;
    justify-content: left;
    .region {
        .el-select {
            width: 120px;
        }
    }
    .header-btn {
        margin-left: 15px;
    }
}
</style>
