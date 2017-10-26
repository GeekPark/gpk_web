const isWechat = () => /micromessenger/i.test(navigator.userAgent)
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

var Device = {}
Device.install = function (Vue, options) {
  Vue.prototype.$device = {
    isMobile,
    isWechat
  }
}
module.exports = Device;
