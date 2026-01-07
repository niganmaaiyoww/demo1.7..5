<template>
  <div class="collect-page">
    <div class="top-card">
      <h2 class="page-title">⭐ 我的收藏</h2>
      <p class="page-desc">你收藏的美味菜谱都在这里</p>
    </div>

    <!-- 已登录且有收藏 -->
    <div class="collect-card" v-if="menuStore.isLogin && menuStore.collectList.length">
      <div class="collect-list">
        <div class="collect-item" v-for="menu in menuStore.collectList" :key="menu.id">
          <div class="item-left">
            <div class="item-img">
              <img :src="menu.img" alt="" />
            </div>
            <div class="item-info">
              <h3 class="item-name">{{ menu.name }}</h3>
              <p class="item-price">¥{{ menu.price.toFixed(2) }}</p>
            </div>
          </div>
          <div class="item-middle">
            <div class="stepper">
              <button class="stepper-btn" @click="changeCount(menu.id, 'minus')" :disabled="menu.count <= 1">-</button>
              <span class="stepper-value">{{ menu.count }}</span>
              <button class="stepper-btn" @click="changeCount(menu.id, 'add')">+</button>
            </div>
          </div>
          <div class="item-right">
            <button class="delete-btn" @click="removeCollect(menu.id)">🗑️ 删除</button>
          </div>
        </div>
      </div>
      <div class="total-box">
        <p class="total-text">共 {{ menuStore.collectTotal.count }} 份 · 总价：</p>
        <p class="total-price">¥{{ menuStore.collectTotal.price.toFixed(2) }}</p>
      </div>
    </div>

    <!-- 已登录但无收藏 -->
    <div class="empty-card" v-if="menuStore.isLogin && !menuStore.collectList.length">
      <div class="empty-icon">📭</div>
      <h3 class="empty-title">暂无收藏菜谱</h3>
      <p class="empty-desc">快去详情页收藏你喜欢的菜谱吧</p>
      <button class="go-detail-btn" @click="toHome">返回首页</button>
    </div>

    <!-- 未登录提示（路由守卫已拦截，这里做兜底） -->
    <div class="empty-card" v-if="!menuStore.isLogin">
      <div class="empty-icon">🔒</div>
      <h3 class="empty-title">请先登录/注册</h3>
      <p class="empty-desc">登录后即可查看和管理你的收藏</p>
      <div class="btn-group">
        <button class="go-login-btn" @click="toLogin">立即登录</button>
        <button class="go-register-btn" @click="toRegister">免费注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '../store'
import { useRouter } from 'vue-router'

const menuStore = useMenuStore()
const router = useRouter()

const removeCollect = (id) => {
  menuStore.removeCollect(id)
  alert('删除成功！')
}

const changeCount = (id, type) => {
  const menu = menuStore.collectList.find(item => item.id === id)
  if (menu) {
    type === 'add' ? menu.count++ : (menu.count = menu.count > 1 ? menu.count - 1 : 1)
  }
}

const toHome = () => {
  router.push('/home')
}

const toLogin = () => {
  router.push('/login')
}

const toRegister = () => {
  router.push('/register')
}
</script>
<style scoped>
/* 页面整体样式 */
.collect-page {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

/* 顶部卡片 */
.top-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #999;
}

/* 收藏卡片 */
.collect-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

/* 收藏列表 */
.collect-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.collect-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.collect-item:hover {
  background-color: #fff8f5;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
}

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  font-size: 15px;
  color: #333;
}

.item-price {
  font-size: 14px;
  color: #ff4400;
  font-weight: 600;
}

/* 步进器 */
.stepper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stepper-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f5f5f5;
  color: #333;
  font-size: 16px;
  transition: all 0.2s ease;
}

.stepper-btn:hover:not(:disabled) {
  background-color: #ff4400;
  color: #fff;
}

.stepper-btn:disabled {
  background-color: #eee;
  color: #999;
  cursor: not-allowed;
}

.stepper-value {
  font-size: 15px;
  color: #333;
  font-weight: 600;
}

/* 删除按钮 */
.delete-btn {
  padding: 8px 12px;
  background-color: #fff8f5;
  color: #ff4400;
  border-radius: 8px;
  font-size: 12px;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background-color: #ff4400;
  color: #fff;
}

/* 总计信息 */
.total-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.total-text {
  font-size: 14px;
  color: #666;
}

.total-price {
  font-size: 18px;
  color: #ff4400;
  font-weight: 600;
}

/* 空收藏卡片 */
.empty-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 50px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.empty-desc {
  font-size: 14px;
  color: #999;
  margin-bottom: 30px;
}

.go-detail-btn {
  padding: 12px 30px;
  background-color: #ff4400;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.go-detail-btn:hover {
  background-color: #e03c00;
  transform: translateY(-2px);
}
/* 新增：登录/注册按钮组样式 */
.btn-group {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.go-login-btn {
  background-color: #ff4400;
  color: #fff;
}

.go-register-btn {
  background-color: #4e5af1;
  color: #fff;
}

.go-login-btn, .go-register-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.go-login-btn:hover, .go-register-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>