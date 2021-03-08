<template>
    <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>行政区域</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div slot="header" class="card-header">
                <div class="header-btn">
                    <el-button
                        type="success"
                        icon="el-icon-circle-plus-outline"
                        size="small"
                        @click="addRegionDialogVisible = true"
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
                    <el-table
                        :data="regionData"
                        style="width: 100%;"
                        border
                        stripe
                    >
                        <el-table-column type="selection" align="center">
                        </el-table-column>
                        <el-table-column
                            label="区域编码"
                            prop="regionCode"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="区域名称"
                            prop="regionName"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="区域级别"
                            prop="regionLevel"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="父区域"
                            prop="parentRegion"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="备注"
                            prop="description"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="创建时间"
                            prop="createdAt"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column label="操作" prop="" align="center">
                            <template>
                                <el-button
                                    size="mini"
                                    type="warning"
                                    @click="editRegionDialogVisible = true"
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
        </el-card>
        <el-dialog
            title="新增区域-所属区域【陕西省】"
            :visible.sync="addRegionDialogVisible"
            width="30%"
        >
            <el-form label-width="auto" label-position="left">
                <el-form-item label="区域编码:">
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
                <el-button @click="addRegionDialogVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="addRegionDialogVisible = false"
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
                <el-form-item label="区域编码:">
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
            addRegionDialogVisible: false,
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
    },
}
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    align-items: center;
    justify-content: left;
}
</style>
