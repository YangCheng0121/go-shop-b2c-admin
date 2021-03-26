<template>
  <a-form
    :form="form"
    v-bind="formLayout">
    <a-form-item label="名称">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入名称!' }] },
          ]"
          placeholder="请输入名称"/>
      </a-col>
    </a-form-item>
    <a-form-item label="标题">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '请输入标题!' }] },
          ]"
          placeholder="请输入标题"/>
      </a-col>
    </a-form-item>
    <a-form-item label="图片">
      <a-col v-bind="formItemLayout">
        <div class="image">
          <a-input
            v-decorator="['image']"
            placeholder="请上传图片"/>
          <div class="image-right">
            <upload-button @upload="handleUpload"/>
          </div>
        </div>
      </a-col>
    </a-form-item>
    <a-form-item label="起始日期">
      <a-col v-bind="formItemLayout">
        <a-date-picker
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择起始日期"
          v-decorator="['begin_date']"
          show-time
        />
      </a-col>
    </a-form-item>
    <a-form-item label="结束日期">
      <a-col v-bind="formItemLayout">
        <a-date-picker
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择结束日期"
          v-decorator="['end_date']"
          show-time
        />
      </a-col>
    </a-form-item>
    <a-form-item label="最小商品价格">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['minimum_price']"
          :min="0"
          type="number"
          placeholder="请输入最小商品价格"/>
      </a-col>
    </a-form-item>
    <a-form-item label="最大商品价格">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['maximum_price']"
          :min="0"
          type="number"
          placeholder="请输入最大商品价格"/>
      </a-col>
    </a-form-item>
    <a-form-item label="最小商品数量">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['minimum_quantity']"
          :min="0"
          type="number"
          placeholder="请输入最小商品数量"/>
      </a-col>
    </a-form-item>
    <a-form-item label="最大商品数量">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['maximum_quantity']"
          :min="0"
          type="number"
          placeholder="请输入最大商品数量"/>
      </a-col>
    </a-form-item>
    <a-form-item label="价格运算表达式">
      <a-col v-bind="formItemLayout">
        <a-tooltip>
          <template slot="title">
            可用变量 price、quantity
          </template>
          <a-input
            v-decorator="['price_expression']"
            placeholder="请输入价格运算表达式"/>
        </a-tooltip>
      </a-col>
    </a-form-item>
    <a-form-item label="积分运算表达式">
      <a-col v-bind="formItemLayout">
        <a-tooltip>
          <template slot="title">
            可用变量 price、point
          </template>
          <a-input
            v-decorator="['point_expression']"
            placeholder="请输入价格运算表达式"/>
        </a-tooltip>
      </a-col>
    </a-form-item>
    <a-form-item label="排序">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['orders']"
          placeholder="请输入排序"/>
      </a-col>
    </a-form-item>
    <a-form-item label="允许参加会员等级">
      <a-col>
        <a-checkbox-group v-decorator="['member_ranks']">
          <a-checkbox v-for="(item,index) in memberRankPageList.list" :key="index" :value="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-col>
    </a-form-item>
    <a-form-item label="赠送优惠券">
      <a-checkbox-group v-decorator="['coupons']">
        <a-checkbox v-for="(item,index) in couponPageList.list" :key="index" :value="item.id">
          {{ item.name }}
        </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="设置">
      <a-col v-bind="formItemLayout">
        <a-checkbox-group v-decorator="['setting']">
          <a-checkbox value="is_free_shipping">是否免运费</a-checkbox>
          <a-checkbox value="is_coupon_allowed">是否允许使用优惠券</a-checkbox>
        </a-checkbox-group>
      </a-col>
    </a-form-item>
    <a-form-item label="赠品">
      <a-col v-bind="formItemLayout">
        <a-tooltip>
          <template slot="title">
            输入编号、商品查找赠品
          </template>
          <a-select
            v-decorator="['gifts']"
            placeholder="请选择赠品"
            mode="multiple"
            show-search
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="_getProductList">
            <a-select-option v-for="gift in giftList" :key="gift.id" :value="gift.id">
              [{{ gift.brand_name }}] {{ gift.name }}
            </a-select-option>
          </a-select>
        </a-tooltip>
      </a-col>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { UploadButton } from '@/components'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    UploadButton
  },
  name: 'PromotionBasic',
  computed: {
    ...mapGetters([
      'memberRankPageList',
      'couponPageList',
      'promotion',
      'giftList'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'PromotionBasic' }),
      formLayout: {
        labelCol: { span: 3, md: 5, lg: 5, xl: 3 },
        wrapperCol: { span: 8, md: 19, lg: 19, xl: 8 }
      },
      formItemLayout: {
        span: 14,
        md: 12,
        lg: 12,
        xl: 14
      }
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 上传图片处理
     * @param fileList
     */
    handleUpload(fileList) {
      this.setFormFieldsValue({
        image: fileList[0].url
      })
    },
    /**
     * 获取商品列表
     * @param value
     * @param pageSize
     * @private
     */
    _getProductList(value, pageSize = 10) {
      const query = { IsGift: 1 }
      if (value) {
        if (Number(value) > 0) {
          query.Sn = value
        } else {
          query.Name = value
        }
      }
      const pageNumber = 1
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.$store.dispatch('GetProductList', { query, sortby, order, pageNumber, pageSize })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const gifts = []
            if (values.gifts) {
              values.gifts.forEach((item) => {
                const gift = this.giftList.list.find((value) => {
                  return value.id === item
                })
                gifts.push({
                  id: gift.id,
                  name: gift.name
                })
              })
            }
            const promotion = {
              id: this.promotion.id,
              name: values.name,
              title: values.title,
              prefix: values.prefix,
              begin_date: moment(values.begin_date, 'YYYY-MM-DD HH:mm:ss'),
              end_date: moment(values.end_date, 'YYYY-MM-DD HH:mm:ss'),
              maximum_price: values.maximum_price,
              maximum_quantity: values.maximum_quantity,
              minimum_price: values.minimum_price,
              minimum_quantity: values.minimum_quantity,
              point_expression: values.point_expression,
              price_expression: values.price_expression,
              orders: values.orders,
              member_ranks: values.member_ranks,
              coupons: values.coupons,
              gifts: gifts
            }
            const setting = values.setting || []
            setting.forEach((item) => {
              promotion[item] = 1
            })
            resolve(promotion)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.image {
  position: relative;

  .image-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
