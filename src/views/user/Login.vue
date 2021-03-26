<template>
  <div class="login-container">
    <a-spin :spinning="loading">
      <a-form class="login-form" :form="form" @submit="handleSubmit">
        <a-form-item label="账号:">
          <a-input
            size="large"
            type="text"
            placeholder="请输入账号"
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入帐户名' }] }
            ]">
            <a-icon slot="prefix" type="user" :style="iconStyle"/>
          </a-input>
        </a-form-item>
        <a-form-item label="密码:">
          <a-input-password
            size="large"
            placeholder="请输入密码"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }] }
            ]">
            <a-icon slot="prefix" type="lock" :style="iconStyle"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block>登录</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script type="es6">
import { login } from '@/api/user'
import { ERR_OK } from '@/api/config'
import { saveUser } from '@/cache'

export default {
  name: 'Login',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'Login' }),
      iconStyle: {
        color: 'rgba(0,0,0,.25)'
      },
      loading: false
    }
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this._login(values)
        }
      })
    },
    /**
     * 登录
     * @param form
     * @private
     */
    _login(form) {
      const username = form.username
      const password = form.password
      this.loading = true
      login({ username, password }).then((res) => {
        if (res.err_code === ERR_OK) {
          saveUser(res.data)
          this.$router.push('/')
        } else {
          this.$message.error(res.data)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}
</style>
