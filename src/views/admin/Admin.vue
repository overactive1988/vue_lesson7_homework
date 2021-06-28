<template>
  <header>
    <AdminNavbar></AdminNavbar>
  </header>
  <router-view v-if="check" />
  <AdminFooter></AdminFooter>
</template>

<script>
import AdminNavbar from "../../components/AdminNavbar.vue";
import AdminFooter from "../../components/AdminFooter.vue";
export default {
  data() {
    return {
      check: false,
    };
  },
  components: {
    AdminNavbar,
    AdminFooter,
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
</style>
