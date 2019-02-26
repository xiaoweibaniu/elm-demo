<template>
  <div>
    <head-top sign-in-up="home">
      <template v-slot:logo>
        <span class="head_logo">ele.me</span>
      </template>
    </head-top>
  </div>
</template>

<script>
import HeadTop from "../components/head.vue";

export default {
  components: {
    HeadTop
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixin";
.head_logo {
  @include ct;
  font-weight: 400;
  @include sc(32px, #fff);
}
</style>
