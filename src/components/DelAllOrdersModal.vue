<template>
  <div
    id="delAllOrderModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delAllOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delAllOrderModalLabel" class="modal-title">
            <span>刪除全部訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          是否刪除所有訂單<br>
          <strong class="text-danger fs-4">刪除後將無法復原</strong>
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
            @click="$emit('delete-all-orders')"
            type="button"
            class="btn btn-danger"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/assets/js/mixins/modalMixin';
export default {
  data() {
    return {
      modal: "",
    };
  },
  mixins: [modalMixin],
};
</script>