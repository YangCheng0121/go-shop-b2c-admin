<template>
  <a-spin :spinning="spinning">
    <box>
      <a-button-group size="small" slot="left">
        <a-button icon="plus" @click="toAddAreaPage">添加</a-button>
        <a-button icon="up" @click="back">上级地区</a-button>
      </a-button-group>
      <div slot="content">
        <a-button block type="primary" v-if="currentArea">上级地区 - {{ currentArea.name }}</a-button>
        <a-row v-if="areaList">
          <a-col
            v-bind="colLayout"
            v-for="(area,index) in areaList"
            :key="index"
            class="padding-10px">
            <a @click="toAreaIdPage(area)">{{ area.name }}</a>
            <a @click="toEditAreaPage(area)">[编辑]</a>
            <a @click="_deleteArea(area)">[删除]</a>
          </a-col>
        </a-row>
        <a-row type="flex" justify="center" v-else class="padding-10px">
          <a-col>
            无下级地区
            <a @click="toAddAreaPage">添加</a>
          </a-col>
        </a-row>
      </div>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box } from '@/components'
import { deleteArea, getArea } from '@/api/area'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  components: {
    Box
  },
  name: 'Area',
  computed: {
    ...mapGetters([
      'currentArea'
    ])
  },
  data() {
    return {
      colLayout: {
        span: 6
      },
      spinning: false,
      areaList: []
    }
  },
  created() {
    if (!this.currentArea) {
      this.$router.push({ name: 'AreaList' })
      return
    }
    this._getAreasById()
  },
  methods: {
    back() {
      this.$router.push({ name: 'AreaChildren', params: { id: this.currentArea.parent_id } })
      getArea(this.currentArea.parent_id).then((res) => {
        const data = res.data
        if (data.id) {
          this.$store.dispatch('SetCurrentArea', data)
          this._getAreasById()
        } else {
          this.$router.push({ name: 'AreaList' })
        }
      })
    },
    /**
     * 跳转Area ID 页面
     */
    toAreaIdPage(area) {
      this.$router.push({ name: 'AreaChildren', params: { id: area.id } })
      this.$store.dispatch('SetCurrentArea', area)
      this._getAreasById()
    },
    /**
     * 跳转 添加区域页面
     */
    toAddAreaPage() {
      this.$store.dispatch('SetParentArea', this.currentArea)
      this.$router.push({ name: 'AddArea' })
    },
    /**
     * 跳转 编辑地区页面
     */
    toEditAreaPage(area) {
      this.$store.dispatch('SetCurrentArea', area)
      this.$router.push({ name: 'EditArea' })
    },
    /**
     * 获取区域
     * @private
     */
    _getAreasById() {
      const id = this.$route.params.id
      const query = {
        'ParentId': id
      }
      this.$store.dispatch('GetAllArea', { query }).then((data) => {
        this.areaList = data
      })
    },
    /**
     * 删除地区
     * @param area
     * @private
     */
    _deleteArea(area) {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        okText: '确定',

        onOk: () => {
          const ids = area.id
          deleteArea(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getAreasById()
            }
          })
        },
        onCancel() {

        }
      })
    }
  }
}
</script>

<style scoped lang="less">
a {
  padding: 0 2px;
}
</style>
