<template>
  <a-spin :spinning="spinning">
    <box>
      <a-button-group size="small" slot="left">
        <a-button icon="plus" @click="toAddAreaPage">添加</a-button>
      </a-button-group>
      <div slot="content">
        <a-button block type="primary">顶级地区</a-button>
        <a-row>
          <a-col v-bind="colLayout" v-for="(area,index) in areaList" :key="index" class="padding-10px">
            <a @click="toAreaIdPage(area)">{{ area.name }}</a>
            <a @click="toEditAreaPage(area)">[编辑]</a>
            <a @click="_deleteArea(area)">[删除]</a>
          </a-col>
        </a-row>
      </div>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box } from '@/components'
import { mapGetters } from 'vuex'
import { deleteArea } from '@/api/area'
import { ERR_OK } from '@/api/config'

const TREE_PATH = ','

export default {
  components: {
    Box
  },
  name: 'Area',
  computed: {
    areaList() {
      return this.areas.filter((area) => {
        return area.tree_path === TREE_PATH
      })
    },
    ...mapGetters([
      'areas'
    ])
  },
  data() {
    return {
      colLayout: {
        span: 6
      },
      treePath: '',
      spinning: false
    }
  },
  created() {
    this._getAreasById()
  },
  methods: {
    /**
     * 跳转Area ID 页面
     */
    toAreaIdPage(area) {
      this.$store.dispatch('SetCurrentArea', area)
      this.$router.push({ name: 'AreaChildren', params: { id: area.id } })
    },
    /**
     * 跳转 添加区域页面
     */
    toAddAreaPage() {
      this.$store.dispatch('SetParentArea', null)
      this.$router.push({ name: 'AreaAdd' })
    },
    /**
     * 跳转 编辑地区页面
     */
    toEditAreaPage(area) {
      this.$store.dispatch('SetCurrentArea', area)
      this.$router.push({ name: 'AreaEdit' })
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
    },
    /**
     * 获取区域
     * @private
     */
    _getAreasById() {
      const query = {}
      this.spinning = true
      this.$store.dispatch('GetAllArea', { query }).then(() => {
        this.spinning = false
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
