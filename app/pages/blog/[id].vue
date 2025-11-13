<template>
  <div class="blog-container">
    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- 文章内容 -->
        <article class="post-detail card" v-if="post">
          <header class="post-header">
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-meta">
              <span class="post-date">{{ post.date }}</span>
              <span class="post-category" v-if="post.category">{{ post.category }}</span>
              <span class="post-author">作者: {{ post.author }}</span>
            </div>
          </header>
          
          <div class="post-content" v-html="post.content"></div>
          
          <footer class="post-footer">
            <div class="post-tags" v-if="post.tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            
            <div class="post-nav">
              <NuxtLink v-if="prevPost" :to="`/blog/${prevPost.id}`" class="post-nav-prev">
                « {{ prevPost.title }}
              </NuxtLink>
              <NuxtLink v-if="nextPost" :to="`/blog/${nextPost.id}`" class="post-nav-next">
                {{ nextPost.title }} »
              </NuxtLink>
            </div>
          </footer>
        </article>
        
        <div v-else class="not-found">
          <h2>文章未找到</h2>
          <p>抱歉，您访问的文章不存在。</p>
          <NuxtLink to="/" class="back-link">返回博客首页</NuxtLink>
        </div>
        
        <!-- 评论区域 -->
        <div class="card comments">
          <h3 class="comments-title">评论</h3>
          <div class="comments-content">
            <p>评论系统正在建设中...</p>
          </div>
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
          <h3 class="widget-title">最新文章</h3>
          <div class="widget-content">
            <ul class="recent-posts">
              <li v-for="recent in recentPosts" :key="recent.id" class="recent-post-item">
                <NuxtLink :to="`/blog/${recent.id}`" class="recent-post-link">{{ recent.title }}</NuxtLink>
                <span class="recent-post-date">{{ recent.date }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="card widget">
          <h3 class="widget-title">标签</h3>
          <div class="widget-content">
            <div class="tag-cloud">
              <NuxtLink v-for="tag in tags" :key="tag.name" to="#" class="tag-cloud-item" :style="{ fontSize: tag.size + 'px' }">
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
import { useRoute } from '#app'

interface Post {
  id: number
  title: string
  date: string
  author: string
  content: string
  category?: string
  tags?: string[]
  excerpt: string
}

const route = useRoute()
const postId = route.params.id

// 模拟文章数据
const posts: Post[] = [
  {
    id: 1,
    title: "Nuxt 3 从入门到精通",
    date: "2025-09-20",
    author: "博主",
    content: `
      <p>Nuxt 3 是一个基于 Vue 3 构建的通用框架，它极大地简化了 Vue 应用的开发过程。本文将带你深入了解 Nuxt 3 的核心概念和高级特性。</p>
      
      <h2>什么是 Nuxt 3？</h2>
      <p>Nuxt 3 是一个开源框架，旨在为 Vue.js 应用提供更高级别的抽象和组织。它基于 Vue 3 和 Vite 构建，具有以下特性：</p>
      <ul>
        <li>基于文件系统的路由系统</li>
        <li>服务端渲染 (SSR) 和静态站点生成 (SSG)</li>
        <li>自动代码分割</li>
        <li>强大的开发工具</li>
      </ul>
      
      <h2>安装和设置</h2>
      <p>要开始使用 Nuxt 3，你需要确保系统中安装了 Node.js。然后可以使用以下命令创建一个新的 Nuxt 3 项目：</p>
      <pre><code># 使用 nuxi CLI 创建新项目
npx nuxi@latest init my-nuxt-app

# 进入项目目录
cd my-nuxt-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
      </code></pre>
      
      <h2>核心概念</h2>
      <p>Nuxt 3 有几个核心概念需要了解：</p>
      
      <h3>1. 页面和路由</h3>
      <p>Nuxt 3 使用基于文件系统的路由。在 <code>pages</code> 目录中创建的每个 .vue 文件都会自动成为应用的一个路由。</p>
      
      <h3>2. 组件</h3>
      <p>在 <code>components</code> 目录中创建的组件会自动导入，无需手动导入。</p>
      
      <h3>3. Composables</h3>
      <p>在 <code>composables</code> 目录中创建的可组合函数可以用于在组件之间共享状态和逻辑。</p>
    `,
    category: "技术",
    tags: ["Nuxt", "Vue", "前端"],
    excerpt: "Nuxt 3 是一个基于 Vue 3 构建的通用框架，它极大地简化了 Vue 应用的开发过程。本文将带你深入了解 Nuxt 3 的核心概念和高级特性。"
  },
  {
    id: 2,
    title: "响应式设计的最新趋势",
    date: "2025-09-15",
    author: "博主",
    content: `
      <p>随着移动设备的普及，响应式设计已成为现代 Web 开发的必备技能。本文将介绍最新的响应式设计趋势和技术。</p>
      
      <h2>响应式设计的重要性</h2>
      <p>在移动设备使用率持续增长的今天，响应式设计对于网站的成功至关重要。它不仅影响用户体验，还对 SEO 产生重要影响。</p>
      
      <h2>最新的响应式设计技术</h2>
      <p>以下是一些最新的响应式设计技术：</p>
      
      <h3>1. 移动优先的设计方法</h3>
      <p>移动优先的设计方法已经成为行业标准。从最小的屏幕开始设计，然后逐步增强到更大的屏幕。</p>
      
      <h3>2. CSS Grid 和 Flexbox</h3>
      <p>CSS Grid 和 Flexbox 为响应式设计提供了强大的布局工具，使创建复杂的响应式布局变得更加容易。</p>
      
      <h3>3. 容器查询</h3>
      <p>容器查询是 CSS 的新特性，允许元素根据其容器的大小而不是视口大小进行样式调整。</p>
    `,
    category: "设计",
    tags: ["CSS", "响应式", "设计"],
    excerpt: "随着移动设备的普及，响应式设计已成为现代 Web 开发的必备技能。本文将介绍最新的响应式设计趋势和技术。"
  },
  {
    id: 3,
    title: "边缘计算在现代 Web 应用中的应用",
    date: "2025-09-10",
    author: "博主",
    content: `
      <p>边缘计算正在改变我们构建和部署 Web 应用的方式。本文将探讨边缘计算如何提升应用性能和用户体验。</p>
      
      <h2>什么是边缘计算？</h2>
      <p>边缘计算是一种分布式计算范式，它将计算和数据存储靠近数据源，以减少延迟并提高性能。</p>
      
      <h2>边缘计算的优势</h2>
      <ul>
        <li>降低延迟</li>
        <li>提高性能</li>
        <li>减少带宽使用</li>
        <li>增强数据安全性</li>
      </ul>
      
      <h2>在 Web 应用中的实际应用</h2>
      <p>边缘计算在现代 Web 应用中有多种应用场景，包括：</p>
      <ol>
        <li>内容分发网络 (CDN)</li>
        <li>边缘函数</li>
        <li>边缘数据库</li>
        <li>实时数据处理</li>
      </ol>
    `,
    category: "技术",
    tags: ["边缘计算", "性能", "Cloudflare"],
    excerpt: "边缘计算正在改变我们构建和部署 Web 应用的方式。本文将探讨边缘计算如何提升应用性能和用户体验。"
  }
]

// 查找当前文章
const post = posts.find(p => p.id === parseInt(postId as string))

// 查找上一篇和下一篇文章
const currentIndex = posts.findIndex(p => p.id === post?.id)
const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

// 最新文章数据
const recentPosts = posts.slice(0, 5)

// 标签数据
const tags = [
  { name: "Vue", size: 16 },
  { name: "Nuxt", size: 20 },
  { name: "CSS", size: 14 },
  { name: "JavaScript", size: 18 },
  { name: "响应式", size: 15 },
  { name: "边缘计算", size: 16 }
]

// 添加SEO设置
useHead({
  title: computed(() => post ? `${post.title} - 我的博客` : '文章未找到 - 我的博客'),
  meta: [
    { name: 'description', content: computed(() => post ? post.excerpt : '文章未找到') },
    { name: 'keywords', content: computed(() => post && post.tags ? post.tags.join(', ') : '') },
    { property: 'og:title', content: computed(() => post ? post.title : '文章未找到') },
    { property: 'og:description', content: computed(() => post ? post.excerpt : '文章未找到') },
    { property: 'og:type', content: 'article' },
  ]
})
</script>

<style scoped>
.blog-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

.not-found {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #667eea;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.post-detail {
  padding: 0;
}

.post-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.post-title {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #333;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.post-category {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.post-content {
  padding: 1.5rem;
}

.post-content h2 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.post-content h3 {
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
  color: #444;
}

.post-content p {
  margin-bottom: 1rem;
}

.post-content ul,
.post-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.post-content li {
  margin-bottom: 0.5rem;
}

.post-content pre {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.post-content code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.post-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.post-nav {
  display: flex;
  justify-content: space-between;
}

.post-nav-prev,
.post-nav-next {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
}

.post-nav-prev:hover,
.post-nav-next:hover {
  color: #764ba2;
}

.comments {
  margin-top: 1.5rem;
  padding: 1.5rem;
}

.comments-title {
  margin-top: 0;
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

.recent-posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-post-item {
  padding: 0.5rem 0;
  border-bottom: 1px dashed #eee;
  display: flex;
  flex-direction: column;
}

.recent-post-link {
  color: #667eea;
  text-decoration: none;
  margin-bottom: 0.25rem;
  transition: color 0.3s;
}

.recent-post-link:hover {
  color: #764ba2;
}

.recent-post-date {
  font-size: 0.8rem;
  color: #999;
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
  
  .post-title {
    font-size: 1.5rem;
  }
  
  .post-nav {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>