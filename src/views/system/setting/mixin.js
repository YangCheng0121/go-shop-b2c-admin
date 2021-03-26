import { mapGetters } from 'vuex'

const settingMixin = {
  computed: {
    ...mapGetters([
      'setting'
    ])
  },
  watch: {
    setting() {
      this.setFormFieldsValue()
    }
  },
  mounted() {
    this.setFormFieldsValue()
  }
}

export default settingMixin
