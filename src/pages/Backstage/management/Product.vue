<template>
  <div>
    <loading
      :active.sync="isPageLoading"
      loader="dots"
    />
    <div class="flex justify-end mr-3 mb-3">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="OpenCreateProdcutModal"
      >
        建立新商品
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
      :data="productsList"
    >
      <template
        slot="imageUrl"
        slot-scope="props"
      >
        <img
          width="128"
          heigth="64"
          :src="props.obj.imageUrl"
          alt=""
        >
      </template>
      <template
        slot="origin_price"
        slot-scope="props"
      >
        <div>
          ${{ props.obj.origin_price }}/
          <span class="text-teal-500">{{ props.obj.unit }}</span>
        </div>
      </template>
      <template
        slot="price"
        slot-scope="props"
      >
        <div>
          ${{ props.obj.price }}/
          <span class="text-teal-500">{{ props.obj.unit }}</span>
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
          @click="OpenEditProdcutModal(props.obj)"
        >
          編輯
        </button>
        <button
          class="bg-transparent hover:bg-blue-500 text-red-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
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
    <ProductModal
      :title="productModalTitle"
      :is-create="isCreate"
      :show-modal="showProductModal"
      :data-obj="productData"
      @creatSuccess="CreatSuccess"
      @EditSuccess="EditSuccess"
      @Cancle="CloseProdcutModal"
    />

    <DelModal
      :data-obj="productData"
      :show-modal="showDelModal"
      :api-path="delApiPath"
      @Cancle="CloseDelModal"
      @DelSuccess="DelSuccess"
    />
  </div>
</template>

<script>
import tables from '../../../components/Backstage/Universal/table/Tables'
import Pagination from '../../../components/Backstage/Universal/table/Pagination'
import ProductModal from '../../../components/Backstage/Product/ProductModal'
import DelModal from '../../../components/Backstage/Universal/DelModal'
export default {
  metaInfo: {
    title: 'Product',
    htmlAttrs: {
      lang: 'zh'
    }
  },
  components: {
    ProductModal,
    tables,
    Pagination,
    DelModal
  },
  data () {
    return {
      productsList: [],
      pagination: {
        total_pages: 1,
        current_page: 1
      },
      tableColumns: ['category', 'title', 'imageUrl', 'origin_price', 'price', 'is_enabled', 'control'],
      tableOptions: {
        headings: { category: '分類', title: '產品名稱', imageUrl: '圖片', origin_price: '原價', price: '售價', is_enabled: '是否啟用', control: '操作' }
      },
      isPageLoading: false,
      showProductModal: false,
      isCreate: false,
      productModalTitle: '新增產品',
      productData: {
        imageUrl: '',
        title: '',
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        description: '',
        content: '',
        is_enabled: 0,
        id: 0
      },
      showDelModal: false,
      delApiPath: ''
    }
  },
  created () {
    this.GetProductsList()
  },
  methods: {
    OpenCreateProdcutModal () {
      this.showProductModal = true
      this.isCreate = true
      this.productModalTitle = '新增產品'
    },
    OpenEditProdcutModal (obj) {
      this.productData = obj
      this.showProductModal = true
      this.isCreate = false
      this.productModalTitle = '編輯產品'
    },
    OpenDelModal (obj) {
      this.productData = obj
      this.delApiPath = `${process.env.VUE_APP_URL}${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.productData.id}`
      this.showDelModal = true
    },
    CreatSuccess () {
      this.ProductDataDefault()
      this.showProductModal = false
      this.GetProductsList(this.pagination.current_page)
    },
    DelSuccess () {
      this.showDelModal = false
      this.GetProductsList(this.pagination.current_page)
    },
    EditSuccess () {
      this.ProductDataDefault()
      this.showProductModal = false
      this.GetProductsList(this.pagination.current_page)
    },
    ProductDataDefault () {
      this.productData = {
        imageUrl: '',
        title: '',
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        description: '',
        content: '',
        is_enabled: 0,
        id: 0
      }
    },
    CloseProdcutModal () {
      this.ProductDataDefault()
      this.showProductModal = false
    },
    CloseDelModal () {
      this.showDelModal = false
    },
    ClickPage (page) {
      this.GetProductsList(page)
    },
    // API
    GetProductsList (page = 1) {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      this.isPageLoading = true
      this.productsList = []
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.productsList = response.data.products
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
