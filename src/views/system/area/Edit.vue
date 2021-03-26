<template>
  <a-spin :spinning="spinning">
    <box>
      <a-form
        v-bind="formLayout"
        :form="form"
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
            v-decorator="['orders']"
            placeholder="请输入排序"
            type="number"
            :min="0"/>
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
import { getArea, updateArea } from '@/api/area'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack
  },
  name: 'AreaEdit',
  computed: {
    ...mapGetters([
      'currentArea',
      'parentArea'
    ])
  },
  watch: {
    currentArea: {
      handler(area) {
        if (area) {
          this.setFormFieldsValue(area)
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'AreaEdit' }),
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
    if (!this.currentArea) {
      this.$router.push({ name: 'AreaList' })
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(currentArea) {
      this.$nextTick(() => {
        this._getParentArea(currentArea).then(() => {
          this.form.setFieldsValue({
            name: currentArea.name,
            orders: currentArea.orders
          })
        })
      })
    },
    /**
     * 获取上级地区
     */
    _getParentArea(area) {
      return new Promise(resolve => {
        getArea(area.parent_id).then((res) => {
          if (res.err_code === ERR_OK) {
            if (res.data === true) {
              this.$store.dispatch('SetParentArea', null)
            } else {
              this.$store.dispatch('SetParentArea', res.data)
            }
            resolve()
          }
        })
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const area = values
          area.id = this.currentArea.id
          area.orders = Number(area.orders)
          this.spinning = true
          updateArea(JSON.stringify(area)).then((res) => {
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
