<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <!-- 回退按钮 start -->
    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <polyline
          points="12,18 4,9 12,0"
          style="fill:none;stroke:rgb(255,255,255);stroke-width:2"
        ></polyline>
      </svg>
    </section>
    <!-- 回退按钮 end -->
    <router-link
      :to="userInfo ? '/profile' : '/login'"
      v-if="signInUp"
      class="head_login"
    >
      <!-- 人员图标 start -->
      <svg class="user_avatar" v-if="userInfo">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#user"
        ></use>
      </svg>
      <!-- 人员图标 end -->
      <span class="login_span" v-else>登录 | 注册</span>
    </router-link>
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{ headTitle }}</span>
    </section>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changeCity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: ["signInUp", "headTitle", "goBack"],
  mounted() {
    // 获取用户信息
    this.getUserInfo();
  },
  computed: mapState(["userInfo"]),
  methods: mapActions(["getUserInfo"])
};
</script>

<style lang="scss">
@import "../assets/styles/mixin";

#head_top {
  @include wh(100%, 100px);
  padding: 0 20px;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: $blue;
}

.head_goback {
  @include wh(30px, 36px);
  @include ct;
}

.head_login {
  @include ct;
  right: 20px;
  @include sc(30px, #fff);
  .login_span {
    color: #fff;
  }
  .user_avatar {
    @include wh(32px, 35px);
    margin-top: 12px;
    fill: #fff;
  }
}

.title_head {
  @include center;
  .title_text {
    @include sc(38px, #fff);
    font-weight: bold;
  }
}
</style>
