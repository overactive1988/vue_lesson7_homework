import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //404
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
  },
  {
    //登入介面
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    //前台介面
    path: "/",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Top.vue"),
      },
      {
        path: "products",
        component: () => import("@/views/Products.vue"),
      },
      {
        path: "product/:id",
        component: () => import("@/views/Product.vue"),
      },
      {
        path: "cart",
        component: () => import("@/views/Cart.vue"),
      },
      {
        path: "about",
        component: () => import("@/views/About.vue"),
      },
    ],
  },
  {
    //後台介面
    path: "/admin",
    component: () => import("@/views/admin/Admin.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/AdminTop.vue"),
      },
      {
        path: "products",
        component: () => import("@/views/admin/AdminProducts.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/admin/AdminOrders.vue"),
      },
      {
        path: "coupon",
        component: () => import("@/views/admin/AdminCoupon.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
