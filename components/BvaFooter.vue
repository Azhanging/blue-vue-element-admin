<template>
  <div class="bva-footer bz-bg-white">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "bva-footer"
  }
</script>

<style scoped lang="scss">
  .bva-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    text-align: center;
  }
</style>