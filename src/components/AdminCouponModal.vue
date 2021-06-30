<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 id="couponModalLabel" class="modal-title">
            <span v-if="propsCoupon.title">編輯優惠券</span>
            <span v-else>新增優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mt-3">
            <div class="form-group col-md-6">
              <label for="title">優惠券名稱</label>
              <input
                id="title"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入優惠券名稱"
                v-model="newCoupon.title"
              />
            </div>

            <div class="form-group col-md-6">
              <label for="code">優惠券代碼</label>
              <input
                id="code"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入優惠券代碼"
                v-model="newCoupon.code"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="form-group col-md-6">
              <label for="percent">折扣率</label>
              <input
                id="percent"
                type="number"
                class="form-control mt-1"
                placeholder="請輸入折扣率"
                min="0"
                v-model.number="newCoupon.percent"
              />
            </div>

            <div class="form-group col-md-6">
              <label for="due_date">優惠券到期日</label>
              <input
                id="due_date"
                type="date"
                class="form-control mt-1"
                placeholder="請輸入優惠券到期日"
                v-model="due_date"
              />
            </div>
          </div>

          <hr />

          <div class="form-group mt-3">
            <div class="form-check">
              <input
                id="is_enabled"
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="newCoupon.is_enabled"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
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
            @click="$emit('update-coupon', propsCoupon)"
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
  props: {
    propsCoupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: "",
      due_date: "",
      newCoupon: [],
    };
  },
  emits: ["update-coupon"],
  watch: {
    propsCoupon() {
      this.newCoupon = this.propsCoupon;
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.newCoupon.due_date * 1000)
        .toISOString()
        .split("T");
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.newCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
