<template>
  <div class="container">
    <div class="mt-4">
      <h1 class="text-center">商品列表</h1>
      <div class="text-end mt-4">
        <button @click="openModal('new')" class="btn btn-primary">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="6%">排序</th>
            <th width="10%">產品縮圖</th>
            <th width="10%">產品名稱</th>
            <th width="20%">產品敘述</th>
            <th width="12%">商品規格</th>
            <th width="10%">原價</th>
            <th width="10%">售價</th>
            <th width="10%">是否啟用</th>
            <th width="12%">刪除</th>
          </tr>
        </thead>
        <!-- 使用 v-for 一定要帶上 :key -->
        <tbody id="productList" v-for="item in products" :key="item">
          <tr class="align-middle">
            <td>{{ item.num }}</td>
            <td>
              <img class="product-img" :src="item.imageUrl" :alt="item.title" />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        總共有 <span id="productCount">{{ allproductsNum.length }}</span> 項產品
      </p>
      <div class="d-flex justify-content-center mt-5">
        <Pagination :page="pagination" @get-product="getData"></Pagination>
      </div>

      <!-- Modal -->
      <AdminProductModal
        ref="adminControlModal"
        :where-product="tempProduct"
        @update-product="updateProduct"
      ></AdminProductModal>
      <!-- 刪除按鈕彈出 Modal -->
      <DelProductModal
        ref="adminDelModal"
        :temp-product="tempProduct"
        @delete-product="deleteProduct"
      ></DelProductModal>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import AdminProductModal from "@/components/AdminProductModal.vue";
import DelProductModal from "@/components/DelProductModal.vue";

export default {
  data() {
    return {
      isNew: true,
      products: [],
      allproductsNum: "",
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
    };
  },
  components: {
    Pagination,
    AdminProductModal,
    DelProductModal,
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 取得產品列表
    getData(num = this.pagination.current_page || 1) {
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
    deleteProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$refs.adminDelModal.closeAdminModal(); // 關掉 modal
          alert(`已刪除${this.tempProduct.title}商品`);
          console.log(res.data);
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }, // 開啟modal
    openModal(isNew, item) {
      // console.log(isNew, item)
      switch (isNew) {
        case "new":
          // 先將預設物件內容清空
          this.tempProduct = {
            imagesUrl: [],
          };
          this.isNew = true;
          this.$refs.adminControlModal.openAdminModal();
          break;
        case "edit":
          // 因為傳參考特性會連動到資料，因此將資料進行淺層複製
          this.getData();
          this.tempProduct = { ...item };
          this.isNew = false;
          this.$refs.adminControlModal.openAdminModal();
          break;
        case "delete":
          // 因為傳參考特性會連動到資料，因此將資料進行淺層複製
          this.tempProduct = { ...item };
          // Modal需要拿到 title 和刪除按鈕時需要獲得 id
          this.$refs.adminDelModal.openAdminModal();
          break;
        default:
          break;
      }
    },
    // 於modal內按下確認按鈕時觸發
    updateProduct(tempProduct) {
      // 預設為 新增
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/`;
      let httpMethod = "post";
      // 根據 isNew 來判斷要串接 post 或是 put API
      if (!this.isNew) {
        // 進入編輯狀態
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](url, { data: tempProduct }) // post 或 put
        .then((res) => {
          if (res.data.success) {
            this.$refs.adminControlModal.closeAdminModal(); // 關掉 modal
            this.getData(); // 重整畫面
          } else {
            alert(res.data.message);
          }
        })
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
