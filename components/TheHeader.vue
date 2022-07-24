<template>
  <nav v-if="$route.path !== '/'">
    <a @click="back"> back </a>
    <nuxt-link to="/"> Home </nuxt-link>
  </nav>
</template>

<script>
export default {
  methods: {
    back() {
      window.history.length > 1 && this.$route.path !== '/'
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: absolute;
  width: 100%;
  z-index: 2;
}
</style>
