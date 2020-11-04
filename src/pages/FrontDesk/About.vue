<template>
  <div>
    <div class="jumbotron w-full flex items-end mx-auto bg-cover p-10">
      <div class="bg-gray-100 w-full p-5 text-left bg-opacity-25">
        <h2 class="text-5xl text-gray-800 flex justify-center md:block">
          愛，旅遊
        </h2>
        <p class="text-xl text-gray-700 hidden md:block">
          比起走了多少公里，一路上結交了多少朋友是衡量一趟旅行更好的方式.
        </p>
      </div>
    </div>
    <div class="mt-10">
      <img
        class="travel-style mx-auto"
        src="../../assets/img/travel-2.png"
        alt="找不到圖片"
      >
      <h2 class="font-bold text-3xl my-5">
        乘風吹轉 漫步大自然
      </h2>
      <div class="flex justify-center">
        <font class="font-style text-gray-500">
          該主題旅遊背後的想法很簡單：打破旅遊市場計劃，其獨特之處在於依照主題提供旅遊產品的品牌為唯一特徵，從而為所有旅遊提供最主題服務，身體和心靈一起感受最貼近你的旅遊。合適的價格，歡迎您來旅遊。
        </font>
      </div>
      <h2 class="font-bold text-3xl my-5">
        我們提供各種主題旅遊
      </h2>
      <div class="flex justify-center mb-5">
        <font class="font-style text-gray-500">
          我們的商店不僅僅是普通的在線零售商。我們不僅銷售最優質的旅遊，還為我們的客戶提供積極的在線諮詢服務。
        </font>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbotron{
  background-image: url('../../../src/assets/img/jumbotron-bg.jpg');
  // max-width: 1024px;
  height: 380px;
}
.travel-style{
  width: 400px;
  height: 300px;
}
.font-style{
  max-width: 680px;
}
</style>
