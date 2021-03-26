<template>
  <box class="padding-10px">
    <div slot="content">
      <a-tabs type="card">
        <a-tab-pane key="Basic" tab="基本信息">
          <basic ref="Basic"/>
        </a-tab-pane>
        <a-tab-pane key="Info" tab="个人资料" forceRender>
          <info ref="Info"/>
        </a-tab-pane>
      </a-tabs>
      <a-row>
        <a-col v-bind="colLayout"></a-col>
        <a-col>
          <confirm-back @confirm="handleSubmit"/>
        </a-col>
      </a-row>
    </div>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import Basic from './components/Add/Basic'
import Info from './components/Add/Info'
import { addMember } from '@/api/member'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    Basic,
    Info,
    ConfirmBack
  },
  name: 'MemberAdd',
  data() {
    return {
      colLayout: {
        span: 3
      }
    }
  },
  methods: {
    /**
     * 提交表单
     */
    async handleSubmit() {
      const basicParam = await this.$refs.Basic.handleSubmit()
      const infoParam = await this.$refs.Info.handleSubmit()

      const member = Object.assign({}, basicParam, infoParam)
      this._addMember(member)
    },
    /**
     * 添加会员
     * @param member
     * @private
     */
    _addMember(member) {
      this.spinning = true
      addMember(JSON.stringify(member)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        } else {
          this.$message.error(res.data)
        }
        this.spinning = false
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
