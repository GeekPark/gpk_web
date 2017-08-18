<template lang="jade">
article.article-item
  a(class="dib-top img-cover-wrap" v-bind:href="`/news/${post.id}`")
    .img-cover
      img(alt="" class="js-lazy loaded" v-bind:src="`${post.cover_url}?imageView2/1/w/285/h/214/interlace/1/q/88/ignore-error/1/`")
  .article-info
    a.category-tag(:href="`/column/${columnId || post.column.id}`") {{columnTitle || post.column.title}}
    .article-time {{post.published_at | fromNow}}
    a(v-bind:href="`/news/${post.id}`")
      h3.multiline-text-overflow {{post.title}}
    p.multiline-text-overflow {{post.abstract}}
    .article-source
      .source-left(v-if="post.authors")
        a.article-author(:href="`/author/${post.authors.id}`") {{post.authors.nickname}}
      .source-right
        template(v-if="post.comments_count > 0")
          img.icon-svg(src="../../assets/imgs/icons/comment.svg")
          | {{post.comments_count}}
        template(v-if="post.like_count > 0")
          img.icon-svg(src="../../assets/imgs/icons/like.svg")
          | {{post.like_count}}
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
        str = time.format('YYYY-MM-DD HH:mm');
      } else {
        str = time.locale('zh-cn').fromNow();
      }
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../stylus/var.styl";
.icon-svg
  display inline-block
  vertical-align middle
  width 1em
  color currentColor
  margin 0 .5em
.article-item
  margin 25px 0
  position relative
  line-height 1.5
  overflow hidden
  clear both
  h3
    font-size 22px
  p
    font-size 16px
    color rgba(0,0,0,.5)
  .source-left
    float left
  .source-right
    float right
    vertical-align middle
  .img-cover-wrap
    float: left;
  .img-cover
    width: 285px;
    height: 214px;
    background-color: #c3c3c3;
    position: relative;
    overflow hidden
    text-align center
    img
      height 100%
      display inline
      margin 0 -100%
  .article-info
    margin-left 305px
  .category-tag
    display: inline-block;
    padding: 0 9px;
    line-height 2
    background-color: #DCDCDC;
    font-size: 14px;
    margin-right 1em
    font-weight bold
  .article-time
    display: inline-block;
    font-size 14px
  @media $media
    display flex
    p
      display none
    h3
      font-size 16px
      margin 4px 0
      line-height 1.4
    .img-cover
      width 90px
      height 90px
    .article-info
      margin-left 15px
      flex 1
    .category-tag
      padding 0 5px
      margin-right .5em
    .category-tag
    .article-time
      font-size 12px
    .article-source
      font-size 10px
</style>
