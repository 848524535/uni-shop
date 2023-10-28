//商品属性
export type Property = {
  name: string
  value: string
}
//商品细节
export type Details = {
  pictures: string[]
  properties: Property[]
}

/* 同类商品 */
export type GoodsItem = {
  //备注
  desc: string
  id: string
  name: string
  //销量
  orderNum: number
  picture: string
  price: string
}

// 规格信息
export type SpecsItem = {
  name: string
  valueName: string
}
/* sku */
export type SkuItem = {
  id: string
  // 库存
  inventory: number
  oldPrice: string
  picture: string
  price: string
  // sku编码
  skuCode: string
  // 规格集合
  specs: SpecsItem[]
}

//可选规格信息
export type Value = {
  //是否可售
  available?: boolean
  // 可选值备注
  desc: string
  name: string
  picture: null | string
}
/* 可选规格 */
export type SpecItem = {
  id: string
  name: string
  values: Value[]
}

/* 商品信息 */
export type GoodsResult = {
  id: string
  name: string
  //商品描述
  desc: string
  price: number
  oldPrice: number
  details: Details
  mainPictures: string[]
  //同类商品集合
  similarProducts: GoodsItem[]
  //sku集合
  skus: SkuItem[]
  //可选规格集合
  specs: SpecItem[]
  //用户收获地址列表
  userAddresses: null
}
