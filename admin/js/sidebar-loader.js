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

// 侧边栏收起/展开
const sidebar = document.getElementById('sidebar');
const collapseToggle = document.getElementById('collapseToggle');
const collapseIcon = document.getElementById('collapseIcon');
const mainContent = document.querySelector('.main-content');
const menuToggle = document.getElementById('menuToggle');

// 移动端菜单切换
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// 侧边栏收起/展开
if (collapseToggle) {
  collapseToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    if (mainContent) {
      mainContent.classList.toggle('expanded');
    }
    // 图标旋转
    if (sidebar.classList.contains('collapsed')) {
      collapseIcon.style.transform = 'rotate(180deg)';
    } else {
      collapseIcon.style.transform = 'rotate(0deg)';
    }
  });
}

// 激活当前菜单项
const navItems = document.querySelectorAll('.nav-item');
const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
navItems.forEach(item => {
  if (item.dataset.page === currentPage) {
    item.classList.add('active');
  }
});

// 用户下拉菜单
const userDropdownToggle = document.getElementById('userDropdownToggle');
const userDropdownMenu = document.getElementById('userDropdownMenu');
if (userDropdownToggle && userDropdownMenu) {
  userDropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdownMenu.classList.toggle('show');
  });
  document.addEventListener('click', () => {
    userDropdownMenu.classList.remove('show');
  });
  userDropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// 通知按钮示例（可根据实际需求扩展）
const notificationsBtn = document.getElementById('notificationsBtn');
const notificationCount = document.getElementById('notificationCount');
if (notificationsBtn && notificationCount) {
  notificationsBtn.addEventListener('click', () => {
    alert('暂无新通知');
  });
} 