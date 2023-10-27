//引入组件
import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'
//扩展@vue/runtime-core模块的声明
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    //typeof 判断XtxSwiper组件的类型
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
