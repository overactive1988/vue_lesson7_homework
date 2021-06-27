<template>
  <div class="container">
    <div class="mt-4">
      <h1 class="text-center">後台登入</h1>
      <article class="login-article text-center mt-4">
        <div id="app">
          <div class="login p-4 rounded">
            <div class="row justify-content-center">
              <h1 class="h3 pb-3 mb-3 font-weight-normal text-main login-title">
                請先登入
              </h1>
              <div class="col-auto">
                <form id="form" class="form-signin" @submit.prevent="login">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control border-double"
                      id="username"
                      placeholder="name@example.com"
                      required
                      autofocus
                      v-model="loginData.username"
                    />
                    <label for="username">Email address</label>
                  </div>
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control border-double"
                      id="password"
                      placeholder="Password"
                      required
                      v-model="loginData.password"
                      autocomplete="off"
                    />
                    <label for="password">Password</label>
                  </div>
                  <button
                    class="
                      login-btn
                      btn btn-lg
                      text-dark
                      w-100
                      mt-3
                      border-double
                    "
                    type="submit"
                    id="login"
                  >
                    登入
                  </button>
                </form>
              </div>
            </div>
            <small class="mt-5 mb-3 text-light">
              &copy; 2021~∞ -
              <a
                class="text-light text-decoration-none"
                href="https://www.hexschool.com/"
                target="_blank"
                >六角學院</a
              >
            </small>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 一律使用 function return 資料定義初始化都在這
    // 使用this.即可呼叫此處資料內容
    return {
      loginData: {},
    };
  },
  methods: {
    // 函式的集合
    login() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.loginData)
        .then((res) => {
          if (res.data.success) {
            // const token = res.data.token;
            // const expired = res.data.expired;
            // 使用解構
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(
              expired
            )}; path=/`;
            // 跳轉至 products.html 頁面
            this.$router.push("/admin");
          } else {
            // 輸入資料錯誤報錯提醒
            alert(res.data.message);
            this.loginData = {};
          }
        })
        // axios報錯
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    console.clear();
  },
};
</script>

<style lang="scss">
@import "../assets/css/common";
</style>
