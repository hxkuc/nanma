/*
**js基础函数H类
**黄总
**2017.6.29
*/
import axios from 'axios'
import qs from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '../../store'
axios.defaults.baseURL = 'http://127.0.0.1/learn/php/index.php?s='
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

function H () {
  // 定义路径
}

H.prototype.ajax = function (url, data, type, fun) {
  const that = this
  // let loadingInstance = ElementUI.Loading.service({ fullscreen: true })
  if (type === 'get') {
    axios.get(url, {
      params: data
    })
      .then(function (response) {
        // loadingInstance.close()
        // 在此做统一的验证
        if (response.data.needlogin && !response.data.islogin) {
          // 未登录的弹出登陆框
          that.store('showlogin', true)
          // 清空localstorage和store
          that.SL('userinfo')
          that.store('userinfo', {})
          return false
        }
        fun(response.data)
      })
      .catch(function (error) {
        // loadingInstance.close()
        ElementUI.Message.error('网络错误！')
        console.log(error)
      })
  } else if (type === 'post') {
    axios.post(url, qs.stringify(data))
      .then(function (response) {
        // loadingInstance.close()
        // 在此做统一的验证
        if (response.data.needlogin && !response.data.islogin) {
          // 未登录的弹出登陆框
          that.store('showlogin', true)
          // 清空localstorage和store
          that.SL('userinfo')
          that.store('userinfo', {})
          return false
        }
        fun(response.data)
      })
      .catch(function (error) {
        // loadingInstance.close()
        ElementUI.Message.error('网络错误！')
        console.log(error)
      })
  }
}
H.prototype.SL = function (obj, ocj) {
  if (ocj) {
    localStorage.setItem(obj, JSON.stringify(ocj))
  } else {
    localStorage.removeItem(obj)
  }
}
H.prototype.GL = function (obj) {
  obj = obj.split('.')
  // 获取数据
  var data = JSON.parse(localStorage.getItem(obj[0]))
  return obj[1] ? data[obj[1]] : data
}
H.prototype.store = function (key, value) {
  store.commit('setstates', [key, value])
}
H.prototype.success = function (info) {
  ElementUI.Message({
    message: info,
    type: 'success'
  })
}
H.prototype.error = function (info) {
  ElementUI.Message.error(info)
}
const HF = new H()
export {HF, ElementUI, store}
