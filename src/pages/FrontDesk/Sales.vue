<template>
  <div>
    <div class="content mx-auto p-10">
      <h2 class="text-3xl font-light">
        促銷
      </h2>
      <section class="section-style flex justify-center items-center w-full bg-cover bg-center-center my-5 rounded-sm">
        <div class="section-content w-full sm:w-7/12 bg-gray-100 mx-auto p-10 bg-opacity-50 rounded-sm">
          <h2 class="text-gray-100">
            清倉銷售
          </h2>
          <font class="text-4xl text-bold text-gray-100">
            高達70％的折扣
          </font>
          <div class="text-3xl text-bold text-gray-100">
            所有銷售都是最終的！
          </div>
        </div>
      </section>
      <h3 class="text-2xl mb-3">
        清倉銷售。最高折扣70％。所有銷售都是最終的！
      </h3>
      <span class="text-red-500 my-3">70%優惠折扣碼:707070</span>
      <div class="w-full md:w-8/24 mx-auto mt-5">
        <router-link
          :to="{ name: 'productShop'}"
        >
          <a
            class="my-auto bg-black py-3 w-32 rounded-sm hover:bg-gray-600 p-2"
          >
            <span class="text-white">
              選購所有產品
            </span>
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content{
  max-width: 1024px;
}

.section-style{
  height: 400px;
  background-image: url('https://cdn.stocksnap.io/img-thumbs/960w/autumn-trees_WV0YTVMU7P.jpg');
  & .section-content{
    max-height: 400px;
  }
}
</style>
