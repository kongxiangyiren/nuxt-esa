<template>
    <div class="about">
        <h1>关于我们</h1>
        <p>这是一个使用 Nuxt.js 构建的简单博客网站。</p>
        <p>你可以在这里分享你的想法、经验和知识。</p>
        <NuxtLink to="/">返回首页</NuxtLink>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于我们',
  meta: [
    { name: 'description', content: '关于这个博客网站的信息' }
  ]
})
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.about h1 {
  color: #333;
}

.about p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>