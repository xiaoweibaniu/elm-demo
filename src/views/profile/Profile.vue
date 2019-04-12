<template>
  <div class="profile-page">
    <head-top go-back="true" :head-title="profiletitle"></head-top>
    <div>
      <section class="profile-account">
        <router-link
          :to="userInfo && userInfo.user_id ? '/profile/info' : '/login'"
          class="profile-link"
        >
          <!-- 用户未登录时 -->
          <img
            :src="imgBaseUrl + userInfo.avatar"
            alt="用户头像"
            class="private-image"
            v-if="userInfo && userInfo.user_id"
          />
          <!-- 用户已登录时 -->
          <span class="private-image" v-else>
            <svg class="private-image-svg">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#avatar-default"
              ></use>
            </svg>
          </span>
          <div class="user-info">
            <p>{{ username }}</p>
            <p>
              <span class="icon-mobile">
                <svg class="icon" fill="#fff">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#mobile"
                  ></use>
                </svg>
              </span>
              <span class="number-mobile">{{ mobile }}</span>
            </p>
          </div>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="profile-info">
        <ul class="info-list">
          <router-link to="/balance" tag="li" class="info-data-link">
            <span class="data-number"
              ><b>{{ parseInt(balance).toFixed(2) }}</b> 元</span
            >
            <span class="data-title">我的余额</span>
          </router-link>
          <router-link to="/balance" tag="li" class="info-data-link">
            <span class="data-number"
              ><b>{{ count }}</b> 个</span
            >
            <span class="data-title">我的优惠</span>
          </router-link>
          <router-link to="/balance" tag="li" class="info-data-link">
            <span class="data-number"
              ><b>{{ pointNumber }}</b> 分</span
            >
            <span class="data-title">我的积分</span>
          </router-link>
        </ul>
      </section>
      <section class="profile-order">
        <router-link to="/order" class="order-item">
          <span class="item-icon">
            <svg data-v-0fc4ab7a="" fill="#4aa5f0">
              <use
                data-v-0fc4ab7a=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#order"
              ></use>
            </svg>
          </span>
          <span class="item-text">我的订单</span>
          <span class="item-arrow">
            <svg fill="#bbb">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </router-link>
        <a href="https://home.m.duiba.com.cn/#/chome/index" class="order-item">
          <span class="item-icon">
            <svg fill="#fc7b53">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#point"
              ></use>
            </svg>
          </span>
          <span class="item-text">积分商城</span>
          <span class="item-arrow">
            <svg fill="#bbb">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </a>
        <router-link to="/vipcard" class="order-item">
          <span class="item-icon">
            <svg fill="#ffc636">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#vip"
              ></use>
            </svg>
          </span>
          <span class="item-text">饿了么会员</span>
          <span class="item-arrow">
            <svg fill="#bbb">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="profile-order">
        <router-link to="/service" class="order-item">
          <span class="item-icon">
            <svg fill="#4aa5f0">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#service"
              ></use>
            </svg>
          </span>
          <span class="item-text">服务中心</span>
          <span class="item-arrow">
            <svg fill="#bbb">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </router-link>
        <router-link to="/download" class="order-item">
          <span class="item-icon">
            <svg fill="#3cabff">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#download"
              ></use>
            </svg>
          </span>
          <span class="item-text">下载饿了么APP</span>
          <span class="item-arrow">
            <svg fill="#bbb">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { imgBaseUrl } from "../../helpers/env";
import headTop from "../../components/head";
import { mapState } from "vuex";
export default {
  data() {
    return {
      profiletitle: "个人中心",
      username: "登录|注册", // 用户名
      mobile: "暂无绑定手机号", // 手机号
      balance: 0, // 我的余额
      count: 0, // 我的优惠券数
      pointNumber: 0, // 我的积分数
      imgBaseUrl
    };
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    // 初始化数据
    this.initData();
  },
  methods: {
    initData() {
      if (this.userInfo && this.userInfo.user_id) {
        console.log(this.userInfo);
        this.username = this.userInfo.username;
        this.mobile = this.userInfo.mobile || "暂无绑定手机号";
        this.balance = this.userInfo.balance;
        this.count = this.userInfo.gift_amount;
        this.pointNumber = this.userInfo.point;
      } else {
        this.username = "登录|注册";
        this.mobile = "暂无绑定手机号";
      }
    }
  },
  watch: {
    userInfo(){
      this.initData();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/mixin";

.profile-page {
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.profile-account {
  padding-top: 100px;
  background: $blue;
  .profile-link {
    display: flex;
    align-items: center;
    padding: 30px;
    .private-image {
      display: block;
      @include wh(120px, 120px);
      .private-image-svg {
        @include wh(100%, 100%);
        border-radius: 50%;
        background-color: $fc;
      }
    }
    .user-info {
      margin-left: 30px;
      flex-grow: 1;
      p {
        font-weight: 700;
        @include sc(36px, $fc);
        .icon-mobile {
          display: inline-block;
          vertical-align: middle;
          @include wh(30px, 34px);
          .icon {
            @include wh(100%, 100%);
          }
        }
        .number-mobile {
          display: inline-block;
          margin-left: 6px;
          @include sc(26px, $fc);
        }
      }
    }
    .arrow {
      display: block;
      @include wh(30px, 30px);
      .arrow-svg {
        @include wh(100%, 100%);
      }
    }
  }
}

.profile-info {
  background-color: $fc;
  .info-list {
    display: flex;
    li {
      display: block;
      height: 200px;
      flex-grow: 1;
      text-align: center;
      border-right: 1px solid $bc;
      span {
        display: block;
      }
      .data-number {
        @include sc(24px, #333);
        padding: 50px 20px 10px;
        b {
          @include sc(38px, #f90);
          font-weight: 600;
        }
      }
      .data-title {
        @include sc(28px, #666);
        font-weight: 400;
      }
    }
    li:nth-of-type(2) {
      .data-number {
        b {
          color: #ff5f3e;
        }
      }
    }
    li:last-of-type {
      border: none;
      .data-number {
        b {
          color: #6ac20b;
        }
      }
    }
  }
}
.profile-order {
  margin-top: 20px;
  background-color: $fc;
  .order-item {
    display: flex;
    align-items: center;
    padding: 20px 20px 20px 30px;
    border-bottom: 1px solid $bc;
    .item-icon {
      @include wh(34px, 34px);
      svg {
        @include wh(100%, 100%);
      }
    }
    .item-text {
      flex-grow: 1;
      padding-left: 20px;
    }
    .item-arrow {
      @include wh(26px, 26px);
      svg {
        @include wh(100%, 100%);
      }
    }
  }
  .order-item:last-of-type {
    border: none;
  }
}
</style>
