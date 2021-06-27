<template>
  <div class="container">
    <div class="mt-4">
      <h1 class="text-center">購物車列表</h1>
      <div class="text-end mb-2">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteCartAll"
          :disabled="cart.carts <= 1"
        >
          <span
            v-if="loadingStatus.loadingItem === 1"
            class="material-icons animate-spin"
          >
            cached
          </span>
          <!-- <i
            v-if="loadingStatus.loadingItem === 1"
            class="fas fa-spinner fa-pulse"
          ></i> -->
          清空購物車
        </button>
      </div>
      <!-- 購物車列表 -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th width="5%"></th>
            <th width="10%">縮圖</th>
            <th width="10%">類別</th>
            <th width="15%">品名</th>
            <th width="20%">產品敘述</th>
            <th width="10%">數量</th>
            <th width="10%" class="text-end">單價</th>
            <th width="10%" class="text-end">合計</th>
          </tr>
        </thead>
        <tbody>
          <UserCart
            :loading="loadingStatus"
            :cartitem="cart"
            @delete-cart="deleteCart"
            @add-product-num="addProductNum"
            @cut-product-num="cutProductNum"
            v-if="cart.carts"
          ></UserCart>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="7" class="text-end">總計</td>
            <td class="text-end">{{ this.cart.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <div class="container">
    <div class="my-5 row justify-content-center">
      <Form ref="form" v-slot="{ errors }" @submit="onSubmit" class="col-md-6">
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入 姓名"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="信箱"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['信箱'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>
          <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入 電話"
            :rules="isPhone"
            v-model="form.user.tel"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入 地址"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>

        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="cart.carts <= 1"
          >
            <i
              v-if="loadingStatus.loadingItem === 1"
              class="fas fa-spinner fa-pulse"
              @click="validate"
            ></i>
            送出訂單
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import UserCart from "../components/UserCart.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      cart: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    UserCart,
  },
  methods: {
    deleteCartAll() {
      this.loadingStatus.loadingItem = 1;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            alert(res.data.message);
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            this.cart = res.data.data;
            console.log(this.cart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCart(item) {
      this.loadingStatus.loadingItem = item.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            alert(res.data.message);
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cutProductNum(item) {
      this.loadingStatus.loadingItem = item.id;
      const cartInfo = {
        data: {
          product_id: item.product.id,
          qty: (item.qty -= 1),
        },
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, cartInfo)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addProductNum(item) {
      this.loadingStatus.loadingItem = item.id;
      const cartInfo = {
        data: {
          product_id: item.product.id,
          qty: (item.qty += 1),
        },
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, cartInfo)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需為正確的 手機號碼";
    },
    onSubmit() {
      this.loadingStatus.loadingItem = 1;
      const orderInfo = {
        data: {
          user: this.form.user,
          message: this.form.message,
        },
      };
      console.log(orderInfo);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, orderInfo)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$refs.form.resetForm();
            this.form.message = "";
            this.loadingStatus.loadingItem = "";
            alert(res.data.message);
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCart();
  },
  created() {
    console.clear();
  },
};
</script>
