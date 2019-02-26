import axios from "axios";
import { getStore } from "../helpers/utils";

/*
 * 获取用户信息
 * */

export const getUser = () => {
  axios
    .get("/v1/user", {
      params: {
        user_id: getStore("user_id")
      }
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => console.log(error));
};
