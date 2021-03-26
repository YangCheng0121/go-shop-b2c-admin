<template>
  <div class="box-container">
    <div class="box-header" v-if="$slots.left || $slots.right">
      <div class="header-left">
        <slot name="left"></slot>
      </div>
      <div class="header-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="box-content" v-if="$slots.content">
      <slot name="content"></slot>
    </div>
    <div class="box-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script type="es6">

  export default {
    name: 'Box'
  }
</script>

<style scoped lang="less">
  @import "~ant-design-vue/es/style/themes/default";

  .box-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #fff;
    border: @border-width-base @border-style-base @border-color-base;
    border-radius: 4px;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border-color: @border-color-split;
    }

    .box-header {
      flex: 0 0 70px;
      display: flex;
      align-items: center;
      padding: 10px;

      .header-left {
        flex: 3;
      }

      .header-right {
        flex: 1;
        text-align: right;
      }
    }

    .box-content {
      flex: 1;
    }

    .box-footer {
      flex: 0 0 80px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 10px;
    }
  }
</style>
