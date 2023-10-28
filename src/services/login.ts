import { http } from '@/utils/http'

export type LoginParams = {
  /**
   * code 通过 wx.login() 获取
   */
  code: string
  /**
   * 通过 getphonenumber 事件回调中获取
   */
  encryptedData: string
  /**
   * 通过 getphonenumber 事件回调中获取
   */
  iv: string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMin = (data: LoginParams) => {
  return http({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
