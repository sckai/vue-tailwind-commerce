<template>
  <div class="flex justify-center">
    <VueApexCharts
      ref="realtimeChart"
      type="treemap"
      height="380"
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
    mapData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      seriesData: [
        {
          data: [
            {
              x: 'Loading...',
              y: 1
            }
          ]
        }
      ],
      chartOptions: {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap'
        }
      }
    }
  },
  watch: {
    mapData () {
      this.seriesData[0].data.splice(0, this.seriesData[0].data.length)
      this.$refs.realtimeChart.updateSeries([{
        data: this.mapData
      }], false, true)
    }
  }
}
</script>
