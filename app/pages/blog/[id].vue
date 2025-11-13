<template>
  <div class="blog-post">
    <NuxtLink to="/blog" class="back-link">&larr; 返回博客列表</NuxtLink>
    <article v-if="post" class="post">
      <header class="post-header">
        <h1>{{ post.title }}</h1>
        <p class="post-meta">作者: {{ post.author }} | 发布时间: {{ formatDate(post.date) }}</p>
      </header>
      <div class="post-content">
        {{ post.content }}
      </div>
    </article>
    <div v-else class="post-not-found">
      <h2>文章未找到</h2>
      <p>抱歉，您访问的文章不存在。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  interface Post {
    id: number;
    title: string;
    author: string;
    date: Date;
    excerpt: string;
    content: string;
  }

  // 模拟博客文章数据
  const posts: Post[] = [
    {
      id: 1,
      title: '欢迎来到我的博客',
      author: '作者名',
      date: new Date('2025-11-10'),
      excerpt: '这是我的第一篇博客文章，欢迎阅读！',
      content:
        '这是我的第一篇博客文章的完整内容。我会在这里分享我的想法和经验。在这里可以写很多关于技术、生活、工作等方面的内容。博客是一个记录和分享的好地方，可以记录自己的成长历程，也可以帮助到其他有需要的人。欢迎访问我的博客，希望你能在这里找到有价值的内容。'
    },
    {
      id: 2,
      title: '如何创建一个简单的博客',
      author: '作者名',
      date: new Date('2025-11-09'),
      excerpt: '在这篇文章中，我将介绍如何创建一个简单的博客系统',
      content:
        '创建一个博客系统并不复杂。在这篇文章中，我将详细介绍如何使用现代前端技术构建一个功能齐全的博客。首先，我们需要选择合适的技术栈。在这个例子中，我们使用了Nuxt.js作为主要框架，它提供了服务端渲染和静态站点生成等功能。接下来，我们需要设计数据结构，确定如何存储和展示博客文章。对于简单的博客，可以直接使用静态数据，而对于更复杂的博客，可能需要连接数据库。然后，我们需要创建页面组件，包括博客列表页面和文章详情页面。在列表页面，我们展示所有文章的标题和摘要；在详情页面，我们展示文章的完整内容。最后，我们可以添加一些额外的功能，比如分页、标签、搜索等，来提升用户体验。'
    }
  ];

  const postId = parseInt(route.params.id as string);
  const post = posts.find(p => p.id === postId);

  function formatDate(date: Date): string {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (post) {
    useHead({
      title: post.title,
      meta: [{ name: 'description', content: post.excerpt }]
    });
  } else {
    useHead({
      title: '文章未找到',
      meta: [{ name: 'description', content: '请求的文章未找到' }]
    });
  }
</script>

<style scoped>
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    text-decoration: none;
    color: #007bff;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .post {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }

  .post-header h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .post-meta {
    color: #666;
    font-size: 0.9rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }

  .post-content {
    line-height: 1.6;
    color: #444;
  }

  .post-not-found {
    text-align: center;
    padding: 3rem;
    color: #666;
  }
</style>
