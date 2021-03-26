import './index.less'
import { Input } from 'ant-design-vue'

const InputDropdown = {
  name: 'InputDropdown',
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    dropdownPlaceholder: {
      type: String,
      default: ''
    },
    dropdownData: {
      type: Array,
      default: function() {
        return []
      }
    },
    dropdownLiStyle: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    computedValue() {
      return this.value ? this.value : this.defaultValue
    }
  },
  data() {
    return {
      show: false,
      disabled: false,
      value: ''
    }
  },
  mounted() {
    this.hideDropdownByOtherElem()
  },
  render() {
    return (
      <div class={['input-dropdown-wrap']}>
        <Input
          placeholder={this.placeholder}
          class={[this.disabled ? 'input-disabled' : '']}
          onClick={this.toggleDropdown}
          value={this.computedValue}/>
        {this.show && this.dropdownRender()}
      </div>
    )
  },
  methods: {
    /**
     * 点击其它元素时隐藏
     */
    hideDropdownByOtherElem() {
      const containerElem = document.getElementsByClassName('input-dropdown-wrap')[0]
      document.body.addEventListener('click', (e) => {
        const target = e.target
        if (!containerElem.contains(target)) {
          this.hideDropdown()
        }
      })
    },
    /**
     * toggle Dropdown的显示
     */
    toggleDropdown() {
      this.show = !this.show
      if (this.show) {
        this.disabled = true
        this.$nextTick(() => {
          this.$refs.Input.focus()
        })
      } else {
        this.hideDropdown()
      }
    },
    hideDropdown() {
      this.disabled = false
      this.show = false
    },
    /**
     * 生成 dropdown
     * @returns {*}
     */
    dropdownRender() {
      return (
        <div class={['input-dropdown']}>
          <div class={['input-wrap']}>
            <Input
              ref={'Input'}
              class={['input']}
              placeholder={this.dropdownPlaceholder}
              onChange={this.emitInputChange}/>
          </div>
          <ul class={['dropdown-ul']}>
            {this.renderDropdownDataElem(this.dropdownData)}
          </ul>
        </div>
      )
    },
    renderDropdownDataElem(arr, renderArr = []) {
      arr.forEach((item, index) => {
        if (item.children) {
          this.pushLiElem(renderArr, item)
          return this.renderDropdownDataElem(item.children, renderArr)
        } else {
          this.pushLiElem(renderArr, item)
        }
      })
      return renderArr
    },
    pushLiElem(arr, item, index) {
      arr.push(
        <li
          class={['dropdown-li']}
          style={{ paddingLeft: item.grade * 10 + 'px' }}
          onClick={(e) => this.change(e, item)}>
          {item.name}
        </li>)
    },
    change(e, item) {
      this.value = item.name
      this.hideDropdown()
      this.$emit('change', item)
    },
    emitInputChange(e) {
      this.$emit('inputChange', e.target.value)
    }
  }
}

export default InputDropdown
