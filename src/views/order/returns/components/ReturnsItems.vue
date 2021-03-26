<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :scroll="{x: 'max-content' }"
    :pagination="false"
    row-key="sn">
    <span slot="creation_date" slot-scope="creation_date">
      <a-tooltip>
        <template slot="title">
          {{ creation_date | Moment }}
        </template>
        {{ creation_date | Moment('YYYY-MM-DD') }}
      </a-tooltip>
    </span>
  </a-table>
</template>

<script type="es6">

const columns = [
  {
    title: '商品编号',
    dataIndex: 'sn'
  },
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '数量',
    dataIndex: 'quantity'
  }
]

export default {
  name: 'ShippingItems',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      columns
    }
  }
}
</script>

<style scoped lang="less">

</style>
