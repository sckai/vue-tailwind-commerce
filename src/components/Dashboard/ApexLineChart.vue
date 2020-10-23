<template>
  <div class="flex justify-center">
    <VueApexCharts
      type="line"
      height="350"
      width="1200"
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
    hightPrice: {
      type: Array,
      default: () => {
        return []
      }
    },
    lowPrice: {
      type: Array,
      default: () => {
        return []
      }
    },
    count: {
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
      seriesData: [{
        name: '高價格',
        type: 'column',
        data: []
      }, {
        name: '數量',
        type: 'line',
        data: []
      }, {
        name: '低價格',
        type: 'column',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line'
        },
        stroke: {
          width: [0, 4]
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels: [],
        yaxis: [{
          title: {
            text: '價格'
          }

        }, {
          opposite: true,
          title: {
            text: '數量'
          }
        }],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 280
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 480
            },
            legend: {
              show: false
            }
          }
        }, {
          breakpoint: 1200,
          options: {
            chart: {
              width: 768
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
    count () {
      this.seriesData[1].data.splice(0, this.count.length)
      this.seriesData[1].data.push(...this.count)
    },
    hightPrice () {
      this.seriesData[0].data.splice(0, this.hightPrice.length)
      this.seriesData[0].data.push(...this.hightPrice)
    },
    lowPrice () {
      this.seriesData[2].data.splice(0, this.lowPrice.length)
      this.seriesData[2].data.push(...this.lowPrice)
    }
  }
}
</script>
