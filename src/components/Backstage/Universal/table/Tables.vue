/* eslint-disable no-labels */
<template>
  <div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:mx-6 lg:mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    v-for="(tableHeadItem, index) in columns"
                    :key="index"
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ GetCustomHeadName(tableHeadItem) }}
                  </th>
                  <th class="px-6 py-3 bg-gray-50" />
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(dataObj, index) in data"
                  :key="index"
                  class="w-full hover:bg-gray-500"
                  :class="{'bg-gray-300': index % 2 === 0}"
                >
                  <td
                    v-for="(columnsItem, indexs) in columns"
                    :key="indexs"
                    class="px-6 py-4 whitespace-no-wrap"
                  >
                    <div class="flex items-center">
                      <div>
                        <slot
                          :name="columnsItem"
                          :obj="dataObj"
                        >
                          {{ dataObj[columnsItem] }}
                        </slot>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- More rows... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      type: Object,
      default: () => {
        return { heading: {} }
      }
    }
  },
  methods: {
    GetCustomHeadName (value) {
      if (this.options.headings[value]) {
        return this.options.headings[value]
      } else {
        return value
      }
    }
  }
}
</script>
