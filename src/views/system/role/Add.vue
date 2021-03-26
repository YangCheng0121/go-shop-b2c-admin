<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-form
        v-bind="formLayout"
        :form="form"
        slot="content">
        <a-form-item label="名称">
          <a-col v-bind="inputLayout">
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入名称!' }] },
              ]"
              placeholder="请输入名称"/>
          </a-col>
        </a-form-item>
        <a-form-item label="值">
          <a-col v-bind="inputLayout">
            <a-input
              v-decorator="[
                'value',
                { rules: [{ required: true, message: '请输入值!' }] },
              ]"
              placeholder="请输入值"/>
          </a-col>
        </a-form-item>
        <a-form-item label="描述">
          <a-col v-bind="inputLayout">
            <a-input
              v-decorator="['description']"
              placeholder="请输入描述"/>
          </a-col>
        </a-form-item>
        <a-form-item label="商品管理">
          <a-checkbox-group v-decorator="['productGroup']">
            <a-checkbox
              v-for="item in filterPermissions('productGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="订单管理">
          <a-checkbox-group v-decorator="['orderGroup']">
            <a-checkbox
              v-for="item in filterPermissions('orderGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="会员管理">
          <a-checkbox-group v-decorator="['memberGroup']">
            <a-checkbox
              v-for="item in filterPermissions('memberGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="内容管理">
          <a-checkbox-group v-decorator="['contentGroup']">
            <a-checkbox
              v-for="item in filterPermissions('contentGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="营销管理">
          <a-checkbox-group v-decorator="['marketingGroup']">
            <a-checkbox
              v-for="item in filterPermissions('marketingGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="统计管理">
          <a-checkbox-group v-decorator="['statisticsGroup']">
            <a-checkbox
              v-for="item in filterPermissions('statisticsGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="系统管理">
          <a-checkbox-group v-decorator="['systemGroup']">
            <a-checkbox
              v-for="item in filterPermissions('systemGroup',permissions)"
              :key="item.id"
              :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack, Tinymce, UploadButton } from '@/components'
import { ERR_OK } from '@/api/config'
import { addRole } from '@/api/role'
import { mapGetters } from 'vuex'

export default {
  components: {
    Box,
    ConfirmBack,
    UploadButton,
    Tinymce
  },
  name: 'RoleAdd',
  computed: {
    ...mapGetters([
      'permissions'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'RoleEdit' }),
      formLayout: {
        labelCol: {
          span: 3,
          sm: 6,
          md: 6,
          xl: 3
        },
        wrapperCol: {
          span: 21,
          sm: 18,
          md: 18,
          xl: 21
        }
      },
      inputLayout: {
        span: 6,
        sm: 10,
        md: 10,
        xl: 6
      },
      spinning: false,
      role: null
    }
  },
  created() {
    this.$store.dispatch('GetPermissions')
  },
  methods: {
    /**
     * 获取对应 module 的 permission
     */
    filterPermissions(module, permissions) {
      return permissions.filter((value) => {
        return value.module === module
      })
    },
    /**
     * 获取选中的 permission
     */
    filterPermissionsCheck(module, permissions) {
      return this.filterPermissions(module, permissions).map((item) => {
        return item.id
      })
    },
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const role = {}
          role.name = values.name
          const productGroup = this.getPermissions(values.productGroup)
          const orderGroup = this.getPermissions(values.orderGroup)
          const memberGroup = this.getPermissions(values.memberGroup)
          const contentGroup = this.getPermissions(values.contentGroup)
          const marketingGroup = this.getPermissions(values.marketingGroup)
          const statisticsGroup = this.getPermissions(values.statisticsGroup)
          const systemGroup = this.getPermissions(values.systemGroup)

          role.permissions = [
            ...productGroup,
            ...orderGroup,
            ...memberGroup,
            ...contentGroup,
            ...marketingGroup,
            ...statisticsGroup,
            ...systemGroup
          ]

          this.spinning = true
          addRole(JSON.stringify(role)).then((res) => {
            if (res.err_code === ERR_OK) {
              this.spinning = false
              this.$router.back()
            }
          })
        }
      })
    },
    /**
     * 获取 Permission 数组
     */
    getPermissions(ids) {
      ids = ids || []
      const permissions = []
      ids.forEach((id) => {
        const permission = this.permissions.find((value) => {
          return value.id === id
        })
        permissions.push(permission)
      })
      return permissions
    }
  }
}
</script>

<style scoped lang="less">
</style>
