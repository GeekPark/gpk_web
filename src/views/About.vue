<template lang="jade">
#about(v-once)
  .min-height-wrapper
    section.about-banner
      .container.relative
        h1#section-title.section-title
    section.container.about-content
      .left-menu#menus
        a.active(href="javascript:;" data-page="about") 关于我们
        a(href="javascript:;" data-page="vision") 公司愿景
        a#products(href="javascript:;" data-page="products") 产品服务
        a(href="javascript:;" data-page="terms") 使用条款
        a(href="javascript:;" data-page="privacy") 隐私协议
        a#links(href="javascript:;" data-page="links") 友情链接
        a#contact(href="javascript:;" data-page="contact") 联系方式
      .page-content.hidden

        //- 关于我们
        section.page.about
          p 极客公园成立于2010年，是中国创新者的大本营。通过对前沿科技的观察报道，业界一流的线下活动，众筹孵化等全方位的创业服务，极客公园汇聚了中国最广大的创新、创业人群。在内容媒体、会展公关、创业服务三大业务线协同发展下，极客公园帮助中国创业者更有效率的探索未来，链接更多的资源，让优秀的科技创业公司得以更快速的成长。
          p “极客”概念在极客公园的推动下，已经成为推动社会发展的重要力量。极客公园亦成为中国极客群体交流互助的首选平台和中国创新人群成长道路上的重要伙伴。

        //- 公司愿景
        section.page.vision
          p “相信创新的力量，相信产品的力量”，这是极客公园的信仰。创新并实践是极客精神的内核，这种精神不仅是保持互联网行业持续进化和不断发展的终极驱动力，可以促进优秀产品在各个行业的涌现，从而让我们的生活更加美好。
          p 极客公园力争打造中国最好的聚焦于互联网产品的线下沙龙及线上社区，让前卫的想法、良好的产品、优秀的模式在这里能得到最佳的传播效果。
          p 极客公园致力于让互联网产品领域创新的想法，优秀的设计，以及宝贵的经验得到汇聚和传播，成为那些通过互联网产品正在改变人们生活的极客们最好的伙伴和最坚定的支持者。

        //- 产品服务
        section.page.products
          #product-menu.product-menu
            a.btn(href="javascript:;" data-page="news") 极客资讯
            a.btn(href="javascript:;" data-page="events") 品牌活动
            a.btn(href="javascript:;" data-page="geeksvc") 极客加速计划
            a.btn(href="javascript:;" data-page="convention") 公关会展服务
            //- a.btn(href="javascript:;" data-page="geekchoice") 极客之选体验空间

          #product-cont
            section.product-page.news
              h2.show-xs 极客资讯
              p 极客公园网站提供科技领域的前沿报道，庞大的独立采编团队，持续输出影响专业人群的原创内容。以快速的反应、深入的剖析，为用户提供最有价值的科技资讯。随着科技的发展，极客公园内容产品不断创新，在各个新兴的细分产业建立权威媒体品牌，如聚焦智能硬件产业的极客之选，聚焦虚拟现实产业的90Hz等。
              p 极客公园以发现改变力为使命，善于挖掘中国最具潜力的创新公司，当小米、美团、大疆、今日头条等公司正处幼年阶段之时，极客公园便凭借深入的挖掘力和专业的判断力，成为了这些“小”公司亲密的合作伙伴，极力推动并支持其发展，让这些极具潜力的公司出现在公众视野中，并不断的为人所知。
              a.btn.inverse(target="_blank" href="/") 前往极客资讯>
            section.product-page.events
              h2.show-xs 品牌活动
              p 极客公园从2010年开始举办各类线下活动，通过月度、年度活动聚集了一批具有创新精神的极客人群，为新锐创业团队和产品提供了舞台，并连续邀请到具有全球影响力的创新者为中国的极客人群进行分享，其中包括苹果联合创始人斯蒂夫·沃兹尼亚克（Steve Wozniak）、谷歌董事长埃里克·施密特（Eric Schmidt）、Tesla创始人埃隆·马斯克（Elon Musk）、百度CEO李彦宏、小米科技CEO雷军等。
              .event-item
                a.cover(href="http://events.geekpark.net/activities?category_id=983263f6-596c-4599-94a1-67c3c0f1aaa9" target="_blank")
                  img(src="https://ocpk3ohd2.qnssl.com/assets/v2/static_about/gif-b2b995ac60edf49c08b1854c8178811a.jpg")
                .event-info
                  .event-title GIF极客公园创新大会
                  .event-desc 极客公园创新大会，又称GIF大会，是中国科技界一年一度的科技盛会，汇聚国际、国内顶尖的互联网大咖，涵盖科技、商业、人文的前沿展望，众多中国互联网优秀创新产品展示，是国内最有价值的互联网科技创新盛会之一。
              .event-item
                a.cover(href="http://events.geekpark.net/activities?list=true&category_id=e820eda6-9a82-4b72-8317-5f69ad1547e5" target="_blank")
                  img(src="https://ocpk3ohd2.qnssl.com/assets/v2/static_about/jidian-69022354c63e00e1c9b4a20dd0013edf.jpg")
                .event-info
                  .event-title 奇点创新者峰会
                  .event-desc 奇点是物理学上宇宙演化的起始点，从2014年夏天开始，极客公园汇聚互联网科技领域的开拓性力量，邀请跨越科技、资本、金融等领域的权威嘉宾。聚焦在科技发展的大潮下，科技与资本如何实现高效对接，以及未来科技与产业资本融合的下一个引爆点。
              .event-item
                a.cover(href="http://events.geekpark.net/activities?list=true&category_id=f8d134d6-0c5e-4505-93c3-4c8e1c661934" target="_blank")
                  img(src="https://ocpk3ohd2.qnssl.com/assets/v2/static_about/weilaitoutiao-2018a2c8ac666ba186077b247d921aed.jpg")
                .event-info
                  .event-title 未来头条
                  .event-desc 未来头条月度线下活动，每次盘点5款最值得关注、最有可能成为未来之星的创新产品。旨在发掘最值得关注的企业，汇聚最具潜力的、最 HOT 的新锐产品。出门问问、零度无人机、人人车等公司，在未来头条的舞台上登场后，纷纷获得产业的关注，快速成为最具潜力的创新公司。
              .event-item
                a.cover(href="http://events.geekpark.net/activities?list=true&category_id=8535917e-3ca8-474a-aeac-5337089d66de" target="_blank")
                  img(src="https://ocpk3ohd2.qnssl.com/assets/v2/static_about/gongkaike-40e5bf1e1a7d4266d2f08b06dccbf700.jpg")
                .event-info
                  .event-title 极客公开课
                  .event-desc 极客公开课是极客公园最具代表性的主题类活动，每月1-2期。活动主要邀请各领域具有代表性的创新产品，就时下最值得关注或探讨的话题进行分享与讨论，或是走近知名企业聆听一线负责人讲述品牌背后的故事。在极客公园精心策划下，“微信公开课Pro版”、“腾讯互娱游戏方法论”等精彩活动一一落地，给予创新者极大的启发，受到了业界的普遍关注。
              a.btn.inverse(target="_blank" href="http://events.geekpark.net") 前往极客活动>
            section.product-page.geeksvc
              h2.show-xs 极客加速计划
              p “The Best for the best”——与最棒的人一起创造，让最业界最优质的资源和最优秀的公司得以高效匹配。极客公园于2015年推出全新服务极客加速，它是极客公园旗下聚合智慧与资源、连接优秀项目并和投资人共创财富的股权众筹平台，旨在帮助创业者更有效率的探索，更高效的链接产业资源，让优秀的科技创业公司得以更快速的成长。
              p 目前，极客加速器已成功为700bike、小鹏汽车、猫王收音机、Coffee Box等数个精品项目完成众筹，各项目皆超额完成众筹计划，在实现快速对接资本的同时，更为优秀项目找到了业界最顶尖的战略投资者，从而帮助项目更快的发展。
              a.btn.inverse(target="_blank" href="https://geeks.vc/") 前往加速计划>
            section.product-page.convention
              h2.show-xs 公关会展服务
              p 极客公园将媒体专业的判断力，与丰富的会展经验相结合，创造出一次次令人印象深刻的科技盛会，获得了业界的普遍认可。极客公园将这种能力开放，为那些相关经验欠缺，或是对公关会展有着更高要求的公司提供服务，为其带来切实的帮助。
              p 目前，极客公园凭借业界领先的公关会展能力，曾为创维、搜狗、英特尔、沃尔沃等公司策划线下活动，让这些优秀的公司和团队以最佳的姿态展现在人们眼前。

        //- 使用条款
        section.page.terms
          h2 1. 接受条款
          p 北京传奇极客管理咨询有限公司所拥有的GeekPark网站（以下简称“GeekPark”）根据以下服务条款为您提供服务。这些条款可由GeekPark随时更新， 且毋须另行通知。GeekPark用户协议（以下简称“协议”）一旦发生变动，GeekPark将在网页上公布修改内容。 修改后的协议一旦在网页上公布即有效代替原来的协议。
          p 此外，当您使用GeekPark特殊服务时，您和GeekPark应遵守GeekPark随时公布的与该服务相关的指引和规则。 前述所有的指引和规则，均构成本协议的一部分。
          p 您在使用GeekPark提供的各项服务之前，应仔细阅读本协议。如您不同意本协议及/或随时对其的修改， 请您立即停止使用GeekPark网所提供的全部服务；您一旦注册成为GeekPark的用户， 即视为您已了解并完全同意本使用协议各项内容，包括GeekPark对协议随时所做的任何修改。
          h2 2. 服务说明
          p GeekPark目前向用户提供如下服务：为用户搭建一个即时分享的平台，方便用户在GeekPark中分享科技、商业等方面的信息，并分享经验、心情。同时用户可以关注感兴趣的人， 关注感兴趣的话题，下注玩游戏和用积分换购商品。除非本协议另有其它明示规定，增加或强化目前本服务的任何新功能，包括所推出的新产品， 均受到本协议之规范。您了解并同意，本服务仅依其当前所呈现的状况提供，对于任何用户信息或个人化设定之时效、删除、 传递错误、未予储存或其它任何问题，GeekPark均不承担任何责任。GeekPark保留不经事先通知为维修保养、升级或其它目的 暂停本服务任何部分的权利。
          p GeekPark的域名和用户空间归GeekPark所有，用户经GeekPark许可有使用权。
          h2 3. 遵守法律
          p 您同意遵守中华人民共和国相关法律法规的所有规定， 包括但不限于《中华人民共和国民法通则》、《中华人民共和国著作权法》、 《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、 《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《互联网著作权行政保护办法》、 《互联网新闻信息服务管理规定》等有关国家法律和法规、实施办法等。 并对以任何方式使用您的密码和您的帐号使用本服务的任何行为及 其结果承担全部责任。如您的行为违反国家法律和法规的任何规定，有可能构成犯罪的，将被追究刑事责任，并由您承担全部法律责任。
          p 同时如果GeekPark有理由认为您的任何行为， 包括但不限于您的任何言论和其它行为违反或可能违反国家法律和法规的任何规定， GeekPark可在任何时候不经任何事先通知终止向您提供服务。GeekPark会在事后为你发送通知。
          h2 4. 您的注册义务
          p 为了能使用本服务，您同意以下事项：依本服务注册提示请您填写正确的注册邮箱、密码和名号。若您提供任何违法或GeekPark认为不适合在GeekPark上展示的资料；或者GeekPark有理由怀疑你的资料属于程序或恶意操作，GeekPark有权暂停或终止您的帐号，并拒绝您于现在和未来使用本服务之全部或任何部分。
          p GeekPark无须对任何用户的任何登记资料承担任何责任，包括但不限于鉴别、核实任何登记资料的真实性、正确性、完整性、适用性及/或是否为最新资料的责任。
          h2 5. 用户帐号、密码及安全
          p 完成本服务的注册程序并成功注册之后，您可使用您的Email和密码，登陆到您在GeekPark的帐号（下称“帐号”）。保护您的帐号安全，是您的责任。 您应对所有使用您的密码及帐号的活动负完全的责任。如果您未保管好自己的帐号和密码，因此而产生的任何损失或损害，GeekPark无法也不承担任何责任；
          h2 6. 隐私权政策
          p 您提供的登记资料及GeekPark保留的有关您的若干其它资料将受到中国有关隐私的法律之规范。
          p 保护用户个人隐私是GeekPark的一项基本政策。所以，除非遵守国家法律规定在有关国家机关查询时、遵守GeekPark产品的特定程序、为维护GeekPark的合法权益、被侵害的第三人提出权利主张或在紧急情况下竭力维护用户个人和社会大众的隐私安全的，GeekPark不会公开、编辑或透露用户的注册资料及保存在本服务中的非公开内容。
          p 在以下（包括但不限于）几种情况下，用户同意GeekPark使用用户的个信息：
          p GeekPark可以将用户信息与第三方数据匹配。
          p GeekPark会通过透露用户统计数据，向未来的合作伙伴、广告商及其他第三方以及为了其他合法目的而描述GeekPark的服务。
          p GeekPark会竭尽全力保护用户的信息，但GeekPark不能确信或保证任何个人信息的安全性，用户须自己承担风险。比如用户联机公布可被公众访问的个人信息时，用户有可能会收到未经用户同意的消息，GeekPark对用户及其他任何第三方的上述行为，不负担任何责任。
          h2 7. 提供者之责任
          p 根据有关法律法规，GeekPark在此郑重提请您注意，任何经由本服务而发布、上传的文字、资讯、资料、音乐、照片、图形、视讯、信息或其它资料（以下简称“内容 ”），无论系公开还是私下传送，均由内容提供者承担责任。GeekPark仅为用户提供内容存储空间，无法控制经由本服务传送之内容，因此不保证内容的正确性、完整性或品质。您已预知使用本服务时，可能会接触到令人不快、不适当或令人厌恶之内容。在任何情况下，GeekPark均不为任何内容负责，但GeekPark有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用本服务的全部或部分，保存有关记录，并向有关机关报告。
          h2 8. 用户行为
          p 用户同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶
          p 发布或以其它方式传送含有下列内容之一的信息：
          p 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
          p 散布诈骗、淫秽、赌博或者教唆犯罪的；
          p 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；
          p 以任何方式危害他人的合法权益；
          p 冒充其他任何人或机构，或以虚伪不实的方式陈述或谎称与任何人或机构有关；
          p 将依据任何法律或合约或法定关系（例如由于雇佣关系和依据保密合约所得知或揭露之内部资料、专属及机密资料）知悉但无权传送之任何内容加以发布、发送电子邮件或以其它方式传送；
          p 将侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利（以下简称“专属权利”）之内容加以发布或以其它方式传送；
          p 将设计目的在于干扰、破坏或限制任何计算机软件、硬件或通讯设备功能之计算机病毒（包括但不限于木马程序（trojan horses）、蠕虫（worms）、定时炸弹、删除蝇（cancelbots）（以下简称“病毒”）或其它计算机代码、档案和程序之任何资料，加以发布、发送或以其它方式传送；
          p 干扰或破坏本服务或与本服务相连线之服务器和网络，或违反任何关于本服务连线网络之规定、程序、政策或规范；
          p 未经合法授权而截获、篡改、收集、储存或删除他人个人信息、站内邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目的。
          p 您已认可GeekPark未对用户的使用行为进行全面控制，您使用任何内容时，包括依赖前述内容之正确性、完整性或实用性时，您同意将自行加以判断并承担所有风险，而不依赖于GeekPark。但GeekPark依其自行之考虑，或因为不可抵抗的行政力量，将删除不合法的内容。
          p 您了解并同意，GeekPark依据法律法规的要求，或基于诚信为了以下目的或在合理必要范围内，认定必须将内容加以保存或揭露时，得加以保存或揭露：
          p 遵守法律程序；
          p 执行本使用协议；
          p 回应任何第三人提出的权利主张；
          p 保护GeekPark、其用户及公众之权利、财产或个人安全；
          p 其它GeekPark认为有必要的情况。
          h2 9. 国际使用之特别警告
          p 您已了解国际互联网的无国界性，同意遵守当地所有关于网上行为及内容之法律法规。您特别同意遵守有关从中国或您所在国家或地区输出信息之传输的所有适用法律法规。
          h2 10. 在GeekPark发布的公开信息
          p 在本协议中，“本服务公开使用区域”系指一般公众可以使用的区域；
          p 用户在GeekPark上传或发布的内容，用户应保证其为著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益，用户同意授予GeekPark所有上述内容在全球范围内的免费、不可撤销的、永久的、可再许可或转让的独家使用权许可，据该许可GeekPark将有权以展示、推广及其他不为我法律所禁止的方式使用前述内容。
          h2 11. 赔偿
          p 由于您通过本服务提供、发布或传送之内容、您与本服务连线、您违反本使用协议、或您侵害他人任何权利因而衍生或导致任何第三人提出任何索赔或请求，包括合理的律师费，您同意赔偿GeekPark及其子公司、关联企业、高级职员、代理人、品牌共有人或其它合作伙伴及员工，并使其免受损害，并承担由此引发的全部法律责任。
          h2 12. 关于使用及储存之一般措施
          p 您同意不对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。
          h2 13. 关于使用及储存之一般限制
          p 您承认关于本服务的使用GeekPark有权制订一般措施及限制，包含但不限于本服务将保留所发布内容或其它发布内容之最长期间，以及一定期间内您使用本服务之次数上限（及每次使用时间之上限）。通过本服务发布或传送之任何信息、通讯资料和其它内容，如被删除或未予储存，您同意GeekPark毋须承担任何责任。您也同意，GeekPark有权依其自行之考虑，不论通知与否，随时变更这些一般措施及限制。
          h2 14. 服务之修改
          p GeekPark有权于任何时间暂时或永久修改或终止本服务（或其任何部分），且无论通知与否。您同意对于本服务所作的任何修改、暂停或终止，GeekPark对您和任何第三人均无需承担任何责任。
          h2 15. 终止服务
          p 您同意GeekPark基于其自行之考虑，因任何理由，包含但不限于缺乏使用，或GeekPark认为您已经违反本协议的文字及精神，终止您的帐号或本服务之使用（或服务之任何部分），并将您在本服务内任何内容加以移除并删除。您同意依本协议任何规定提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，GeekPark可立即关闭或删除您的帐号及您帐号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，您同意若本服务之使用被中断或终止或您的帐号及相关信息和文件被关闭或删除，GeekPark对您或任何第三人均不承担任何责任。
          h2 16. 与广告商及其他第三方进行交易
          p 您通过本网站与广告商及其他第三方进行任何形式的通讯或商业往来，或参与促销活动，包含相关商品或服务之付款及交付，以及达成的其它任何相关条款、条件、保证或声明，完全为您与广告商及其他第三方之间之行为。您因前述任何交易或前述广告商及其他第三方而遭受的任何性质的损失或损害，GeekPark对此不负任何法律责任。
          h2 17. GeekPark之专属权利
          p 您了解并同意，本服务及本服务所使用之相关软件（以下简称“软件”）含有受到相关知识产权及其它法律保护之专有保密资料。您也了解并同意，经由本服务或广告商向您呈现之赞助广告或信息所包含之内容，亦受到著作权、商标权、服务商标、专利权或其它专属权利之法律保护。未经GeekPark或广告商明示授权，您不得修改、出租、出借、出售、散布本服务或软件之任何部份或全部，或据以制作衍生著作，或使用擅自修改后的软件，包括但不限于为了未经授权而使用本服务之目的。GeekPark仅授予您个人、不可移转及非专属之使用权，使您得于单机计算机使用其软件之目的码，但您不得（并不得允许任何第三人）复制、修改、创作衍生著作、进行还原工程、反向组译，或以其它方式发现原始码，或出售、转让、再授权或提供软件设定担保，或以其它方式移转软件之任何权利。您同意将通过由GeekPark所提供的界面而非任何其它途径使用本服务。
          h2 18. 担保与保证
          p 您明确了解并同意∶
          p 本使用协议的任何规定不会免除GeekPark对造成您人身伤害的、或因故意或重大过失造成您财产损失的任何责任；
          p 您使用本服务之风险由您个人负担。本服务系依“现状”及“现有”基础提供。GeekPark对本服务不提供任何明示或默示的担保或保证，包含但不限于商业适售性、特定目的之适用性及未侵害他人权利等担保或保证；
          p GeekPark不保证以下事项∶
          p 本服务将符合您的要求；
          p 本服务将不受干扰、及时提供、安全可靠或不会出错；
          p 使用本服务取得之结果正确可靠；
          p 您经由本服务购买或取得之任何产品、服务、资讯或其它信息将符合您的期望；
          p 是否使用本服务下载或取得任何资料应由您自行考虑且自负风险，因任何资料之下载而导致的您电脑系统之任何损坏或数据流失等后果，由您自行承担；
          p 您自GeekPark或经由本服务取得的任何建议或信息，无论是书面或口头形式，除非本协议有明确规定，将不构成本协议以外之任何保证。
          h2 19. 责任限制
          p 您明确了解并同意，基于以下原因而造成的，包括但不限于利润、信誉、应用、数据损失或其它无形损失，GeekPark不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿责任：
          p 本服务之使用或无法使用；
          p 为替换从或通过本服务购买或取得之任何商品、数据、信息、服务，收到的讯息，或缔结之交易而发生的成本；
          p 您的传输或数据遭到未获授权的存取或变造；
          p 任何第三方在本服务中所作之声明或行为；
          p 与本服务相关的其它事宜，但本使用协议有明确规定的除外；
          p 第三方以任何方式发布或投递欺诈性信息，或诱导用户受到经济损失，GeekPark不承担任何责任。
          h2 20. GeekPark商标信息
          p GeekPark网站、GeekPark以及其它GeekPark注册商标、标志及产品、服务名称，均为北京传奇极客管理咨询有限公司之商标（以下简称“GeekPark标记”）。未经GeekPark事先书面同意，您同意不将GeekPark标记以商业展示，或表示您有权展示、使用或另行处理GeekPark标记。
          h2 21. 用户专属权利
          p GeekPark尊重他人知识产权，呼吁用户也要同样尊重知识产权。
          p GeekPark之服务与资料是基于“现状”提供，而且GeekPark明确地表示拒绝对于“服务”、“资料”或“产品”给予任何明示或暗示之保证，包括但不限于，得为商业使用或适合于特定目的之保证。GeekPark对于因“服务”、“资料”或“产品”所生之任何直接、间接、附带的或因此而导致之衍生性损失概不负责。
          p 如果您对他人的知识产权造成了侵害，GeekPark将依国家法律法规的规定，或在适当的情形下，将依其服务条款或其相关规范性规定，删除特定内容或以至终止您对账户的使用。
          p GeekPark尊重他人的任何权利（包括知识产权），同时也要求我们的使用者也尊重他人之权利。GeekPark在适当情况下，得自行决定终止侵害或违反他人权利之使用者的帐号。
          p 若您认为您的作品的著作权遭到侵害或您的知识产权被侵犯，根据《信息网络传播权保护条例》的规定，您需及时向GeekPark联系并提供详实的举证材料。或请到中华人民共和国国家版权局下载《要求删除或断开链接侵权网络内容的通知》（下称“删除通知”）的示范格式，如果您不明白“删除通知”的内容，请登录中华人民共和国国家版权局查看《要求删除或断开链接侵权网络内容的通知》填写说明。
          h2 22. 一般条款
          p 本协议规范您对于本服务之使用行为。在您使用相关服务、使用第三方提供的内容或软件时，亦应遵从所适用之附加条款及条件；
          p 本协议及您与GeekPark之关系，均受到中华人民共和国法律管辖。您与GeekPark就本服务、本使用协议或其它有关事项发生的争议，应首先友好协商解决，协商不成时应提请中国国际经济贸易仲裁委员会仲裁，仲裁裁决是终局性的，对双方均有约束力；
          p GeekPark未行使或执行本使用协议任何权利或规定，不构成对前述权利或权利之放弃；
          p 倘本协议之任何规定因与中华人民共和国法律抵触而无效，您依然同意应依照法律，努力使该规定所反映之当事人意向具备效力，且本协议其它规定仍应具有完整的效力及效果；
          p 本协议之标题仅供方便而设，不具任何法律或契约效果；
          p GeekPark对本协议享有最终解释权。

        //- 隐私协议
        section.page.privacy
          p 极客公园（GeekPark）以此声明对本站用户隐私保护的许诺。GeekPark的隐私声明正在不断改进中，随着GeekPark服务范围的扩大，会随时更新隐私声明。我 们欢迎您随时查看隐私声明。
          p GeekPark非常重视对用户隐私权的保护，承诺不会在未获得用户许可的情况下擅自将用户的个人资料信息出租或出售给任何第三方，但以下情况除外：
          ul
            li 您同意让第三方共享资料；
            li 您同意公开你的个人资料，享受为您提供的产品和服务；
            li 本站需要听从法庭传票、法律命令或遵循法律程序；
            li 本站发现您违反了本站服务条款或本站其它使用规定。

        //- 友情链接
        section.page.links
          ul.links
            li
              a.btn.inverse(target="_blank" title="24小时滚动报道互联网，IT，通信、家电及科学探索行业新闻，腾讯科技频道致力于提供最快捷、最鲜活的IT产业资讯，第一时间报道行业重大事件，重点解读产业背后人物故事，全面关注新闻热点话题。以独特的视角、犀利的报道风格，揭示IT产业走向。" href="http://tech.qq.com/") 腾讯科技
            li
              a.btn.inverse(target="_blank" title="网易科技-有态度的科技门户" href="http://tech.163.com/") 网易科技
            li
              a.btn.inverse(target="_blank" title="小众软件，分享免费、小巧、实用、有趣、绿色的软件。" href="http://www.appinn.com/") 小众软件
            li
              a.btn.inverse(target="_blank" title="界面新闻-只服务于独立思考的人群" href="http://www.jiemian.com/") 界面
            li
              a.btn.inverse(target="_blank" title="全球酷玩试用导购平台" href="http://www.jiguo.com/") 极果
            li
              a.btn.inverse(target="_blank" title="品途商业评论" href="http://www.pintu360.com/") 品途
            li
              a.btn.inverse(target="_blank" title="凤凰科技 让科技更性感" href="http://tech.ifeng.com/") 凤凰科技
            li
              a.btn.inverse(target="_blank" title="和讯科技" href="http://tech.hexun.com/") 和讯科技
            li
              a.btn.inverse(target="_blank" title="i 黑马 创业者都在这儿" href="http://www.iheima.com/") i黑马
            li
              a.btn.inverse(target="_blank" title="PingWest品玩" href="http://www.pingwest.com/") PingWest
            li
              a.btn.inverse(target="_blank" title="雷锋网 读懂智能&未来" href="http://www.leiphone.com/") 雷锋网
            li
              a.btn.inverse(target="_blank" title="虎嗅网是一个用户可参与的商业资讯与观点交流平台。这个资 讯及观点平台的核心，是关注互联网与移动互联网一系列明星 公司（包括公众公司与创业型企业）的起落轨迹、产业潮汐的 动力与趋势，以及互联网与移动互联网如何改造传统产业。" href="http://www.huxiu.com/") 虎嗅
            li
              a.btn.inverse(target="_blank" title="新浪VR是专注于VR行业国内外资讯的门户媒体，每天会定时推送VR资讯，VR游戏评测，设备评测，开发者资讯等独家内容。" href="http://vr.sina.com.cn/") 新浪VR
            li
              a.btn.inverse(target="_blank" title="探秘全球科技精华" href="http://www.svinsight.com/") 硅谷密探
            li
              a.btn.inverse(target="_blank" title="人民创投" href="http://capital.people.cn/") 人民创投
            li
              a.btn.inverse(target="_blank" title="蜻蜓fm在线收听_最好的网络收音机|广播电台在线收听平台" href="http://www.qingting.fm/") 蜻蜓FM
            li
              a.btn.inverse(target="_blank" title="最有看点的互联网金融门户" href="http://www.weiyangx.com/") 未央网
            li
              a.btn.inverse(target="_blank" title="提供信息最快最全的中国飞机网站" href="http://xtopfly.com/") 霄云网

        //- 联系方式
        section.page.contact
          h2 联系邮箱
          ul
            li
              | 商务合作：
              a(href="mailto:bd@geekpark.net") bd@geekpark.net
            li
              | 公关合作：
              a(href="mailto:pr@geekpark.net") pr@geekpark.net
            li
              | 销售合作：
              a(href="mailto:sales@geekpark.net") sales@geekpark.net
            li
              | 技术咨询：
              a(href="mailto:support@geekpark.net") support@geekpark.net
          h2 联系电话
          a(href="tel:01084599761") 010-84599761

          h2 公司地址
          | 北京市朝阳区酒仙桥路4号751 D·Park 正东集团院内 C8座105室 极客公园


</template>

<script>
import api from 'stores/api'
import { isMobileView } from 'mdetect';

export default {
  data () {
    return {
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

    const toggle = (selector, page) => {
      $(`${selector}.active`).removeClass('active').slideUp(300);
      setTimeout(() => {
        $(`${selector}.${page}`).addClass('active').slideDown(300);
      }, 300);
    };

    const switchTab = ({ menus, item, initItem, onChange }) => {
      const $menus = $(menus);
      const $item = $(item);
      const change = f => typeof onChange === 'function' ? onChange(f) : f;

      $item.hide();

      $menus.on('click', 'a', function () {
        toggle(item, $(this).data('page'));
        $(this).addClass('active').siblings().removeClass('active');
        change($(this));
      });

      if (initItem !== undefined) {
        $menus.find('a').filter(initItem).eq(0).click();
      } else {
        $menus.find('a').eq(0).click();
      }
    };

    // nothing
    const $title = $('#section-title');
    $('.page-content').removeClass('hidden');

    switchTab({
      menus: '#menus',
      item: 'section.page',
      initItem: location.hash || undefined,
      onChange: $this => {
        $title.slideUp(300);
        setTimeout(() => {
          $title.text($this.text()).slideDown(300);
        }, 300);

        if ($this.data('page') === 'products') {
          $('#product-menu a:eq(0)').click();
        }
      },
    });

    if (isMobileView()) {
      $('#product-menu').remove();
      // prevent jump to event categore page, no rwd fit
      $('.event-item a').on('click', e => e.preventDefault());
    } else {
      switchTab({
        menus: '#product-menu',
        item: 'section.product-page',
      });
    }
  }
}

</script>

<style lang="stylus" scoped>
$colorBlue = #1da8f2
.min-height-wrapper
  min-height calc(100vh - 100px)
.about-banner
  background: linear-gradient(-65deg, #00e6c1 0%, $colorBlue 100%)
  background-size: 200% 200%
  animation: gradient 10s ease infinite
  color: #fff
  .container
    padding-bottom: 15%
    @media screen and (max-width: 767px)
      min-height: 200px
  .section-title
    font-weight: normal
    font-size: 3.2rem
    position: absolute
    @media screen and (min-width: 767px)
      bottom: 20px;
    @media screen and (max-width: 767px)
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%);
.about-content
  margin-top: 30px
  margin-bottom: 30px
  font-size: 1.6rem
  display: flex
  .left-menu
    display: flex
    a
      display: block
      text-align: center
      margin: 5px 0
      border: 0 solid transparent
      transition: all .3s
      color: #888
      padding: 5px 15px
      &:hover,
      &.active
        color: #222
        background-color: #f5f5f5
      &.active
        background-color: #efefef
        border-color: $colorBlue
    @media screen and (min-width: 767px)
      border-right: 1px solid #f5f5f5;
      width: 180px;
      margin-right: 20px;
      flex-shrink: 0;
      flex-direction: column;
      a
        border-left-width: 3px;
        width: 150px;
        line-height: 35px;
        padding-right: 5px;
  .page-content
    line-height: 26px
    font-size: 1.6rem
    letter-spacing: 1px
    width: 800px
    max-width: 90%
    color: #666
    margin-left: auto
    margin-right: auto
    h2
      font-size: 2rem
  .product-menu a
    position: relative
    margin: 10px 5px
    triangleDown(white)
    &::after
      transition: all .3s
    &.active
      background-color: #16c4a8
      &::after
        border-top-color: #16c4a8
  .btn
    border-radius: 2px
    display: inline-block
    color: #fff
    background-color: $colorBlue
    padding: 4px 25px
    font-size: 1.6rem
    transition: all .3s
    &:first-child
      margin-left: 0
    &:last-child
      margin-right: 0
    &:hover
      background-color: #16c4a8
    &.inverse
      background-color: #fff
      border: 1px solid $colorBlue
      color: $colorBlue
      &:hover
        background-color: $colorBlue
        color: #fff
  section.product-page a.btn
    font-size: 1.4rem
  .event-item
    display: flex
    align-items: center
    justify-content: flex-start
    margin: 10px 0
    &:not(:last-child)
      border-bottom: 1px solid #f0f0f0
      padding-bottom: 10px
    .cover
      display: block
      width: 200px
      margin-right: 20px
      flex-shrink: 0
      img
        width: 100%
    .event-title
      font-weight: bold
  .links
    li
      display: inline-block
      list-style-type: none
      margin: 5px
  @media (max-width: 600px)
    flex-direction: column;
    padding: 5px;
    .left-menu
      flex-wrap: wrap
      justify-content: center
    .left-menu a
      border-width: 1px 1px 3px 1px
      border-radius: 2px
      background-color: #fff
      margin: 5px 3px
      border-color: #f5f5f5
      border-bottom-color: $colorBlue
      font-size: 1.4rem
      &.active
        background-color: $colorBlue
        color: #fff
    .links
      text-align: center
      padding-left: 0
    .event-item
      flex-direction: column
      .cover
        width: 100%
        margin: 5px 0
</style>
