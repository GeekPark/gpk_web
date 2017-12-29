<template lang="pug">
.share-wrap.js-share-wrap
  span 分享至
  a.share-btn.wechat.relative.js-share-btn(href="javascript:;" data-type="wechat")
    i.iconfont.icon-wechat
    img.wx-qrcode(:src="qr")
  a.share-btn.weibo.js-share-btn(href="javascript:;" title="新浪微博" data-type="weibo")
    i.iconfont.icon-weibo
  a.share-btn.twitter.js-share-btn(href="javascript:;" title="twitter" data-type="twitter")
    i.iconfont.icon-twitter
  a.share-btn.linkedin.js-share-btn(href="javascript:;" title="linkedin" data-type="linkedin")
    i.iconfont.icon-linkedin
</template>

<script>
import api from 'store/api'
import QRious from 'qrious'

export default {
  name: 'share',
  props: ["title"],
  data () {
    return {
      qr: ''
    }
  },
  mounted() {
    this.qr = new QRious({ value: document.location.href }).toDataURL()
    var share = {
      setting: {
        width: 700,
        height: 400
      },
      getCoords: (type) => {
        if (type === 'top') return (window.innerHeight - share.setting.height) / 2;
        if (type === 'left') return (window.innerWidth - share.setting.width) / 2;
      },
      openWindow(url) {
        window.open(
          url, '',
          `width=${this.setting.width}, height=${this.setting.height}, top=${this.getCoords('top')}, left=${this.getCoords('left')}, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no`);
      },
      run({ type, url, text, des, thumb, appkey }) {
        url = encodeURIComponent(url || document.location);
        text = encodeURIComponent(text || document.title);
        des = encodeURIComponent(des || '');
        thumb = thumb || '';
        appkey = appkey || '3896321144';

        let jump;
        switch (type) {
          case 'weibo':
            jump = `http://service.weibo.com/share/share.php?url=${url}&appkey=${appkey}&title=${text}&pic=${thumb}&ralateUid=1735559201`;
            break;
          case 'twitter':
            jump = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=GeekParkNet`;
            break;
          case 'linkedin':
            jump = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=${des}&source=GeekPark`
            break;
        }

        share.openWindow(jump);
      }
    };

    $('.js-share-btn').on('click', function() {
      const type = $(this).data('type');
      if (type !== 'wechat') {
        share.run({ type });
      }
      // if (gon.topic_id !== 'undefined') countShare(type, gon.topic_id);
    });

    const countShare = (type, id) => {
      // type: wechat weibo linkedin twitter
      api.patch(`topic/${id}/add_count`, { name: type }).then(result => {
        this.postsData = result.data.post
      }).catch((err) => {
        // this.$message.error(err.toString())
      })
    };
  }
}


</script>

<style lang="stylus">
.share-wrap
  span
    line-height 80px
.share-btn
  display inline-block
  width 35px
  height 35px
  text-align center
  line-height 35px
  border-radius 50%
  color #5B5B5B
  opacity 1
  transition all 0.2s
  background-color #F6F6F6
  margin-left 1em
  &:hover
    color #fff
.share-btn.wechat:hover
  background-color #00D10D
.share-btn.weibo:hover
  background-color #DF2029
.share-btn.twitter:hover
  background-color #049FF6
.share-btn.rss:hover
  background-color #F99726
.share-btn.linkedin:hover
  background-color #0077B7
.share-btn .iconfont
  font-size 16px
  line-height 36px
  font-weight normal
.wx-qrcode
  position absolute
  width 120px
  height 120px
  left 50%
  bottom 40px
  margin-left -60px
  opacity 0
  transform scale(0)
  transform-origin bottom center
  transition all 0.3s
.share-btn.wechat:hover .wx-qrcode
  opacity 1
  transform scale(1)
@media screen and (max-width: 767px)
  .share-btn.wechat
    display none
</style>