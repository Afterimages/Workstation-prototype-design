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
    const cpuUsage = Math.floor(Math.random() * 30) + 30; // 30-60%
    const memoryUsage = Math.floor(Math.random() * 20) + 50; // 50-70%
    const diskUsage = Math.floor(Math.random() * 15) + 70; // 70-85%
    
    const cpuBar = document.querySelector('#system .status-item:nth-child(1) .progress-fill');
    const memoryBar = document.querySelector('#system .status-item:nth-child(2) .progress-fill');
    const diskBar = document.querySelector('#system .status-item:nth-child(3) .progress-fill');
    
    if (cpuBar) {
      cpuBar.style.width = cpuUsage + '%';
      cpuBar.previousElementSibling.querySelector('.status-value').textContent = cpuUsage + '%';
    }
    if (memoryBar) {
      memoryBar.style.width = memoryUsage + '%';
      memoryBar.previousElementSibling.querySelector('.status-value').textContent = memoryUsage + '%';
    }
    if (diskBar) {
      diskBar.style.width = diskUsage + '%';
      diskBar.previousElementSibling.querySelector('.status-value').textContent = diskUsage + '%';
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
}); 