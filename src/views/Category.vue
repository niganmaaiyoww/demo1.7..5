<template>
  <div class="category-page">
    <!-- 顶部卡片 -->
    <div class="top-card">
      <h2 class="page-title">📚 菜谱分类</h2>
      <p class="page-desc">按菜系筛选，找到你喜欢的味道</p>
    </div>

    <!-- 分类内容容器 -->
    <div class="content-container">
      <!-- 左侧分类列表 -->
      <div class="cate-left">
        <div 
          class="cate-item" 
          v-for="cate in categoryList" 
          :key="cate.id" 
          @click="selectCate(cate)"
          :class="{ active: activeCate.id === cate.id }"
        >
          {{ cate.name }}
        </div>
      </div>

      <!-- 右侧菜谱列表 -->
      <div class="cate-right">
        <div class="menu-card" v-if="activeCate.children">
          <h3 class="cate-subtitle">{{ activeCate.children[0].name }}</h3>
          
          <!-- 新增：分类内搜索组件 -->
          <Search 
            :all-menu-list="activeCate.children[0].menuList" 
            @search-result="handleCateSearch"
          />

          <div class="menu-list">
            <div 
              class="menu-item" 
              v-for="menu in showCateMenu" 
              :key="menu.id" 
              @click="toDetail(menu.id)"
            >
              <div class="menu-item-img">
                <img :src="menu.img" alt="" />
              </div>
              <div class="menu-item-info">
                <p class="menu-item-name">
                  <span v-html="highlightCateKeyword(menu.name)"></span>
                </p>
                <p class="menu-item-price">¥{{ menu.price.toFixed(2) }}</p>
              </div>
            </div>
            <!-- 分类内无搜索结果提示 -->
            <div class="cate-empty-tip" v-if="showCateMenu.length === 0">
              🥺 本分类下未找到相关菜品~
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
// 导入搜索组件
import Search from '../components/Search.vue'

const router = useRouter()
const categoryList = ref([])
const activeCate = ref({})
// 分类下显示的菜品（搜索结果/原列表）
const showCateMenu = ref([])
// 分类内搜索关键词
const cateKeyword = ref('')

// 获取分类数据
const getCategory = async () => {
  const res = await axios.get('/api/category')
  categoryList.value = res.data.data
  activeCate.value = categoryList.value[0] || {}
}

// 选择分类
const selectCate = (cate) => {
  activeCate.value = cate
}

// 处理分类内搜索结果
const handleCateSearch = (result) => {
  showCateMenu.value = result
  cateKeyword.value = result.length > 0 ? '' : cateKeyword.value
}

// 高亮分类内搜索关键词
const highlightCateKeyword = (name) => {
  if (!cateKeyword.value.trim()) return name
  const reg = new RegExp(cateKeyword.value.trim(), 'gi')
  return name.replace(reg, (match) => `<span class="cate-highlight">${match}</span>`)
}

// 跳转到详情页
const toDetail = (id) => {
  router.push(`/menu-detail/${id}`)
}

// 监听活跃分类变化，更新菜品列表
watch(
  () => activeCate.value,
  (newCate) => {
    if (newCate.children) {
      showCateMenu.value = newCate.children[0].menuList
    }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  getCategory()
})
</script>

<style scoped>
/* 原有样式保持不变 */

/* 新增：分类内关键词高亮 */
.cate-highlight {
  color: #ff4400;
  font-weight: 600;
}

/* 新增：分类内无结果提示 */
.cate-empty-tip {
  width: 100%;
  padding: 30px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>

<style scoped>
/* 页面整体样式 */
.category-page {
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

/* 内容容器 */
.content-container {
  display: flex;
  gap: 18px;
  height: calc(100vh - 200px);
}

/* 左侧分类 */
.cate-left {
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  padding: 10px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

.cate-item {
  padding: 16px 20px;
  font-size: 15px;
  color: #333;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.cate-item.active {
  background-color: #fff8f5;
  color: #ff4400;
  border-left-color: #ff4400;
  font-weight: 600;
}

.cate-item:hover:not(.active) {
  background-color: #fafafa;
  color: #666;
}

/* 右侧菜谱 */
.cate-right {
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

.cate-subtitle {
  font-size: 16px;
  color: #333;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

/* 菜谱列表 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 10px;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #fff8f5;
  transform: translateX(5px);
}

.menu-item-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
}

.menu-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-item-info {
  flex: 1;
}

.menu-item-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
}

.menu-item-price {
  font-size: 14px;
  color: #ff4400;
  font-weight: 600;
}
</style>