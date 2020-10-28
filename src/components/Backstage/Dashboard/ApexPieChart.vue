<template>
  <div class="flex justify-center">
    <VueApexCharts
      class="test"
      type="pie"
      width="380"
      :options="chartOptions"
      :series="seriesData"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    VueApexCharts
  },
  props: {
    series: {
      type: Array,
      default: () => {
        return []
      }
    },
    labels: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      seriesData: [],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 280
            },
            legend: {
              show: false
            }
          }
        }]
      }
    }
  },
  watch: {
    labels () {
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          labels: this.labels
        }
      }
    },
    series () {
      this.seriesData.splice(0, this.series.length)
      this.seriesData.push(...this.series)
    }
  }
}
</script>
