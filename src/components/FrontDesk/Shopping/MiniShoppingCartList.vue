<template>
  <div
    v-if="showMiniCart"
    class="minicartList absolute bg-white left-auto rounded-sm border-2"
  >
    <table class="table-auto m-3">
      <thead>
        <tr>
          <th class="px-4 py-2 text-xs border-b-2">
            商品名稱
          </th>
          <th class="px-4 py-2 text-xs border-b-2">
            數量
          </th>
          <th class="px-4 py-2 text-xs border-b-2">
            價格
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 pr-2 pl-5 text-xs text-left">
            Intro to CSS
          </td>
          <td class="px-4 py-2 text-xs">
            Adam
          </td>
          <td class="px-4 py-2 text-xs">
            858
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2 pl-5 text-xs text-left">
            A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design
          </td>
          <td class="px-4 py-2 text-xs">
            Adam
          </td>
          <td class="px-4 py-2 text-xs">
            112
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-right my-4 mx-4">
      <a
        class="checkout border-2 rounded-sm hover:bg-gray-100"
        href="#"
      >前往結帳</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showMiniCart: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.minicartList{
  font-family: "Verdana","新細明體",Geneva,Tahoma,sans-serif;
  min-width: 450px;
  width: 280px;
  top: 64px;
  right: 24px;

  & .checkout{
    padding: 8px 12px;
    width: 90px;
    height: 30px;
  }
}

@media (max-width:576px){
  .minicartList{
    min-width: 280px;
  }
}
</style>
