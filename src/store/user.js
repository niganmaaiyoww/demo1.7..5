import { defineStore } from 'pinia'

// 定义全局用户状态
export const useUserStore = defineStore('user', {
  state: () => ({
    // 从localStorage读取登录态，初始为空
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
  }),
  actions: {
    // 登录：存储用户信息到内存+本地存储
    login(userData) {
      this.userInfo = userData
      localStorage.setItem('userInfo', JSON.stringify(userData))
    },
    // 退出：清空内存+本地存储
    logout() {
      this.userInfo = null
      localStorage.removeItem('userInfo')
    },
    // 检查是否登录
    isLogin() {
      return !!this.userInfo
    },
  },
})