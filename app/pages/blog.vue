<template>
  <div class="blog">
    <h1>我的博客</h1>
    <div v-if="posts.length === 0" class="no-posts">
      <p>暂无博客文章</p>
    </div>
    <div v-else class="posts">
      <article v-for="post in posts" :key="post.id" class="post-preview">
        <h2>
          <NuxtLink :to="`/blog/${post.id}`">{{ post.title }}</NuxtLink>
        </h2>
        <p class="post-meta">
          作者: {{ post.author }} | 发布时间: {{ formatDate(post.date) }}
        </p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">


interface Post {
  id: number
  title: string
  author: string
  date: Date
  excerpt: string
  content: string
}

const posts: Post[] = [
  {
    id: 1,
    title: '欢迎来到我的博客',
    author: '作者名',
    date: new Date('2025-11-10'),
    excerpt: '这是我的第一篇博客文章，欢迎阅读！',
    content: '这是我的第一篇博客文章的完整内容。我会在这里分享我的想法和经验。'
  },
  {
    id: 2,
    title: '如何创建一个简单的博客',
    author: '作者名',
    date: new Date('2025-11-09'),
    excerpt: '在这篇文章中，我将介绍如何创建一个简单的博客系统',
    content: '创建一个博客系统并不复杂。在这篇文章中，我将详细介绍如何使用现代前端技术构建一个功能齐全的博客...'
  }
]

function formatDate(date: Date): string {
  return  date.toLocaleDateString(
    'zh-CN',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  )
}

useHead({
  title: '我的博客',
  meta: [
    { name: 'description', content: '欢迎来到我的博客，在这里我会分享我的想法和经验。' }
  ]
})
</script>

<style scoped>
.blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.posts {
  margin-top: 2rem;
}

.post-preview {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.post-preview h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.post-preview h2 a {
  text-decoration: none;
  color: #333;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>