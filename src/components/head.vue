<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <router-link to="/login" class="head_login">
      <span class="login_span">登录 | 注册</span>
    </router-link>
    <section class="title_head ellipsis">
      <span class="title_text">白银</span>
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
  data() {},
  props: ["signInUp", "headTitle", "goBack"],
  mounted() {
    // 获取用户信息
    this.getUserInfo();
  },
  computed: mapState(['userInfo']),
  methods: {}
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

.head_login {
  @include ct;
  right: 20px;
  @include sc(30px, #fff);
  .login_span {
    color: #fff;
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
