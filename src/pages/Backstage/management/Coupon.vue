<template>
  <div>
    <loading
      :active.sync="isPageLoading"
      loader="dots"
    />

    <div class="flex justify-end mr-3 mb-3">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="OpenCreateCouponModal"
      >
        建立優惠卷
      </button>
    </div>

    <Pagination
      :total-page="pagination.total_pages"
      :current-page="pagination.current_page"
      @clickPage="ClickPage"
    />
    <tables
      :options="tableOptions"
      :columns="tableColumns"
      :data="couponList"
    >
      <template
        slot="percent"
        slot-scope="props"
      >
        <div>
          {{ props.obj.percent }}%
        </div>
      </template>
      <template
        slot="due_date"
        slot-scope="props"
      >
        <div>
          {{ ConversionDate(props.obj.due_date) }}
        </div>
      </template>
      <template
        slot="is_enabled"
        slot-scope="props"
      >
        <div
          v-if="props.obj.is_enabled === 1"
          class="text-green-500"
        >
          啟用
        </div>
        <div
          v-if="props.obj.is_enabled === 0"
          class="text-red-500"
        >
          未啟用
        </div>
      </template>
      <template
        slot="control"
        slot-scope="props"
      >
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          @click="OpenEditCouponModal(props.obj)"
        >
          編輯
        </button>
        <button
          class="hover:bg-blue-500 text-red-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          @click="OpenDelModal(props.obj)"
        >
          刪除
        </button>
      </template>
    </tables>

    <Pagination
      :total-page="pagination.total_pages"
      :current-page="pagination.current_page"
      @clickPage="ClickPage"
    />

    <!-- Modal -->
    <CouponModal
      :title="couponModalTitle"
      :is-create="isCreate"
      :show-modal="showCouponModal"
      :data-obj="couponData"
      @creatSuccess="CreatSuccess"
      @EditSuccess="EditSuccess"
      @Cancle="CloseCouponModal"
    />

    <DelModal
      :data-obj="couponData"
      :show-modal="showDelModal"
      :api-path="delApiPath"
      @Cancle="CloseDelModal"
      @DelSuccess="DelSuccess"
    />
  </div>
</template>

<script>
import tables from '../../../components/Universal/table/Tables'
import Pagination from '../../../components/Universal/Pagination'
import CouponModal from '../../../components/Backstage/Coupon/CouponModal'
import DelModal from '../../../components/Backstage/Universal/DelModal'
export default {
  metaInfo: {
    title: 'Coupon',
    htmlAttrs: {
      lang: 'zh'
    }
  },
  components: {
    tables,
    Pagination,
    CouponModal,
    DelModal
  },
  data () {
    return {
      couponList: [],
      pagination: {
        total_pages: 1,
        current_page: 1
      },
      tableColumns: ['title', 'code', 'percent', 'due_date', 'is_enabled', 'control'],
      tableOptions: {
        headings: { title: '優惠名稱', code: '優惠碼', percent: '折扣百分比', due_date: '到期日', is_enabled: '是否啟用', control: '操作' }
      },
      isPageLoading: false,
      couponModalTitle: '新增優惠卷',
      isCreate: false,
      showCouponModal: false,
      couponData: {
        imageUrl: '',
        title: '',
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        description: '',
        content: '',
        is_enabled: 0,
        code: '',
        due_date: '',
        id: 0
      },
      showDelModal: false,
      delApiPath: ''
    }
  },
  created () {
    this.GetCouponList()
  },
  methods: {
    ConversionDate (timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = `0${date.getMonth() + 1}`
      const day = `0${date.getDate()}`
      const formattedTime = `${year}-${month.substr(-2)}-${day.substr(-2)}`
      return formattedTime
    },
    OpenCreateCouponModal () {
      this.showCouponModal = true
      this.isCreate = true
      this.productModalTitle = '新增優惠卷'
    },
    OpenEditCouponModal (obj) {
      // due_date
      const sendData = obj
      sendData.due_date = this.ConversionDate(sendData.due_date)
      this.couponData = Object.assign({}, sendData)
      this.showCouponModal = true
      this.isCreate = false
      this.couponModalTitle = '編輯優惠卷'
    },
    CreatSuccess () {
      this.CouponDataDefault()
      this.showCouponModal = false
      this.GetCouponList(this.pagination.current_page)
    },
    EditSuccess () {
      this.CouponDataDefault()
      this.showCouponModal = false
      this.GetCouponList(this.pagination.current_page)
    },
    CloseCouponModal () {
      this.CouponDataDefault()
      this.showCouponModal = false
    },
    CouponDataDefault () {
      this.couponData = {
        imageUrl: '',
        title: '',
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        description: '',
        content: '',
        is_enabled: 0,
        code: '',
        due_date: '',
        id: 0
      }
    },
    OpenDelModal (obj) {
      this.couponData = obj
      this.delApiPath = `${process.env.VUE_APP_URL}${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.couponData.id}`
      this.showDelModal = true
    },
    CloseDelModal () {
      this.showDelModal = false
    },
    DelSuccess () {
      this.showDelModal = false
      this.GetCouponList(this.pagination.current_page)
    },
    ClickPage (page) {
      this.GetCouponList(page)
    },
    // API
    GetCouponList (page = 1) {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      this.isPageLoading = true
      this.couponList = []
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.couponList = response.data.coupons
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
