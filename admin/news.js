// 新闻管理页面脚本
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
  const logoutBtn = document.getElementById('logoutBtn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const addNewsBtn = document.getElementById('addNewsBtn');
  const newsModal = document.getElementById('newsModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const newsForm = document.getElementById('newsForm');
  const modalTitle = document.getElementById('modalTitle');
  const newsTableBody = document.getElementById('newsTableBody');

  // 模拟新闻数据
  let news = [
    {
      id: 1,
      title: '实验室成功举办认知科学学术研讨会',
      category: 'lab-news',
      date: '2024-05-20',
      views: 1234,
      status: 'published',
      summary: '本次研讨会邀请了国内外知名专家，深入探讨认知科学的最新发展趋势。',
      content: '5月20日，我实验室成功举办了2024年认知科学学术研讨会。本次研讨会邀请了来自清华大学、北京大学、中科院等知名机构的专家学者，围绕认知科学的最新研究进展进行了深入探讨。\n\n会议期间，与会专家就认知建模、脑机接口、人工智能等热点话题进行了精彩报告，现场讨论热烈，学术氛围浓厚。本次研讨会的成功举办，为实验室的学术交流提供了重要平台，也为后续的科研合作奠定了良好基础。'
    },
    {
      id: 2,
      title: '深度学习在认知建模中的最新应用',
      category: 'research',
      date: '2024-05-18',
      views: 856,
      status: 'published',
      summary: '研究团队在深度学习与认知建模的交叉领域取得重要突破。',
      content: '近日，我实验室研究团队在深度学习与认知建模的交叉领域取得重要突破。该研究提出了一种基于深度神经网络的认知过程建模方法，能够更准确地模拟人类的认知行为。\n\n该方法通过引入注意力机制和记忆网络，显著提高了模型在复杂认知任务中的表现。实验结果表明，该模型在多个标准认知测试中均优于现有方法，为认知科学的研究提供了新的技术手段。'
    },
    {
      id: 3,
      title: '2024年暑期实习项目招募通知',
      category: 'events',
      date: '2024-05-15',
      views: 2156,
      status: 'published',
      summary: '实验室现面向在校学生招募暑期实习生，欢迎优秀学子加入。',
      content: '认知与智能科学实验室现面向全国高校在校学生招募2024年暑期实习生。\n\n招募要求：\n- 计算机科学、心理学、认知科学等相关专业在读学生\n- 对人工智能、认知科学有浓厚兴趣\n- 具备良好的编程能力和英语水平\n- 能够保证至少2个月的实习时间\n\n实习内容：\n- 参与实验室的科研项目\n- 学习认知建模和人工智能技术\n- 与实验室成员进行学术交流\n\n有意者请将简历发送至：intern@cislab.edu.cn'
    },
    {
      id: 4,
      title: '实验室成员获得国际认知科学奖',
      category: 'awards',
      date: '2024-05-12',
      views: 1789,
      status: 'published',
      summary: '恭喜实验室成员在国际认知科学大会上获得最佳论文奖。',
      content: '在刚刚结束的第15届国际认知科学大会上，我实验室博士生张明的研究论文《基于多模态融合的认知状态识别方法》获得最佳论文奖。\n\n该论文提出了一种创新的多模态融合方法，能够有效整合脑电信号、眼动数据和生理指标，实现更准确的认知状态识别。评审专家认为，该研究在技术方法和实际应用方面都具有重要价值。\n\n这是实验室在国际顶级会议上获得的又一重要奖项，体现了实验室在认知科学领域的科研实力和国际影响力。'
    },
    {
      id: 5,
      title: '认知计算平台v3.0开发进展',
      category: 'research',
      date: '2024-05-10',
      views: 0,
      status: 'draft',
      summary: '实验室正在开发新一代认知计算平台，预计将于年底发布。',
      content: '实验室正在开发新一代认知计算平台v3.0，该平台将在现有版本的基础上进行重大升级。\n\n新版本的主要特性包括：\n- 更强大的认知建模引擎\n- 支持多种数据格式的导入和处理\n- 改进的用户界面和交互体验\n- 增强的数据可视化和分析功能\n- 支持云端部署和协作\n\n目前开发工作进展顺利，预计将于2024年底正式发布。该平台的发布将为认知科学研究提供更强大的工具支持。'
    }
  ];

  let currentEditId = null;

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
    filterNews();
  });

  // 分类筛选
  categoryFilter.addEventListener('change', function() {
    filterNews();
  });

  // 状态筛选
  statusFilter.addEventListener('change', function() {
    filterNews();
  });

  // 添加新闻按钮
  addNewsBtn.addEventListener('click', function() {
    currentEditId = null;
    modalTitle.textContent = '添加新闻';
    newsForm.reset();
    
    // 设置默认发布时间为当前时间
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('newsDate').value = localDateTime;
    
    newsModal.style.display = 'flex';
  });

  // 关闭弹窗
  closeModal.addEventListener('click', function() {
    newsModal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', function() {
    newsModal.style.display = 'none';
  });

  // 点击弹窗外部关闭
  newsModal.addEventListener('click', function(e) {
    if (e.target === newsModal) {
      newsModal.style.display = 'none';
    }
  });

  // 表单提交
  newsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(newsForm);
    const newsData = {
      title: formData.get('title'),
      category: formData.get('category'),
      date: formData.get('date').split('T')[0], // 只取日期部分
      status: formData.get('status'),
      summary: formData.get('summary'),
      content: formData.get('content')
    };

    if (currentEditId) {
      // 编辑现有新闻
      const index = news.findIndex(item => item.id === currentEditId);
      if (index !== -1) {
        news[index] = { ...news[index], ...newsData };
        showNotification('新闻更新成功！', 'success');
      }
    } else {
      // 添加新新闻
      const newId = Math.max(...news.map(item => item.id)) + 1;
      news.push({
        id: newId,
        views: 0,
        ...newsData
      });
      showNotification('新闻添加成功！', 'success');
    }

    renderNews();
    newsModal.style.display = 'none';
  });

  // 编辑新闻
  newsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const newsItem = news.find(item => item.id === id);
      if (newsItem) {
        currentEditId = id;
        modalTitle.textContent = '编辑新闻';
        
        document.getElementById('newsTitle').value = newsItem.title;
        document.getElementById('newsCategory').value = newsItem.category;
        document.getElementById('newsDate').value = newsItem.date + 'T10:00'; // 添加时间部分
        document.getElementById('newsStatus').value = newsItem.status;
        document.getElementById('newsSummary').value = newsItem.summary;
        document.getElementById('newsContent').value = newsItem.content;
        
        newsModal.style.display = 'flex';
      }
    }
  });

  // 删除新闻
  newsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      if (confirm('确定要删除这条新闻吗？')) {
        news = news.filter(item => item.id !== id);
        renderNews();
        showNotification('新闻删除成功！', 'success');
      }
    }
  });

  // 筛选新闻
  function filterNews() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilterValue = categoryFilter.value;
    const statusFilterValue = statusFilter.value;
    
    const filteredNews = news.filter(newsItem => {
      const matchesSearch = newsItem.title.toLowerCase().includes(searchTerm) ||
                           newsItem.summary.toLowerCase().includes(searchTerm) ||
                           newsItem.content.toLowerCase().includes(searchTerm);
      const matchesCategory = !categoryFilterValue || newsItem.category === categoryFilterValue;
      const matchesStatus = !statusFilterValue || newsItem.status === statusFilterValue;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    renderNews(filteredNews);
  }

  // 渲染新闻列表
  function renderNews(data = news) {
    newsTableBody.innerHTML = '';
    
    data.forEach(newsItem => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${newsItem.title}</td>
        <td><span class="category-tag ${newsItem.category}">${getCategoryName(newsItem.category)}</span></td>
        <td>${newsItem.date}</td>
        <td>${newsItem.views.toLocaleString()}</td>
        <td><span class="status-badge ${newsItem.status}">${getStatusName(newsItem.status)}</span></td>
        <td>
          <button class="action-btn edit" data-id="${newsItem.id}">编辑</button>
          <button class="action-btn delete" data-id="${newsItem.id}">删除</button>
        </td>
      `;
      newsTableBody.appendChild(row);
    });
  }

  // 获取分类名称
  function getCategoryName(category) {
    const categoryNames = {
      'lab-news': '实验室动态',
      'research': '研究进展',
      'events': '活动通知',
      'awards': '获奖信息'
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

  // 初始化页面
  renderNews();
});

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