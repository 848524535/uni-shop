<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

defineProps<{
  list: BannerItem[]
}>()

const activeIndex = ref(0)

// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (e) => {
  // ! 非空断言 排除空值
  activeIndex.value = e.detail!.current
}
// 定义 props 接收
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text></text>
    </view>
  </view>
</template>

<style lang="scss">
@import './styles/XtxSwiper.scss';
</style>
