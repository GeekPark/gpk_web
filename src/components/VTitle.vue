
<template>
  <h1 v-if="false"><slot>极客公园</slot></h1>
</template>

<script>
export default {
  created () {
    this.updateTitle()
  },
  beforeUpdate () {
    this.updateTitle()
  },
  methods: {
    updateTitle () {
      let slots = this.$slots.default
      if (typeof slots === 'undefined' ||
        slots.length < 1 ||
        typeof slots[0].text !== 'string') return
      let {text} = slots[0]
      let {title} = document
      if (text !== title) document.title = `${text} | 极客公园`
    }
  }
}
</script>
