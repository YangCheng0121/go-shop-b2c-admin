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
import Basic from './components/Edit/Basic'
import Info from './components/Edit/Info'
import { updateMember } from '@/api/member'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    Basic,
    Info,
    ConfirmBack
  },
  name: 'MemberEdit',
  data() {
    return {
      colLayout: {
        span: 3
      }
    }
  },
  created() {
    this._getMember()
  },
  methods: {
    /**
     * 获取会员
     * @private
     */
    _getMember() {
      const id = this.$route.params.id
      this.$store.dispatch('GetMember', id).then((data) => {
        const setting = []
        if (data['is_enabled']) {
          setting.push('is_enabled')
        }
        this.$nextTick(() => {
          this.$refs.Basic.setFormFieldsValue({
            email: data.email,
            phone: data.phone,
            rank: data.member_rank_id,
            setting: setting
          })

          this.$refs.Info.setFormFieldsValue({
            name: data.name,
            gender: data.gender,
            mobile: data.mobile
          })
        })
      })
    },
    /**
     * 提交表单
     */
    async handleSubmit() {
      const basicParam = await this.$refs.Basic.handleSubmit()
      const infoParam = await this.$refs.Info.handleSubmit()

      const member = Object.assign({}, basicParam, infoParam)
      this._updateMember(member)
    },
    /**
     * 更新会员
     * @param member
     * @private
     */
    _updateMember(member) {
      this.spinning = true
      updateMember(JSON.stringify(member)).then((res) => {
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
