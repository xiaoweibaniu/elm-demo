<template>
  <div class="page_container">
    <head-top head-title="登录" go-back="true">
      <template v-slot:changeLogin>
        <div class="change_login" @click="changeLoginWay">
          {{ loginWay ? "密码登录" : "短信登录" }}
        </div>
      </template>
    </head-top>
    <form class="login_form">
      <template v-if="loginWay">
        <section class="input_container">
          <input type="text" placeholder="账号" v-model="userAccount" />
        </section>
        <section class="input_container">
          <input
            type="password"
            placeholder="密码"
            v-if="!showPassword"
            v-model="passWord"
          />
          <input type="text" placeholder="密码" v-else v-model="passWord" />
          <div class="button_switch" :class="{ change_to_text: showPassword }">
            <div
              class="circle_button"
              :class="{ trans_to_right: showPassword }"
              @click="changePasswordType"
            ></div>
          </div>
        </section>
        <section class="input_container captcha_code_container">
          <input
            type="text"
            placeholder="验证码"
            maxlength="4"
            v-model="captchaCode"
          />
          <div class="captcha_code_container">
            <img :src="captchaCodeImg" v-show="captchaCodeImg" alt="" />
            <div class="change_captcha" @click="setCaptchaCode">
              <p>看不清</p>
              <p>换一张</p>
            </div>
          </div>
        </section>
      </template>
      <template v-else>
        <section class="input_container">
          <input
            type="text"
            placeholder="手机账号"
            name="phone"
            maxlength="11"
          />
          <button
            type="button"
            :class="{ right_phone_number: phoneResult }"
            v-show="!computedTime"
            @click="getVerifyCode"
          >
            获取验证码
          </button>
          <button type="button" v-show="computedTime">
            已发送 ({{ computedTime }}s)
          </button>
        </section>
      </template>
    </form>
    <p class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login_tips">注册过的用户可凭账号密码登录</p>
    <button type="button" class="login_button" @click="submitLogin">
      登录
    </button>
    <router-link to="/forget" class="to_forget" v-if="loginWay">
      忘记密码 ？
    </router-link>
    <alert-tip v-show="showAlert" :alertText="alertText" @closeAlert="closeAlert"></alert-tip>
  </div>
</template>

<script>
import headTop from "../components/head";
import alertTip from "../components/common/alertTip";
import { getCaptchaCode, checkUser } from "../helpers/getData";

export default {
  data() {
    return {
      loginWay: true, // 登录方式，默认账号登录
      showPassword: false, // 是否显示密码
      phoneNumber: "", // 电话号码
      captchaCodeImg: "", // 验证码地址
      computedTime: 0, // 倒计时
      showAlert: false, // 显示提示组件
      alertText: null, // 提示的内容
      userAccount: "", // 账户名
      userInfo: "", // 获取到的账户信息
      passWord: "", // 密码
      captchaCode: "" // 验证码
    };
  },
  components: {
    headTop,
    alertTip
  },
  created() {
    // 获取图片验证码
    this.setCaptchaCode();
  },
  computed: {
    // 校验手机号格式
    phoneResult() {
      console.log(/^1[34578]\d{9}$/gi.test(this.phoneNumber));
      return /^1[34578]\d{9}$/gi.test(this.phoneNumber);
    }
  },
  methods: {
    // 关闭提示组件
    closeAlert(){
      this.showAlert = false;
    },
    // 改变登录方式
    changeLoginWay() {
      this.loginWay = !this.loginWay;
    },
    // 改变密码显示状态
    changePasswordType() {
      this.showPassword = !this.showPassword;
    },
    // 获取图片验证码
    async setCaptchaCode() {
      let res = await getCaptchaCode();
      this.captchaCodeImg = res.code;
    },
    // 获取短信验证码
    async getVerifyCode() {
      // 手机格式正确时
      if (this.phoneResult) {
        // 更新验证码发送时间
        this.computedTime = 30;

        // 获取用户
        let user = await checkUser(this.phoneNumber, "mobile");
        console.log(user);
      } else {
        console.log("error");
      }
    },
    // 提交登录信息
    async submitLogin() {
      if (this.loginWay) {
        // 密码登录
        if (this.userAccount === "") {
          // 账户信息为空时
          this.showAlert = true;
          this.alertText = "请填写正确的账号";
          return;
        }

        if(this.passWord === ""){
          // 密码信息为空时
          this.showAlert = true;
          this.alertText = "请填写正确的密码";
          return;
        }

        if(this.captchaCode === ""){
          // 验证码信息为空时
          this.showAlert = true;
          this.alertText = "请填写正确的验证码";
          return;
        }

        // 提交用户账号信息
        // this.userInfo ='';
      } else {
        // 短信登录
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixin";

.page_container {
  padding-top: 130px;
  p,
  span,
  input {
    font-family: Helvetica Neue, Tahoma, Arial, serif;
  }
}

.change_login {
  position: absolute;
  right: 20px;
  @include ct;
  @include sc(28px, #fff);
}

.login_form {
  background: #fff;
  .input_container {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    border-bottom: 1px solid #f1f1f1;
    input {
      @include wh(100%, 90px);
      @include sc(32px, #666);
    }
    button {
      @include wh(220px, 60px);
      @include sc(28px, #fff);
      font-family: "Helvetica Neue", Tahoma, Arial, serif;
      border: 1px;
      border-radius: 10px;
      margin-top: 16px;
    }
    .right_phone_number {
      background-color: #4cd964;
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
  .phone_number {
    padding: 20px 40px;
  }
}

.button_switch {
  background: #ccc;
  @include wh(90px, 30px);
  display: flex;
  justify-content: center;
  border: 1px;
  border-radius: 20px;
  margin-top: 26px;
  position: relative;
  .circle_button {
    transition: all 0.3s;
    position: absolute;
    top: -8px;
    left: -10px;
    @include wh(45px, 45px);
    box-shadow: 0 2px 05px 0 rgba(0, 0, 0, 0.1);
    background-color: #f1f1f1;
    border-radius: 50%;
  }
  .trans_to_right {
    transform: translateX(60px);
  }
}
.change_to_text {
  background-color: #4cd964;
}
.login_tips {
  padding: 10px 20px;
  @include sc(26px, #ff0000);
}
.login_button {
  @include wh(700px, 80px);
  @include sc(34px, #fff);
  border-radius: 8px;
  margin: 10px 25px;
  background: #4cd964;
}
.to_forget {
  display: block;
  padding-right: 20px;
  margin-top: 20px;
  text-align: right;
  @include sc(26px, #3b95e9);
}
</style>
