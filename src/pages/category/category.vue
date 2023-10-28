<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
//引入API
import { getHomeBannerAPI } from '@/services/home'
import { getCategoryTopAPI } from '@/services/category'
//引入类型
import type { BannerItem } from '@/types/home'
import type { CategoryTopItem } from '@/types/category'
//引入组件
import PageSkeleton from './components/PageSkeleton.vue'
//定义变量
const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryTopItem[]>([])
const activeIndex = ref<number>(1)
const isFinish = ref<boolean>(false)
onLoad(async () => {
  await Promise.all([getBannerData(), getCategoryTopData()])
  isFinish.value = true
})

// 获取轮播图数据
const getBannerData = async () => {
  const res = await getHomeBannerAPI(2)
  bannerList.value = res.result
}
// 获取一级分类数据
const getCategoryTopData = async () => {
  const res = await getCategoryTopAPI()
  categoryList.value = res.result
}
// 基于高亮下标获取二级分类数据
const categorySubList = computed(() => {
  return categoryList.value[activeIndex.value]?.children || []
})
</script>

<template>
  <view class="viewport">
    <PageSkeleton v-if="!isFinish" />
    <template v-else>
      <!-- 搜索框 -->
      <view class="search">
        <view class="input">
          <text class="icon-search">女靴</text>
        </view>
      </view>
      <!-- 分类 -->
      <view class="categories">
        <!-- 左侧：一级分类 -->
        <scroll-view class="primary" scroll-y>
          <view
            v-for="(item, index) in categoryList"
            :key="item.id"
            class="item"
            :class="{ active: index === activeIndex }"
            @tap="activeIndex = index"
          >
            <text class="name">
              {{ item.name }}
            </text>
          </view>
        </scroll-view>
        <!-- 右侧：二级分类 -->
        <scroll-view enable-back-to-top class="secondary" scroll-y>
          <!-- 焦点图 -->
          <XtxSwiper :list="bannerList" />
          <!-- 内容区域 -->
          <view class="panel" v-for="item in categorySubList" :key="item.id">
            <view class="title">
              <text class="name">{{ item.name }}</text>
              <navigator class="more" hover-class="none">全部</navigator>
            </view>
            <view class="section">
              <navigator
                v-for="goods in item.goods"
                :key="goods.id"
                class="goods"
                hover-class="none"
                :url="`/pages/goods/goods?id=${goods.id}`"
              >
                <image class="image" :src="goods.picture"></image>
                <view class="name ellipsis">{{ goods.name }}</view>
                <view class="price">
                  <text class="symbol">¥</text>
                  <text class="number">{{ goods.price }}</text>
                </view>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './styles/category.scss';
</style>
@/services/category@/types/category
