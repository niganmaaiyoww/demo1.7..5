<template>
  <div class="home-page">
    <!-- 顶部标题卡片 -->
    <div class="title-card">
      <h1 class="main-title">🍽️ 餐厅菜谱库</h1>
      <p class="sub-title">精选热门菜谱，解锁美味新姿势</p>
    </div>

    <!-- 热门推荐卡片 -->
    <div class="recommend-card">
      <!-- 新增：全局搜索组件 -->
      <Search 
        :all-menu-list="allMenuList" 
        @search-result="handleSearchResult"
      />

      <div class="section-header">
        <h2 class="section-title">🔥 热门推荐</h2>
        <span class="section-tag">{{ showMenuList.length }} 道美味</span>
      </div>
      <div class="menu-list">
        <div 
          class="menu-card" 
          v-for="menu in showMenuList" 
          :key="menu.id" 
          @click="toDetail(menu.id)"
        >
          <div class="menu-img-box">
            <img :src="menu.img" alt="" class="menu-img" />
            <div class="menu-mask">查看详情</div>
          </div>
          <div class="menu-info">
            <h3 class="menu-name">
              <!-- 高亮匹配关键词 -->
              <span v-html="highlightKeyword(menu.name)"></span>
            </h3>
            <p class="menu-price">¥{{ menu.price.toFixed(2) }}</p>
          </div>
        </div>
        <!-- 无搜索结果提示 -->
        <div class="empty-tip" v-if="showMenuList.length === 0">
          🥺 未找到相关菜品，请换个关键词试试~
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
// 导入搜索组件
import Search from '../components/Search.vue'

const router = useRouter()
// 所有菜品列表
const allMenuList = ref([])
// 显示的菜品列表（搜索结果/热门推荐）
const showMenuList = ref([])
// 搜索关键词
const searchKeyword = ref('')

// 获取所有菜品数据
const getRecommend = async () => {
  const res = await axios.get('/api/category')
  // 合并所有分类的菜品
  allMenuList.value = res.data.data.flatMap(cate => cate.children[0].menuList)
  // 初始显示8道热门菜品
  showMenuList.value = allMenuList.value.sort(() => 0.5 - Math.random()).slice(0, 8)
}

// 处理搜索结果
const handleSearchResult = (result) => {
  showMenuList.value = result
  // 记录当前搜索关键词
  searchKeyword.value = result.length > 0 ? '' : searchKeyword.value
}

// 高亮匹配的关键词
const highlightKeyword = (name) => {
  if (!searchKeyword.value.trim()) return name
  const reg = new RegExp(searchKeyword.value.trim(), 'gi')
  return name.replace(reg, (match) => `<span class="highlight">${match}</span>`)
}

// 跳转到详情页
const toDetail = (id) => {
  router.push(`/menu-detail/${id}`)
}

onMounted(() => {
  getRecommend()
})
</script>

<style scoped>
/* 原有样式保持不变 */

/* 新增：关键词高亮样式 */
.highlight {
  color: #ff4400;
  font-weight: 600;
}

/* 新增：无结果提示样式 */
.empty-tip {
  width: 100%;
  padding: 50px 0;
  text-align: center;
  font-size: 16px;
  color: #999;
}
</style>

<style scoped>
/* 页面整体样式 */
.home-page {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

/* 标题卡片 */
.title-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.main-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.sub-title {
  font-size: 14px;
  color: #999;
}

/* 推荐卡片 */
.recommend-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.section-tag {
  font-size: 12px;
  color: #ff4400;
  background-color: #fff8f5;
  padding: 4px 10px;
  border-radius: 12px;
}

/* 菜谱列表 */
.menu-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

/* 菜谱卡片 */
.menu-card {
  border-radius: 10px;
  overflow: hidden;
  background-color: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.menu-img-box {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
}

.menu-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.menu-card:hover .menu-img {
  transform: scale(1.08);
}

.menu-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-card:hover .menu-mask {
  opacity: 1;
}

/* 菜谱信息 */
.menu-info {
  padding: 12px 10px;
}

.menu-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-price {
  font-size: 14px;
  color: #ff4400;
  font-weight: 600;
}
</style>