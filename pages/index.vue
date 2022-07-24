<template>
    <!-- <h1>{{ a }}</h1>
    <p>你好阿</p> -->
    <Teams />
</template>

<script>
import Teams from '~/components/Teams.vue'
export default {
  name: 'IndexPage',
  components: { Teams },
  asyncData() {
    const a = '777'
    return { a }
  },
}
</script>
