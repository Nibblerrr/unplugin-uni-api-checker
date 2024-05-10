import type { MapToPlatform } from './types'

export const yellowText = '\x1B[33m'
export const redText = '\x1B[31m'
export const greenText = '\x1B[32m'
export const defaultText = '\x1B[0m'
export const overbold = '\x1B[1m'

export const mapToPlatform: MapToPlatform = {
  h5: 'H5',
  app: 'App',
  'mp-weixin': '微信小程序',
  'mp-alipay': '支付宝小程序',
  'mp-baidu': '百度小程序',
  'mp-lark': '飞书小程序',
  'mp-qq': 'QQ小程序',
  'mp-kuaishou': '快手小程序',
  'mp-toutiao': '抖音小程序',
  'mp-360': '360小程序',
  'mp-jd': '京东小程序',
}
