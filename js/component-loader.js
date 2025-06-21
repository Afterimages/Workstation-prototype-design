// 组件加载器 - 简化通用组件的加载

class ComponentLoader {
  constructor() {
    this.components = {};
    this.loadedComponents = new Set();
  }
  
  // 注册组件
  register(name, url) {
    this.components[name] = url;
  }
  
  // 加载单个组件
  async loadComponent(name, containerId) {
    if (this.loadedComponents.has(name)) {
      return;
    }
    
    const url = this.components[name];
    if (!url) {
      console.error(`Component ${name} not registered`);
      return;
    }
    
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;
        this.loadedComponents.add(name);
        
        // 触发组件加载完成事件
        this.triggerComponentLoaded(name, container);
      }
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
    }
  }
  
  // 加载多个组件
  async loadComponents(componentList) {
    const promises = componentList.map(({ name, containerId }) => 
      this.loadComponent(name, containerId)
    );
    
    await Promise.all(promises);
  }
  
  // 触发组件加载完成事件
  triggerComponentLoaded(name, container) {
    const event = new CustomEvent('componentLoaded', {
      detail: { name, container }
    });
    document.dispatchEvent(event);
  }
  
  // 初始化默认组件
  init() {
    // 注册默认组件
    this.register('header', 'components/header.html');
    this.register('footer', 'components/footer.html');
    
    // 监听组件加载完成事件
    document.addEventListener('componentLoaded', (event) => {
      const { name } = event.detail;
      
      // 根据组件类型执行相应的初始化
      switch (name) {
        case 'header':
          this.initHeader();
          break;
        case 'footer':
          this.initFooter();
          break;
      }
    });
  }
  
  // 初始化导航栏
  initHeader() {
    if (window.languageManager) {
      window.languageManager.bindEvents();
    }
  }
  
  // 初始化页脚
  initFooter() {
    if (window.scrollToTop) {
      window.scrollToTop.init();
    }
  }
  
  // 自动加载页面组件
  autoLoad() {
    // 检查页面中是否有组件容器
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    const componentsToLoad = [];
    
    if (headerContainer) {
      componentsToLoad.push({ name: 'header', containerId: 'header-container' });
    }
    
    if (footerContainer) {
      componentsToLoad.push({ name: 'footer', containerId: 'footer-container' });
    }
    
    if (componentsToLoad.length > 0) {
      this.loadComponents(componentsToLoad);
    }
  }
}

// 创建全局组件加载器实例
window.componentLoader = new ComponentLoader();

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', function() {
  window.componentLoader.init();
  window.componentLoader.autoLoad();
});

// 导出组件加载器
window.ComponentLoader = ComponentLoader; 