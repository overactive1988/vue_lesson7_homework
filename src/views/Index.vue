<template>
  <div id="nav" class="text-center">
    <router-link to="/">首頁</router-link> |
    <router-link to="/products">商品列表</router-link> |
    <router-link to="/cart">購物車列表</router-link> |
    <router-link to="/login">後台登入</router-link>
  </div>
  <h1 class="text-center">前台頁面</h1>
  <router-view />
</template>
<script>
export default {
  created() {
    console.clear();
  },
};
</script>

<style lang="scss">
@import "../assets/css/common";

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #2af2da;
    }
  }
}

</style>
