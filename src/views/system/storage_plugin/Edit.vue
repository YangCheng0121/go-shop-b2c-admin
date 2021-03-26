<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-form
        v-bind="formLayout"
        :form="form"
        slot="content">
        <a-form-item label="存储方式名称">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入存储方式名称!' }] },
            ]"
            placeholder="请输入存储方式名称"/>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            v-decorator="['description']"
            placeholder="请输入描述"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
        <a-form-item label="排序">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"
            :min="0"
            type="number"/>
        </a-form-item>
        <a-form-item label="启用">
          <a-checkbox-group v-decorator="['is_enabled']">
            <a-checkbox :value="1"/>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="_handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { pluginEdit } from '@/mixins'
import { updatePluginConfig } from '@/api/plugin_config'
import { ERR_OK } from '@/api/config'

export default {
  mixins: [pluginEdit],
  name: 'LoginPluginEdit',
  created() {
    this._getPluginConfig().then((data) => {
      const attributes = this.pluginConfig.attributes
      this.$nextTick(() => {
        this.setFormFieldsValue({
          name: attributes.name,
          orders: data.orders,
          description: attributes.description,
          is_enabled: [data.is_enabled]
        })
      })
    })
  },
  methods: {
    _handleSubmit() {
      this.handleSubmit().then((values) => {
        const pluginConfig = {}
        pluginConfig.id = this.pluginConfig.id
        pluginConfig.orders = Number(values.orders)
        pluginConfig.is_enabled = values.is_enabled[0]
        const attributes = {
          name: values.name
        }
        pluginConfig.attributes = JSON.stringify(attributes)
        this.spinning = true
        updatePluginConfig(JSON.stringify(pluginConfig)).then((res) => {
          if (res.err_code === ERR_OK) {
            this.spinning = false
            this.$router.back()
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  position: relative;

  .logo-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
