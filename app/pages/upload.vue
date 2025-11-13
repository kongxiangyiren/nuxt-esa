<template>
  <div class="upload-container">
    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <div class="card upload-card">
          <h1 class="page-title">图片上传</h1>

          <form @submit.prevent="submitForm" class="upload-form">
            <div class="form-group">
              <label for="image" class="form-label">选择图片:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                @change="handleFileChange"
                class="form-input"
                :disabled="uploading"
              />
            </div>

            <div v-if="previewUrl" class="preview-container">
              <h3>图片预览:</h3>
              <img :src="previewUrl" alt="预览图片" class="image-preview" />
            </div>

            <div class="form-group">
              <button type="submit" class="submit-btn" :disabled="!selectedFile || uploading">
                {{ uploading ? '上传中...' : '上传图片' }}
              </button>
            </div>

            <div
              v-if="uploadResult"
              class="result-container"
              :class="uploadResult.code === 200 ? 'success' : 'error'"
            >
              <p>{{ uploadResult.message }}</p>
              <div v-if="uploadResult.data">
                <h3>上传成功:</h3>
                <p>文件名: {{ uploadResult.data.name }}</p>
                <p>文件大小: {{ formatFileSize(uploadResult.data.size) }}</p>
                <p>文件类型: {{ uploadResult.data.type }}</p>
                <div v-if="uploadResult.data.url" class="uploaded-image-container">
                  <h4>上传的图片:</h4>
                  <img
                    :src="uploadResult.data.url"
                    alt="上传的图片"
                    class="uploaded-image-preview"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="card widget">
          <h3 class="widget-title">上传说明</h3>
          <div class="widget-content">
            <ul>
              <li>只支持图片文件上传</li>
              <li>支持格式: JPG, PNG, GIF等</li>
              <li>文件大小限制: 5MB</li>
            </ul>
          </div>
        </div>

        <div class="card widget">
          <h3 class="widget-title">最近上传</h3>
          <div class="widget-content">
            <p>最近上传的图片将显示在这里</p>
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
    title: '图片上传 - 我的博客',
    meta: [
      { name: 'description', content: '图片上传功能页面，支持图片文件上传和预览。' },
      { name: 'keywords', content: '图片上传, 文件上传, 图片预览' },
      { property: 'og:title', content: '图片上传 - 我的博客' },
      { property: 'og:description', content: '图片上传功能页面，支持图片文件上传和预览。' },
      { property: 'og:type', content: 'website' }
    ]
  });

  // 定义上传结果的接口
  interface UploadResult {
    code: number;
    message: string;
    data?: {
      name: string;
      size: number;
      type: string;
      url: string;
    };
  }

  // 响应式数据
  const selectedFile = ref<File | null>(null);
  const previewUrl = ref<string | null>(null);
  const uploading = ref(false);
  const uploadResult = ref<UploadResult | null>(null);

  // 处理文件选择
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      selectedFile.value = file;

      // 创建预览
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
      }
      previewUrl.value = URL.createObjectURL(file);

      // 清除之前的结果
      uploadResult.value = null;
    } else {
      selectedFile.value = null;
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = null;
      }
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 提交表单
  const submitForm = async () => {
    if (!selectedFile.value) {
      uploadResult.value = {
        code: 400,
        message: '请先选择一个文件'
      };
      return;
    }

    // 检查文件大小 (5MB限制)
    if (selectedFile.value.size > 5 * 1024 * 1024) {
      uploadResult.value = {
        code: 400,
        message: '文件大小不能超过5MB'
      };
      return;
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.value.type)) {
      uploadResult.value = {
        code: 400,
        message: '只支持 JPG, PNG, GIF, WEBP 格式的图片文件'
      };
      return;
    }

    uploading.value = true;

    try {
      // 创建FormData
      const formData = new FormData();
      formData.append('file', selectedFile.value);

      // 发送请求到/api/upload
      const response: any = await $fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      // 根据API返回的状态码处理结果
      if (response.code === 200) {
        uploadResult.value = {
          code: 200,
          message: '上传成功!',
          data: {
            name: selectedFile.value.name,
            size: selectedFile.value.size,
            type: selectedFile.value.type,
            url: ''
          }
        };

        // 从API响应中获取URL
        if (response && response.data && response.data.url) {
          uploadResult.value.data!.url = response.data.url;
        }
      } else {
        // 处理API返回的错误
        uploadResult.value = {
          code: response.code || 500,
          message: response.message || '上传失败'
        };
      }
    } catch (error: any) {
      // 处理网络错误和其他异常
      let errorMessage = '上传失败，请稍后重试';
      
      if (error.status === 413) {
        errorMessage = '文件太大，请上传小于5MB的文件';
      } else if (error.status === 400) {
        // 尝试从错误响应中获取具体信息
        if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else {
          errorMessage = '文件格式不正确或上传参数有误';
        }
      } else if (error.status === 500) {
        errorMessage = '服务器内部错误，请稍后重试';
      }
      
      uploadResult.value = {
        code: error.status || 500,
        message: errorMessage
      };
    } finally {
      uploading.value = false;
    }
  };
</script>

<style scoped>
  .upload-container {
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

  .upload-card {
    padding: 1.5rem;
  }

  .upload-form {
    margin-top: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }

  .form-input:focus {
    outline: none;
    border-color: #667eea;
  }

  .form-input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  .preview-container {
    margin: 1.5rem 0;
  }

  .preview-container h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .image-preview {
    max-width: 100%;
    max-height: 300px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .submit-btn {
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

  .submit-btn:hover:not(:disabled) {
    opacity: 0.9;
  }

  .submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .result-container {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 4px;
  }

  .result-container.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .result-container.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
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
  }

  .uploaded-image-container {
    margin-top: 1rem;
  }

  .uploaded-image-container h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .uploaded-image-preview {
    max-width: 100%;
    max-height: 200px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
