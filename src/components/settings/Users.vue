<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            clearable
            @clear="getUserList"
            ><el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button></el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <v-simple-table>
        <thead>
          <tr>
            <th>用户编码</th>
            <th>登录名称</th>
            <th>用户姓名</th>
            <th>用户电话</th>
            <th>所属行政区域</th>
            <th>所属水管区域</th>
            <th>角色名称</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.Id">
            <td>{{ user.UserCode }}</td>
            <td>{{ user.UserName }}</td>
            <td>{{ user.FullName }}</td>
            <td>{{ user.Mobile }}</td>
            <td>{{ user.AreaId }}</td>
            <td>{{ user.WaterAreaId }}</td>
            <td>{{ user.Remark }}</td>
            <td>
              <el-switch
                v-model="user.IsActive"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userStateChange(user.Id, user.IsActive)"
              >
              </el-switch>
            </td>
            <td>
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  circle
                  @click="showEditDialog(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  @click="deleteUser(user.Id)"
                ></el-button>
              </el-tooltip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!--        这是添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <!--            内容会主体区-->
      <el-form
        :model="addForm"
        :inline="true"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="110px"
      >
        <el-form-item label="所属行政区域 " prop="WaterAreaId">
          <el-select size="mini" v-model="province">
            <el-option
              v-for="item in areas"
              :key="item.id"
              :label="item.Province"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select size="mini" v-model="city">
            <el-option
              v-for="item in areas"
              :key="item.id"
              :label="item.City"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属水管区域" prop="AreaId">
          <el-select size="mini" v-model="district">
            <el-option
              v-for="item in areas"
              :key="item.id"
              :label="item.District"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户编码" prop="UserCode">
          <el-input v-model="addForm.UserCode" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="Authority">
          <el-select v-model="roleValue" size="mini">
            <el-option
              v-for="item in roleList"
              :key="item.Id"
              :label="item.RoleName"
              :value="item.RoleCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名称" prop="UserName">
          <el-input v-model="addForm.UserName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="UserPassword">
          <el-input v-model="addForm.UserPassword" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="用户姓名" prop="FullName">
          <el-input v-model="addForm.FullName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="Mobile">
          <el-input v-model="addForm.Mobile" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="Email">
          <el-input v-model="addForm.Email" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="Address">
          <el-input v-model="addForm.Address" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="addForm.Remark" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <!--            内容会主体区-->
      <el-form
        :model="userToEdit"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userToEdit.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userToEdit.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="userToEdit.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改角色"
      :visible.sync="roleAllotDialogVisible"
      width="50%"
    >
      <el-form
        :model="userToAllot"
        :rules="addFormRules"
        ref="roleAllotFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userToAllot.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="现角色" prop="role_name">
          <el-input v-model="userToAllot.role_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="新角色" prop="new_role_name">
          <el-select v-model="roleSelected" placeholder="请选择新角色">
            <el-option
              v-for="role in roleList"
              :key="role.id"
              :label="role.roleName"
              :value="role.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAllotDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUserRoleChange"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    // 校验规则
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    let checkMobile = (rule, value, cb) => {
      const regMobile = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      user: {},
      areas: [],
      province: '陕西省',
      city: '宝鸡市',
      district: '陈仓区水利局',
      roleList: [],
      roleValue: 'user',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        WaterAreaId: '',
        AreaId: '',
        UserCode: '',
        UserName: '',
        UserPassword: '',
        Authority: '',
        FullName: '',
        Mobile: '',
        Email: '',
        Address: '',
        Remark: ''
      },
      addFormRules: {
        UserCode: [
          {
            required: true,
            message: '请填写用户编码',
            trigger: 'blur'
          }
        ],

        UserName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 15,
            message: '用户名的字数在5-15个字符',
            trigger: 'blur'
          }
        ],
        UserPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '用户名的字数在6-15个字符',
            trigger: 'blur'
          }
        ],
        Email: [
          {
            validator: checkEmail,
            message: '请输入合法邮箱',
            trigger: 'blur'
          }
        ],
        Mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            message: '请输入合法手机号',
            trigger: 'blur'
          }
        ]
      },
      editDialogVisible: false,
      userToEdit: {},
      roleAllotDialogVisible: false,
      userToAllot: {},
      roleSelected: '',
      rightsAllotDialogVisible: false
    }
  },
  mounted() {
    this.getUserList()
    this.roleList = this.$store.getters.getRoleList
    this.areas = this.$store.getters.getAreas
    this.user = this.$store.getters.getUser
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/api/users')
      if (res.meta.status !== 200) {
        return this.$message.error('数据获取失败')
      }
      res.data.forEach(item => {
        item.IsActive = item.IsActive !== 0
      })
      this.userList = res.data
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList(this.queryInfo)
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList(this.queryInfo)
    },
    async userStateChange(id, IsActive) {
      const { data: res } = await this.$http.put(`/api/user/${id}`, {
        userstate: IsActive
      })
      if (res.meta.status !== 200) {
        this.userList.forEach(v => {
          if (v.Id === id) {
            v.IsActive = !IsActive
          }
        })
        return this.$message.error('更新状态失败')
      }
      this.$message.success('更新状态成功')
    },
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        if (this.province === '陕西省') {
          this.province = 1
        }
        if (this.district === '陈仓区水利局') {
          this.district = 1
        }
        if (this.roleValue === 'user') {
          this.roleValue = 0
        }
        this.addForm.AreaId = this.province.toString()
        this.addForm.Authority = this.roleValue
        this.addForm.WaterAreaId = this.district.toString()
        this.addForm.ParentCode = this.user.usercode
        const { data: res } = await this.$http.post('/api/users', this.addForm)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg + ':(')
        }
        this.$message.success(res.meta.msg + ':)')
        this.addDialogVisible = false
        await this.getUserList()
      })
    },
    showEditDialog(scope) {
      this.userToEdit = scope
      this.editDialogVisible = true
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { email, mobile } = this.userToEdit
        const { data: res } = await this.$http.put(
          `users/${this.userToEdit.id}`,
          {
            email,
            mobile
          }
        )
        if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$message.success('修改用户成功')
        await this.getUserList()
        this.editDialogVisible = false
      })
    },
    async deleteUser(id) {
      const confirmRes = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmRes !== 'confirm') return this.$message.info('已取消删除')
      const { data: res } = await this.$http.delete(`/api/user/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      await this.getUserList()
    },
    async confirmUserRoleChange() {
      const id = this.userToAllot.id
      const rid = this.roleSelected
      const { data: res } = await this.$http.put(`users/${id}/role`, {
        id,
        rid
      })
      if (res.meta.status !== 200)
        return this.$message.error('重新分配角色失败')
      this.roleAllotDialogVisible = false
      await this.getUserList()
      this.$message.success('已重新分配角色')
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 180px;
}
</style>
