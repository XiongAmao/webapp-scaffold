<template>
  <div class="container">
    Vue app page
  </div>
</template>

<script>
  export default {
    data () {
      return {
        a: 123
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    font-size: 16px;
    .test {
      margin: 20px;
      padding: 40px;

      @include setSvgSingleBorder(bottom);
      border-image: svg(1px-border param(--color red)) 1 stretch;
    }
  }
</style>
