<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="customerOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 id="customerOrderModalLabel" class="modal-title">
            <span>修改客戶訂單內容</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3 class="text-primary">選購商品</h3>
          <div class="px-3">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>縮圖</th>
                  <th>品名</th>
                  <th>類別</th>
                  <th>數量</th>
                  <th class="text-end">單價</th>
                  <th class="text-end">合計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tempOrder.products" :key="item.id">
                  <th>
                    <img
                      class="product-img"
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                    />
                  </th>
                  <th>
                    {{ item.product.title }}
                  </th>
                  <th>
                    {{ item.product.category }}
                  </th>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td class="text-end">
                    {{ $filters.currency(item.product.price) }}
                  </td>
                  <td class="text-end">
                    {{ $filters.currency(item.qty * item.product.price) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-md-4">
              <h3 class="text-primary">用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3 class="text-primary">訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>尚無資訊</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempOrder.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  v-model="tempOrder.is_paid"
                  @click="paidTime()"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  <span v-if="tempOrder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-order', tempOrder)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/assets/js/mixins/modalMixin";

export default {
  emits: ["update-order"],
  props: {
    editOrder: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: "",
      tempOrder: {},
    };
  },
  methods: {
    paidTime() {
      if (this.tempOrder.paid_date) {
        this.tempOrder.paid_date = '';
      } else {
        this.tempOrder.paid_date = Math.floor(Date.now()/1000);
      }
    },
  },
  watch: {
    editOrder() {
      this.tempOrder = this.editOrder;
    },
  },
  mixins: [modalMixin],
};
</script>
