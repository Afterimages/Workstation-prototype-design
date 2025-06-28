// 系统设置页面脚本

document.addEventListener('DOMContentLoaded', function() {
  // 检查登录状态
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');
  if (!isLoggedIn || !currentUser) {
    window.location.href = '../login.html';
    return;
  }
  document.querySelector('.username').textContent = currentUser;

  // 侧边栏切换
  function bindSidebarEvents() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
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
  document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('确定要退出登录吗？')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      window.location.href = '../login.html';
    }
  });

  // 标签页切换
  const settingsTabs = document.querySelectorAll('.settings-tab');
  const settingsPanels = document.querySelectorAll('.settings-panel');

  settingsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // 移除所有活动状态
      settingsTabs.forEach(t => t.classList.remove('active'));
      settingsPanels.forEach(p => p.classList.remove('active'));
      
      // 添加活动状态
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // 自动切换到锚点tab
  if (location.hash === '#profile') {
    settingsTabs.forEach(tab => {
      if (tab.dataset.tab === 'profile') {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    settingsPanels.forEach(panel => {
      if (panel.id === 'profile') {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  // 主题选择
  const themeOptions = document.querySelectorAll('.theme-option');
  const currentTheme = localStorage.getItem('adminTheme') || 'purple';
  
  themeOptions.forEach(option => {
    if (option.dataset.theme === currentTheme) {
      option.classList.add('active');
    }
    
    option.addEventListener('click', function() {
      themeOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      const selectedTheme = this.dataset.theme;
      localStorage.setItem('adminTheme', selectedTheme);
      showNotification(`主题已切换为${this.querySelector('span').textContent}`, 'success');
    });
  });

  // 深色模式切换
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.checked = localStorage.getItem('darkMode') === 'true';
  darkModeToggle.addEventListener('change', function() {
    localStorage.setItem('darkMode', this.checked);
    showNotification(this.checked ? '已启用深色模式' : '已关闭深色模式', 'success');
  });

  // 语言切换
  const languageSelect = document.getElementById('languageSelect');
  languageSelect.value = localStorage.getItem('adminLanguage') || 'zh';
  languageSelect.addEventListener('change', function() {
    localStorage.setItem('adminLanguage', this.value);
    showNotification('语言设置已保存，刷新后生效', 'success');
  });

  // 头像上传
  const avatarUpload = document.getElementById('avatarUpload');
  const avatarPreview = document.getElementById('avatarPreview');
  
  avatarUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('图片大小不能超过5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(e) {
        // 这里可以显示预览图片
        showNotification('头像上传成功', 'success');
      };
      reader.readAsDataURL(file);
    }
  });

  // 个人信息保存
  const profileForm = document.querySelector('#profile .save-btn');
  profileForm.addEventListener('click', function() {
    showNotification('个人信息已保存', 'success');
  });

  // 密码修改
  const passwordForm = document.querySelector('#security .save-btn');
  passwordForm.addEventListener('click', function() {
    const passwordInputs = document.querySelectorAll('#security input[type="password"]');
    const [oldPwd, newPwd, confirmPwd] = Array.from(passwordInputs).map(input => input.value);
    
    if (!oldPwd || !newPwd || !confirmPwd) {
      showNotification('请填写完整的密码信息', 'error');
      return;
    }
    
    if (newPwd !== confirmPwd) {
      showNotification('两次输入的新密码不一致', 'error');
      return;
    }
    
    if (newPwd.length < 6) {
      showNotification('新密码长度不能少于6位', 'error');
      return;
    }
    
    showNotification('密码修改成功', 'success');
    passwordInputs.forEach(input => input.value = '');
  });

  // 数据备份操作
  const backupActions = document.querySelectorAll('.backup-actions .action-btn');
  backupActions.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.textContent.trim();
      switch(action) {
        case '立即备份':
          showNotification('正在备份数据，请稍候...', 'info');
          setTimeout(() => {
            showNotification('数据备份完成', 'success');
          }, 2000);
          break;
        case '恢复数据':
          if (confirm('确定要恢复数据吗？这将覆盖当前数据。')) {
            showNotification('数据恢复完成', 'success');
          }
          break;
        case '下载备份':
          showNotification('正在准备下载文件...', 'info');
          setTimeout(() => {
            showNotification('备份文件下载完成', 'success');
          }, 1500);
          break;
      }
    });
  });

  // 开关控件事件
  const switches = document.querySelectorAll('.switch input[type="checkbox"]');
  switches.forEach(switchInput => {
    switchInput.addEventListener('change', function() {
      const settingName = this.closest('.setting-item').querySelector('label').textContent;
      showNotification(`${settingName}已${this.checked ? '启用' : '禁用'}`, 'success');
    });
  });

  // 设置控件变化事件
  const settingControls = document.querySelectorAll('.setting-control');
  settingControls.forEach(control => {
    control.addEventListener('change', function() {
      const settingName = this.closest('.setting-item').querySelector('label').textContent;
      showNotification(`${settingName}已更新`, 'success');
    });
  });

  // 系统状态更新（模拟实时数据）
  function updateSystemStatus() {
    var systemPanel = document.getElementById('system');
    if (!systemPanel || !systemPanel.classList.contains('active')) return;
    const cpuUsage = Math.floor(Math.random() * 30) + 30; // 30-60%
    const memoryUsage = Math.floor(Math.random() * 20) + 50; // 50-70%
    const diskUsage = Math.floor(Math.random() * 15) + 70; // 70-85%
    const cpuBar = systemPanel.querySelector('.status-item:nth-child(1) .progress-fill');
    const memoryBar = systemPanel.querySelector('.status-item:nth-child(2) .progress-fill');
    const diskBar = systemPanel.querySelector('.status-item:nth-child(3) .progress-fill');
    const cpuValue = systemPanel.querySelector('.status-item:nth-child(1) .status-value');
    const memoryValue = systemPanel.querySelector('.status-item:nth-child(2) .status-value');
    const diskValue = systemPanel.querySelector('.status-item:nth-child(3) .status-value');
    if (cpuBar && cpuValue) {
      cpuBar.style.width = cpuUsage + '%';
      cpuValue.textContent = cpuUsage + '%';
    }
    if (memoryBar && memoryValue) {
      memoryBar.style.width = memoryUsage + '%';
      memoryValue.textContent = memoryUsage + '%';
    }
    if (diskBar && diskValue) {
      diskBar.style.width = diskUsage + '%';
      diskValue.textContent = diskUsage + '%';
    }
  }

  // 每30秒更新一次系统状态
  setInterval(updateSystemStatus, 30000);

  // 通用通知函数
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
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // 初始化页面
  updateSystemStatus();

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

  // 顶部导航栏通知和帮助弹窗（修复交互故障，确保唯一弹窗、事件不冲突）
  function showModal(title, content) {
    // 先移除已存在的弹窗，防止多次点击叠加
    var existModal = document.querySelector('.custom-modal');
    if (existModal) document.body.removeChild(existModal);
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

  var notificationsBtn = document.getElementById('notificationsBtn');
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showNotificationDropdown(notificationData);
    });
  }

  var helpBtn = document.getElementById('helpBtn');
  if (helpBtn) {
    helpBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var html = `
        <div style="line-height:1.8;">
          <b>后台管理系统帮助说明：</b><br>
          1. 使用左侧菜单切换各功能模块。<br>
          2. 顶部可快速访问通知、帮助、用户操作。<br>
          3. 如遇问题请联系管理员或查看系统设置。<br>
        </div>
      `;
      showModal('帮助', html);
    });
  }

  // 附加样式（防止重复注入）
  if (!document.getElementById('customModalStyle')) {
    var style = document.createElement('style');
    style.id = 'customModalStyle';
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
    dropdown.querySelector('.dropdown-all')?.addEventListener('click', function(e){
      e.preventDefault();
      window.location.href = 'all-notifications.html';
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
}); 