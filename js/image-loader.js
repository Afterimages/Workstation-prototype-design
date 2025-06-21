/**
 * 图片加载优化脚本
 * 实现图片懒加载、加载动画、错误处理等功能
 */

class ImageLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    // 初始化Intersection Observer
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }

    // 绑定图片加载事件
    this.bindImageEvents();
    
    // 开始观察图片
    this.observeImages();
  }

  bindImageEvents() {
    // 为所有图片添加加载事件
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.addEventListener('load', () => this.onImageLoad(img));
        img.addEventListener('error', () => this.onImageError(img));
      });
    });
  }

  observeImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      if (this.observer) {
        this.observer.observe(img);
      } else {
        // 降级处理：直接加载图片
        this.loadImage(img);
      }
    });
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    // 创建新的Image对象进行预加载
    const tempImage = new Image();
    
    tempImage.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    };
    
    tempImage.onerror = () => {
      this.onImageError(img);
    };
    
    tempImage.src = src;
  }

  onImageLoad(img) {
    img.classList.add('loaded');
    img.classList.remove('loading');
  }

  onImageError(img) {
    img.classList.add('error');
    img.classList.remove('loading');
    
    // 设置默认图片或错误提示
    const defaultSrc = img.getAttribute('data-default') || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiNFOUVDNUYiLz4KPHBhdGggZD0iTTQwIDQwSDYwVjYwSDQwVjQwWiIgZmlsbD0iI0M5Q0ZGRiIvPgo8L3N2Zz4K';
    img.src = defaultSrc;
    
    console.warn(`图片加载失败: ${img.getAttribute('data-src') || img.src}`);
  }

  // 手动加载指定图片
  loadSpecificImage(selector) {
    const img = document.querySelector(selector);
    if (img && img.hasAttribute('data-src')) {
      this.loadImage(img);
    }
  }

  // 预加载图片
  preloadImages(urls) {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  // 销毁观察器
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// 图片优化工具函数
const ImageUtils = {
  // 压缩图片
  compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  },

  // 获取图片尺寸
  getImageDimensions(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.src = URL.createObjectURL(file);
    });
  },

  // 验证图片格式
  validateImageFormat(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  },

  // 验证图片大小
  validateImageSize(file, maxSize = 5 * 1024 * 1024) { // 5MB
    return file.size <= maxSize;
  }
};

// 初始化图片加载器
let imageLoader;

document.addEventListener('DOMContentLoaded', () => {
  imageLoader = new ImageLoader();
  window.imageLoader = imageLoader; // 导出到全局，方便其他脚本调用
});

// 导出到全局作用域
window.ImageLoader = ImageLoader;
window.ImageUtils = ImageUtils; 