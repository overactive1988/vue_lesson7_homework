<template>
  <div class="container content">
    <h1 class="text-center">商品列表</h1>
    <!-- 商品列表 -->
    <div class="d-flex justify-content-center mt-5">
      <Pagination :page="pagination" @get-product="getProducts"></Pagination>
    </div>
    <table class="table align-middle mt-4">
      <thead>
        <tr>
          <th width="8%">排序</th>
          <th width="10%">商品縮圖</th>
          <th width="10%">商品名稱</th>
          <th width="27%">商品敘述</th>
          <th width="17%">商品規格</th>
          <th width="9%">價格</th>
          <th width="23%"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in products" :key="item.id">
          <td>{{ item.num }}</td>
          <td>
            <img class="product-img" :src="item.imageUrl" :alt="item.title" />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.content }}</td>
          <td>
            <div class="h5">{{ $filters.currency(item.price) }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <router-link
                class="btn btn-outline-primary"
                :to="`/product/${item.id}`"
                >查看更多</router-link
              >
              <button
                @click="addCart(item.id)"
                type="button"
                :disabled="loadingStatus.loadingItem === item.id + 1"
                class="btn btn-outline-danger"
              >
                <span
                  v-if="loadingStatus.loadingItem === item.id + 1"
                  class="material-icons animate-spin"
                >
                  cached
                </span>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="mt-4">
      總共有 <span id="productCount">{{ allproductsNum.length }}</span> 項商品
    </p>
    <div class="d-flex justify-content-center mt-5 mb-6">
      <Pagination :page="pagination" @get-product="getProducts"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import emitter from "../assets/js/methods/emitter";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      pagination: {},
      product: {},
      cart: {},
      allproductsNum: "",
    };
  },
  components: {
    Pagination,
  },
  methods: {
    // 取得商品列表
    getProducts(num = this.pagination.current_page || 1) {
      // 參數預設值
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${num}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { products, pagination } = res.data;
            this.products = products;
            this.pagination = pagination;
            this.getAllproducts();
            console.log(this.products);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllproducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.allproductsNum = Object.values(res.data.products); // 將回傳的物件轉換為陣列
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCart(id, qty = 1) {
      this.loadingStatus.loadingItem = id + 1;
      const cartInfo = {
        data: {
          product_id: id,
          qty,
        },
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, cartInfo)
        .then((res) => {
          this.loadingStatus.loadingItem = "";
          emitter.emit("update-cart");
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
  created() {
    console.clear();
    this.getProducts();
  },
};
</script>
