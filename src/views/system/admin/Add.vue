<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-tabs type="card" slot="content">
        <a-tab-pane key="Basic" tab="基本信息">
          <a-form
            v-bind="formLayout"
            :form="form">
            <a-form-item label="用户名">
              <a-input
                v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '请输入用户名!' }] },
                ]"
                placeholder="请输入用户名"/>
            </a-form-item>
            <a-form-item label="密码">
              <a-input
                v-decorator="[
                  'password1',
                  { rules: [{ required: true, message: '请输入密码!' }] },
                ]"
                type="password"
                placeholder="请输入密码"/>
            </a-form-item>
            <a-form-item label="确认密码">
              <a-input
                v-decorator="[
                  'password2',
                  { rules: [{ required: true, message: '请输入密码!' }] },
                ]"
                type="password"
                placeholder="请输入密码"/>
            </a-form-item>
            <a-form-item label="E-mail">
              <a-input
                v-decorator="[
                  'email',
                  { rules: [{ required: true, message: '请输入E-mail!' }] },
                ]"
                placeholder="请输入E-mail"/>
            </a-form-item>
            <a-form-item label="角色">
              <a-checkbox-group
                v-decorator="[
                  'roles',
                  { rules: [{ required: true, message: '请选择角色!' }] },
                ]">
                <a-checkbox v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
            <a-form-item label="设置">
              <a-checkbox-group v-decorator="['is_enabled']">
                <a-checkbox :value="1">是否启用</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
            <a-form-item label=" " :colon="false">
              <confirm-back @confirm="handleSubmit"/>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="Personal" tab="个人资料" forceRender>
          <a-form
            v-bind="formLayout"
            :form="secondForm">
            <a-form-item label="部门">
              <a-input
                v-decorator="['department']"
                placeholder="请输入部门"/>
            </a-form-item>
            <a-form-item label="姓名">
              <a-input
                v-decorator="['name']"
                placeholder="请输入姓名"/>
            </a-form-item>
            <a-form-item label=" " :colon="false">
              <confirm-back @confirm="handleSubmit"/>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack, Tinymce, UploadButton } from '@/components'
import { ERR_OK } from '@/api/config'
import { addAdmin } from '@/api/admin'
import { mapGetters } from 'vuex'

export default {
  components: {
    Box,
    ConfirmBack,
    UploadButton,
    Tinymce
  },
  name: 'AdminAdd',
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'AdminEdit' }),
      secondForm: this.$form.createForm(this, { name: 'SecondEdit' }),
      formLayout: {
        labelCol: {
          span: 3,
          sm: 6,
          md: 6,
          xl: 3
        },
        wrapperCol: {
          span: 6,
          sm: 10,
          md: 10,
          xl: 6
        }
      },
      spinning: false,
      admin: null
    }
  },
  created() {
    this.$store.dispatch('GetAllRole')
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 设置表单 Filed Value
     */
    setSecondFormFieldsValue(form) {
      this.secondForm.setFieldsValue(form)
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.secondForm.validateFields((err, secondValues) => {
            if (!err) {
              const username = values.username
              const password1 = values.password1
              const password2 = values.password2
              const email = values.email
              const isEnabled = values.is_enabled.join(',')
              const department = secondValues.department
              const nickname = secondValues.name
              const roles = values.roles.join(',')
              this.spinning = true
              addAdmin({
                username,
                password1,
                password2,
                email,
                isEnabled,
                department,
                nickname,
                roles
              }).then((res) => {
                if (res.err_code === ERR_OK) {
                  this.spinning = false
                  this.$router.back()
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
