<template lang="pug">
.main-content
  .container
    .article-list
      .flash-item(v-for="post in posts", :key="post.id")
        .title {{post.title}}
        .summary {{post.summary}}
        .meta
          a.link(:href="`${post.source_link}`", :target="$store.state.target") 阅读原文
          .date {{post.published_at | fromNow}}
          a.share-btn.wechat.relative(href="javascript:;" data-type="wechat")
            i.iconfont.icon-wechat
            img.wx-qrcode(:src="post.id | qr")
          a.share-btn.weibo(href="javascript:;" @click="shared(post)" title="新浪微博" data-type="weibo")
            i.iconfont.icon-weibo
      .tac(v-if="!nomore")
        a.load-more(@click="fetch", :class="{'loading-in': loading}")
          .loading-article
          span 加载更多
      .tac(v-else) 没有更多内容了
    .article-sidebar
      hotnews(v-once)
</template>

<script>
import Hotnews from './posts/Hotnews.vue'
import QRious from 'qrious'
import api from 'store/api'

export default {
  components: { Hotnews },
  data () {
    return {
      loading: true,
      nomore: false,
      page: 0,
      posts: []
    }
  },
  meta () {
    return {
      title: "极客快讯"
    }
  },
  filters: {
    qr (id) {
      return new QRious({ value: document.location.href+'/'+id }).toDataURL()
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`news?page=${this.page}`).then((result) => {
        this.posts = this.posts.concat(result.data.news)
        this.loading = false
        if (result.data.meta.total_pages <= this.page) this.nomore = true
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    shared (post) {
      share.run(post)
    }
  },

  beforeMount () {
    this.fetch()
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
      url,
      '',
      `width=${this.setting.width}, height=${this.setting.height}, top=${this.getCoords('top')}, left=${this.getCoords('left')}, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no`
    );
  },
  run(post) {
    let url = encodeURIComponent(`${document.location}/${post.id}`),
        text = encodeURIComponent(post.title),
        des = encodeURIComponent(post.summary),
        thumb = '',
        appkey = '3896321144';
    let jump = `http://service.weibo.com/share/share.php?url=${url}&appkey=${appkey}&title=${text}&pic=${thumb}&ralateUid=1735559201`;
    share.openWindow(jump);
  }
};
</script>

<style lang="stylus" scoped>
.flash-item
  margin 15px 0 55px 15px
  clear both
  line-height 1.5
  color rgba(0, 0, 0, .8)
  font-size 14px
  .title
    font-size 18px
    font-weight bold
    margin-bottom .8em
  .summary
    color rgba(0, 0, 0, .5)
    margin .5em 0
    transition all .4s
  .meta
    .date
      display inline-block
    .link
      float right
      color #0185F2
      line-height 35px
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
</style>
