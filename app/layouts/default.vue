<template>
  <div class="layout">
    <header class="header">
      <nav class="navbar">
        <NuxtLink to="/" class="nav-brand">我的博客</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">首页</NuxtLink>
          <NuxtLink to="/blog" class="nav-link">博客</NuxtLink>
          <NuxtLink to="/about" class="nav-link">关于</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="main">
      <slot></slot>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 我的博客. 保留所有权利.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s - 我的博客',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #333;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-brand {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #ddd;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: color 0.3s, background-color 0.3s;
}

.nav-link:hover,
.nav-link.nuxt-link-exact-active {
  color: white;
  background-color: #555;
}

.main {
  flex: 1;
  background-color: #f5f5f5;
}

.footer {
  background-color: #333;
  color: white;
  padding: 1rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
}

/* 全局样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
}
</style>