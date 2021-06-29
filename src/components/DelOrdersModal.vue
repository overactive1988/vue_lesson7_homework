<template>
  <div
    id="delOrderModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
            <span>刪除單筆訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="deleteOrder.id" class="modal-body">
          是否刪除
          <strong class="text-danger">{{ deleteOrder.user.name }}</strong>
          的訂單(刪除後將無法恢復)。
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
            @click="$emit('delete-orders', deleteOrder)"
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
import modalMixin from "@/assets/js/mixins/modalMixin";
export default {
  props: {
    deleteOrder: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: "",
    };
  },
  mixins: [modalMixin],
};
</script>
