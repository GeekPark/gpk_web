const isWechat = () => /micromessenger/i.test(navigator.userAgent)
const isMobile = () => ('ontouchstart' in window)

var Device = {}
Device.install = function (Vue, options) {
  Vue.prototype.$device = {
    isMobile,
    isWechat
  }
}
module.exports = Device;
