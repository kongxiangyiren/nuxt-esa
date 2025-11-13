<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <h1 class="site-title">我的博客</h1>
        <nav class="nav-menu">
          <NuxtLink to="/" class="nav-item" :class="{ active: isActive('/') }">首页</NuxtLink>
          <NuxtLink to="/upload" class="nav-item" :class="{ active: isActive('/upload') }">
            上传
          </NuxtLink>

          <NuxtLink to="/about" class="nav-item" :class="{ active: isActive('/about') }">
            关于
          </NuxtLink>
          <a href="/swagger" class="nav-item">swagger</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 我的博客. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from '#app';

  // 设置默认SEO信息
  useHead({
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' }
    ]
  });

  const route = useRoute();

  // 检查当前路由是否激活
  const isActive = (path: string) => {
    // 对于首页，需要精确匹配
    if (path === '/') {
      return route.path === '/';
    }
    // 对于其他路径，检查是否以该路径开头
    return route.path.startsWith(path);
  };
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }

  .site-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .nav-menu {
    display: flex;
    gap: 1.5rem;
  }

  .nav-item {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }

  .nav-item:hover,
  .nav-item.active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .main-content {
    flex: 1;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
    width: 100%;
  }

  .footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1.5rem 0;
    margin-top: 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-menu {
      gap: 0.5rem;
    }

    .main-content {
      margin: 1rem auto;
      padding: 0 1rem;
    }
  }
</style>
