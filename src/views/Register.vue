<template>
  <div class="register-page">
    <div class="register-card">
      <h2 class="register-title">✏️ 用户注册</h2>
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-item">
          <label for="reg-username" class="form-label">账号</label>
          <input 
            type="text" 
            id="reg-username" 
            v-model="username" 
            placeholder="请设置账号" 
            required
            class="form-input"
          >
        </div>
        <div class="form-item">
          <label for="reg-password" class="form-label">密码</label>
          <input 
            type="password" 
            id="reg-password" 
            v-model="password" 
            placeholder="请设置6位以上密码" 
            required
            class="form-input"
            minlength="6"
          >
        </div>
        <div class="form-item">
          <label for="reg-repassword" class="form-label">确认密码</label>
          <input 
            type="password" 
            id="reg-repassword" 
            v-model="repassword" 
            placeholder="请再次输入密码" 
            required
            class="form-input"
            minlength="6"
          >
        </div>
        <button type="submit" class="submit-btn">注册</button>
      </form>
      <p class="login-link">
        已有账号？<span @click="toLogin" class="link-text">立即登录</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '../store'

const router = useRouter()
const menuStore = useMenuStore()

// 表单数据绑定
const username = ref('')
const password = ref('')
const repassword = ref('')

// 注册逻辑（调用 Store 方法）
const handleRegister = () => {
  // 表单验证
  if (!username.value || !password.value || !repassword.value) {
    alert('请填写完整注册信息！')
    return
  }
  if (password.value.length < 6) {
    alert('密码长度不能少于6位！')
    return
  }
  if (password.value !== repassword.value) {
    alert('两次输入的密码不一致！')
    return
  }

  // 调用 Store 注册方法
  const result = menuStore.register(username.value, password.value)
  alert(result.msg)
  
  if (result.success) {
    // 注册成功跳转登录页
    router.push('/login')
    // 清空表单
    username.value = ''
    password.value = ''
    repassword.value = ''
  }
}

// 跳转到登录页
const toLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* 样式保持不变 */
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 20px;
  background-color: #f5f5f5;
}
.register-card {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}
.register-title {
  text-align: center;
  font-size: 22px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}
.register-form {
  margin-bottom: 25px;
}
.form-item {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
.form-input {
  padding: 14px 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
}
.form-input:focus {
  border-color: #4e5af1;
  box-shadow: 0 0 0 3px rgba(78, 90, 241, 0.1);
}
.submit-btn {
  width: 100%;
  padding: 14px 0;
  background-color: #4e5af1;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.submit-btn:hover {
  background-color: #3d49e0;
  transform: translateY(-2px);
}
.login-link {
  text-align: center;
  color: #999;
  font-size: 14px;
}
.link-text {
  color: #4e5af1;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s ease;
}
.link-text:hover {
  color: #3d49e0;
  text-decoration: underline;
}
</style>