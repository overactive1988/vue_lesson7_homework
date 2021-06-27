<template>
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>{{ tempProduct.title }}</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <img
              class="img-fluid"
              :src="tempProduct.imageUrl"
              alt="{{tempProduct.title}}"
            />
          </div>
          <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill">{{
              tempProduct.category
            }}</span>
            <p>商品描述：{{ tempProduct.description }}</p>
            <p>商品內容：{{ tempProduct.content }}</p>
            <div class="h5" v-if="!tempProduct.price">
              {{ tempProduct.origin_price }} 元
            </div>
            <del class="h6" v-if="tempProduct.price"
              >原價 {{ tempProduct.origin_price }} 元</del
            >
            <div class="h5" v-if="tempProduct.price">
              現在只要 {{ tempProduct.price }} 元
            </div>
            <div>
              <div class="input-group text-center">
                <button
                  type="button"
                  @click="cutUserModalProduct"
                  class="
                    btn-dark btn
                    input-group-text
                    rounded-0
                    fs-8
                    border-end-0
                  "
                  :class="{ disabled: qty <= 1 }"
                >
                  <span>-</span>
                </button>
                <p class="form-control m-0">{{ qty }}</p>
                <button
                  type="button"
                  @click="addUserModalProduct"
                  class="btn-dark btn input-group-text rounded-0 fs-8"
                >
                  <span>+</span>
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addCart(qty)"
                >
                  <span
                    v-if="loadingStatus.loadingItem === 1"
                    class="material-icons animate-spin"
                  >
                    cached
                  </span>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
          <!-- col-sm-6 end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      qty: 1,
      tempProduct: {},
    };
  },
  methods: {
    getProduct() {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.tempProduct = res.data.product;
          // console.log(this.tempProduct);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cutUserModalProduct() {
      this.qty -= 1;
    },
    addUserModalProduct() {
      this.qty += 1;
    },
    addCart(qty = 1) {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = 1;
      const cartInfo = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$http
        .post(url, cartInfo)
        .then((res) => {
          this.loadingStatus.loadingItem = "";
          console.log(res);
          alert(res.data.message);
          this.qty = 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
  created() {
    console.clear();
  },
};
</script>
