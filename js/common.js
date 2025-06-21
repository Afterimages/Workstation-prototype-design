// 通用JavaScript功能 - 前台页面通用脚本

// 语言切换功能
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'zh';
    this.translations = {
      zh: {
        // 导航栏
        'nav.home': '首页',
        'nav.about': '实验室简介',
        'nav.directions': '科研方向',
        'nav.achievements': '成果展示',
        'nav.news': '新闻动态',
        'nav.contact': '联系我们',
        'nav.join': '加入我们',
        'nav.logo': '认知与智能科学实验室',
        
        // 页脚
        'footer.contact': '联系方式：lab@cislab.edu.cn',
        'footer.address': '地址：XX大学XX楼XX室',
        'footer.copyright': '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号',
        'footer.toTop': '返回顶部',
        
        // 通用
        'btn.submit': '提交',
        'btn.cancel': '取消',
        'btn.save': '保存',
        'btn.edit': '编辑',
        'btn.delete': '删除',
        'btn.view': '查看',
        'btn.close': '关闭',
        'btn.back': '返回',
        'btn.next': '下一步',
        'btn.prev': '上一步',
        
        // 表单
        'form.name': '姓名',
        'form.email': '邮箱',
        'form.phone': '电话',
        'form.message': '留言',
        'form.subject': '主题',
        'form.content': '内容',
        'form.required': '必填项',
        'form.invalid': '格式不正确',
        
        // 消息
        'msg.success': '操作成功',
        'msg.error': '操作失败',
        'msg.loading': '加载中...',
        'msg.noData': '暂无数据',
        'msg.confirm': '确认删除？',
        'msg.saved': '保存成功',
        'msg.deleted': '删除成功'
      },
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.directions': 'Research',
        'nav.achievements': 'Achievements',
        'nav.news': 'News',
        'nav.contact': 'Contact',
        'nav.join': 'Join Us',
        'nav.logo': 'Cognitive & Intelligent Science Lab',
        
        // Footer
        'footer.contact': 'Contact: lab@cislab.edu.cn',
        'footer.address': 'Address: XX University, XX Building, Room XX',
        'footer.copyright': '© 2024 Cognitive & Intelligent Science Lab | ICP No.xxxx',
        'footer.toTop': 'Back to Top',
        
        // Common
        'btn.submit': 'Submit',
        'btn.cancel': 'Cancel',
        'btn.save': 'Save',
        'btn.edit': 'Edit',
        'btn.delete': 'Delete',
        'btn.view': 'View',
        'btn.close': 'Close',
        'btn.back': 'Back',
        'btn.next': 'Next',
        'btn.prev': 'Previous',
        
        // Form
        'form.name': 'Name',
        'form.email': 'Email',
        'form.phone': 'Phone',
        'form.message': 'Message',
        'form.subject': 'Subject',
        'form.content': 'Content',
        'form.required': 'Required',
        'form.invalid': 'Invalid format',
        
        // Messages
        'msg.success': 'Operation successful',
        'msg.error': 'Operation failed',
        'msg.loading': 'Loading...',
        'msg.noData': 'No data available',
        'msg.confirm': 'Confirm deletion?',
        'msg.saved': 'Saved successfully',
        'msg.deleted': 'Deleted successfully'
      }
    };
    
    this.init();
  }
  
  init() {
    this.updateLanguage();
    this.bindEvents();
  }
  
  bindEvents() {
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
      langSwitch.addEventListener('click', () => {
        this.toggleLanguage();
      });
    }
  }
  
  toggleLanguage() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('language', this.currentLang);
    this.updateLanguage();
  }
  
  updateLanguage() {
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
      langSwitch.textContent = this.currentLang === 'zh' ? 'EN' : '中文';
    }
    
    // 更新页面文本
    this.translatePage();
  }
  
  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        element.textContent = translation;
      }
    });
  }
  
  getTranslation(key) {
    return this.translations[this.currentLang][key] || key;
  }
  
  t(key) {
    return this.getTranslation(key);
  }
}

// 返回顶部功能
class ScrollToTop {
  constructor() {
    this.toTopBtn = document.getElementById('to-top');
    this.init();
  }
  
  init() {
    if (this.toTopBtn) {
      this.bindEvents();
      this.checkScroll();
    }
  }
  
  bindEvents() {
    this.toTopBtn.addEventListener('click', () => {
      this.scrollToTop();
    });
    
    window.addEventListener('scroll', () => {
      this.checkScroll();
    });
  }
  
  checkScroll() {
    if (window.pageYOffset > 300) {
      this.toTopBtn.style.display = 'block';
    } else {
      this.toTopBtn.style.display = 'none';
    }
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// 导航高亮功能
class NavigationHighlighter {
  constructor() {
    this.navLinks = document.querySelectorAll('.navbar nav a');
    this.sections = document.querySelectorAll('section[id]');
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.highlightCurrentSection();
  }
  
  bindEvents() {
    window.addEventListener('scroll', () => {
      this.highlightCurrentSection();
    });
    
    // 平滑滚动
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  highlightCurrentSection() {
    const scrollPos = window.scrollY + 100;
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.setActiveNavLink(sectionId);
      }
    });
  }
  
  setActiveNavLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }
}

// 表单验证工具
class FormValidator {
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  static validatePhone(phone) {
    const re = /^1[3-9]\d{9}$/;
    return re.test(phone);
  }
  
  static validateRequired(value) {
    return value && value.trim().length > 0;
  }
  
  static showError(element, message) {
    const errorDiv = element.parentNode.querySelector('.error-message') || 
                    document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8em';
    errorDiv.style.marginTop = '4px';
    
    if (!element.parentNode.querySelector('.error-message')) {
      element.parentNode.appendChild(errorDiv);
    }
    
    element.style.borderColor = '#e74c3c';
  }
  
  static clearError(element) {
    const errorDiv = element.parentNode.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
    element.style.borderColor = '#e0d7f7';
  }
  
  static validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateRequired(input.value)) {
        this.showError(input, '此字段为必填项');
        isValid = false;
      } else {
        this.clearError(input);
      }
      
      // 邮箱验证
      if (input.type === 'email' && input.value) {
        if (!this.validateEmail(input.value)) {
          this.showError(input, '请输入有效的邮箱地址');
          isValid = false;
        }
      }
      
      // 电话验证
      if (input.type === 'tel' && input.value) {
        if (!this.validatePhone(input.value)) {
          this.showError(input, '请输入有效的手机号码');
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
}

// 通知工具
class Notification {
  static show(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 样式
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#fff';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // 根据类型设置颜色
    switch (type) {
      case 'success':
        notification.style.background = '#27ae60';
        break;
      case 'error':
        notification.style.background = '#e74c3c';
        break;
      case 'warning':
        notification.style.background = '#f39c12';
        break;
      default:
        notification.style.background = '#6c3fd3';
    }
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }
  
  static success(message) {
    this.show(message, 'success');
  }
  
  static error(message) {
    this.show(message, 'error');
  }
  
  static warning(message) {
    this.show(message, 'warning');
  }
}

// 加载状态管理
class LoadingManager {
  static show(container) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">加载中...</div>
    `;
    
    loading.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;
    
    const spinner = loading.querySelector('.loading-spinner');
    spinner.style.cssText = `
      width: 40px;
      height: 40px;
      border: 4px solid #e0d7f7;
      border-top: 4px solid #6c3fd3;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;
    
    const text = loading.querySelector('.loading-text');
    text.style.cssText = `
      margin-top: 12px;
      color: #6c3fd3;
      font-weight: 500;
    `;
    
    // 添加动画样式
    if (!document.querySelector('#loading-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-styles';
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    container.style.position = 'relative';
    container.appendChild(loading);
  }
  
  static hide(container) {
    const loading = container.querySelector('.loading');
    if (loading) {
      loading.remove();
    }
  }
}

// 工具函数
const Utils = {
  // 防抖函数
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // 节流函数
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // 格式化日期
  formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  },
  
  // 获取URL参数
  getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },
  
  // 设置URL参数
  setUrlParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化语言管理器
  window.languageManager = new LanguageManager();
  
  // 初始化返回顶部
  window.scrollToTop = new ScrollToTop();
  
  // 初始化导航高亮
  window.navigationHighlighter = new NavigationHighlighter();
  
  // 全局表单验证
  document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('needs-validation')) {
      if (!FormValidator.validateForm(e.target)) {
        e.preventDefault();
        Notification.error('请检查表单填写是否正确');
      }
    }
  });
  
  // 自动添加表单验证类
  document.querySelectorAll('form').forEach(form => {
    form.classList.add('needs-validation');
  });
});

// 导出到全局
window.FormValidator = FormValidator;
window.Notification = Notification;
window.LoadingManager = LoadingManager;
window.Utils = Utils; 