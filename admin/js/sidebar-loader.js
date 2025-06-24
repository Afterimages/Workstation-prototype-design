// 动态加载侧边栏并高亮当前菜单
function loadSidebar(activePage) {
  fetch('components/sidebar.html')
    .then(res => res.text())
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const sidebar = temp.querySelector('.sidebar');
      // 高亮当前菜单
      if (activePage) {
        const link = sidebar.querySelector(`.nav-item[data-page="${activePage}"]`);
        if (link) link.classList.add('active');
      }
      document.body.prepend(sidebar);
    });
} 