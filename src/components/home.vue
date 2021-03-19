<template>
  <el-container class="home_container">
    <el-header>
      <div class="logo">
        <img src="../assets/companyLogo/1.png" alt="" />
        <span id="mingzi">农业水价综合改革云平台</span>
      </div>
      <div class="options">
        <el-button type="primary" size="mini" icon="el-icon-user-solid">{{
          user.username
        }}</el-button>
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-warning"
          @click="changPswdDialogVisible = true"
          >修改密码</el-button
        >
        <el-button
          type="info"
          size="mini"
          @click="logout"
          icon="el-icon-switch-button"
          >退出</el-button
        >
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapsed ? '64px' : '200px'">
        <div class="toggle_btn" @click="toggleMenu">|||</div>
        <el-menu
          background-color="#16b399"
          text-color="#fff"
          active-text-color="#ffc900"
          unique-opened
          :collapse="isCollapsed"
          :collapse-transition="false"
          router
        >
          <el-submenu
            :index="'/' + item2.MenuUrl"
            v-for="item2 in menuListReduced"
            :key="item2.Id"
          >
            <template slot="title">
              <i :class="iconsObj[item2.Id]"></i>
              <span>{{ item2.MenuName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.MenuUrl"
              v-for="subItem in item2.children"
              :key="subItem.id"
              :default-active="activePath"
              @click="saveNavState('/' + subItem.MenuUrl)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.MenuName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="changPswdDialogVisible"
      width="30%"
      @closed="pswdDialogClose"
    >
      <el-form
        ref="pswdForm"
        :model="pswdForm"
        :rules="pswdChangerules"
        label-width="100px"
      >
        <el-form-item label="用户名">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPswd">
          <el-input v-model="pswdForm.oldPswd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPswd">
          <el-input v-model="pswdForm.newPswd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="pswdConfirm">
          <el-input v-model="pswdForm.pswdConfirm" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changPswdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePswd">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { GETMENULIST, GETWELLLIST } from '../store/types'
import http from '@/utils/http'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.pswdForm.newPswd) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    return {
      user: {},
      menuListReduced: [],
      menuList: [],
      changPswdDialogVisible: false,
      pswdForm: {
        oldPswd: '',
        newPswd: '',
        pswdConfirm: ''
      },
      pswdChangerules: {
        oldPswd: [
          {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        newPswd: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        pswdConfirm: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      iconsObj: {
        '1': 'iconfont icon-user',
        '2': 'iconfont icon-shuju',
        '3': 'iconfont icon-quanxian',
        '4': 'iconfont icon-dingdan2',
        '5': 'iconfont icon-shuju',
        '6': 'iconfont icon-shuju',
        '7': 'iconfont icon-shuju',
        '8': 'iconfont icon-shuju',
        '26': 'iconfont icon-shuju'
      },
      isCollapsed: false,
      activePath: ''
    }
  },
  created() {
    this.user = this.$store.getters.getUser
  },
  mounted() {
    this.getMenuList()
    this.getDeviceList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async getMenuList() {
      const { rid } = this.user
      this.menuList = await http('get', `/api/menu/${rid}`, null)
      const arrTemp = this.menuList.slice(0)
      arrTemp.map(item => {
        item.children = []
      })
      for (let i = 0; i < arrTemp.length; i++) {
        arrTemp.map(item => {
          if (arrTemp[i].ParentMenuId === item.MenuCode) {
            item.children.push(arrTemp[i])
          }
        })
        if (arrTemp[i].MenuLevel === 1) {
          this.menuListReduced.push(arrTemp[i])
        }
      }

      this.$store.commit(GETMENULIST, this.menuListReduced)
      this.menuListReduced = this.$store.getters.getMenuList
    },
    getDeviceList() {
      this.$store.dispatch(GETWELLLIST)
    },
    changePswd() {
      this.$refs.pswdForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          '/api/changePassword/' + this.user.username,
          this.pswdForm
        )
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg + ', 请使用新密码再次登录')
        window.sessionStorage.clear()
        this.$router.history.push('/login')
      })
    },
    pswdDialogClose() {
      this.$refs.pswdForm.resetFields()
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;

  .el-header {
    background-color: #019f89;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .logo {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
      img {
        height: 60px;
        border-radius: 5px;
      }
    }
    .options {
      .el-button {
        cursor: pointer;
        margin: 0;
        padding: 7px;
      }
    }
  }
  .el-aside {
    background-color: #019f89;
    .toggle_btn {
      background-color: #019f89;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      color: white;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
    .el-menu {
      border-right: none;
    }
    .iconfont {
      margin-right: 10px;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
