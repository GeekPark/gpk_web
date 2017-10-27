const baseMetaInfo = {
  "title": "极客公园-只为商业新变量",
  "description": "极客公园，为你带来互联网热门趋势、热点产品的深度分析，发掘产品和趋势的价值。",
  "keywords": "极客公园, geekpark, 极客, 极客观察, 极客活动, geek, geeker, 创业, 科技新闻, 移动互联网, 互联网创业, vr, 极客加速, app, 孵化器",
  "image": "https://ocpk3ohd2.qnssl.com/assets/v2/icons/geekpark-icon-196-03ac430f5643fc17aba3b3f5429a287d.png",
  "pubDate": new Date()
}

function getMeta (vm) {
  const { meta } = vm.$options
  let metaInfo = baseMetaInfo
  if (meta) {
    if (typeof meta === 'function') {
      Object.assign(metaInfo, meta.call(vm));
      metaInfo.title += ' | 极客公园'
    }
    return metaInfo
  }
}

const serverMetaMixin = {
  created () {
    const meta = getMeta(this)
    if (meta) {
      this.$ssrContext.meta = meta
    }
  }
}

const clientMetaMixin = {
  mounted () {
    // const title = getTitle(this)
    // if (title) {
    //   document.title = `${title.title}`
    // }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin
