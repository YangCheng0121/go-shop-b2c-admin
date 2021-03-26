<template>
  <div>
    <a-button type="primary" html-type="submit" @click="confirm" :loading="loading">
      确定
    </a-button>
    <a-button type="default" class="button" @click="back" style="margin-left: 8px">
      返回
    </a-button>
  </div>
</template>

<script type="es6">
export default {
  name: 'ConfirmBack',
  props: {
    loading: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    back() {
      this.$emit('back')
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">

</style>
