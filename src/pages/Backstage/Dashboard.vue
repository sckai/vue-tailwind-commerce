<template>
  <div>
    <loading
      :active.sync="isPageLoading"
      loader="dots"
    />
    <div class="flex flex-wrap -mb-4">
      <div class="w-screen my-2 px-2 rounded overflow-hidden shadow-lg sm:w-1/2">
        <h3 class="font-bold">
          產品類別
        </h3>
        <ApexPieChart
          :series="apexCategorySeries"
          :labels="apexCategoryLabels"
        />
      </div>
      <div class="w-screen my-2 px-2 rounded overflow-hidden shadow-lg sm:w-1/2">
        <h3 class="font-bold">
          產品市場
        </h3>
        <ApexTreeMap :map-data="mapData" />
      </div>
      <div class="w-screen my-2 px-2 rounded overflow-hidden shadow-lg">
        <h3 class="font-bold">
          產品價格分析
        </h3>
        <ApexLineChart
          :hight-price="pexHightPriceSeries"
          :low-price="apexLowPriceSeries"
          :count="apexCountSeries"
          :labels="apexPriceLabels"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ApexPieChart from '../../components/Backstage/Dashboard/ApexPieChart'
import ApexLineChart from '../../components/Backstage/Dashboard/ApexLineChart'
import ApexTreeMap from '../../components/Backstage/Dashboard/ApexTreeMap'
export default {
  metaInfo: {
    title: 'DashBoard',
    htmlAttrs: {
      lang: 'zh'
    }
  },
  components: {
    // VueApexCharts,
    ApexPieChart,
    ApexLineChart,
    ApexTreeMap
  },
  data () {
    return {
      isPageLoading: false,
      // PieChart
      apexCategorySeries: [],
      apexCategoryLabels: [],
      // LineChart
      pexHightPriceSeries: [],
      apexLowPriceSeries: [],
      apexPriceLabels: [],
      apexCountSeries: [],
      // TreeMap
      mapData: []
    }
  },
  created () {
    this.GetProdictAll()
  },
  methods: {
    GetCategoryChart (prodcuts) {
      const categoryArray = prodcuts.map(productItem => {
        return productItem.category
      })
      this.apexCategoryLabels = Array.from(new Set(categoryArray))
      this.apexCategoryLabels.forEach(categoryItem => {
        let index = 0
        prodcuts.forEach((productItem, productIndex) => {
          if (productItem.category === categoryItem) {
            index = index + 1
          }
          if (prodcuts.length - 1 === productIndex) {
            this.apexCategorySeries.push(index)
          }
        })
      })
    },
    GetPriceChart (prodcuts) {
      const categoryArray = prodcuts.map(productItem => {
        return productItem.category
      })
      this.apexPriceLabels = Array.from(new Set(categoryArray))
      this.apexPriceLabels.forEach(categoryItem => {
        let index = 0
        prodcuts.forEach((productItem, productIndex) => {
          if (productItem.category === categoryItem) {
            index = index + 1
          }
          if (prodcuts.length - 1 === productIndex) {
            this.apexCountSeries.push(index)
          }
        })

        let hightPrice = 0
        let lowPrice = 0
        let frist = true
        prodcuts.forEach((productItem, productIndex) => {
          if (productItem.category === categoryItem) {
            if (hightPrice < productItem.price) {
              hightPrice = productItem.price
            }
            if (frist) {
              lowPrice = productItem.price
              frist = false
            } else {
              if (lowPrice > productItem.price) {
                lowPrice = productItem.price
              }
            }
          }
          if (prodcuts.length - 1 === productIndex) {
            this.pexHightPriceSeries.push(hightPrice)
            this.apexLowPriceSeries.push(lowPrice)
          }
        })
      })
    },
    GetTreeMapChart (prodcuts) {
      const categoryArray = prodcuts.map(productItem => {
        return productItem.category
      })
      const productLabels = Array.from(new Set(categoryArray))

      const countArray = []
      productLabels.forEach(categoryItem => {
        let index = 0
        prodcuts.forEach((productItem, productIndex) => {
          if (productItem.category === categoryItem) {
            index = index + 1
          }
          if (prodcuts.length - 1 === productIndex) {
            countArray.push(index)
          }
        })
      })
      productLabels.forEach((labelItem, labelIndex) => {
        this.mapData.push({ x: labelItem, y: countArray[labelIndex] })
      })
    },
    // API
    GetProdictAll () {
      const api = `${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.isPageLoading = true
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.GetCategoryChart(response.data.products)
          this.GetPriceChart(response.data.products)
          this.GetTreeMapChart(response.data.products)
        } else {
          this.$swal('', response.data.message, 'error')
        }
      }).catch((error) => {
        this.$swal('網路異常', '', 'error')
        console.log(error)
      }).finally(() => {
        this.isPageLoading = false
      })
    }
  }
}
</script>
