<template>
  <div>
    <head-top sign-in-up="home">
      <template v-slot:logo>
        <span class="head_logo" @click="reload">ele.me</span>
      </template>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityId" class="guess_city ignore">
        <span>{{ guessCity }}</span>
        <svg class="arrow_right">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#arrow-right"
          ></use>
        </svg>
      </router-link>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title ignore">热门城市</h4>
      <ul class="city_list clear">
        <router-link
          tag="li"
          v-for="item in hotCity"
          :to="'/city/' + item.id"
          :key="item.id"
        >
          {{ item.name }}
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <ul class="letter_group">
        <li
          class="letter_item ignore"
          v-for="(value, key, index) in sortGroupCity"
          :key="key"
        >
          <h4 class="city_title">
            {{ key }}
            <span v-if="index === 0">（按字母排序）</span>
          </h4>
          <ul class="city_container city_list clear">
            <router-link
              tag="li"
              v-for="item in value"
              :to="'/city/' + item.id"
              :key="item.id"
              class="ellipsis"
              >{{ item.name }}</router-link
            >
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import HeadTop from "../components/head.vue";
import { cityGuess, hotCity, groupCity } from "../helpers/getData";

export default {
  data() {
    return {
      guessCity: "", // 当前城市
      guessCityId: "", // 当前城市id
      hotCity: [], // 热门城市集合
      groupCity: {} // 所欲城市集合
    };
  },
  components: {
    HeadTop
  },
  mounted() {
    // 获取当前定位城市
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityId = res.id;
    });

    // 获取热门城市
    hotCity().then(res => {
      this.hotCity = res;
    });

    // 获取所有城市
    groupCity().then(res => {
      this.groupCity = res;
    });
  },
  methods: {
    // 点击logo图标刷新页面
    reload() {
      window.location.reload();
    }
  },
  computed: {
    // 将获取的数据按照A-Z字母开头排序
    sortGroupCity() {
      let sortObj = {};
      for (let i = 65; i < 90; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.groupCity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortObj;
    }
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
.city_nav {
  padding-top: 120px;
  border-top: 1px solid $bc;
  margin-bottom: 20px;
  background-color: #fff;
  .city_tip {
    @include fj;
    height: 70px;
    padding: 0 20px;
    border-bottom: 1px solid $bc;
    line-height: 70px;
    span:nth-of-type(1) {
      @include sc(28px, #666);
    }
    span:nth-of-type(2) {
      font-weight: 600;
      @include sc(26px, #9f9f9f);
    }
  }
  .ignore {
    border-bottom: 2px solid $bc;
  }
  .guess_city {
    @include fj;
    align-items: center;
    height: 90px;
    padding: 0 20px;
    @include font(36px, 90px);
    span:nth-of-type(1) {
      color: $blue;
    }
    .arrow_right {
      @include wh(30px, 40px);
      fill: #999;
    }
  }
}
#hot_city_container {
  margin-bottom: 20px;
  background-color: #fff;
  .ignore {
    border-top: 2px solid $bc;
  }
}
.city_list {
  li {
    @include wh(25%, 80px);
    float: left;
    border-right: 1px solid $bc;
    border-bottom: 1px solid $bc;
    @include font(30px, 80px);
    color: $blue;
    text-align: center;
  }
  li:nth-of-type(4n) {
    border-right: none;
  }
}
.city_title {
  padding-left: 20px;
  color: #666;
  font-weight: 600;
  @include font(30px, 70px, "Helvetica Neue");
  border-bottom: 1px solid $bc;
  span {
    @include sc(26px, #999);
  }
}
.letter_group {
  .ignore {
    border-top: 2px solid $bc;
  }
}
.letter_item {
  border-bottom: 1px solid $bc;
  background-color: #fff;
  .city_container li {
    color: #666;
  }
}
</style>
