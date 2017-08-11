<template lang="jade">
#comment
  textarea(placeholder="你有什么看法..." name="textarea-io" v-model="message")
  input(type="button" class="submit-comment" value="发表评论" @click="inputComment")
  h3 热门评论{{message}}
    .main-wrap
      .div(v-for="comment in comments")
        template(v-if="comment.commenter_info && comment.commenter_info.length > 0")
          img(:src="comment.commenter_info[0].avatar_url", width="100" )
          p {{comment.content}}
          P 赞 {{comment.like_count}}
          p {{comment.created_at}}
          p 回复
          template(v-if="comment.childrens && comment.childrens.length > 0")
            .div(v-for="c_comment in comment.childrens")
              template(v-if="c_comment.commenter_info && c_comment.commenter_info.length > 0")
                img(:src="c_comment.commenter_info[0].avatar_url", width="100" )
                p {{c_comment.content}}
                P 赞 {{c_comment.like_count}}
                p {{c_comment.created_at}}
                p 回复
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
      comments: [],
      message: ""
    }
  },
  mounted() {
  },
  methods: {
    fetch () {
      api.get(`posts/220548/comments`).then(result => {
        console.log(result);
        this.comments = result.data.comments
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
    inputComment() {
      api.post(`posts/220548/comments?access_key=${this.$store.state.access_key}`, {
        content: this.message,
        parent_id: 240650
      }).then(result => {
        console.log(result);
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
#comment
  background #F6F6F6

  @media $media
    .main-wrap
      width 100%
</style>
