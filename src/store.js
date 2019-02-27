import Vue from "vue";
import Vuex from "vuex";
import { GET_USERINFO } from "./mutation-types";
import { getUser } from "./helpers/getData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: true, // 是否登录
    userInfo: null // 用户信息
  },
  mutations: {
    [GET_USERINFO](state, info) {
      if (state.userInfo && state.userInfo.username !== info.username) {
        return;
      }
      if (!state.login) {
        return;
      }
      if (!info.message) {
        state.userInfo = { ...info };
      } else {
        state.userInfo = null;
      }
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      let res = await getUser();
      commit("GET_USERINFO", res);
    }
  }
});
