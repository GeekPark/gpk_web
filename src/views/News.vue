<template lang="jade">
#post
  section.container
    .main-wrap
      article
        header
          .video-player-area(v-if="postsData.post_type == 'video'")
            #play-room(v-if="postsData.extra.video_provider == 'cc'")
          .label.article-info(v-else)
            a.category-tag(:href="`/column/${postsData.column && postsData.column.id}`" target="_blank")  {{postsData.column && postsData.column.title}}
            .article-time {{postsData.reading_time}}min read
          h1 {{postsData.title}}
          .user-info(v-if="postsData.authors")
            a.author(:href="`/author/${postsData.authors.id}`")
              img(:src="postsData.authors.avatar_url")
              | {{postsData.authors.nickname}}
            span.release-date {{postsData.published_at | formatDate}}
        .topic-cover
          img(:src="postsData.cover_url")
          //- .tips 文章引言
          p {{postsData.abstract}}
        .article-content(v-html="postsData.content")
          p {{postsData.abstract}}
        .article-source
        section.tags
          a.article-tag(v-for="tag in postsData.tags", :href="`/tags/${tag}`", target="_blank") {{tag}}
        .share-wrap
          share(:title="postsData.title")
    aside.article-sidebar
      .ad-index
      hotnews
</template>

<script>
import api from 'stores/api'
import moment from 'moment'
import Hotnews from './posts/Hotnews.vue'
import Share from '../components/Share.vue'

export default {
  components: { Hotnews, Share },

  data () {
    return {
      postsData: {}
    }
  },
  mounted() {
    setTimeout(() => {
      const el = document.getElementById('play-room');
      console.log('video', el);
      if (el) {
        let videoScript = document.createElement('script');
        videoScript.src = `//union.bokecc.com/player?vid=${this.postsData.extra.video_id}&siteid=99F117B348066991&autoStart=true&playerid=0A25BF740EA51439&playertype=1&width=100%&height=100%`;
        videoScript.type ='text/javascript';
        el.innerHTML = '';
        el.appendChild(videoScript);
      }}, 1500)
  },
  methods: {
    fetch () {
      api.get(`posts/${this.$route.params.id}`).then(result => {
        console.log(result);
        this.postsData = result.data.post
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      return moment(value).format("YYYY/MM/DD")
    },
  },
  beforeMount () {
    this.fetch()
  }
}

</script>

<style lang="stylus">
@import "../stylus/var.styl";
#play-room
  height 480px
#post
  max-width 1080px
  margin 40px auto 0 auto
  .category-tag
    display inline-block
    padding 0 9px
    line-height 2
    background-color #DCDCDC
    font-size 14px
    margin-right 1em
    font-weight bold
    color #000

  .article-time
    display inline-block
    font-size 14px

  .user-info
    border-bottom 1px solid #ddd
    padding-bottom 10px
    margin-bottom 30px
    img
      width 40px
      height 40px
      border-radius 50%
      display inline-block
      vertical-align middle
      margin-right .5em
    .author
      margin-right 1em
  .topic-cover
    border-bottom 1px solid #ddd
    margin-bottom 30px
    img
      width 100%
    p
      line-height 1.5
      font-size 16px
      padding 20px
  .tags a
    display inline-block
    background-color #ededed
    color #848484
    margin 5px 10px 5px 0
    line-height 30px
    padding 0 15px
    transition all 0.3s
  

  .main-wrap
    width 692px
    display inline-block
    padding-bottom 120px

  .article-content
    word-wrap break-word
    font-size 1.6rem
    line-height 1.8
    letter-spacing 0.5px
    h2
      position relative
      font-size 2.3rem
      color #333
      padding-left 15px
      line-height 1.2
      border-left 8px solid #13ac67
    img
      display block
      max-width 100%
      margin 0 auto
      height auto
    img.js-lazy.blur
      width 100%
    img.loading
      cursor wait
    blockquote
      color #666
      border-left 4px solid #ddd
      padding-left 1.5rem
      margin 0
    iframe
      width 100%
    .gp_media_video
      position relative
      width 100%
      height 0
      padding-top 62%
      embed,
      iframe
        width 100%
        height 100%
        position absolute
        left 0
        top 0
    p
      margin 30px 0
    b,
    strong
      color #444
    a
      color #444
      text-decoration none
      border-bottom 1px dashed #444
  @media $media
    .main-wrap
      width 100%
</style>
