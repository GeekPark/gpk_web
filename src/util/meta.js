const baseMetaInfo = {
  "description": "极客公园聚焦互联网领域，跟踪最新的科技新闻动态，关注极具创新精神的科技产品。目前涵盖前沿科技、游戏、手机评测、硬件测评、出行方式、共享经济、人工智能等全方位的科技生活内容。现有前沿社、挖App、深度报道、极客养成指南等多个内容栏目。",
  "keywords": "科技，科技媒体, 科技博客, 手机评测, 数码产品测评, android, apple, iPhone, 移动互联网, 社交媒体, 智能手机, 极客公园，奇点大会，创新大会",
  "image": "//imgslim.geekpark.net/geekpark-icon-196-03ac430f5643fc17aba3b3f5429a287d.png",
  "pubDate": new Date(),
  "upDate": new Date()
}

function formatDate(time) {
  return new Date(time).toISOString().slice(0, 19)
}

function getMeta (vm) {
  const { meta } = vm.$options
  let metaInfo = baseMetaInfo
  if (meta) {
    if (typeof meta === 'function') {
      metaInfo = Object.assign({}, baseMetaInfo, meta.call(vm))
      metaInfo.pubDate = formatDate(metaInfo.pubDate)
      metaInfo.upDate = formatDate(metaInfo.upDate)
      metaInfo.title = metaInfo.title ? metaInfo.title + ' | 极客公园' : "极客公园-推动商业新变量"
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
