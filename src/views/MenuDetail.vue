<template>
  <div class="detail-page">
    <button class="back-btn" @click="goBack">← 返回</button>

    <div class="img-card">
      <img :src="menuInfo.imgs ? menuInfo.imgs[0] : menuInfo.img" alt="" class="detail-img" />
    </div>

    <div class="info-card">
      <h2 class="menu-title">{{ menuInfo.name }}</h2>
      <div class="basic-info">
        <span class="price-tag">¥{{ menuInfo.price ? menuInfo.price.toFixed(2) : '0.00' }}</span>
        <span class="stock-tag">库存：{{ menuInfo.stock }} 份</span>
      </div>
      <div class="desc-box">
        <h3 class="desc-title">📝 菜谱描述</h3>
        <p class="desc-content">{{ menuInfo.desc || '暂无详细描述，敬请期待~' }}</p>
      </div>
      <div class="btn-group">
        <!-- 未登录时禁用按钮 -->
        <button 
          class="collect-btn" 
          @click="addCollect"
          :disabled="!menuStore.isLogin"
          :class="{ disabled: !menuStore.isLogin }"
        >
          ⭐ 加入收藏
        </button>
        <button 
          class="to-collect-btn" 
          @click="toCollectPage"
          :disabled="!menuStore.isLogin"
          :class="{ disabled: !menuStore.isLogin }"
        >
          🔍 查看收藏
        </button>
      </div>
      <!-- 未登录提示 -->
      <p class="login-tip" v-if="!menuStore.isLogin">
        * 登录/注册后即可使用收藏功能
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from '../store'

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const menuInfo = ref({})

const getMenuDetail = async () => {
  const menuId = route.params.id
  const res = await axios.get(`/api/menu-detail/${menuId}`)
  menuInfo.value = res.data.data
}

const goBack = () => {
  router.go(-1)
}

const addCollect = () => {
  menuStore.addCollect({ 
    ...menuInfo.value, 
    img: menuInfo.value.imgs ? menuInfo.value.imgs[0] : menuInfo.value.img 
  })
  alert('收藏成功！')
}

const toCollectPage = () => {
  router.push('/collect')
}

onMounted(() => {
  getMenuDetail()
})
</script>

<style scoped>
/* 原有样式保持不变 */

/* 新增：禁用按钮样式 */
.collect-btn.disabled, .to-collect-btn.disabled {
  background-color: #ccc !important;
  cursor: not-allowed;
  transform: none !important;
}

/* 新增：登录提示样式 */
.login-tip {
  margin-top: 15px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>

<style scoped>
/* 页面整体样式 */
.detail-page {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
  position: relative;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 10;
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.back-btn:hover {
  background-color: #fff;
  color: #ff4400;
}

/* 图片卡片 */
.img-card {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.detail-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

/* 信息卡片 */
.info-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.menu-title {
  font-size: 22px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
}

.basic-info {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.price-tag {
  font-size: 18px;
  color: #ff4400;
  font-weight: 600;
  background-color: #fff8f5;
  padding: 6px 15px;
  border-radius: 20px;
}

.stock-tag {
  font-size: 14px;
  color: #666;
  background-color: #f5f5f5;
  padding: 6px 15px;
  border-radius: 20px;
  align-self: center;
}

.desc-box {
  margin-bottom: 30px;
}

.desc-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.desc-content {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  padding: 15px;
  background-color: #fafafa;
  border-radius: 8px;
}

/* 按钮组 */
.btn-group {
  display: flex;
  gap: 15px;
}

.collect-btn, .to-collect-btn {
  flex: 1;
  padding: 14px 0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.collect-btn {
  background-color: #ff4400;
  color: #fff;
}

.collect-btn:hover {
  background-color: #e03c00;
  transform: translateY(-2px);
}

.to-collect-btn {
  background-color: #333;
  color: #fff;
}

.to-collect-btn:hover {
  background-color: #111;
  transform: translateY(-2px);
}
/* 新增：禁用按钮样式 */
.collect-btn.disabled, .to-collect-btn.disabled {
  background-color: #ccc !important;
  cursor: not-allowed;
  transform: none !important;
}

/* 新增：登录提示样式 */
.login-tip {
  margin-top: 15px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>