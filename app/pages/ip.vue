<template>
  <div class="ip-container">
    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <div class="card ip-card">
          <h1 class="page-title">IP信息查询</h1>

          <div class="ip-content">
            <div class="query-section">
              <button @click="fetchIPInfo" :disabled="loading" class="query-btn">
                {{ loading ? '查询中...' : '查询IP信息' }}
              </button>
            </div>

            <div v-if="error" class="error-message">
              <p>{{ error }}</p>
            </div>

            <div v-if="ipInfo" class="result-section">
              <h2>您的IP信息</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">IP:</span>
                  <span class="info-value">{{ ipInfo.ip }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">ASN:</span>
                  <span class="info-value">{{ ipInfo.asn }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">国家:</span>
                  <span class="info-value">
                    <!-- {{ ipInfo.countryName }} -->
                    ({{ ipInfo.countryCodeAlpha2 }})
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">地区:</span>
                  <span class="info-value">
                    <!-- {{ ipInfo.regionName }} -->
                    ({{ ipInfo.regionCode }})
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">城市:</span>
                  <span class="info-value">{{ ipInfo.cityName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">纬度:</span>
                  <span class="info-value">{{ ipInfo.latitude }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">经度:</span>
                  <span class="info-value">{{ ipInfo.longitude }}</span>
                </div>
                <!-- <div class="info-item">
                  <span class="info-label">ISP:</span>
                  <span class="info-value">{{ ipInfo.cisp }}</span>
                </div> -->
              </div>

              <div v-if="ipInfo.latitude && ipInfo.longitude" class="map-section">
                <h3>地理位置</h3>
                <div class="map-placeholder">
                  <p>纬度: {{ ipInfo.latitude }}, 经度: {{ ipInfo.longitude }}</p>
                  <!-- 在实际应用中，可以集成地图服务如高德地图或百度地图 -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="card widget">
          <h3 class="widget-title">IP查询说明</h3>
          <div class="widget-content">
            <ul>
              <li>此功能显示您的IP地址相关信息</li>
              <li>信息来源于EdgeOne的地理位置服务</li>
              <li>包括ASN、国家、地区、城市等信息</li>
              <li>经纬度可用于地图定位</li>
            </ul>
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
    title: 'IP信息查询 - 我的博客',
    meta: [
      {
        name: 'description',
        content: 'IP信息查询功能页面，可以查看您的IP地址相关信息，包括地理位置、ISP等。'
      },
      { name: 'keywords', content: 'IP查询, IP地址, 地理位置, ISP' },
      { property: 'og:title', content: 'IP信息查询 - 我的博客' },
      {
        property: 'og:description',
        content: 'IP信息查询功能页面，可以查看您的IP地址相关信息，包括地理位置、ISP等。'
      },
      { property: 'og:type', content: 'website' }
    ]
  });

  interface IPInfo {
    ip: string;
    asn: string;
    // countryName: string;
    countryCodeAlpha2: string;
    // countryCodeNumeric: string;
    // regionName: string;
    regionCode: string;
    cityName: string;
    latitude: string;
    longitude: string;
    // cisp: string;
  }

  // 响应式数据
  const loading = ref(false);
  const ipInfo = ref<IPInfo | null>(null);
  const error = ref<string | null>(null);

  // 获取IP信息
  const fetchIPInfo = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response: any = await $fetch('/api/test');

      // 解析响应数据
      if (response) {
        // EdgeOne的eo-connecting-geo头信息是以JSON字符串形式返回的
        ipInfo.value = typeof response === 'string' ? JSON.parse(response) : response;
      } else {
        error.value = '未能获取到IP信息';
      }
    } catch (err: any) {
      console.error('获取IP信息失败:', err);
      error.value = err.message || '获取IP信息失败';
    } finally {
      loading.value = false;
    }
  };

  // 页面加载时自动获取IP信息
  onMounted(() => {
    fetchIPInfo();
  });
</script>

<style scoped>
  .ip-container {
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

  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .ip-card {
    padding: 1.5rem;
  }

  .query-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .query-btn {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .query-btn:hover:not(:disabled) {
    opacity: 0.9;
  }

  .query-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    border: 1px solid #f5c6cb;
  }

  .result-section h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #333;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .info-item {
    display: flex;
    padding: 0.75rem;
    background-color: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #eee;
  }

  .info-label {
    font-weight: 600;
    min-width: 80px;
    color: #495057;
  }

  .info-value {
    flex: 1;
    color: #212529;
  }

  .map-section h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #333;
  }

  .map-placeholder {
    height: 200px;
    background-color: #e9ecef;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #495057;
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

  .widget-content ul {
    padding-left: 1.5rem;
  }

  .widget-content li {
    margin-bottom: 0.5rem;
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

    .info-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
