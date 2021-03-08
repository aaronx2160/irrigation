<template>
    <div class="wrapper">
        <div slot="header" class="card-header">
            <div class="header-btn">
                <el-button
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    @click="addMeasureEquipmentTypeVisible = true"
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
                <el-table :data="formData" style="width: 100%;" border stripe>
                    <el-table-column type="selection" align="center">
                    </el-table-column>
                    <el-table-column
                        label="计量设施类型"
                        prop="MeasureEquipmentType"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        prop="createdAt"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="修改时间"
                        prop="editedAt"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" prop="" align="center">
                        <template>
                            <el-button
                                size="mini"
                                type="warning"
                                @click="addMeasureEquipmentTypeVisible = true"
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
            title="新增"
            :visible.sync="addMeasureEquipmentTypeVisible"
            width="30%"
        >
            <el-form ref="form" label-width="auto">
                <el-form-item label="计量设施类型:">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMeasureEquipmentTypeVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="addMeasureEquipmentTypeVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="editMeasureEquipmentTypeVisible"
            width="30%"
        >
            <el-form ref="form" label-width="auto">
                <el-form-item label="计量设施类型:">
                    <el-input></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editMeasureEquipmentTypeVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="editMeasureEquipmentTypeVisible = false"
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
            formData: [
                {
                    MeasureEquipmentType: '脉冲水表计量',
                    createdAt: '2016-10-17 15:36:14',
                    editedAt: '2018-11-09 17:02:08',
                },
            ],
            addMeasureEquipmentTypeVisible: false,
            editMeasureEquipmentTypeVisible: false,
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
.wrapper {
    margin-top: 15px;
}
.card-header {
    display: flex;
    align-items: center;
    justify-content: left;
}
.el-form {
    margin: 0 auto;
    width: 200px;
}
</style>
