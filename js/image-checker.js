/**
 * 图片路径检查和优化工具
 * 用于检查页面中图片路径的正确性并提供优化建议
 */

class ImageChecker {
  constructor() {
    this.checkedImages = new Set();
    this.failedImages = [];
    this.optimizationSuggestions = [];
  }

  // 检查页面中所有图片
  async checkAllImages() {
    const images = document.querySelectorAll('img');
    const promises = [];

    images.forEach(img => {
      const src = img.src || img.getAttribute('data-src');
      if (src && !this.checkedImages.has(src)) {
        this.checkedImages.add(src);
        promises.push(this.checkImage(src, img));
      }
    });

    await Promise.all(promises);
    this.generateReport();
  }

  // 检查单个图片
  async checkImage(src, imgElement) {
    try {
      const response = await fetch(src, { method: 'HEAD' });
      
      if (!response.ok) {
        this.failedImages.push({
          src: src,
          element: imgElement,
          status: response.status,
          statusText: response.statusText
        });
        
        // 添加错误处理
        this.handleImageError(imgElement, src);
      } else {
        // 检查图片尺寸和格式
        this.analyzeImage(imgElement, src);
      }
    } catch (error) {
      this.failedImages.push({
        src: src,
        element: imgElement,
        error: error.message
      });
      
      this.handleImageError(imgElement, src);
    }
  }

  // 处理图片加载错误
  handleImageError(imgElement, src) {
    // 设置默认图片
    const defaultSrc = this.getDefaultImage(src);
    imgElement.src = defaultSrc;
    imgElement.classList.add('image-error');
    
    // 添加错误提示
    imgElement.title = `图片加载失败: ${src}`;
    
    console.warn(`图片加载失败: ${src}`);
  }

  // 根据图片类型获取默认图片
  getDefaultImage(src) {
    if (src.includes('head/')) {
      // 头像默认图片
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjRTlFQzVGIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2NS4wNTc2IDI4LjA1NzYgNTcgMzggNTdINjJDNzEuOTQyNCA1NyA4MCA2NS4wNTc2IDgwIDc1VjgwSDIwVjc1WiIgZmlsbD0iI0U5RUM1RiIvPgo8L3N2Zz4K';
    } else if (src.includes('icon/')) {
      // 图标默认图片
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDkuNzRMMTIgMTZMMTAuOTEgOS43NEw0IDlMMTAuOTEgOC4yNkwxMiAyWiIgZmlsbD0iI0M5Q0ZGRiIvPgo8L3N2Zz4K';
    } else {
      // 通用默认图片
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiNFOUVDNUYiLz4KPHBhdGggZD0iTTQwIDQwSDYwVjYwSDQwVjQwWiIgZmlsbD0iI0M5Q0ZGRiIvPgo8L3N2Zz4K';
    }
  }

  // 分析图片
  analyzeImage(imgElement, src) {
    const img = new Image();
    img.onload = () => {
      // 检查图片尺寸
      if (img.width > 0 && img.height > 0) {
        this.checkImageOptimization(imgElement, src, img.width, img.height);
      }
    };
    img.src = src;
  }

  // 检查图片优化
  checkImageOptimization(imgElement, src, width, height) {
    const suggestions = [];

    // 检查图片格式
    if (src.includes('.jpg') || src.includes('.jpeg')) {
      suggestions.push('考虑使用WebP格式以获得更好的压缩率');
    }

    // 检查图片尺寸
    const displayWidth = imgElement.offsetWidth || width;
    const displayHeight = imgElement.offsetHeight || height;

    if (width > displayWidth * 2) {
      suggestions.push(`图片尺寸过大，建议使用${displayWidth}px宽度的图片`);
    }

    // 检查是否缺少alt属性
    if (!imgElement.alt) {
      suggestions.push('建议添加alt属性以提高可访问性');
    }

    if (suggestions.length > 0) {
      this.optimizationSuggestions.push({
        src: src,
        element: imgElement,
        suggestions: suggestions
      });
    }
  }

  // 生成检查报告
  generateReport() {
    console.group('图片检查报告');
    
    if (this.failedImages.length > 0) {
      console.warn(`发现 ${this.failedImages.length} 个图片加载失败:`);
      this.failedImages.forEach(item => {
        console.warn(`- ${item.src}: ${item.error || item.statusText}`);
      });
    } else {
      console.log('✅ 所有图片加载正常');
    }

    if (this.optimizationSuggestions.length > 0) {
      console.info(`发现 ${this.optimizationSuggestions.length} 个优化建议:`);
      this.optimizationSuggestions.forEach(item => {
        console.info(`- ${item.src}:`);
        item.suggestions.forEach(suggestion => {
          console.info(`  • ${suggestion}`);
        });
      });
    }

    console.groupEnd();
  }

  // 预检查图片路径
  preCheckImagePaths() {
    const images = document.querySelectorAll('img');
    const pathIssues = [];

    images.forEach(img => {
      const src = img.src || img.getAttribute('data-src');
      if (src) {
        // 检查相对路径
        if (src.startsWith('pic/') && !src.startsWith('./pic/')) {
          pathIssues.push({
            element: img,
            src: src,
            issue: '建议使用相对路径 ./pic/'
          });
        }

        // 检查文件扩展名
        if (!src.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          pathIssues.push({
            element: img,
            src: src,
            issue: '缺少文件扩展名'
          });
        }
      }
    });

    if (pathIssues.length > 0) {
      console.warn('发现图片路径问题:');
      pathIssues.forEach(item => {
        console.warn(`- ${item.src}: ${item.issue}`);
      });
    }

    return pathIssues;
  }

  // 自动修复常见问题
  autoFixCommonIssues() {
    const images = document.querySelectorAll('img');
    let fixedCount = 0;

    images.forEach(img => {
      const src = img.src || img.getAttribute('data-src');
      if (src) {
        // 修复相对路径
        if (src.startsWith('pic/') && !src.startsWith('./pic/')) {
          img.src = './' + src;
          if (img.hasAttribute('data-src')) {
            img.setAttribute('data-src', './' + src);
          }
          fixedCount++;
        }

        // 添加默认alt属性
        if (!img.alt) {
          img.alt = '图片';
          fixedCount++;
        }
      }
    });

    if (fixedCount > 0) {
      console.log(`自动修复了 ${fixedCount} 个问题`);
    }

    return fixedCount;
  }
}

// 图片路径验证工具
const ImagePathValidator = {
  // 验证图片路径格式
  validatePath(path) {
    const issues = [];

    // 检查路径格式
    if (!path) {
      issues.push('路径不能为空');
      return issues;
    }

    // 检查相对路径
    if (path.startsWith('pic/') && !path.startsWith('./pic/')) {
      issues.push('建议使用相对路径 ./pic/');
    }

    // 检查文件扩展名
    if (!path.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      issues.push('缺少有效的图片文件扩展名');
    }

    // 检查路径中的特殊字符
    if (path.includes(' ')) {
      issues.push('路径中包含空格，建议使用下划线或连字符');
    }

    return issues;
  },

  // 获取推荐的图片路径
  getRecommendedPath(originalPath) {
    let path = originalPath;

    // 修复相对路径
    if (path.startsWith('pic/') && !path.startsWith('./pic/')) {
      path = './' + path;
    }

    // 修复空格
    if (path.includes(' ')) {
      path = path.replace(/\s+/g, '-');
    }

    return path;
  }
};

// 初始化图片检查器
let imageChecker;

document.addEventListener('DOMContentLoaded', () => {
  imageChecker = new ImageChecker();
  
  // 预检查路径问题
  const pathIssues = imageChecker.preCheckImagePaths();
  
  // 自动修复常见问题
  const fixedCount = imageChecker.autoFixCommonIssues();
  
  // 延迟检查图片加载状态
  setTimeout(() => {
    imageChecker.checkAllImages();
  }, 1000);
});

// 导出到全局作用域
window.ImageChecker = ImageChecker;
window.ImagePathValidator = ImagePathValidator; 