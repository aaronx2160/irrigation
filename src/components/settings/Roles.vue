<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisible = true"
                        >添加角色</el-button
                    >
                </el-col>
            </el-row>
            <el-table :data="roleList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column
                    label="角色名称"
                    prop="RoleName"
                ></el-table-column>
                <el-table-column
                    label="角色描述"
                    prop="Remark"
                ></el-table-column>
                <el-table-column
                    label="角色代码"
                    prop="RoleCode"
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="CreateTime"
                ></el-table-column>
                <el-table-column
                    label="修改时间"
                    prop="EditTime"
                ></el-table-column>
                <el-table-column width="300px" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click="preRoleToEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="deleteRole(scope.row.Id)"
                            >删除</el-button
                        >
                        <el-button
                            size="mini"
                            type="warning"
                            icon="el-icon-setting"
                            @click="openRoleRightsEditDialog(scope.row)"
                            >权限分配</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--        添加角色对话框-->
        <el-dialog
            title="添加角色"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addRoleClose"
        >
            <el-form
                :model="rolesToAdd"
                :rules="addRoleRules"
                ref="AddRoleForm"
                label-width="100px"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="rolesToAdd.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色代码" prop="roleCode">
                    <el-input v-model="rolesToAdd.roleCode"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="rolesToAdd.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>
        <!--        编辑角色对话框-->
        <el-dialog
            title="编辑角色"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editRoleClose"
        >
            <el-form
                :model="roleToEdit"
                :rules="addRoleRules"
                ref="EditRoleForm"
                label-width="100px"
            >
                <el-form-item label="角色名称">
                    <el-input v-model="roleToEdit.RoleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="roleToEdit.Remark"></el-input>
                </el-form-item>
                <el-form-item label="角色代码">
                    <el-input v-model="roleToEdit.RoleCode"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRole">确 定</el-button>
            </span>
        </el-dialog>
        <!--        权限分配对话框-->
        <el-dialog
            :title="`【${roleNameToAddRights}】角色分配权限`"
            :visible.sync="settingDialogInvisible"
            width="30%"
            @close="settingRightDialogClose()"
        >
            <el-tree
                :data="rightsTree"
                :props="treeProps"
                node-key="Id"
                show-checkbox
                :default-checked-keys="defKeys"
                ref="rightsTreeRef"
            >
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="settingDialogInvisible = false">
                    取 消
                </el-button>
                <el-button type="primary" @click="allocateRightsKeys">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { GETROLELIST } from '../../store/types'

export default {
    name: 'Roles',
    data() {
        return {
            roleList: [],
            addDialogVisible: false,
            editDialogVisible: false,
            settingDialogInvisible: false,
            rolesToAdd: {
                roleName: '',
                roleDesc: '',
                roleCode: '',
                parentCode: '',
            },
            addRoleRules: {
                roleName: [
                    {
                        required: true,
                        message: 'role name is required',
                        trigger: 'blur',
                    },
                ],
                roleCode: [
                    {
                        required: true,
                        message: 'role code is required',
                        trigger: 'blur',
                    },
                ],
            },
            roleToEdit: {},
            rightsTree: [],
            treeProps: {
                label: 'MenuName',
                children: 'children',
                id: 'Id',
            },
            defKeys: [],
            roleNameToAddRights: '',
            roleCodeToAddRights: '',
        }
    },
    created() {
        this.getRolesList()

        this.rightsTree = this.$store.getters.getMenuList
    },
    methods: {
        getRolesList() {
            this.$store.dispatch(GETROLELIST).then(() => {
                this.roleList = this.$store.getters.getRoleList
            })
        },
        addRoleClose() {
            this.$refs.AddRoleForm.resetFields()
        },
        addRole() {
            this.$refs.AddRoleForm.validate(async (valid) => {
                if (!valid) return
                this.rolesToAdd.parentCode = this.$store.state.user.rid
                const { data: res } = await this.$http.post(
                    '/api/roles',
                    this.rolesToAdd
                )
                if (res.meta.status !== 201)
                    return this.$message.error('添加角色失败')
                this.$message.success('添加角色成功:)')
                this.getRolesList()
                this.addDialogVisible = false
            })
        },
        editRoleClose() {
            this.$refs.EditRoleForm.resetFields()
        },
        preRoleToEdit(scope) {
            console.log(scope)
            this.roleToEdit = scope
            this.editDialogVisible = true
        },
        editRole() {
            this.$refs.EditRoleForm.validate(async (valid) => {
                if (!valid) return
                const { Id, RoleName, Remark, RoleCode } = this.roleToEdit
                const { data: res } = await this.$http.put(`/api/roles/${Id}`, {
                    RoleName,
                    Remark,
                    RoleCode,
                })
                if (res.meta.status !== 200)
                    return this.$message.error('编辑角色失败')
                this.editDialogVisible = false
                this.getRolesList()
                this.$message.success('编辑角色成功')
            })
        },
        async deleteRole(id) {
            const confirmRes = await this.$confirm(
                '此操作将永久删除该角色, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((err) => err)
            if (confirmRes === 'confirm') {
                const { data: res } = await this.$http.delete(
                    `/api/roles/${id}`
                )
                if (res.meta.status !== 200)
                    return this.$message.error(res.meta.msg)
                this.$message.success('删除角色成功')
                this.getRolesList()
                this.editDialogVisible = false
            } else {
                return this.$message.info('已取消删除')
            }
        },
        async removeRightById(role, rightId) {
            const confirmRes = await this.$confirm(
                '此操作将永久删除该权限, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((err) => err)
            if (confirmRes !== 'confirm')
                return this.$message.info('已取消删除！')
            const { data: res } = await this.$http.delete(
                `roles/${role.id}/rights/${rightId}`
            )

            if (res.meta.status !== 200)
                return this.$message.error('删除权限失败')
            this.$message.success('删除权限成功！')
            role.children = res.data
        },
        openRoleRightsEditDialog(role) {
            this.settingDialogInvisible = true
            this.roleCodeToAddRights = role.RoleCode
            this.roleNameToAddRights = role.RoleName
            this.getDefaultKeys(role.Id)
        },
        async getDefaultKeys(roleId) {
            const { data: res } = await this.$http.get(
                '/api/defaultRights/' + roleId
            )
            if (res.meta.status !== 200)
                return this.$message.error('获取权限已开启权限失败')
            res.data.map((v) => {
                this.defKeys.push(v.Id)
            })
            this.$refs.rightsTreeRef.setCheckedKeys(this.defKeys)
        },
        getLevel3RightsKeys(node, arr) {
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach((item) => this.getLevel3RightsKeys(item, arr))
        },
        settingRightDialogClose() {
            this.defKeys = []
        },
        async allocateRightsKeys() {
            const roleCode = this.roleCodeToAddRights
            const keys = [
                ...this.$refs.rightsTreeRef.getCheckedKeys(),
                ...this.$refs.rightsTreeRef.getHalfCheckedKeys(),
            ]
            const keysStr = keys.join(',')
            const { data: res } = await this.$http.post('/api/editRights/', {
                roleCode,
                menuId: keysStr,
            })

            if (res.meta.status !== 200)
                return this.$message.error('分配权限失败')
            this.$message.success('分配权限成功')
            this.settingDialogInvisible = false
        },
    },
}
</script>

<style lang="less" scoped>
.el-tag {
    margin: 7px;
}
.bdTop {
    border-top: 1px solid #eee;
}
.bdBtm {
    border-bottom: 1px solid #eee;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>
