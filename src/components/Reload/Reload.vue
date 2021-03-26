<template>
  <a-button icon="sync" @click="reload">刷新</a-button>
</template>

<script type="es6">
  import { APP_RELOAD } from '@/store/mutation-types'

  export default {
    name: 'Reload',
    methods: {
      reload() {
        this.$store.commit(APP_RELOAD)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
