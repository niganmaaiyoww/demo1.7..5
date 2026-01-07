<template>
  <div class="search-container">
    <div class="search-box">
      <input 
        type="text" 
        v-model="searchText" 
        placeholder="请输入菜品名称搜索..." 
        class="search-input"
        @input="handleSearch"
      >
      <button class="search-btn" @click="handleSearch">🔍</button>
    </div>
    <!-- 清空按钮 -->
    <button 
      class="clear-btn" 
      v-if="searchText" 
      @click="clearSearch"
    >
      清空
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义 props
const props = defineProps({
  // 所有菜品列表
  allMenuList: {
    type: Array,
    required: true
  }
})

// 定义 emit（使用 kebab-case 事件名，匹配父组件里的 @search-result）
const emit = defineEmits(['search-result'])

// 搜索文本
const searchText = ref('')

// 处理搜索
const handleSearch = () => {
  if (!searchText.value.trim()) {
    // 搜索框为空，返回所有菜品
    emit('search-result', props.allMenuList)
    return
  }
  // 模糊搜索，不区分大小写
  const keyword = searchText.value.toLowerCase().trim()
  const result = props.allMenuList.filter(menu => 
    (menu.name || '').toLowerCase().includes(keyword)
  )
  emit('search-result', result)
}

// 清空搜索
const clearSearch = () => {
  searchText.value = ''
  emit('search-result', props.allMenuList)
}

// 监听外部传入的菜品列表变化，自动刷新搜索
watch(
  () => props.allMenuList,
  () => {
    handleSearch()
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #ff4400;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(255, 68, 0, 0.1);
  outline: none;
}

.search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 16px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.search-btn:hover {
  color: #ff4400;
}

.clear-btn {
  padding: 8px 15px;
  border: 1px solid #ff4400;
  background-color: #fff;
  color: #ff4400;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background-color: #ff4400;
  color: #fff;
}
</style>