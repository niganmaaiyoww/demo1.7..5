<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <!-- 错误提示 -->
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div class="form-item">
      <label>账号：</label>
      <input 
        type="text" 
        v-model="username" 
        placeholder="请输入账号"
        required
      >
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input 
        type="password" 
        v-model="password" 
        placeholder="请输入密码"
        required
      >
    </div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '../store' // 使用 Store 管理用户登录

// 响应式数据
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()
const menuStore = useMenuStore()

// 登录处理函数：使用 store.login，保证与注册/登出一致
const handleLogin = () => {
  // 空值校验
  if (!username.value || !password.value) {
    errorMsg.value = '账号和密码不能为空！'
    return
  }

  // 调用 store 的登录方法（支持注册的用户）
  const res = menuStore.login(username.value, password.value)
  if (res.success) {
    // store.login 已经持久化 userInfo，并且同步 isLogin
    // 跳转首页
    router.push('/home')
  } else {
    errorMsg.value = res.msg
  }
}
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.form-item {
  margin: 15px 0;
  display: flex;
  align-items: center;
}
.form-item label {
  width: 60px;
}
.form-item input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #ff4400;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  text-align: center;
}
</style>