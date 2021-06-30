<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary header-nav">
    <div class="container-fluid">
      <h1>
        <router-link class="navbar-brand" to="/">
          <img
            src="../assets/images/logo.png"
            alt="LITTLE WITCH NOBETA"
            width="180"
            class="d-inline-block align-text-top"
          />
        </router-link>
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin"
              >管理介面首頁<span class="text-uppercase"
                >admin</span
              ></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/coupon"
              >優惠券設定<span class="text-uppercase">coupon</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/products"
              >商品列表<span class="text-uppercase">products</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/orders"
              >訂單列表<span class="text-uppercase">orders</span></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
