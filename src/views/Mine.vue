<template>
  <div class="mine-page">
    <!-- 顶部信息卡片 -->
    <div class="user-card">
      <div class="avatar-box">
        <div class="avatar" :style="{ backgroundColor: avatarBg }">
          {{ menuStore.userInfo ? menuStore.userInfo.username.slice(0, 1) : '未' }}
        </div>
      </div>
      <div class="user-status" v-if="menuStore.isLogin">
        <h3 class="username">{{ menuStore.userInfo.username }}</h3>
        <p class="tip">已登录 · 可查看收藏菜谱</p>
      </div>
      <div class="user-status" v-else>
        <h3 class="username">游客未登录</h3>
        <p class="tip">登录后可使用收藏功能</p>
      </div>
    </div>

    <!-- 功能按钮区 -->
    <div class="btn-group">
      <button 
        class="action-btn login-btn" 
        @click="toLogin"
        v-if="!menuStore.isLogin"
      >
        <span class="icon">🔑</span> 立即登录
      </button>
      <button 
        class="action-btn register-btn" 
        @click="toRegister"
        v-if="!menuStore.isLogin"
      >
        <span class="icon">✏️</span> 免费注册
      </button>
      <button 
        class="action-btn logout-btn" 
        @click="handleLogout"
        v-if="menuStore.isLogin"
      >
        <span class="icon">🚪</span> 退出登录
      </button>
    </div>

    <!-- 功能入口 -->
    <div class="func-list" v-if="menuStore.isLogin">
      <div class="func-item" @click="toCollect">
        <span class="func-icon">⭐</span>
        <span class="func-text">我的收藏</span>
        <span class="arrow">→</span>
      </div>
      <div class="func-item">
        <span class="func-icon">🔔</span>
        <span class="func-text">消息通知</span>
        <span class="arrow">→</span>
      </div>
      <div class="func-item">
        <span class="func-icon">⚙️</span>
        <span class="func-text">账号设置</span>
        <span class="arrow">→</span>
      </div>
    </div>

    <!-- 未登录提示 -->
    <div class="tips-box" v-if="!menuStore.isLogin">
      <p class="tips-text">登录后可同步收藏的菜谱数据</p>
    </div>
  </div>
</template>

<script setup>
// ✅ 修复：分开导入正确的依赖
import { computed } from 'vue' // computed 从 vue 导入
import { useRouter } from 'vue-router' // useRouter 从 vue-router 导入
import { useMenuStore } from '../store'

const menuStore = useMenuStore()
const router = useRouter()

// 随机头像背景色
const avatarBg = computed(() => {
  const colors = ['#ff7875', '#4e5af1', '#13c2c2', '#fa8c16', '#722ed1']
  return menuStore.isLogin ? colors[Math.floor(Math.random() * colors.length)] : '#ccc'
})

// 跳转登录
const toLogin = () => {
  router.push('/login')
}

// 跳转注册
const toRegister = () => {
  router.push('/register')
}

// 退出登录
const handleLogout = () => {
  menuStore.logout()
  alert('退出登录成功！')
}

// 跳转收藏页
const toCollect = () => {
  router.push('/collect')
}
</script>

<style scoped>
/* 页面整体样式 */
.mine-page {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

/* 用户信息卡片 */
.user-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.avatar-box {
  margin-bottom: 15px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  line-height: 80px;
  font-size: 32px;
  color: #fff;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.username {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.tip {
  font-size: 14px;
  color: #999;
}

/* 功能按钮组 */
.btn-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.action-btn {
  flex: 1;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.login-btn {
  background-color: #ff4400;
}

.register-btn {
  background-color: #4e5af1;
}

.logout-btn {
  background-color: #ff7875;
  width: 100%;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.icon {
  font-size: 18px;
}

/* 功能列表 */
.func-list {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.func-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.func-item:last-child {
  border-bottom: none;
}

.func-item:hover {
  background-color: #fafafa;
}

.func-icon {
  font-size: 20px;
  margin-right: 10px;
}

.func-text {
  flex: 1;
  text-align: left;
}

.arrow {
  color: #ccc;
  font-size: 14px;
}

/* 提示框 */
.tips-box {
  text-align: center;
  padding: 20px;
  background-color: #faf0f5;
  border-radius: 8px;
  color: #999;
  font-size: 14px;
}
</style>