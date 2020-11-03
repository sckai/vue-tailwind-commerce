<template>
  <div>
    <div class="p-1">
      <div class="flex flex-wrap md:flex-no-wrap overflow-hidden">
        <div class="w-6/12 md:w-7/24 p-1 text-white hover:text-black cursor-pointer transition duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-110 hover:z-50">
          <div class="ice img-height flex items-end w-full bg-blue-900 h-64 pb-16 bg-center-center bg-cover">
            <div class="w-64 text-2xl p-3 mb-3 mx-auto bg-gray-200 bg-opacity-25 rounded-lg">
              醉美北歐
            </div>
          </div>
        </div>
        <div class="w-6/12 md:w-6/24 p-1 text-white hover:text-black cursor-pointer transition duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:z-50">
          <div class="historic-site img-height flex items-end w-full bg-blue-900 h-64 pb-16 bg-center-center bg-cover">
            <div class="w-64 text-2xl p-3 mb-3 mx-auto bg-gray-200 bg-opacity-25 rounded-lg">
              南亞風情
            </div>
          </div>
        </div>
        <div class="w-6/12 md:w-6/24 p-1 text-white hover:text-black cursor-pointer transition duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:z-50">
          <div class="sea img-height flex items-end w-full bg-blue-900 h-64 pb-16 bg-center-left bg-cover">
            <div class="w-64 text-2xl p-3 mb-3 mx-auto bg-gray-200 bg-opacity-25 rounded-lg">
              夏日炎海
            </div>
          </div>
        </div>
        <div class="w-6/12 md:w-7/24 p-1 text-white hover:text-black cursor-pointer transition duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:z-50">
          <div class="europe img-height flex items-end w-full bg-blue-900 h-64 pb-16 bg-center-center bg-cover">
            <div class="w-64 text-2xl p-3 mb-3 mx-auto bg-gray-200 bg-opacity-25 rounded-lg">
              歐洲精選
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-full md:w-12/24 flex justify-between mx-auto my-3 p-2">
        <div class="my-auto w-full md:w-6/24">
          <img
            class="w-64 md:w-32 h-32 md:h-16 mx-auto"
            src="https://cdn.stocksnap.io/img-thumbs/960w/woman-sitting_VWDZANCNZJ.jpg"
            alt="123"
          >
        </div>
        <div class="w-full md:w-10/24 text-xl p-2">
          清倉大甩賣，最高可享<font class="text-red-500">
            70％Off
          </font>。所有銷售都是最終的！
          <div class="text-center md:text-left p-2 tracking-normal text-sm text-gray-500">
            最後機會利用我們的折扣！
          </div>
        </div>
        <div class="w-full md:w-8/24 my-auto">
          <a
            class="my-auto bg-black py-3 w-32 rounded-sm hover:bg-gray-600 p-2"
            href="#"
          >
            <span class="text-white">
              選購所有產品
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '',
    titleTemplate: '漫步旅遊',
    htmlAttrs: {
      lang: 'zh'
    }
  }
}
</script>

<style lang="scss" scoped>
.img-height{
  height: calc(100vh - 20px); //header - footer padding half
}

.ice{
  background-image: url('https://cdn.stocksnap.io/img-thumbs/960w/winter-aurora_UPH5IH4QQO.jpg');
}
.historic-site{
  background-image: url('https://cdn.stocksnap.io/img-thumbs/960w/mountain-highland_K9KMXPM9H9.jpg');
}
.sea{
  background-image: url('https://cdn.stocksnap.io/img-thumbs/960w/Maldives-Couple_Z2FVSJZAEN.jpg');
}
.europe{
  background-image: url('https://cdn.stocksnap.io/img-thumbs/960w/eiffel%20tower-france_6UZ3XEKQVA.jpg');
}
</style>
