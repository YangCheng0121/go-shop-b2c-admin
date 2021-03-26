<template>
  <page-header-wrapper>
    <a-spin :spinning="spinning">
      <box class="box">
        <template v-slot:content>
          <a-tabs :activeKey="activeKey" @change="key => activeKey = key">
            <a-tab-pane key="basic" tab="基本设置" forceRender>
              <basic ref="Basic"/>
            </a-tab-pane>
            <a-tab-pane key="display" tab="显示设置" forceRender>
              <display ref="Display"/>
            </a-tab-pane>
            <a-tab-pane key="registerSafe" tab="注册与安全" forceRender>
              <register-safe ref="RegisterSafe"/>
            </a-tab-pane>
            <a-tab-pane key="email" tab="邮件设置" forceRender>
              <email ref="Email"/>
            </a-tab-pane>
            <a-tab-pane key="other" tab="其它设置" forceRender>
              <other ref="Other"/>
            </a-tab-pane>
          </a-tabs>
        </template>
        <template v-slot:footer>
          <a-row style="width: 100%">
            <a-col :span="footer.labelCol"></a-col>
            <a-col :span="footer.wrapperCol">
              <confirm-back @confirm="_confirm"/>
            </a-col>
          </a-row>
        </template>
      </box>
    </a-spin>
  </page-header-wrapper>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import Basic from './Basic'
import Display from './Display'
import RegisterSafe from './RegisterSafe'
import Email from './Email'
import Other from './Other'

export default {
  components: {
    Box,
    ConfirmBack,
    Basic,
    Display,
    RegisterSafe,
    Email,
    Other
  },
  name: 'SettingEdit',
  data() {
    return {
      footer: {
        labelCol: 3,
        wrapperCol: 8
      },
      spinning: false,
      activeKey: 'basic'
    }
  },
  methods: {
    async _confirm() {
      const params = {
        Setting: []
      }
      const basicParam = await this.$refs.Basic.handleSubmit()
      const displayParam = await this.$refs.Display.handleSubmit()
      const registerSafeParam = await this.$refs.RegisterSafe.handleSubmit()
      const emailParam = await this.$refs.Email.handleSubmit()
      const otherParam = await this.$refs.Other.handleSubmit()
      const arr = []
      arr.push(basicParam)
      arr.push(displayParam)
      arr.push(registerSafeParam)
      arr.push(emailParam)
      arr.push(otherParam)

      arr.forEach((item) => {
        for (const key in item) {
          params.Setting.push({
            Name: key,
            Value: item[key]
          })
        }
      })
      await this.$store.dispatch('UpdateSetting', params).then(() => {
        this.$store.dispatch('GetSettingList')
        this.activeKey = 'basic'
      })
    }
  }
}
</script>

<style scoped lang="less">
.box {
  padding: 20px;
}
</style>
