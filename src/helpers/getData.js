import axios from "axios";
import { getStore } from "../helpers/utils";

/**
 * 获取用户信息
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */

export const getUser = () => {
  return axios
    .get("/v1/user", {
      params: {
        user_id: getStore("user_id")
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 获取当前定位城市
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const cityGuess = () => {
  // TODO: 项目环境对参数guess拒绝代理，留待详细测试
  return axios
    .get("http://cangdu.org:8001/v1/cities", {
      params: {
        type: "guess"
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 获取首页热门城市
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const hotCity = () => {
  return axios
    .get("/v1/cities", {
      params: {
        type: "hot"
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 获取所有城市
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const groupCity = () => {
  return axios
    .get("/v1/cities", {
      params: {
        type: "group"
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 获取当前定位城市
 * @param cityId
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const currentCity = cityId => {
  return axios
    .get("/v1/cities/" + cityId)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 搜索当前城市符合该关键词的商户
 * @param cityId 城市id
 * @param value 搜索关键字
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const searchProduct = (cityId, value) => {
  return axios
    .get("/v1/pois", {
      params: {
        type: "search",
        city_id: cityId,
        keyword: value
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 获取图片验证码
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const getCaptchaCode = () => {
  return axios
    .post("/v1/captchas", {})
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 获取短信验证码
 * @param phone 手机账号
 * @returns {Promise<AxiosResponse<any> | never | void>}
 */
export const getMobileCode = phone => {
  return axios
    .post("/v4/mobile/verify_code/send", {
      moble: phone,
      scene: "login",
      type: "sms"
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 检测用户是否存在
 * @param phone 手机账号
 * @param type 账号类型[mobile]
 */
export const checkUser = (phone, type) => {
  return axios
    .get("/v1/users/exists", {
      params: {
        [type]: phone,
        type
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

/**
 * 账号登录方式
 * @param username 账号
 * @param password 密码
 * @param captcha_code 验证码
 */
export const accountLogin = (username, password, captcha_code) => {
  return axios
    .post("/v2/login", {
      username,
      password,
      captcha_code
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};
