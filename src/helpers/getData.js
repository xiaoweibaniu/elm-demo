import axios from "axios";
import { getStore } from "../helpers/utils";

/*
 * 获取用户信息
 * */

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
