// 成果管理页面脚本
document.addEventListener('DOMContentLoaded', function() {
  // 检查登录状态
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');
  
  if (!isLoggedIn || !currentUser) {
    window.location.href = '../login.html';
    return;
  }

  // 更新用户名显示
  document.querySelector('.username').textContent = currentUser;

  // 获取DOM元素
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  const logoutBtn = document.getElementById('logoutBtn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const addAchievementBtn = document.getElementById('addAchievementBtn');
  const achievementModal = document.getElementById('achievementModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const achievementForm = document.getElementById('achievementForm');
  const modalTitle = document.getElementById('modalTitle');
  const achievementsTableBody = document.getElementById('achievementsTableBody');

  // 模拟成果数据
  let achievements = [
    {
      id: 1,
      title: '基于深度学习的认知过程建模方法',
      category: 'papers',
      date: '2024-05-15',
      status: 'published',
      description: '提出了一种基于深度学习的认知过程建模方法，能够有效模拟人类认知过程。'
    },
    {
      id: 2,
      title: '一种基于脑电信号的智能控制系统',
      category: 'patents',
      date: '2024-04-20',
      status: 'published',
      description: '发明了一种基于脑电信号的智能控制系统，可用于辅助设备控制。'
    },
    {
      id: 3,
      title: '认知建模平台v2.0',
      category: 'software',
      date: '2024-03-10',
      status: 'published',
      description: '开发了认知建模平台v2.0，提供了完整的认知建模工具链。'
    },
    {
      id: 4,
      title: '省级科技进步一等奖',
      category: 'awards',
      date: '2024-02-28',
      status: 'published',
      description: '在认知科学领域获得省级科技进步一等奖。'
    },
    {
      id: 5,
      title: '多模态感知融合算法研究',
      category: 'papers',
      date: '2024-01-15',
      status: 'draft',
      description: '研究多模态感知融合算法，提高感知系统的准确性。'
    }
  ];

  let currentEditId = null;

  // 侧边栏切换
  function bindSidebarEvents() {
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindSidebarEvents);
  } else {
    bindSidebarEvents();
  }

  // 退出登录
  logoutBtn.addEventListener('click', function() {
    if (confirm('确定要退出登录吗？')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      window.location.href = '../login.html';
    }
  });

  // 搜索功能
  searchInput.addEventListener('input', function() {
    filterAchievements();
  });

  // 分类筛选
  categoryFilter.addEventListener('change', function() {
    filterAchievements();
  });

  // 添加成果按钮
  addAchievementBtn.addEventListener('click', function() {
    currentEditId = null;
    modalTitle.textContent = '添加成果';
    achievementForm.reset();
    document.getElementById('achievementDate').value = new Date().toISOString().split('T')[0];
    achievementModal.style.display = 'flex';
  });

  // 关闭弹窗
  closeModal.addEventListener('click', function() {
    achievementModal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', function() {
    achievementModal.style.display = 'none';
  });

  // 点击弹窗外部关闭
  achievementModal.addEventListener('click', function(e) {
    if (e.target === achievementModal) {
      achievementModal.style.display = 'none';
    }
  });

  // 表单提交
  achievementForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(achievementForm);
    const achievementData = {
      title: formData.get('title'),
      category: formData.get('category'),
      date: formData.get('date'),
      description: formData.get('description'),
      status: formData.get('status')
    };

    if (currentEditId) {
      // 编辑现有成果
      const index = achievements.findIndex(item => item.id === currentEditId);
      if (index !== -1) {
        achievements[index] = { ...achievements[index], ...achievementData };
        showNotification('成果更新成功！', 'success');
      }
    } else {
      // 添加新成果
      const newId = Math.max(...achievements.map(item => item.id)) + 1;
      achievements.push({
        id: newId,
        ...achievementData
      });
      showNotification('成果添加成功！', 'success');
    }

    renderAchievements();
    achievementModal.style.display = 'none';
  });

  // 编辑成果
  achievementsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const achievement = achievements.find(item => item.id === id);
      if (achievement) {
        currentEditId = id;
        modalTitle.textContent = '编辑成果';
        
        document.getElementById('achievementTitle').value = achievement.title;
        document.getElementById('achievementCategory').value = achievement.category;
        document.getElementById('achievementDate').value = achievement.date;
        document.getElementById('achievementDescription').value = achievement.description;
        document.getElementById('achievementStatus').value = achievement.status;
        
        achievementModal.style.display = 'flex';
      }
    }
  });

  // 删除成果
  achievementsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      if (confirm('确定要删除这个成果吗？')) {
        achievements = achievements.filter(item => item.id !== id);
        renderAchievements();
        showNotification('成果删除成功！', 'success');
      }
    }
  });

  // 筛选成果
  function filterAchievements() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilterValue = categoryFilter.value;
    
    const filteredAchievements = achievements.filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(searchTerm) ||
                           achievement.description.toLowerCase().includes(searchTerm);
      const matchesCategory = !categoryFilterValue || achievement.category === categoryFilterValue;
      
      return matchesSearch && matchesCategory;
    });
    
    renderAchievements(filteredAchievements);
  }

  // 渲染成果列表
  function renderAchievements(data = achievements) {
    achievementsTableBody.innerHTML = '';
    
    data.forEach(achievement => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${achievement.title}</td>
        <td><span class="category-tag ${achievement.category}">${getCategoryName(achievement.category)}</span></td>
        <td>${achievement.date}</td>
        <td><span class="status-badge ${achievement.status}">${getStatusName(achievement.status)}</span></td>
        <td>
          <button class="action-btn edit" data-id="${achievement.id}">编辑</button>
          <button class="action-btn delete" data-id="${achievement.id}">删除</button>
        </td>
      `;
      achievementsTableBody.appendChild(row);
    });
  }

  // 获取分类名称
  function getCategoryName(category) {
    const categoryNames = {
      'papers': '论文',
      'patents': '专利',
      'software': '软件系统',
      'awards': '奖项'
    };
    return categoryNames[category] || category;
  }

  // 获取状态名称
  function getStatusName(status) {
    const statusNames = {
      'published': '已发布',
      'draft': '草稿'
    };
    return statusNames[status] || status;
  }

  // 显示通知
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // 顶部导航栏下拉菜单交互（点击user-info区域展开/收起）
  var userInfo = document.querySelector('.user-info');
  var userDropdownMenu = document.getElementById('userDropdownMenu');
  if (userInfo && userDropdownMenu) {
    userInfo.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdownMenu.classList.toggle('show');
    });
    document.addEventListener('click', function() {
      userDropdownMenu.classList.remove('show');
    });
    userDropdownMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // 设置跳转
  var settingsLink = document.getElementById('settingsLink');
  if (settingsLink) {
    settingsLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'settings.html';
    });
  }

  // 个人资料跳转
  var profileLink = document.getElementById('profileLink');
  if (profileLink) {
    profileLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'settings.html#profile';
    });
  }

  // 顶部导航栏通知和帮助弹窗
  function showModal(title, content) {
    var modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
      <div class="custom-modal-content">
        <div class="custom-modal-header">
          <span class="custom-modal-title">${title}</span>
          <span class="custom-modal-close" id="customModalClose">&times;</span>
        </div>
        <div class="custom-modal-body">${content}</div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('customModalClose').onclick = function() {
      document.body.removeChild(modal);
    };
    modal.onclick = function(e) {
      if (e.target === modal) document.body.removeChild(modal);
    };
  }

  // 通知数据示例
  var notificationData = [
    { id: 1, text: '您有一条新的系统消息', type: 'system', time: '09:15', read: false },
    { id: 2, text: '实验室例会时间调整为每周三下午3点', type: 'meeting', time: '08:40', read: false },
    { id: 3, text: '项目"智能语音助手"已通过审核', type: 'project', time: '昨天 17:22', read: true },
    { id: 4, text: '资源"深度学习教程.pdf"已被下载', type: 'resource', time: '昨天 14:05', read: true },
    { id: 5, text: '欢迎使用后台管理系统', type: 'welcome', time: '前天 10:00', read: true }
  ];

  var typeMap = {
    system: { icon: '🔔', color: '#6c3fd3' },
    meeting: { icon: '📅', color: '#3b82f6' },
    project: { icon: '📁', color: '#10b981' },
    resource: { icon: '📄', color: '#f59e42' },
    welcome: { icon: '👋', color: '#ef4444' }
  };

  function showNotificationDropdown(messages) {
    var exist = document.getElementById('notificationDropdown');
    if (exist) exist.parentNode.removeChild(exist);
    var dropdown = document.createElement('div');
    dropdown.id = 'notificationDropdown';
    dropdown.className = 'notification-dropdown';
    dropdown.innerHTML = `
      <div class="dropdown-header">通知</div>
      <ul class="dropdown-list">
        ${messages.length ? messages.map(msg => {
          var type = typeMap[msg.type] || typeMap.system;
          return `
            <li class='dropdown-item${msg.read ? '' : ' unread'}' data-id='${msg.id}' title='${msg.text}'>
              ${!msg.read ? '<span class="unread-dot"></span>' : ''}
              <span class="item-icon" style="color:${type.color}">${type.icon}</span>
              <span class="item-text">${msg.text}</span>
              <span class="item-time">${msg.time}</span>
            </li>
          `;
        }).join('') : '<li class="dropdown-empty">暂无新通知</li>'}
      </ul>
      <div class="dropdown-footer"><a href="#" class="dropdown-all">查看全部</a></div>
    `;
    var btn = document.getElementById('notificationsBtn');
    if (btn) {
      var rect = btn.getBoundingClientRect();
      dropdown.style.position = 'absolute';
      dropdown.style.top = (rect.bottom + window.scrollY + 8) + 'px';
      dropdown.style.left = (rect.left + rect.width/2 - 180) + 'px';
      dropdown.style.minWidth = '360px';
      dropdown.style.zIndex = 2100;
    }
    document.body.appendChild(dropdown);
    setTimeout(function(){
      document.addEventListener('click', closeDropdown, { once: true });
    }, 0);
    dropdown.onclick = function(e){ e.stopPropagation(); };
    function closeDropdown(){
      if (dropdown.parentNode) dropdown.parentNode.removeChild(dropdown);
    }
    dropdown.querySelectorAll('.dropdown-item').forEach(function(item){
      item.onclick = function(e){
        e.stopPropagation();
        var id = parseInt(this.getAttribute('data-id'));
        var n = notificationData.find(n=>n.id===id);
        if(n && !n.read){
          n.read = true;
          this.classList.remove('unread');
          var dot = this.querySelector('.unread-dot');
          if(dot) dot.remove();
          updateNotificationBadge();
        }
      };
    });
  }

  function updateNotificationBadge(){
    var badge = document.getElementById('notificationCount');
    if(badge){
      var unread = notificationData.filter(n=>!n.read).length;
      badge.textContent = unread>0 ? unread : '';
      badge.style.display = unread>0 ? 'inline-block' : 'none';
    }
  }

  var notificationsBtn = document.getElementById('notificationsBtn');
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showNotificationDropdown(notificationData);
    });
  }
  updateNotificationBadge();

  if (!document.getElementById('notificationDropdownStyle')) {
    var style = document.createElement('style');
    style.id = 'notificationDropdownStyle';
    style.innerHTML = `
    .notification-dropdown { background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(108,63,211,0.15);padding:0;overflow:hidden;animation:modalIn .18s; }
    .notification-dropdown .dropdown-header { font-weight:600;font-size:1.08em;color:#6c3fd3;padding:14px 20px 6px 20px;border-bottom:1px solid #eee; }
    .notification-dropdown .dropdown-list { list-style:none;margin:0;padding:0;max-height:260px;overflow-y:auto; }
    .notification-dropdown .dropdown-item { padding:10px 18px 10px 16px;font-size:.98em;color:#333;cursor:pointer;transition:.18s;background:#fff; display:flex;align-items:center;gap:10px; border-bottom:1px solid #f3f0fa; position:relative; }
    .notification-dropdown .dropdown-item:last-child { border-bottom:none; }
    .notification-dropdown .dropdown-item.unread { background:#f7f3ff;font-weight:600; }
    .notification-dropdown .dropdown-item.unread:hover { background:#ede6fa; }
    .notification-dropdown .unread-dot { display:inline-block;width:8px;height:8px;border-radius:50%;background:#ef4444;margin-right:2px; }
    .notification-dropdown .dropdown-item:not(.unread):hover { background:#f5f3fa; }
    .notification-dropdown .item-icon { font-size:1.18em;flex-shrink:0; }
    .notification-dropdown .item-text { flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .notification-dropdown .item-time { color:#aaa;font-size:.92em;margin-left:8px;flex-shrink:0; }
    .notification-dropdown .dropdown-empty { color:#aaa;text-align:center;padding:32px 0; }
    .notification-dropdown .dropdown-footer { padding:10px 0 10px 0;text-align:center;border-top:1px solid #eee;background:#faf9fd; }
    .notification-dropdown .dropdown-all { color:#6c3fd3;text-decoration:none;font-size:.98em; }
    .notification-dropdown .dropdown-all:hover { text-decoration:underline; }
    @keyframes modalIn { from{transform:translateY(-12px);opacity:0;} to{transform:translateY(0);opacity:1;} }
    #notificationCount { background:#ef4444;color:#fff;border-radius:8px;padding:0 6px;font-size:.85em;min-width:18px;display:inline-block;text-align:center;vertical-align:top;margin-left:2px; }
    `;
    document.head.appendChild(style);
  }

  // 附加样式
  (function(){
    var style = document.createElement('style');
    style.innerHTML = `
    .custom-modal { position:fixed;z-index:2000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.18);display:flex;align-items:center;justify-content:center; }
    .custom-modal-content { background:#fff;border-radius:12px;min-width:320px;max-width:90vw;box-shadow:0 8px 32px rgba(108,63,211,0.15);animation:modalIn .2s; }
    .custom-modal-header { display:flex;align-items:center;justify-content:space-between;padding:16px 20px 8px 20px;border-bottom:1px solid #eee; }
    .custom-modal-title { font-weight:600;font-size:1.1em;color:#6c3fd3; }
    .custom-modal-close { cursor:pointer;font-size:1.3em;color:#aaa;transition:.2s; }
    .custom-modal-close:hover { color:#ef4444; }
    .custom-modal-body { padding:18px 20px 22px 20px;font-size:1em;color:#333; }
    @keyframes modalIn { from{transform:scale(.95);opacity:0;} to{transform:scale(1);opacity:1;} }
    `;
    document.head.appendChild(style);
  })();

  // 初始化页面
  renderAchievements();
}); 