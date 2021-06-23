import axios from "axios"

import { message } from "antd"

axios.defaults.timeout = 10000;
// axios.defaults.baseURL = "http://localhost:5000/";


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
        message.error("请求出错" + error.message)
      })
  })
}


/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
        message.error("请求出错" + error.message)
      });
  });
}