import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    // 用户信息 - 加 try/catch 防止解析失败
    userInfo: (() => {
      try {
        const user = localStorage.getItem('userInfo')
        return user ? JSON.parse(user) : null
      } catch (e) {
        console.log('读取用户信息失败', e)
        return null
      }
    })(),
    // 收藏列表 - 容错解析
    collectList: (() => {
      try {
        return JSON.parse(localStorage.getItem('collectList')) || []
      } catch (e) {
        return []
      }
    })(),
    // 注册用户列表 - 尝试解析，否则回退到默认 admin（不在启动时进行强制转换）
    userList: (() => {
      try {
        const raw = localStorage.getItem('userList')
        return raw ? JSON.parse(raw) : [{ username: 'admin', password: '123456' }]
      } catch (e) {
        return [{ username: 'admin', password: '123456' }]
      }
    })()
  }),
  getters: {
    // 判断是否登录（保持原名 isLogin，与组件一致）
    isLogin: (state) => !!state.userInfo,
    // 收藏总数和总价 - 容错计算避免缺字段报错
    collectTotal: (state) => {
      return state.collectList.reduce((total, item) => {
        const count = Number(item.count) || 0
        const price = Number(item.price) || 0
        total.count += count
        total.price += price * count
        return total
      }, { count: 0, price: 0 })
    }
  },
  actions: {
    // 注册：按需从 localStorage 读取并容错，保证不需先登录 admin
    register(username, password) {
      // 尝试读取最新的 localStorage userList（防止内存或 localStorage 被异步修改）
      let stored = null
      try {
        const raw = localStorage.getItem('userList')
        stored = raw ? JSON.parse(raw) : null
      } catch (e) {
        stored = null
      }

      // 使用读取到的数组（若无效则尝试使用内存中的 userList）
      const users = Array.isArray(stored) ? stored : (Array.isArray(this.userList) ? [...this.userList] : [])

      const exists = users.find(user => user.username === username)
      if (exists) {
        return { success: false, msg: '账号已存在！' }
      }

      users.push({ username, password })
      try {
        localStorage.setItem('userList', JSON.stringify(users))
      } catch (e) {
        // 写入失败也不阻止流程，仍更新内存
      }
      this.userList = users
      return { success: true, msg: '注册成功！' }
    },

    // 登录：实时读取 userList（容错），并写入 isLogin/userInfo 以兼容路由守卫
    login(username, password) {
      let stored = null
      try {
        const raw = localStorage.getItem('userList')
        stored = raw ? JSON.parse(raw) : null
      } catch (e) {
        stored = null
      }

      const users = Array.isArray(stored) ? stored : (Array.isArray(this.userList) ? this.userList : [])

      const user = users.find(item => item.username === username && item.password === password)
      if (!user) {
        return { success: false, msg: '用户名或密码错误！' }
      }

      this.userInfo = { username: user.username }
      try {
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        localStorage.setItem('isLogin', 'true')
      } catch (e) {
        // 忽略写入异常
      }

      // 恢复收藏列表（容错）
      try {
        this.collectList = JSON.parse(localStorage.getItem('collectList')) || []
      } catch (e) {
        this.collectList = []
      }

      // 同步内存中的 userList
      this.userList = users
      return { success: true, msg: '登录成功！' }
    },

    // 退出登录
    logout() {
      this.userInfo = null
      try {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('isLogin')
      } catch (e) {
        // ignore
      }
      return { success: true, msg: '退出成功！' }
    },

    // 加入收藏（与项目中其它组件保持方法名一致）
    addCollect(menu) {
      if (!Array.isArray(this.collectList)) this.collectList = []
      const exist = this.collectList.find(item => item.id === menu.id)
      if (exist) {
        exist.count = (exist.count || 0) + 1
      } else {
        this.collectList.push({ ...menu, count: 1 })
      }
      try {
        localStorage.setItem('collectList', JSON.stringify(this.collectList))
      } catch (e) {
        // ignore
      }
    },

    // 移除收藏
    removeCollect(id) {
      if (!Array.isArray(this.collectList)) this.collectList = []
      this.collectList = this.collectList.filter(item => item.id !== id)
      try {
        localStorage.setItem('collectList', JSON.stringify(this.collectList))
      } catch (e) {
        // ignore
      }
    }
  }
})