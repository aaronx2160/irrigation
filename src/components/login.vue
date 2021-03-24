<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/companyLogo/2.png" alt="company logo" />
      </div>
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-username"
            placeholder="登录名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { CHANGEUSR } from '../store/types'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin123456'
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$store
          .dispatch(CHANGEUSR, { payload: this.loginForm })
          .then(res => {
            if (!res.token) {
              return this.$message.error(res.msg)
            }
            window.sessionStorage.setItem('token', res.token)
            this.$message.success(res.msg)
            this.$router.push('/welcome')
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background: url('../assets/images/RicePaddy.jpg') no-repeat;
  background-size: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    /*box-shadow: 0 0 10px #ddd;*/
    box-shadow: 0 0 25px lightskyblue;
    position: absolute;
    left: 50%;
    /*transform:  rotate(180deg);*/
    background-color: #fff;
    animation: change 10s linear infinite;
    @keyframes change {
      from {
        transform: translate(-50%, -50%) rotate(0deg); //rotate:旋转0度
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg); //rotate:旋转360度
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
