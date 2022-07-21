<template>
<div class="search">
  <h3>小五餐厅</h3>
</div>
</template>

<script>

export default {
  name: "index",
  components:{}
}
</script>

<style lang="less" scoped>
.search{
  z-index: 999;
  position: fixed;
  top: 0;
  height: 0.8rem;
  width: 100%;
  background-color: rgb(255, 165, 50);
  line-height: 0.8rem;
  h3{
    text-align: center;
    color: white;
    font-size: 0.32rem;
  }
}

</style>