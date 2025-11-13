<template>
    <div class="home">
        <h1>欢迎来到我的网站</h1>
        <p>这是一个使用 Nuxt.js 构建的简单网站。</p>
        <div class="links">
            <NuxtLink to="/blog" class="link">查看我的博客</NuxtLink>
            <NuxtLink to="/about" class="link">关于我们</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: '首页',
  meta: [
    { name: 'description', content: '欢迎来到我的网站' }
  ]
})
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.links {
  margin-top: 2rem;
}

.link {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.link:hover {
  background-color: #0056b3;
}
</style>