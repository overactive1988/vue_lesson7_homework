<template>
  <div class="container content">
    <h1 class="text-center">優惠券</h1>
    <div class="d-flex justify-content-center mt-5">
      <Pagination :page="pagination" @get-product="getCoupon"></Pagination>
    </div>
    <!-- 訂單列表 -->
    <table class="table align-middle mt-4">
      <thead>
        <tr>
          <th width="5%">順序</th>
          <th width="8%">優惠券編號</th>
          <th width="9%">優惠券名稱</th>
          <th width="10%">優惠券代碼</th>
          <th width="7%">折扣率</th>
          <th width="10%">到期日</th>
          <th class="text-end" width="9%">啟用狀態</th>
          <th width="12%"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in coupons" :key="item.id">
          <td>{{ item.num }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td class="text-end">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-end">
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm">
                修改
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center mt-5">
      <Pagination :page="pagination" @get-product="getCoupon"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      coupons: {},
      pagination: {},
      couponData: {
        title: "超級特惠價格1",
        is_enabled: 1,
        percent: 99,
        due_date: 1555454014,
        code: "testCode2",
      },
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getCoupon(num = this.pagination.current_page || 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${num}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { coupons, pagination } = res.data;
            this.coupons = coupons;
            this.pagination = pagination;
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      this.$http
        .post(url, { data: this.couponData })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCoupon();
    // this.addCoupon();
  },
  created() {
    console.clear();
  },
};
</script>
