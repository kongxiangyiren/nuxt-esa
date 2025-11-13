<template>
  <div class="blog-container">
    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- 博客文章列表 -->
        <section class="post-list">
          <article v-for="post in posts" :key="post.id" class="post-card card">
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">{{ post.date }}</span>
                <span class="post-category" v-if="post.category">{{ post.category }}</span>
              </div>
              <h2 class="post-title">
                <NuxtLink :to="`/blog/${post.id}`">{{ post.title }}</NuxtLink>
              </h2>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-tags" v-if="post.tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </article>
        </section>

        <!-- 分页 -->
        <div class="pagination">
          <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">
            下一页
          </button>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="card widget">
          <h3 class="widget-title">关于我</h3>
          <div class="widget-content">
            <p>欢迎来到我的博客，这里记录了我的技术学习和生活感悟。</p>
          </div>
        </div>

        <div class="card widget">
          <h3 class="widget-title">分类</h3>
          <div class="widget-content">
            <ul class="category-list">
              <li v-for="category in categories" :key="category.name" class="category-list-item">
                <NuxtLink to="#" class="category-list-link">{{ category.name }}</NuxtLink>
                <span class="category-list-count">{{ category.count }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="card widget">
          <h3 class="widget-title">标签</h3>
          <div class="widget-content">
            <div class="tag-cloud">
              <NuxtLink
                v-for="tag in tags"
                :key="tag.name"
                to="#"
                class="tag-cloud-item"
                :style="{ fontSize: tag.size + 'px' }"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  // 添加SEO设置
  useHead({
    title: '我的博客 - 首页',
    meta: [
      { name: 'description', content: '欢迎来到我的博客，这里记录了我的技术学习和生活感悟。' },
      { name: 'keywords', content: '博客, 技术, 生活, 前端开发, Nuxt' },
      { property: 'og:title', content: '我的博客 - 首页' },
      {
        property: 'og:description',
        content: '欢迎来到我的博客，这里记录了我的技术学习和生活感悟。'
      },
      { property: 'og:type', content: 'website' }
    ]
  });

  // 模拟博客文章数据
  const posts = ref([
    {
      id: 1,
      title: 'Nuxt 3 从入门到精通',
      date: '2025-09-20',
      excerpt:
        'Nuxt 3 是一个基于 Vue 3 构建的通用框架，它极大地简化了 Vue 应用的开发过程。本文将带你深入了解 Nuxt 3 的核心概念和高级特性。',
      category: '技术',
      tags: ['Nuxt', 'Vue', '前端']
    },
    {
      id: 2,
      title: '响应式设计的最新趋势',
      date: '2025-09-15',
      excerpt:
        '随着移动设备的普及，响应式设计已成为现代 Web 开发的必备技能。本文将介绍最新的响应式设计趋势和技术。',
      category: '设计',
      tags: ['CSS', '响应式', '设计']
    },
    {
      id: 3,
      title: '边缘计算在现代 Web 应用中的应用',
      date: '2025-09-10',
      excerpt:
        '边缘计算正在改变我们构建和部署 Web 应用的方式。本文将探讨边缘计算如何提升应用性能和用户体验。',
      category: '技术',
      tags: ['边缘计算', '性能', 'Cloudflare']
    }
  ]);

  // 分类数据
  const categories = ref([
    { name: '技术', count: 15 },
    { name: '设计', count: 8 },
    { name: '生活', count: 5 },
    { name: '随笔', count: 12 }
  ]);

  // 标签数据
  const tags = ref([
    { name: 'Vue', size: 16 },
    { name: 'Nuxt', size: 20 },
    { name: 'CSS', size: 14 },
    { name: 'JavaScript', size: 18 },
    { name: '响应式', size: 15 },
    { name: '边缘计算', size: 16 }
  ]);

  // 分页相关数据
  const currentPage = ref(1);
  const totalPages = ref(5);

  // 分页方法
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
</script>

<style scoped>
  .blog-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
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
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
    display: flex;
    gap: 2rem;
    flex: 1;
  }

  .container {
    flex: 1;
  }

  .post-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .post-category {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
  }

  .post-title {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }

  .post-title a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
  }

  .post-title a:hover {
    color: #667eea;
  }

  .post-excerpt {
    color: #666;
    margin: 0.75rem 0;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .tag {
    background-color: #f0f0f0;
    color: #666;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .page-btn {
    padding: 0.5rem 1rem;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .page-btn:hover:not(:disabled) {
    background-color: #5a6fd8;
  }

  .page-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .page-info {
    font-weight: 500;
  }

  .sidebar {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .widget {
    padding: 1.5rem;
  }

  .widget-title {
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
    color: #333;
  }

  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .category-list-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #eee;
  }

  .category-list-link {
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
  }

  .category-list-link:hover {
    color: #667eea;
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-cloud-item {
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s;
  }

  .tag-cloud-item:hover {
    color: #764ba2;
  }

  .footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1.5rem 0;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
    }

    .header-content {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-menu {
      gap: 0.5rem;
    }
  }
</style>
