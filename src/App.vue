<template>
  <div class="app-container container">
    <router-view />

    <div class="nav-footer card">
      <router-link to="/home" class="nav-item" active-class="active">🏠 首页</router-link>
      <router-link to="/category" class="nav-item" active-class="active">📚 分类</router-link>
      <router-link to="/collect" class="nav-item" active-class="active">⭐ 收藏</router-link>
      <router-link to="/mine" class="nav-item" active-class="active">👤 我的</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container { min-height: 100vh; padding-bottom: 96px; box-sizing: border-box; }

.nav-footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
  height: 64px;
  display: flex;
  gap: 18px;
  align-items: center;
  border-radius: 40px;
  padding: 10px 22px;
  background: linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.9));
  box-shadow: 0 20px 50px rgba(16,24,40,0.12);
  z-index: 100;
  min-width: 460px;
  justify-content: space-around;
}

/* 链接样式 */
.nav-item {
  color: #6b7280;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 600;
}
.nav-item.active {
  color: #fff;
  background: linear-gradient(90deg,#6C5CE7,#4ECDC4);
  box-shadow: 0 10px 26px rgba(108,92,231,0.12);
  transform: translateY(-2px);
}
@media (max-width:600px){
  .nav-footer{ min-width: calc(100% - 40px); left: 20px; transform: none; right:20px; }
}
a { color: inherit; text-decoration: none; }
</style>