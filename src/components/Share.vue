<template lang="jade">
.share-wrap.js-share-wrap(data-track-category="article.share" data-track-item=".js-share-btn")
    .share-wrap-btn
      span 分享至
    .share-list.weixin
      a.share-btn.relative.js-share-btn(href="javascript:;" data-type="wechat")
        i.iconfont.icon-wechat
        img.wx-qrcode(:src="qr")
    .share-list.sina_weibo
      a.share-btn.js-share-btn(href="javascript:;" title="新浪微博" data-type="weibo")
        i.iconfont.icon-weibo
    .share-list.twitter
      a.share-btn.js-share-btn(href="javascript:;" title="twitter" data-type="twitter")
        i.iconfont.icon-twitter
    .share-list.linkedin
      a.share-btn.js-share-btn(href="javascript:;" title="linkedin" data-type="linkedin")
        i.iconfont.icon-linkedin
</template>

<script>
import api from 'stores/api'
import QRious from 'qrious'

export default {
    name: 'share',
    props: ["title"],
    computed: {
        qr() {
            return new QRious({value: document.location.href}).toDataURL()
        }
    },
    mounted() {
        $('.js-share-btn').on('click', function () {
            const type = $(this).data('type');
            if (type !== 'wechat') {
                share.run({ type });
            }
            // if (gon.topic_id !== 'undefined') countShare(type, gon.topic_id);
        });

        const countShare = (type, id) => {
            // type: wechat weibo linkedin twitter
            api.patch(`topic/${id}/add_count`, {name: type}).then(result => {
                console.log(result);
                this.postsData = result.data.post
            }).catch((err) => {
                console.log(err);
                this.$message.error(err.toString())
            })
        };
    }
}

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
</script>

<style lang="stylus">
@import "../stylus/var.styl";

.share-wrap
  span
    line-height 80px
.share-list
.share-wrap-btn
  display inline-block
.share-btn
  display inline-block
  width 35px
  height 35px
  text-align center
  line-height 35px
  border-radius 50%
  color #5B5B5B
  opacity 1
  transition all 0.4s
  background-color #F6F6F6
  margin-left 1em
  &:hover .iconfont
    opacity 0.8
.share-btn .iconfont
  font-size 16px
  line-height 36px
  font-weight normal
.wx-qrcode
  position absolute
  width 120px
  height 120px
  left 50%
  top 40px
  margin-left -60px
  opacity 0
  transform scale(0)
  transform-origin top center
  transition all 0.3s
.share-list.weixin .share-btn:hover .wx-qrcode
  opacity 1
  transform scale(1)
@media screen and (max-width: $screen-xs-max)
  .share-list.weixin
    display none
</style>