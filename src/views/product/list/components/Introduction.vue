<template>
  <a-form>
    <a-form-item>
      <tinymce
        v-model="introduction"
        ref="Tinymce"
        @upload="handleUpload"/>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import introduction from '@/mixins/introduction'

export default {
  mixins: [introduction]
}
</script>

<style scoped lang="less">

</style>
