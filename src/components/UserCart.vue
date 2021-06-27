<template>
  <tr v-for="item in cartitem.carts" :key="item.id">
    <td>
      <button
        @click="$emit('delete-cart', item)"
        type="button"
        class="btn btn-outline-danger btn-sm"
      >
        <span
          v-if="loading.loadingItem === item.id"
          class="material-icons animate-spin"
        >
          cached
        </span>
        x
      </button>
    </td>
    <td>
      <img
        class="product-img"
        :src="item.product.imageUrl"
        :alt="item.product.title"
      />
    </td>
    <td>
      {{ item.product.category }}
    </td>
    <td>
      {{ item.product.title }}
    </td>
    <td>
      {{ item.product.description }}
    </td>
    <td>
      <div class="input-group input-group-sm">
        <div class="input-group text-center mb-3">
          <button
            type="button"
            @click="$emit('cut-product-num', item)"
            class="btn-dark btn input-group-text rounded-0 fs-8 border-end-0"
            :class="{ disabled: item.qty <= 1 }"
            :disabled="item.id === loading.loadingItem"
          >
            <span>-</span>
          </button>
          <p class="form-control m-0">{{ item.qty }}</p>
          <button
            type="button"
            @click="$emit('add-product-num', item)"
            class="btn-dark btn input-group-text rounded-0 fs-8"
            :disabled="item.id === loading.loadingItem"
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </td>
    <td class="text-end">
      {{ item.product.price }}
    </td>

    <td class="text-end">
      <small class="text-success">價格：{{ item.total }}</small>
    </td>
  </tr>
</template>

<script>
export default {
  emits: ["delete-cart", "add-product-num", "cut-product-num"],
  props: {
    cartitem: {
      type: Object,
      default() {
        return {};
      },
    },
    loading: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
