// 检查登录状态
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');
  
  if (!isLoggedIn || !currentUser) {
    alert('请先登录！');
    window.location.href = '../login.html';
    return;
  }
  
  // 更新用户名显示
  document.querySelector('.username').textContent = currentUser;
}

// 侧边栏切换
function bindSidebarEvents() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindSidebarEvents);
} else {
  bindSidebarEvents();
}

// 退出登录
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  if (confirm('确定要退出登录吗？')) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '../login.html';
  }
});

// 简单图表绘制
function drawVisitChart() {
  const canvas = document.getElementById('visitChart');
  const ctx = canvas.getContext('2d');
  
  // 设置画布尺寸
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  // 模拟访问数据
  const data = [120, 180, 150, 200, 250, 300, 280];
  const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  const width = canvas.width;
  const height = canvas.height;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  // 清空画布
  ctx.clearRect(0, 0, width, height);
  
  // 绘制坐标轴
  ctx.strokeStyle = '#e0d7f7';
  ctx.lineWidth = 1;
  
  // Y轴
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.stroke();
  
  // X轴
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();
  
  // 计算数据范围
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue;
  
  // 绘制数据点和连线
  ctx.strokeStyle = '#6c3fd3';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#6c3fd3';
  
  const pointRadius = 4;
  const stepX = chartWidth / (data.length - 1);
  
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = padding + index * stepX;
    const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // 绘制数据点
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
  });
  ctx.stroke();
  
  // 绘制标签
  ctx.fillStyle = '#666';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  
  labels.forEach((label, index) => {
    const x = padding + index * stepX;
    const y = height - padding + 20;
    ctx.fillText(label, x, y);
  });
  
  // 绘制Y轴标签
  ctx.textAlign = 'right';
  for (let i = 0; i <= 5; i++) {
    const value = minValue + (valueRange / 5) * i;
    const y = height - padding - (i / 5) * chartHeight;
    ctx.fillText(Math.round(value), padding - 10, y + 4);
  }
}

// 更新统计数据
function updateStats() {
  // 模拟数据更新
  const stats = [
    { number: 156, change: '+12%' },
    { number: 2847, change: '+8%' },
    { number: 89, change: '+15%' },
    { number: 23, change: '0%' }
  ];
  
  document.querySelectorAll('.stat-number').forEach((el, index) => {
    el.textContent = stats[index].number.toLocaleString();
  });
  
  document.querySelectorAll('.stat-change').forEach((el, index) => {
    el.textContent = stats[index].change;
  });
}

// 添加活动项
function addActivityItem(icon, title, description, time) {
  const activityList = document.querySelector('.activity-list');
  const activityItem = document.createElement('div');
  activityItem.className = 'activity-item';
  activityItem.innerHTML = `
    <div class="activity-icon">${icon}</div>
    <div class="activity-content">
      <h4>${title}</h4>
      <p>${description}</p>
      <span class="activity-time">${time}</span>
    </div>
  `;
  
  activityList.insertBefore(activityItem, activityList.firstChild);
  
  // 限制活动项数量
  const items = activityList.querySelectorAll('.activity-item');
  if (items.length > 5) {
    activityList.removeChild(items[items.length - 1]);
  }
}

// 模拟实时数据更新
function simulateRealTimeUpdates() {
  setInterval(() => {
    // 随机更新访问量
    const visitStat = document.querySelector('.stat-card:nth-child(2) .stat-number');
    const currentVisits = parseInt(visitStat.textContent.replace(/,/g, ''));
    const newVisits = currentVisits + Math.floor(Math.random() * 10);
    visitStat.textContent = newVisits.toLocaleString();
    
    // 随机添加活动
    const activities = [
      { icon: '📝', title: '新增成果', description: '添加了新的研究成果', time: '刚刚' },
      { icon: '📰', title: '发布新闻', description: '发布了新的新闻动态', time: '刚刚' },
      { icon: '💬', title: '新留言', description: '收到新的留言咨询', time: '刚刚' }
    ];
    
    if (Math.random() < 0.3) { // 30%概率添加新活动
      const activity = activities[Math.floor(Math.random() * activities.length)];
      addActivityItem(activity.icon, activity.title, activity.description, activity.time);
    }
  }, 10000); // 每10秒更新一次
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  drawVisitChart();
  updateStats();
  simulateRealTimeUpdates();
  
  // 窗口大小改变时重绘图表
  window.addEventListener('resize', () => {
    setTimeout(drawVisitChart, 100);
  });
  
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

  var notificationsBtn = document.getElementById('notificationsBtn');
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function() {
      var messages = [
        '暂无新通知',
        // '您有一条新的系统消息',
        // '实验室例会时间调整为每周三下午3点',
      ];
      var html = '<ul style="margin:0;padding:0 0 0 18px;">' + messages.map(msg => `<li>${msg}</li>`).join('') + '</ul>';
      showModal('通知', html);
    });
  }

  var helpBtn = document.getElementById('helpBtn');
  if (helpBtn) {
    helpBtn.addEventListener('click', function() {
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
});

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

// 导航项点击处理
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    // 移除所有active类
    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.remove('active');
    });
    
    // 添加active类到当前项
    item.classList.add('active');
  });
}); 