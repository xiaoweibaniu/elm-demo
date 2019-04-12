import Vue from "vue";
import Vuex from "vuex";
import { setStore } from "./helpers/utils";
import { GET_USERINFO, RECORD_USERINFO } from "./mutation-types";
import { getUser } from "./helpers/getData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: true, // 是否登录
    userInfo: null, // 用户信息
    avatarPath: "" // 用户头像地址
  },
  mutations: {
    // 更新账户信息
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
    },
    // 记录账户信息
    [RECORD_USERINFO](state, info) {
      state.userInfo = info;
      state.login = true;
      setStore("user_id", info.user_id);
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      // 获取账户信息
      let res = await getUser();
      commit("GET_USERINFO", res);
    }
  }
});
