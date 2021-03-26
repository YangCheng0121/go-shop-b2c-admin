<template>
  <a-spin :spinning="spinning">
    <box>
      <a-form
        :form="form"
        v-bind="formLayout"
        class="padding-10px"
        slot="content">
        <a-form-item label="上级地区">
          <span>{{ parentArea ? parentArea.name : '顶级地区' }}</span>
        </a-form-item>
        <a-form-item label="名称">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入名称!' }] },
            ]"
            placeholder="请输入名称"/>
        </a-form-item>
        <a-form-item label="排序">
          <a-input
            v-decorator="['order']"
            placeholder="请输入排序"
            type="number"/>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import { mapGetters } from 'vuex'
import { addArea } from '@/api/area'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack
  },
  name: 'AreaAdd',
  computed: {
    ...mapGetters([
      'parentArea'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'AreaAdd' }),
      formLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 8
        }
      },
      spinning: false
    }
  },
  created() {
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const area = values
          area.parent_id = this.parentArea ? this.parentArea.id : ''
          this.spinning = true
          addArea(JSON.stringify(area)).then((res) => {
            if (res.err_code === ERR_OK) {
              this.spinning = false
              this.$router.back()
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
