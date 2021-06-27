<template>
  <div id="nav" class="text-center">
    <router-link to="/">回到前台</router-link> |
    <router-link to="/admin">管理介面首頁</router-link> |
    <router-link to="/admin/products">商品列表</router-link> |
    <router-link to="/admin/orders">訂單列表</router-link>
  </div>
  <h1 class="text-center">管理介面</h1>

  <router-view v-if="check" />
</template>

<script>
export default {
  data() {
    return {
      check: false,
    };
  },
  created() {
    // 取得 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 將 Token 夾帶至請請求(request) 的表頭(headers) 設定只需要一次
    this.$http.defaults.headers.common.Authorization = token;
    this.loginCheck();
  },
  methods: {
    // 檢查使用者是否仍持續登入
    loginCheck() {
      const url = `${process.env.VUE_APP_API}api/user/check`;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            this.check = true;
          } else {
            alert("您尚未登入，請重新登入");
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/css/back";
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #562a4d;
    }
  }
}
</style>