<template>
  <div>
    <loading
      :active.sync="isPageLoading"
      loader="dots"
    />

    <Pagination
      :total-page="pagination.total_pages"
      :current-page="pagination.current_page"
      @clickPage="ClickPage"
    />

    <tables
      :options="tableOptions"
      :columns="tableColumns"
      :data="ordersList"
    >
      <template
        slot="create_at"
        slot-scope="props"
      >
        <div>
          {{ ConversionDate(props.obj.create_at) }}
        </div>
      </template>
      <template
        slot="user"
        slot-scope="props"
      >
        <div class="text-left">
          <span>名稱:</span>
          {{ props.obj.user.name }}
        </div>
        <div class="text-left">
          <span>電話:</span>
          {{ props.obj.user.tel }}
        </div>
        <div class="text-left">
          <span>Mail:</span>
          {{ props.obj.user.email }}
        </div>
        <div class="text-left">
          <span>地址:</span>
          {{ props.obj.user.address }}
        </div>
      </template>
      <template
        slot="productItem"
        slot-scope="props"
      >
        <div
          v-for="productObj in GetProductContent(props.obj.products)"
          :key="productObj.id"
          class="text-left"
        >
          {{ productObj.product.title }}
        </div>
      </template>
      <template
        slot="total"
        slot-scope="props"
      >
        ${{ Math.round(props.obj.total) }}
      </template>
      <template
        slot="is_paid"
        slot-scope="props"
      >
        <span
          v-if="props.obj.is_paid"
          class="text-green-500"
        >
          已付款
        </span>
        <span
          v-else
          class="text-red-500"
        >
          未付款
        </span>
      </template>
      <template
        slot="control"
        slot-scope="props"
      >
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          @click="EditOrder(props.obj)"
        >
          編輯
        </button>
      </template>
    </tables>

    <Pagination
      :total-page="pagination.total_pages"
      :current-page="pagination.current_page"
      @clickPage="ClickPage"
    />

    <!--  Modal -->
    <OrderModal
      title="修改訂單資訊"
      :show-modal="showOrderModal"
      :data-obj="orderData"
      @EditSuccess="EditSuccess"
      @Cancle="CloseOrderModal"
    />
  </div>
</template>

<script>
import tables from '../../..//components/Universal/table/Tables'
import Pagination from '../../../components/Universal/Pagination'
import OrderModal from '../../../components/Backstage/Order/OrderModal'
export default {
  metaInfo: {
    title: 'Order',
    htmlAttrs: {
      lang: 'zh'
    }
  },
  components: {
    tables,
    Pagination,
    OrderModal
  },
  data () {
    return {
      ordersList: [],
      pagination: {
        total_pages: 1,
        current_page: 1
      },
      tableColumns: ['create_at', 'user', 'productItem', 'total', 'is_paid', 'control'],
      tableOptions: {
        headings: { create_at: '下單時間', user: '聯絡人資訊', productItem: '商品項目', total: '應付金額', is_paid: '是否付款', control: '操作' }
      },
      isPageLoading: false,
      showOrderModal: false,
      orderData: {}

    }
  },
  created () {
    this.GetOrderList()
  },
  methods: {
    ConversionDate (timestamp) {
      const date = new Date(timestamp * 1000)
      const year = date.getFullYear()
      const month = `0${date.getMonth() + 1}`
      const day = `0${date.getDate()}`
      const hours = date.getHours()
      const minutes = `0${date.getMinutes()}`
      const seconds = `0${date.getSeconds()}`
      const formattedTime = `${year}-${month.substr(-2)}-${day.substr(-2)}  ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`

      return formattedTime
    },
    GetProductContent (item) {
      return Object.values(item)
    },
    EditOrder (obj) {
      this.orderData = Object.assign({}, obj)
      this.showOrderModal = true
    },
    CloseOrderModal () {
      this.OrderDataDefault()
      this.showOrderModal = false
    },
    EditSuccess () {
      this.OrderDataDefault()
      this.showOrderModal = false
      this.GetOrderList(this.pagination.current_page)
    },
    ClickPage (page) {
      this.GetOrderList(page)
    },
    OrderDataDefault () {
      this.orderData = {}
    },
    // API
    GetOrderList (page = 1) {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`
      this.isPageLoading = true
      this.ordersList = []
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.ordersList = response.data.orders
          this.pagination = response.data.pagination
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', error, 'error')
        console.log(error)
      }).finally(() => {
        this.isPageLoading = false
      })
    }
  }
}
</script>
