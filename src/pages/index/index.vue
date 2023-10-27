<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// 引入组件
import CustomNavbar from './component/CustomNavbar.vue'
import CategoryPanel from './component/CategoryPanel.vue'
import HotPanel from './component/HotPanel.vue'
import Skeleton from './component/Skeleton.vue'
// 引入api
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
// 引入ts类型
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
// 引入组件实例类型
import type { XtxGuessInstance } from '@/types/component'

const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
const guessRef = ref<XtxGuessInstance>()
//下拉刷新状态
const isTriggered = ref<boolean>(false)
//是否在加载
const isLoading = ref<boolean>(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])

  isLoading.value = false
})
//获取轮播图数据
const getHomeBannerData = async () => {
  let res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//获取前台分类数据
const getHomeCategoryData = async () => {
  let res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//获取热门推荐数据
const getHomeHotData = async () => {
  let res = await getHomeHotAPI()
  hotList.value = res.result
}
//滚动到底部的事件回调
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
//下拉刷新的事件回调
const onRefresherrefresh = async () => {
  // 重置数据
  guessRef.value?.reset()
  //开启动画
  isTriggered.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  //关闭动画
  isTriggered.value = false
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <CustomNavbar></CustomNavbar>

    <!-- refresher-enabled 开启自定义下拉刷新 refresher-triggered 下拉刷新动画是否开启 -->
    <scroll-view class="scroll-view" scroll-y refresher-enabled :refresher-triggered="isTriggered"
      @refresherrefresh="onRefresherrefresh" @scrolltolower="onScrolltolower">
      <!-- 骨架屏 -->
      <Skeleton v-if="isLoading"></Skeleton>
      <template v-else>
        <!-- 轮播图 -->
        <XtxSwiper :list="bannerList"></XtxSwiper>
        <!-- 分类组件 -->
        <CategoryPanel :list="categoryList"></CategoryPanel>
        <!-- 热门组件 -->
        <HotPanel :list="hotList"></HotPanel>
        <!-- 猜你喜欢 -->
        <XtxGuess ref="guessRef"></XtxGuess>
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
