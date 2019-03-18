<template>
  <div class="address_search_container">
    <head-top :head-title="cityName" go-back="true">
      <template v-slot:changeCity>
        <router-link to="/" class="change_city">切换城市</router-link>
      </template>
    </head-top>
    <form action="" class="city_form ignore" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="address"
          class="address_input input_style"
          placeholder="输入学校、商务楼、地址等"
          required
          v-model="inputKeyWord"
        />
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="address_submit input_style"
          value="提交"
          @click="submitSearch"
        />
      </div>
    </form>
    <section class="product_list ignore">
      <h4 class="p-c-20 history_title" v-if="searchResult">搜索历史</h4>
      <ul v-if="searchResult">
        <li
          class="p-c-20"
          v-for="(item, index) in productList"
          :key="index"
          @click="goNextPage(index, item.geohash)"
        >
          <span class="product_name m-b-30">{{ item.name }}</span>
          <p class="product_address m-b-30">{{ item.address }}</p>
        </li>
      </ul>
      <div
        class="clear_history"
        v-if="searchResult && historyList.length"
        @click="cleanHistory"
      >
        清空所有
      </div>
      <div class="search_empty" v-if="!searchResult">
        抱歉，没要找到您搜索的商家或商品
      </div>
    </section>
  </div>
</template>

<script>
import headTop from "../components/head";
import { getStore, setStore, removeStore } from "../helpers/utils";
import { currentCity, searchProduct } from "../helpers/getData";

export default {
  data() {
    return {
      cityId: "", // 当前定位城市ID
      cityName: "", // 当前定位城市名称
      inputKeyWord: "", // 搜索关键词
      productList: [], // 搜索所得商户集合
      historyList: [], // 搜索历史记录集合
      searchResult: true // 是否有商户搜索结果
    };
  },
  components: {
    headTop
  },
  mounted: function() {
    // 获取当前定位城市ID
    this.cityId = this.$route.params.cityId;

    // 获取当前定位城市名称
    currentCity(this.cityId).then(res => {
      this.cityName = res.name;
    });

    // 渲染历史记录
    this.historyRender();
  },
  methods: {
    // 提交商户搜索
    submitSearch() {
      if (this.inputKeyWord) {
        // 输入有效关键词时
        searchProduct(this.cityId, this.inputKeyWord).then(res => {
          this.productList = res;

          // 更新商户搜索结果
          this.searchResult = !(this.productList.length === 0);
        });
      }
    },
    // 渲染历史记录
    historyRender() {
      // 更新历史记录集合
      let history = getStore("productHistory");
      this.historyList = history ? JSON.parse(history) : [];

      // 更新渲染商户集合
      this.productList = this.historyList;
    },
    // 跳转到商户主页
    goNextPage(index, location) {
      let history = getStore("productHistory");
      // 选中的商户
      let selectedProduct = this.productList[index];

      history = history ? JSON.parse(history) : [];

      if (history.length !== 0) {
        // 有历史记录时
        // 历史记录中对选中商户查重
        let result = history.find(function(value) {
          return value === location;
        });
        // 选中商户未被添加到历史记录集合中时
        !result && history.push(selectedProduct);
      } else {
        // 没有历史记录时
        history.push(selectedProduct); // 将选中商户添加到历史记录集合
      }
      // 更新历史记录
      setStore("productHistory", history);
      // 跳转到商户主页
      this.$router.push({ path: "/msite", query: { location } });
    },
    // 删除本地存储中访问过的商户历史记录集合
    cleanHistory() {
      // 删除本地存储对象
      removeStore("productHistory");
      // 渲染历史记录
      this.historyRender();
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixin";
.p-c-20 {
  padding: 0 20px;
}
.address_search_container {
  padding-top: 120px;
  .ignore {
    border-top: 2px solid $bc;
    border-bottom: 2px solid $bc;
  }
}
.change_city {
  @include ct;
  right: 20px;
  @include sc(30px, #fff);
}
.city_form {
  padding: 30px 40px;
  background-color: #fff;
  div {
    .input_style {
      @include wh(100%, 70px);
      border-radius: 5px;
      margin-bottom: 30px;
    }
    .address_input {
      padding: 0 20px;
      border: 1px solid $bc;
      @include sc(28px, #333);
    }
    .address_submit {
      margin-bottom: 0;
      background-color: $blue;
      @include sc(32px, #fff);
    }
  }
}
.product_list {
  margin-top: 20px;
  border-bottom: 1px solid $bc !important;
  background-color: #fff;
  .history_title {
    line-height: 70px;
    color: #555;
  }
  ul {
    border-top: 1px solid $bc;
    li {
      padding-top: 30px;
      border-bottom: 1px solid $bc;
      .product_name {
        display: block;
        margin-bottom: 15px;
        @include sc(30px, #333);
      }
      .product_address {
        margin-bottom: 30px;
        @include sc(26px, #999);
      }
    }
  }
  .search_empty {
    padding: 0 20px;
    text-align: center;
    line-height: 80px;
    @include sc(28px, #666);
  }
}
.clear_history {
  @include wh(100%, 90px);
  text-align: center;
  line-height: 90px;
  color: #555;
  background-color: #fff;
}
</style>
