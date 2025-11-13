<template>
  <div class="about-container">
    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <article class="about-card card">
          <h1 class="page-title">关于这个项目</h1>

          <div class="about-content">
            <div class="profile">
              <h2>项目介绍</h2>
              <p>
                这是一个基于 Nuxt 框架构建的示例项目，专为在 阿里云ESA边缘函数
                平台上部署而优化。该项目展示了如何使用现代前端技术构建高性能、可扩展的 Web 应用。
              </p>

              <h2>技术栈</h2>
              <ul class="skills-list">
                <li>Nuxt 3 (Vue 3)</li>
                <li>TypeScript</li>
                <li>阿里云ESA边缘函数 部署</li>
                <li>服务端渲染 (SSR)</li>
                <li>响应式设计</li>
              </ul>

              <h2>项目特点</h2>
              <div class="project">
                <h3>AI辅助开发</h3>
                <p>
                  本项目通过AI辅助完成开发，展示了如何利用人工智能技术提高开发效率。AI帮助生成了页面结构、样式设计以及部分功能实现。
                </p>
              </div>

              <div class="project">
                <h3>阿里云ESA边缘函数 部署优化</h3>
                <p>
                  项目针对 阿里云ESA边缘函数
                  平台进行了优化，充分利用边缘计算的优势，实现低延迟、高性能的用户体验。
                </p>
              </div>

              <h2>功能演示</h2>
              <ul class="features-list">
                <li>博客文章展示</li>
                <li>图片上传功能</li>
               
                <li>响应式布局设计</li>
              </ul>

              <h2>部署说明</h2>
              <p>
                该项目专为 阿里云ESA边缘函数 部署而设计，通过简单的配置即可实现自动化构建和部署。
              </p>
              <pre><code># 构建命令
npm run build -- --preset=./preset

# 本地预览
esa dev</code></pre>

              <h2>项目源码</h2>
              <p>项目源码托管在 Github 上，可以通过以下链接访问：</p>
              <p>
                <a
                  href="https://github.com/kongxiangyiren/nuxt-esa"
                  target="_blank"
                  class="project-link"
                >
                  https://github.com/kongxiangyiren/nuxt-esa
                </a>
              </p>

              <h2>联系信息</h2>
              <div class="contact-info">
                <p>这是一个示例项目，展示了AI辅助开发和阿里云ESA边缘函数部署的完整流程。</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="card widget">
          <h3 class="widget-title">项目信息</h3>
          <div class="widget-content">
            <p>AI辅助开发的Nuxt项目示例，专为阿里云ESA边缘函数平台优化部署。</p>
          </div>
        </div>

        <div class="card widget">
          <h3 class="widget-title">技术栈</h3>
          <div class="widget-content">
            <ul class="category-list">
              <li class="category-list-item">
                <span class="category-list-link">Nuxt 3</span>
              </li>
              <li class="category-list-item">
                <span class="category-list-link">Vue 3</span>
              </li>
              <li class="category-list-item">
                <span class="category-list-link">TypeScript</span>
              </li>
              <li class="category-list-item">
                <span class="category-list-link">阿里云ESA边缘函数</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="card widget">
          <h3 class="widget-title">功能模块</h3>
          <div class="widget-content">
            <div class="tag-cloud">
              <span class="tag-cloud-item">博客</span>
              <span class="tag-cloud-item">上传</span>
              <span class="tag-cloud-item">IP查询</span>
              <span class="tag-cloud-item">响应式</span>
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
  // 添加SEO设置
  useHead({
    title: '关于项目 - 我的博客',
    meta: [
      {
        name: 'description',
        content:
          '这是一个基于Nuxt框架构建的示例项目，专为在阿里云ESA边缘函数平台上部署而优化，通过AI辅助开发完成。'
      },
      { name: 'keywords', content: 'Nuxt, 阿里云ESA边缘函数, AI开发, SSR, TypeScript' },
      { property: 'og:title', content: '关于项目 - 我的博客' },
      {
        property: 'og:description',
        content:
          '这是一个基于Nuxt框架构建的示例项目，专为在阿里云ESA边缘函数平台上部署而优化，通过AI辅助开发完成。'
      },
      { property: 'og:type', content: 'website' }
    ]
  });

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
    { name: '边缘计算', size: 16 },
    { name: 'TypeScript', size: 17 },
    { name: '架构', size: 14 }
  ]);
</script>

<style scoped>
  .about-container {
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

  .page-title {
    margin-top: 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    color: #333;
  }

  .about-card {
    padding: 1.5rem;
  }

  .about-content {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .avatar-container {
    flex-shrink: 0;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #eee;
  }

  .profile {
    flex: 1;
  }

  .profile h2 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  .profile p {
    color: #666;
    margin-bottom: 1rem;
  }

  .features-list {
    padding-left: 1.5rem;
    color: #666;
  }

  .features-list li {
    margin-bottom: 0.5rem;
  }

  pre {
    background-color: #f8f8f8;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  .skills-list {
    padding-left: 1.5rem;
    color: #666;
  }

  .skills-list li {
    margin-bottom: 0.5rem;
  }

  .project {
    margin-bottom: 1.5rem;
  }

  .project h3 {
    margin-bottom: 0.5rem;
    color: #444;
  }

  .contact-info p {
    margin-bottom: 0.5rem;
  }

  .contact-info a {
    color: #667eea;
    text-decoration: none;
  }

  .contact-info a:hover {
    text-decoration: underline;
  }

  .project-link {
    color: #667eea;
    text-decoration: none;
    word-break: break-all;
  }

  .project-link:hover {
    text-decoration: underline;
  }

  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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

    .about-content {
      flex-direction: column;
      align-items: center;
    }

    .avatar {
      width: 100px;
      height: 100px;
    }
  }
</style>
