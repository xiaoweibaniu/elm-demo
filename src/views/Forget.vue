<template>
  <div class="rest-container">
    <head-top head-title="重置密码" goBack="true"></head-top>
    <form action="">
      <section class="input_container">
        <input type="text" placeholder="账号" />
      </section>
      <section class="input_container">
        <input type="text" placeholder="旧密码" />
      </section>
      <section class="input_container">
        <input type="text" placeholder="新密码" />
      </section>
      <section class="input_container">
        <input type="text" placeholder="请确认密码" />
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" />
        <div class="captcha_code_container">
          <img :src="captchaCodeImg" v-show="captchaCodeImg" alt="" />
          <div class="change_captcha" @click="setCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
	    <button type="button" class="login_button">确认修改</button>
    </form>
  </div>
</template>

<script>
import headTop from "../components/head";
import { getCaptchaCode } from "../helpers/getData";

export default {
  data() {
    return {
      captchaCodeImg: "" // 验证码图片地址
    };
  },
  components: {
    headTop
  },
  created() {
    // 获取图片验证码
    this.setCaptchaCode();
  },
  methods: {
    // 获取图片验证码
    async setCaptchaCode() {
      let res = await getCaptchaCode();
      this.captchaCodeImg = res.code;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixin";

.rest-container {
  margin-top: 130px;
  .input_container {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 30px;
	  background-color: #fff;
    input {
      @include wh(100%, 90px);
      @include sc(32px, #666);
    }
  }
  .input_container:last-of-type {
    height: 90px;
    border: none;
    .captcha_code_container {
      display: flex;
      align-items: center;
      .change_captcha {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        width: 90px;
        text-align: right;
        p {
          @include sc(25px, #666);
        }
        p:nth-of-type(2) {
          color: #3b95e9;
        }
      }
    }
  }
	.login_button {
		@include wh(700px, 80px);
		@include sc(34px, #fff);
		border-radius: 8px;
		margin: 40px 25px 0;
		background: #4cd964;
	}
}
</style>
