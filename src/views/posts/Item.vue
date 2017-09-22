<template lang="jade">
article.article-item(v-once, :class="{'tushang': (columnId || post.column.id) === 251, 'video': post.post_type=='video'}")
  template(v-if="(columnId || post.column.id) === 251")
    a.img-cover-wrap(:href="`/news/${post.id}`", :target="$store.state.target")
      .img-cover
        img(v-lazy="post.cover_url" w=285 h=214)
    a(:href="`/news/${post.id}`", :target="$store.state.target")
      .ts-item(v-for="(img, index) in post.img_list.slice(0, 2)")
        .img-cover
          img(v-lazy="img" w=255 h=129)
        .img-count(v-if="index == 1") {{post.img_list.length}}张图片

    .article-info
      a.category-tag(:href="`/column/${columnId || post.column.id}`", :target="$store.state.target") {{columnTitle || post.column.title}}
      .article-time {{post.published_timestamp | fromNow}}
      a(v-bind:href="`/news/${post.id}`", :target="$store.state.target")
        h3.multiline-text-overflow {{post.title}}

  //- template(v-else-if="(columnId || post.column.id) === 74")
  //-   .zaozhidao
  //-     .article-info
  //-       .article-zaozhidao
  //-         a(:href="`/news/${post.id}`")
  //-           h2.multiline-text-overflow {{post. | getDay}} 极客早知道
  //-         ul
  //-           li(v-for="h2_title in post.h2_list")
  //-             | {{h2_title}}
  //-       a.category-tag(:href="`/column/${columnId || post.column.id}`") {{columnTitle || post.column.title}}
  //-       .article-time {{post.published_timestamp | fromNow}}

  template(v-else)
    a.img-cover-wrap(:href="`/news/${post.id}`", :target="$store.state.target")
      .img-cover
        img(v-lazy="post.cover_url" w=285 h=214)
        .play(v-if="post.post_type=='video'")
          i.iconfont.icon-play
          span {{post.extra && post.extra.duration}}
    .article-info
      a.category-tag(:href="`/column/${columnId || post.column.id}`", :target="$store.state.target") {{columnTitle || post.column.title}}
      .article-time {{post.published_timestamp | fromNow}}
      a(v-bind:href="`/news/${post.id}`", :target="$store.state.target")
        h3.multiline-text-overflow {{post.title}}
      p.multiline-text-overflow {{post.abstract}}

  .article-meta.hidden-xs
    a.article-author(v-for="author in post.authors", :href="`/users/${author.id}`", :target="$store.state.target") {{author.nickname}}
    .source-right
      a.btn-comment(v-if="post.comments_count > 0", :href="`/news/${post.id}#comment`", :target="$store.state.target")
        i.iconfont.icon-comment
        | {{post.comments_count}}
      template(v-if="post.like_count > 0")
        i.iconfont.icon-like
        | {{post.like_count}}
  .article-meta.hidden-notxs
    a(v-if="post.comments_count > 0", :href="`/news/${post.id}#comment`")
      | {{post.comments_count}}条评论
  .clearfix
</template>

<script>
export default {
  props: ['post', 'columnId', 'columnTitle']
}
</script>

<style lang="stylus">
@import "../../stylus/var.styl";
.clearfix
  height 0
  clear both
  overflow hidden
.article-item
  padding 25px 0
  position relative
  line-height 1.5
  clear both
  &:before, &:after
    position absolute
    top 0
    bottom 0
    width 25px
    background #FBFBFB
    content ''
    display none
    overflow hidden
    box-sizing border-box
  &:before
    left -25px
  &:after
    right -25px
  &:hover
    background #FBFBFB
    &:before, &:after
      display block
    a
      h3, h2
        color $color-blue
  p
    font-size 16px
    color rgba(0,0,0,.5)
    margin 10px 0
  h3
    margin 10px 0
  .article-time
    display inline-block
    font-size 14px
    color rgba(0,0,0,.5)
  .article-meta
    position absolute
    bottom 25px
    right 0
    left 0
    padding-left 37%
    line-height 2
    color rgba(0,0,0,.5)
    a
      color rgba(0,0,0,.5)
    .icon-like
      margin-left 20px
    .source-right
      float right
      vertical-align middle
  .img-cover-wrap
    position relative
    display inline-block
    width 35%
    margin-right 2%
    float left
    .play
      position absolute
      left 50%
      top 50%
      width 60px
      height 60px
      background rgba(255,255,255,.9)
      box-shadow 0 0 13px 1px rgba(0,0,0,0.20)
      color rgba(0,0,0,.9)
      border-radius 50%
      font-size 22px
      text-indent .25em
      line-height 60px
      text-align center
      transform translate(-50%, -50%)
      transition transform 0.3s ease
      &:hover
        transform translate(-50%, -50%) scale3d(1.15, 1.15, 1)
      span
        display none
  .img-cover
    padding-bottom 75%
    background-color: #c3c3c3;
    border 1px solid #efefef
    position: relative;
    overflow hidden
    text-align center
    img
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      height 100%
      width auto
      min-width 100%
  .article-info
    position relative
    display inline-block
    width 63%
    overflow hidden
  &.tushang
    .img-cover
      padding-bottom 100%
  .ts-item
    box-sizing border-box
    width 31.5%
    display inline-block
    position relative
    margin-bottom 10px
    &:first-of-type
      margin-left -1%
      margin-right 1%
    .img-cover
      padding-bottom 50%
    .img-count
      background rgba(0,0,0,.3)
      border 1px solid #efefef
      position absolute
      right 0
      top 0
      left 0
      bottom 0
      padding-top 18%
      text-align center
      color #fff
      font-size 26px
  .zaozhidao ~ .hidden-notxs
    a
      float right
  .article-zaozhidao
    border-color #000 rgba(0,0,0,.3)
    border-style solid
    border-width 6px 1px
    padding 25px 35px
    margin-bottom 15px
    h2
      font-size 32px
    ul
      list-style-type square
      padding-left 1.5em
      line-height 2
      font-size 18px
  .category-tag
    display inline-block
    padding 0 9px
    line-height 2
    background-color #DCDCDC
    font-size 14px
    margin-right 1em
    font-weight bold
  @media $media
    padding 10px 0
    // display flex
    &:hover
      background inherit
      &:before, &:after
        display none
      a
        h3, h2
          color inherit
    p
      display none
    .article-zaozhidao
      h2
        font-size 22px
    h3
      font-size 16px
      line-height 1.4
    .img-cover-wrap
      width 30%
    .img-cover
      padding-bottom 100%
    .article-info
      width 68%
    &.tushang, &.video
      .article-info
        width 100%
        margin-top 10px
        margin-bottom 15px
      .article-meta
        padding-left 0
    &.tushang
      .img-cover-wrap
        width 50%
      .ts-item
        width 48%
        margin 0
        vertical-align top
        &:first-of-type
          margin 0 0 1.5% 0
        .img-count
          font-size 16px
    &.video
      .img-cover-wrap
        width 100%
      .img-cover
        padding-bottom 50%
        .play
          background rgba(0,0,0,1)
          color #fff
          width auto
          border-radius 0
          font-size 12px
          left 10px
          bottom 10px
          line-height 1.2
          height auto
          transform none
          text-indent 0
          top inherit
          padding 4px .6em
          font-weight 300
          span
            display inline
            padding-left .5em
    .category-tag
      padding 0 5px
      margin-right .5em
    .category-tag
    .article-time
      font-size 12px
    .article-meta
      font-size 10px
      padding-left 32%
      line-height 1
      bottom 10px
</style>
