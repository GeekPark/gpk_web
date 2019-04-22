<template lang="pug">
.recommend(v-if="data.topics.length > 2")
  h3 专题精选
  article.news-item(data-track-category="topics" data-track-item="a.topic-card")
    a.topic-card(v-for="topic, index in data.topics", :key="topic.id", :href="`/topic/${topic.id}`", :target="$store.state.target")
      img(v-lazy="topic.app_banner_url" w=240 h=160)
      .mask(v-if="!topic.title_visible")
        h4.multiline-text-overflow {{topic.title}}
        // p {{topic.post_count}}篇文章
</template>

<script>
import api from 'store/api'

export default {
  data () {
    return {
      loading: true,
      data: {
        topics: [],
      }
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`topics/recommendation?per=3`).then((result) => {
        this.data = result.data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        // this.$message.error(err.toString())
      })
    },
  },
  beforeMount () {
    this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  // border 1px solid #E4E4E4
  // padding 16px
  margin-bottom 50px
  h3
    font-size 22px
    margin 0
  .news-item
    display flex
    justify-content space-between
    .topic-card
      margin-top 20px
      position relative
      overflow hidden
      display block
      width 31%
      img
        width 100%
        // height 150px
        // display block
        // min-height 160px
      .mask
        display flex
        flex-direction column
        justify-content flex-end
        align-items center
        position absolute
        top 0
        left 0
        background-color rgba(0,0,0,.4)
        transition all .5s
        width 100%
        height 100%
        color #fff
        h4
          margin 0
          margin-bottom 10px
          padding 0px 10px
          line-height 1.2
          font-size 16px
          font-weight 500
        p
          margin 0
          font-size 14px
@media screen and (max-width: 767px)
  .recommend
    display none
</style>
