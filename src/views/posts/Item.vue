<template lang="jade">
article.article-item
  template(v-if="post.column.id === 251")
    a(class="dib-top img-cover-wrap tushang" v-bind:href="`/news/${post.id}`")
      .img-cover
        img(alt="" class="js-lazy loaded" v-bind:src="`${post.cover_url}?imageView2/1/w/285/h/214/interlace/1/q/88/ignore-error/1/`")
    .ts-list
      .ts-item(v-for="img in post.img_list.slice(0, 2)")
        img(:src="img")
      .img-count {{post.img_list.length}}张图片
      
    .article-info
      a.category-tag(:href="`/column/${columnId || post.column.id}`") {{columnTitle || post.column.title}}
      .article-time {{post.published_at | fromNow}}
      a(v-bind:href="`/news/${post.id}`")
        h3.multiline-text-overflow {{post.title}}

  //- template(v-else-if="post.column.id === 74")
  //-   .zaozhidao
  //-     .article-info
  //-       .article-zaozhidao
  //-         a(:href="`/news/${post.id}`")
  //-           h2.multiline-text-overflow {{post.published_at | getDay}} 极客早知道
  //-         ul
  //-           li(v-for="h2_title in post.h2_list")
  //-             | {{h2_title}}
  //-       a.category-tag(:href="`/column/${columnId || post.column.id}`") {{columnTitle || post.column.title}}
  //-       .article-time {{post.published_at | fromNow}}
  
  template(v-else)
    a.dib-top.img-cover-wrap(:class="{ 'video': post.post_type=='video' }" v-bind:href="`/news/${post.id}`")
      .img-cover
        img(alt="" class="js-lazy loaded" v-bind:src="`${post.cover_url}?imageView2/1/w/285/h/214/interlace/1/q/88/ignore-error/1/`")
    .article-info
      a.category-tag(:href="`/column/${columnId || post.column.id}`") {{columnTitle || post.column.title}}
      .article-time {{post.published_at | fromNow}}
      a(v-bind:href="`/news/${post.id}`")
        h3.multiline-text-overflow {{post.title}}
      p.multiline-text-overflow {{post.abstract}}

  .article-meta.hidden-xs
    a.article-author(v-for="author in post.authors", :href="`/author/${author.id}`") {{author.nickname}}
    .source-right
      template(v-if="post.comments_count > 0")
        i.iconfont.icon-comment
        | {{post.comments_count}}
      a.btn-comment(v-if="post.like_count > 0", :href="`/news/${post.id}#comment`")
        i.iconfont.icon-like
        | {{post.like_count}}
  .article-meta.hidden-notxs
    a(v-if="post.like_count > 0", :href="`/news/${post.id}#comment`")
      | {{post.like_count}}条评论
  .clear
</template>

<script>
import moment from 'moment'
export default {
  props: ['post', 'columnId', 'columnTitle'],
  filters: {
    fromNow: function (value) {
      if (!value) return ''
      let str;
      const time = moment(value);
      const diff = moment().diff(time, 'days');
      if (diff >= 1) {
        str = time.format('YYYY/MM/DD HH:mm');
      } else {
        str = time.locale('zh-cn').fromNow();
      }
      return str
    },
    getDay: function (value) {
      if (!value) return ''
      return moment(value).format('MM月DD日');
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/var.styl";
.clear
  clear both
  height 0
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
        color #0185F2
  p
    font-size 16px
    color rgba(0,0,0,.5)
  .article-time
    display: inline-block;
    font-size 14px
  .article-meta
    position absolute
    bottom 25px
    right 0
    left 0
    padding-left 305px
    line-height 2
    color rgba(0,0,0,.5)
    a
      color rgba(0,0,0,.5)
    .btn-comment
      margin-left 20px
    .source-right
      float right
      vertical-align middle
  .img-cover-wrap
    float left
    margin-right 20px
  .img-cover
    width: 285px;
    height: 214px;
    background-color: #c3c3c3;
    border 1px solid #efefef
    position: relative;
    overflow hidden
    text-align center
    img
      height 100%
      display inline
      margin 0 -100%
  .article-info
    position relative
  .img-cover-wrap.tushang
    .img-cover
      height 285px
  .ts-list
    position relative
    margin-left 305px
    margin-bottom 10px
    .ts-item
      box-sizing border-box
      width 50%
      display inline-block
      float right
      border 1px solid #efefef
      &:first-of-type
        float none
        margin-left -10px
      img
        width 100%
        height 138px
    .img-count
      background rgba(0,0,0,.3)
      position absolute
      right 0
      top 0
      width 50%
      box-sizing border-box
      padding-left 10px
      text-align center
      line-height 138px
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
    display: inline-block;
    padding: 0 9px;
    line-height 2
    background-color: #DCDCDC;
    font-size: 14px;
    margin-right 1em
    font-weight bold
  @media $media
    // display flex
    p
      display none
    .article-zaozhidao
      h2
        font-size 22px
    h3
      font-size 16px
      margin 4px 0
      line-height 1.4
    .img-cover-wrap
      margin-right 15px
      &.video
        margin 0 0 15px 0
        width 100%
        float none
        .img-cover
          width 100%
          height 165px
      &.tushang
        width calc(50% - 3px)
        margin-right 0px
        float none
        display inline-block
        box-sizing border-box
        .img-cover
          width 100%
          height 164px
    .ts-list
      margin 0
      margin-left 6px
      display inline-block
      width calc(50% - 3px)
      padding 0
      margin-bottom 20px
      .ts-item
        box-sizing border-box
        width 100%
        display inline-block
        float none
        height 80px
        &:first-of-type
          margin 0px
          margin-bottom 6px
        img
          width 100%
          height 100%
          vertical-align bottom
      .img-count
        top unset
        width 100%
        bottom 0
        padding-left 0px
        line-height 80px
        font-size 20px
    .img-cover
      width 90px
      height 90px
    .article-info
      margin-left 0
      flex 1
    .category-tag
      padding 0 5px
      margin-right .5em
    .category-tag
    .article-time
      font-size 12px
    .article-meta
      font-size 10px
      padding-left 105px
      line-height 1
</style>
