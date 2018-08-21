<template lang="pug">
.need-report-wrapper(v-once)
  .banner-bg
  .container.report-container
    h1.page-title 寻求报道
    .wrapper-bg
      .report-success.tac.hidden#success-panel
        .success
        h2 申请提交成功
        p.success-text 我们会尽快处理您的寻求报道申请，申请通过后会第一时间与您取得联系。感谢您对极客公园的关注！
        a.button(href="/") 返回首页
      form.form-wrap#report-form
        p.des 温馨提示：认真的填写产品及团队信息有助于申请的通过，请勿简单的粘贴复制内容。
        .inputs-wrapper
          .form-group.isrequired
            label(for="name") 产品名称
            input#name(name="name" type="text")
            .error-text.empty-text 请填写此字段
          .form-group.isrequired
            label(for="type") 产品类型
            select#type(name="type")
              option(value="false") 请选择
              option(value="新硬件") 新硬件
              option(value="AR/VR") AR/VR
              option(value="O2O/本地生活") O2O/本地生活
              option(value="工具软件") 工具软件
              option(value="社交/社区") 社交/社区
              option(value="电子商务") 电子商务
              option(value="游戏") 游戏
              option(value="互联网金融") 互联网金融
              option(value="在线旅游") 在线旅游
              option(value="媒体/内容") 媒体/内容
              option(value="医疗健康") 医疗健康
              option(value="教育") 教育
              option(value="其他") 其他
            .error-text.unselect-text 请选择
          .form-group.isrequired.format-url
            label(for="website") 产品官网
            input#website(name="website" type="text" placeholder="产品的官方网站或产品下载地址")
            .error-text.empty-text 请填写此字段
            .error-text.format-text 网址格式不对(http://www.xxx.com)
          .form-group.isrequired
            label(for="about") 简要产品介绍
            textarea#about(name="about" placeholder="产品的主要功能和服务，解决的问题或创新所在。")
            .error-text.empty-text 请填写此字段
          .form-group.isrequired
            label(for="active_data") 关键运营数据
            textarea#active_data(name="active_data" placeholder="产品目前的关键运营数据，如注册用户数，装机量，活跃用户数等。")
            .error-text.empty-text 请填写此字段
          .form-group.isrequired
            label(for="financing") 融资阶段
            select#financing(name="financing")
              option(value="false") 请选择
              option(value="尚未融资") 尚未融资
              option(value="天使轮") 天使轮
              option(value="A轮") A轮
              option(value="B轮") B轮
              option(value="C轮") C轮
              option(value="D轮") D轮
              option(value="E轮及以后") E轮及以后
            .error-text.unselect-text 请选择
          .form-group
            label(for="investor") 融资规模及投资方
            input#investor(name="investor" type="text" placeholder="告诉我们您的融资规模和投资人/机构，帮助我们更好的了解。")
          .form-group.isrequired
            label(for="about_founder") 创始团队简介
            textarea#about_founder(name="about_founder" placeholder="请简要介绍公司创始人/团队的背景，让我们了解团队中的大牛。")
            .error-text.empty-text 请填写此字段
          .form-group.isrequired
            label(for="location") 公司所在地
            input#location(name="location" type="text")
            .error-text.empty-text 请填写此字段
          .form-group.isrequired
            label(for="founder_contact") 创始人姓名/联系方式
            input#founder_contact(name="founder_contact" type="text" placeholder="填写联系方式以便约稿和进一步沟通。")
            .error-text.empty-text 请填写此字段
          .form-group.isrequired
            label(for="report_what") 期待报道角度
            input#report_what(name="report_what" type="text" placeholder="您期待公众通过极客公园了解产品或公司的哪些信息")
            .error-text.empty-text 请填写此字段
          .form-group
            label(for="other_service") 还想获得其他服务
            span.form-inputs
              label
                input(type="checkbox" name="other_service_offline_activity" value="参加线下活动")
                span 参加线下活动
              label
                input(type="checkbox" name="other_service_get_invest" value="获得融资")
                span 获得融资
          .tac
            button#submit-button.button.submit-button
              span 提交
</template>

<script>
import api from 'store/api'

export default {
  data () {
    return {
    }
  },
  meta () {
    return {
      title: "寻求报道"
    }
  },
  methods: {
    fetch () {
      api.get('/').then((result) => {
        this.postsData = result.data
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    }
  },
  mounted: function() {
    const URLReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    const checkRequired = $form => {
      let result = true;
      $form.find('.isrequired').each(function () {
        const $this = $(this);

        const v = $this.find('input, textarea').val();
        if ((typeof v !== 'undefined') && v.length === 0) {
          $this.addClass('error empty-error');
          result = false;
        }
      });

      return result;
    };

    const checkSelect = $form => {
      let result = true;
      $form.find('select').each(function () {
        const v = $(this).val();
        if (v === 'false') {
          $(this).parents('.form-group').addClass('error unselect-error');
          result = false;
        }
      });
      return result;
    };

    const checkFormat = $form => {
      let result = true;
      $form.find('.format-url').each(function () {
        const v = $(this).find('input').val();
        if (v.length > 0 && !URLReg.test(v)) {
          $(this).addClass('error format-error');
          result = false;
        }
      });
      return result;
    };

    function clearError() {
      $(this).parents('.form-group').removeClass('error empty-error format-error unselect-error');
    }

    const showSuccess = () => {
      $('#success-panel').removeClass('hidden');
      $('#report-form').addClass('hidden');
    };

    const $form = $('#report-form');
    $form.find('input, select, textarea').on('change', clearError);

    $form.on('submit', e => {
      e.preventDefault();
      const allChecked = checkRequired($form) && checkSelect($form) && checkFormat($form);
      if (!allChecked) {
        alert('啊哦，表单还没填完喔');
        return;
      }

      if ($('#submit-button').hasClass('loading')) return;

      const note = $form.serializeArray()
        .filter(x => x.name !== 'name')
        .reduce((pre, x) => {
          let v = x.value;
          if (x.name === 'website') v = `${v}  `;
          // convert field name to chinese
          const name = $(`input[name=${x.name}], select[name=${x.name}], textarea[name=${x.name}]`)
            .parents('.form-group').find('label:eq(0)').text();

          return `${pre}\`${name}:\`${v}\n`;
        }, '');

      $('#submit-button').addClass('loading');

      api.post('feedback/new', {
          type: 'needreport',
          content: $('input[name="name"]').val(),
          note,
        }
      ).then((result) => {
        showSuccess();
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}

</script>

<style lang="stylus" scoped>
$colorBlue = #1da8f2
.report-container
  overflow hidden
.need-report-wrapper
  position: relative
  $breakPoint = 767px
  .des
    text-align: center
    margin-bottom: 30px
    color: #aaa
  .banner-bg
    background-color: $colorBlue
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 0
    padding-bottom: 25%
    min-height: 170px
    max-height: 400px
    @media screen and (min-width: $breakPoint)
      background: #fff url('//imgslim.geekpark.net/image/newgeekpark/need_report_bg.png') center center no-repeat;
      background-size: cover;
  .report-container
    position: relative
    z-index: 2
  .page-title
    display: block
    margin: 60px 0
    color: #fff
    letter-spacing: 1px
    font-size: 4rem
    text-align: center
    font-weight: 400
  .wrapper-bg
    background-color: #fff
    border: 1px solid #f5f5f5
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15)
    padding: 20px
    border-radius: 2px
    margin-bottom: 50px
  .form-wrap
    @media screen and (min-width: $breakPoint)
      text-align: center;
  .form-group
    position: relative
    margin-bottom: 30px
    & > label
      margin-right: 15px
      @media screen and (min-width: $breakPoint)
        width: 150px;
        text-align: right;
    label
      display: inline-block
      vertical-align: top
      font-weight: normal
    &.isrequired > label::before
      content: '*'
      color: #f00
      font-size: 1.6rem
      margin-right: 3px
    .error-text
      display: none
      color: #f00
      position: absolute
      bottom: 0
      transform: translateY(110%)
      @media screen and (min-width: $breakPoint)
        left: 150px + 15px;
  input[type=text],
  textarea
    outline: none
    border: 1px solid #dedede
    min-height: 30px
    padding: 2px 5px
    transition: all .3s
    border-radius: 2px
    width: 500px
    &:hover,
    &:focus
      border-color: #aaa
    @media screen and (max-width: $breakPoint)
      width: 100%;
  textarea
    min-height: 80px
  .inputs-wrapper
    @media screen and (min-width: $breakPoint)
      margin-left: -53px;
      display: inline-block;
      text-align: left;
  .form-inputs
    label
      display: inline-block
      vertical-align: middle
      margin-right: 10px
      input
        margin-right: 5px
    @media screen and (max-width: $breakPoint)
      display: block;
  .button
    border: 1px solid darken($colorBlue, 5%)
    border-bottom-width: 2px
    background-color: $colorBlue
    color: #fff
    display: inline-block
    padding: 7px 50px
    font-size: 1.6rem
    font-weight: bold
    letter-spacing: 5px
    border-radius: 2px
    outline: 0
    margin: 40px 0 60px 0
    &:hover
      background-color: lighten($colorBlue, 10%)
  .error
    input,
    textarea
      border-color: #f00
  .empty-error .empty-text,
  .unselect-error .unselect-text,
  .format-error .format-text
    display: block
  .report-success
    .success
      display: inline-block
      width: 100px
      height: 100px
      background: url("../assets/imgs/need_report/success.png") center center no-repeat
      background-size: 100% 100%
      margin: 40px 0 10px 0
    h2
      font-size: 3.5rem
      font-weight: 400
    .success-text
      font-size: 1.6rem
      margin-bottom: 20px
  .submit-button.loading
    position: relative
    &::after
      loading()
    span
      opacity: 0
</style>
