<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="close" :disabled="isCanDelete" @click="handleDelete">删除</a-button>
      <reload/>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleFilterClick">
          <a-menu-item key="isPendingReceive:1">等待付款</a-menu-item>
          <a-menu-item key="isPendingReceive:0">无需付款</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="isPendingRefunds:1">等待退款</a-menu-item>
          <a-menu-item key="isPendingRefunds:0">无需退款</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="isAllocatedStock:1">已分配库存</a-menu-item>
          <a-menu-item key="isAllocatedStock:0">未分配库存</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="hasExpired:1">已过期</a-menu-item>
          <a-menu-item key="hasExpired:0">未过期</a-menu-item>
        </a-menu>
        <a-button>订单筛选</a-button>
      </a-dropdown>
      <a-button @click="showModal">更多选项</a-button>
      <a-dropdown>
        <a-menu slot="overlay" @click="handlePageSizeClick">
          <a-menu-item key="10">
            10
          </a-menu-item>
          <a-menu-item key="20">
            20
          </a-menu-item>
          <a-menu-item key="30">
            50
          </a-menu-item>
          <a-menu-item key="100">
            100
          </a-menu-item>
        </a-menu>
        <a-button>
          每页显示
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </a-button-group>
    <a-input-group compact size="small" slot="right">
      <a-select
        default-value="Sn"
        size="small"
        style="width: 90px"
        @change="handleSelectChange">
        <a-select-option value="Sn">
          编号
        </a-select-option>
        <a-select-option value="Consignee">
          收货人
        </a-select-option>
        <a-select-option value="AreaName">
          地区
        </a-select-option>
        <a-select-option value="Address">
          地址
        </a-select-option>
        <a-select-option value="ZipCode">
          邮编
        </a-select-option>
        <a-select-option value="Phone">
          电话
        </a-select-option>
      </a-select>
      <a-input-search
        style="width:60%"
        size="small"
        enter-button
        placeholder="请输入搜索内容"
        allow-clear
        @search="handleSearch"/>
    </a-input-group>
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="pages.list"
        :scroll="{x: 'max-content' }"
        :pagination="false"
        :loading="loading"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        row-key="id">
        <span slot="icon" slot-scope="bol">
          <a-icon :type="bol ? 'check':'close'"/>
        </span>
        <span slot="amount" slot-scope="amount">
          {{ amount | Amount }}
        </span>
        <span slot="status_name" slot-scope="status_name,record">
          {{ status_name }}
          <span class="silver" v-if="record.expire">
            (已过期)
          </span>
        </span>
        <span slot="creation_date" slot-scope="creation_date">
          <a-tooltip>
            <template slot="title">
              {{ creation_date | Moment }}
            </template>
            {{ creation_date | Moment('YYYY-MM-DD') }}
          </a-tooltip>
        </span>
        <span slot="action" slot-scope="_,record">
          <a @click="toLookPage(record.sn)">[查看]</a>
          <a-divider type="vertical"/>
          <a v-if="record.isCanEdit" @click="toEditPage(record.sn)">[编辑]</a>
          <span v-else>[编辑]</span>
        </span>
      </a-table>
      <!--Modal-->
      <a-modal
        title="更多选项"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
          :form="moreForm"
          v-bind="moreFormLayout">
          <a-form-item label="类型">
            <a-select
              v-decorator="[
                'type' ,
                {
                  valuePropName: 'type'
                }
              ]"
              default-value="">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option value="general">
                普通订单
              </a-select-option>
              <a-select-option value="exchange">
                兑换订单
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              v-decorator="[
                'status' ,
                {
                  valuePropName: 'status'
                }
              ]"
              default-value="">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option value="pendingPayment">等待付款</a-select-option>
              <a-select-option value="pendingReview">等待审核</a-select-option>
              <a-select-option value="pendingShipment">等待发货</a-select-option>
              <a-select-option value="shipped">已发货</a-select-option>
              <a-select-option value="received">已收货</a-select-option>
              <a-select-option value="completed">已完成</a-select-option>
              <a-select-option value="failed">已失败</a-select-option>
              <a-select-option value="canceled">已取消</a-select-option>
              <a-select-option value="denied">已拒绝</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="会员">
            <a-input
              v-decorator="['member']"
              placeholder="请输入会员"/>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <a-pagination
      :default-current="pages.page_number"
      :page-size.sync="pages.page_size"
      :total="pages.total"
      @change="handlePaginationChange"
      slot="footer"/>
  </box>
</template>

<script type="es6">
import { Box, Reload } from '@/components'
import { ERR_OK } from '@/api/config'
import { getOrderList, deleteOrder } from '@/api/order'
import { mapGetters } from 'vuex'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn'
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
    scopedSlots: { customRender: 'amount' }
  },
  {
    title: '会员',
    dataIndex: 'member'
  },
  {
    title: '收货人',
    dataIndex: 'consignee'
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method_name'
  },
  {
    title: '配送方式',
    dataIndex: 'shipping_method_name'
  },
  {
    title: '状态',
    dataIndex: 'status_name',
    scopedSlots: { customRender: 'status_name' }
  },
  {
    title: '创建日期',
    dataIndex: 'creation_date',
    scopedSlots: { customRender: 'creation_date' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const query = {
  Sn: null,
  Consignee: null,
  AreaName: null,
  Address: null,
  ZipCode: null,
  Phone: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'OrderList',
  computed: {
    isCanDelete() {
      return Boolean(!this.selectedRowKeys.length)
    },
    ...mapGetters({
        status: 'orderStatus'
      }
    )
  },
  data() {
    return {
      columns: columns,
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0
      },
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      // 搜索表单的搜索条件
      form: {
        selectOption: 'Sn', // 搜索框Select
        query
      },
      orderStatus: {
        'isPendingReceive:1': 'Status:pendingPayment',
        'isPendingReceive:0': 'Status__gt:pendingPayment',
        'isPendingRefunds:1': 'Status:refunding',
        'isPendingRefunds:0': 'Status:noRefund',
        'isAllocatedStock:1': 'IsAllocatedStock:1',
        'isAllocatedStock:0': 'IsAllocatedStock:0',
        'hasExpired:1': 'Expire__isnull:1',
        'hasExpired:0': 'Expire__isnull:0'
      },
      // modal visible
      visible: false,
      // 更多选项表单布局
      moreFormLayout: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 17,
          offset: 1
        }
      },
      moreForm: this.$form.createForm(this, { name: 'more' })
    }
  },
  created() {
    this._getOrderList()
  },
  methods: {
    /**
     * 点击 订单筛选 回调
     */
    handleFilterClick({ key }) {
      const splitKey = this.orderStatus[key].split(':')
      this.form.query = Object.assign({}, query, {
        [splitKey[0]]: splitKey[1]
      })
      this._getOrderList()
    },
    /**
     * 选中
     */
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * 删除处理
     */
    handleDelete() {
      this.$confirm({
        title: '确定删除选中订单？',
        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteOrder(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getOrderList()
            }
          })
        },
        onCancel() {
        }
      })
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getOrderList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getOrderList()
    },
    /**
     * 显示更多选项 Modal
     */
    showModal() {
      this.visible = true
    },
    /**
     * 隐藏更多选项 Modal
     */
    hideModal() {
      this.visible = false
    },
    /**
     * Modal 点击确定回调
     */
    handleOk() {
      this.handleSubmit()
    },
    /**
     * Modal 点击取消回调
     */
    handleCancel() {
      this.hideModal()
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.moreForm.validateFields((err, values) => {
        if (!err) {
          this.form.query = {
            Type: values.type,
            Status: values.status,
            Member: values.member
          }
          this._getOrderList()
          this.hideModal()
        }
      })
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Sn: null,
        Consignee: null,
        AreaName: null,
        Address: null,
        ZipCode: null,
        Phone: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getOrderList()
    },
    /**
     * 跳转查看订单页面
     */
    toLookPage(sn) {
      this.$router.push({ name: 'OrderLook', params: { sn: sn } })
    },
    /**
     * 跳转订单编辑页面
     */
    toEditPage(sn) {
      this.$router.push({ name: 'OrderEdit', params: { sn: sn } })
    },
    _getOrderList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      getOrderList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          if (data.list) {
            data.list.forEach((item) => {
              if (item.expire) {
                item['isCanEdit'] = false
              } else if (item.status === this.status.canceled) {
                item['isCanEdit'] = false
              } else {
                item['isCanEdit'] = true
              }
            })
          }
          this.pages = data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
