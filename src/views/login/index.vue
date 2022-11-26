<template>
  <div id="login-bg">
    <div class="login-container">
      <h3 class="title">管理员登录</h3>
      <el-form size="medium" :model="admin" status-icon :rules="rules" ref="adminForm">
        <el-form-item prop="user">
          <div class="user">
            <span class="el-icon-user-solid"></span>
            <el-input v-model="admin.user" type="text" placeholder="用户名"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="pass">
          <div class="user">
            <span class="el-icon-s-tools"></span>
            <el-input v-model="admin.pass" type="password" placeholder="密码"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '../../api/admin'
export default {
  name: 'Login',
  data() {
    return {
      admin: {},
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.adminForm.validate(async valid => {
        if (valid) {
          let result = await login({ user: this.admin.user, pass: this.admin.pass })
          if (!result.err) {
            sessionStorage.setItem('login', 'true')
            this.$message.success(result.msg)
            await this.$router.push('/admin')
          } else this.$message.error(result.msg)
        } else {
          this.$message.error('请修改错误项')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login-bg {
  height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 40rem;
    color: white;
    text-align: center;
    .title {
      font-size: 3rem;
      margin-bottom: 4rem;
    }
    .user {
      text-align: left;
      border: 2px solid #3e4957;
      padding-left: 1rem;
      border-radius: 4px;
    }
    .el-input {
      width: 90%;
    }
    .el-button {
      width: 100%;
    }
    /deep/ input {
      background-color: transparent;
      border: 0;
      border-radius: 0;
      color: white;
    }
    /deep/ input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #2d3a4b inset !important;
      box-shadow: inset 0 0 0 1000px #2d3a4b !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
}
</style>
