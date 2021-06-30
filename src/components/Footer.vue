<template>
  <footer
    class="
      bg-dark
      fs-7
      p-3
      text-center
      position-relative
      d-flex d-sm-block
      flex-column
    "
  >
    <div
      class="
        order-2
        mt-2 mt-sm-0
        position-sm-absolute
        copyRight
      "
    >
      <nav>
        <ul
          class="
            d-flex
            justify-content-sm-between justify-content-center
            p-1
            mb-1
            list-unstyled
          "
        >
          <li class="px-2 px-sm-0">
            <a
              class="text-link"
              href="https://www.facebook.com/tokyofarmer"
              target="_blank"
              ><i class="bi bi-facebook fs-6"></i
            ></a>
          </li>
          <li class="px-2 px-sm-0">
            <a
              class="text-link"
              href="https://www.instagram.com/leo_tokyofarmer/"
              target="_blank"
              ><i class="bi bi-instagram fs-6"></i
            ></a>
          </li>
          <li class="px-2 px-sm-0">
            <a
              class="text-link"
              href="https://www.youtube.com/channel/UC_AyDfrqqpUg-6vVz72vS5g"
              target="_blank"
              ><i class="bi bi-youtube fs-6"></i
            ></a>
          </li>
        </ul>
      </nav>
      <small class="text-light"
        >made by
        <a
          class="text-link text-decoration-none"
          href="https://github.com/overactive1988"
          target="_blank"
          >leolee</a
        >
        <router-link class="text-link" to="/login">
          <span class="material-icons"> account_box </span>
        </router-link>
      </small>
    </div>
    <p class="text-light mb-2">
      本站所使用一切 小魔女諾貝塔 相關素材已取得授權<br />著作權皆屬於
      <a
        class="text-link text-decoration-none"
        href="http://simon.moe/"
        target="_blank"
        >希萌創意行銷股份有限公司</a
      >
      所有
    </p>
    <small class="text-light"
      >© 2021
      <a
        class="text-link text-decoration-none"
        href="http://simon.moe/"
        target="_blank"
        >SimonCreative</a
      >
      All rights reserved</small
    >
  </footer>
</template>
