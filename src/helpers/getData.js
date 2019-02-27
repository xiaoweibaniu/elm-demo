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
  return axios
    .get("/v1/cities", {
      params: {
        type: "guess"
      }
    })
    .then(response => {
      console.log(response);
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
