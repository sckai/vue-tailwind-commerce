<template>
  <div class="content mx-auto">
    <!-- component -->
    <div class="w-full py-6">
      <div class="flex">
        <div class="w-1/4">
          <div class="relative mb-2">
            <div
              :class="['', {'bg-green-500 text-white': step >= 1}]"
              class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"
            >
              <span
                :class="['', {'text-white': step >= 1}]"
                class="text-center text-black w-full"
              >
                1
              </span>
            </div>
          </div>

          <div class="text-xs text-center md:text-base">
            購物車確認
          </div>
        </div>

        <div class="w-1/4">
          <div class="relative mb-2">
            <div
              class="absolute flex align-center items-center align-middle content-center"
              style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
            >
              <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  class="w-0 bg-green-300 py-1 rounded"
                  :class="['',{'lineFull': step > 1, 'lineHalf': step === 1}]"
                />
              </div>
            </div>

            <div
              :class="['', {'bg-green-500': step >= 2}]"
              class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"
            >
              <span
                :class="['', {'text-white': step >= 2}]"
                class="text-center text-black w-full"
              >
                2
              </span>
            </div>
          </div>

          <div class="text-xs text-center md:text-base">
            填寫資料
          </div>
        </div>

        <div class="w-1/4">
          <div class="relative mb-2">
            <div
              class="absolute flex align-center items-center align-middle content-center"
              style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
            >
              <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  class="w-0 bg-green-300 py-1 rounded"
                  :class="['',{'lineFull': step > 2, 'lineHalf': step === 2, 'lineAir': step < 2}]"
                />
              </div>
            </div>

            <div
              :class="['', {'bg-green-500': step >= 3}]"
              class="w-10 h-10 mx-auto border-2 border-gray-200 rounded-full text-lg text-white flex items-center"
            >
              <span
                :class="['', {'text-white': step >= 3}]"
                class="text-center text-black w-full"
              >
                3
              </span>
            </div>
          </div>

          <div class="text-xs text-center md:text-base">
            付款
          </div>
        </div>

        <div class="w-1/4">
          <div class="relative mb-2">
            <div
              class="absolute flex align-center items-center align-middle content-center"
              style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
            >
              <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  class="w-0 bg-green-300 py-1 rounded"
                  :class="['',{'lineFull': step > 3, 'lineHalf': step === 3,'lineAir': step < 3}]"
                />
              </div>
            </div>

            <div
              :class="['', {'bg-green-500': step >= 4}]"
              class="w-10 h-10 mx-auto border-2 border-gray-200 rounded-full text-lg text-white flex items-center"
            >
              <span
                :class="['', {'text-white': step >= 4}]"
                class="text-center text-black w-full"
              >
                4
              </span>
            </div>
          </div>

          <div class="text-xs text-center md:text-base">
            完成
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  max-width: 1280px;
}
.lineFull{
  width: 100%;
}
.lineHalf{
  width: 50%;
}
.lineAir{
  width: 0%;
}
</style>
