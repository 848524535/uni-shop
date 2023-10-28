// 分类页面的ts类型 //
// 三级分类
export type CategoryGoodItem = {
  desc: string
  id: string
  name: string
  orderNum: number
  picture: string
  price: string
}
//二级分类
export type CategoryChildItem = {
  goods: CategoryGoodItem[]
  id: string
  name: string
  picture: string
}
//一级分类
export type CategoryTopItem = {
  children: CategoryChildItem[]
  id: string
  imageBanners: string[]
  name: string
  picture: string
}
