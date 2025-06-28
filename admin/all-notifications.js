// 顶部导航栏组件动态加载（后台专用header）
(function loadHeader() {
  fetch('components/sidebar.html')
    .then(res => res.text())
    .then(html => {
      // 只提取<header ...>...</header>部分
      const match = html.match(/<header[\s\S]*?<\/header>/);
      if (match) {
        document.getElementById('admin-header').innerHTML = match[0];
      }
    });
})();

window.onload = function() {
  // 假数据
  let notifications = [
    {
      id: 1,
      type: 'system',
      title: '系统维护通知',
      content: '系统将于今晚22:00-24:00进行维护升级，期间可能影响部分功能使用，请提前保存相关工作。',
      status: 'unread',
      important: false,
      archived: false,
      time: '2024-05-20 15:30',
    },
    {
      id: 2,
      type: 'message',
      title: '新的留言消息',
      content: '张三提交了一条新的留言，主题：关于实验室对外合作的咨询。留言内容详细说明了申请人的背景和期望，请及时处理并回复。',
      status: 'unread',
      important: false,
      archived: false,
      time: '2024-05-20 14:25',
    },
    {
      id: 3,
      type: 'application',
      title: '新的申请提交',
      content: '李四提交了研究申请，专业：人工智能。申请材料包括个人简历、成绩单和研究计划，请审核申请材料。',
      status: 'unread',
      important: false,
      archived: false,
      time: '2024-05-20 13:15',
    },
    {
      id: 4,
      type: 'achievement',
      title: '成果审核通过',
      content: '您的论文《智能系统优化》已通过审核，恭喜获得2024年度优秀成果奖。',
      status: 'read',
      important: true,
      archived: false,
      time: '2024-05-19 10:00',
    },
    {
      id: 5,
      type: 'reminder',
      title: '项目进度提醒',
      content: '请及时更新项目《智慧校园平台》的阶段性进展报告。',
      status: 'archived',
      important: false,
      archived: true,
      time: '2024-05-18 09:00',
    },
  ];

  const typeConfig = {
    system:   { icon: '🔔', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
    message:  { icon: '💬', bg: 'linear-gradient(135deg,#60a5fa,#a7f3d0)' },
    application: { icon: '📝', bg: 'linear-gradient(135deg,#6ee7b7,#3b82f6)' },
    achievement: { icon: '🏆', bg: 'linear-gradient(135deg,#fbbf24,#f59e42)' },
    project:  { icon: '📊', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
    reminder: { icon: '⏰', bg: 'linear-gradient(135deg,#fca5a5,#f87171)' },
  };

  function renderNotifications(list) {
    const container = document.getElementById('notifications-list');
    const empty = document.getElementById('notifications-empty');
    if (!container) return;
    if (!list || list.length === 0) {
      container.innerHTML = '';
      if (empty) empty.style.display = '';
      return;
    }
    if (empty) empty.style.display = 'none';
    container.innerHTML = list.map(item => {
      const type = typeConfig[item.type] || typeConfig.system;
      let cardClass = 'notifications__card';
      if (item.status === 'unread') cardClass += ' notifications__card--unread';
      if (item.important) cardClass += ' notifications__card--important';
      if (item.archived) cardClass += ' notifications__card--archived';
      return `
        <div style="display:flex;align-items:flex-start;position:relative;">
          <input type="checkbox" class="notifications__card-checkbox" style="position:static;margin:24px 18px 0 0;flex-shrink:0;" ${selectedIds.has(item.id) ? 'checked' : ''} data-id="${item.id}">
          <div class="${cardClass}" data-id="${item.id}" style="flex:1;--card-bg:${type.bg}">
            <div class="notifications__card-icon" style="background:${type.bg}">${type.icon}</div>
            <div class="notifications__card-content">
              <div class="notifications__card-title">${item.title}</div>
              <div class="notifications__card-desc">${item.content}</div>
            </div>
            <div class="notifications__card-meta">
              <span class="notifications__card-time">${item.time}</span>
              <button class="notifications__card-detail">详情</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  let currentTab = 'unread';
  let searchKeyword = '';
  let typeFilter = '';
  let selectedIds = new Set();
  let pageSize = 10;
  let currentPage = 1;

  function filterNotifications() {
    return notifications.filter(item => {
      if (currentTab === 'unread' && (item.status !== 'unread' || item.archived)) return false;
      if (currentTab === 'read' && (item.status !== 'read' || item.archived)) return false;
      if (currentTab === 'important' && (!item.important || item.archived)) return false;
      if (currentTab === 'archived' && !item.archived) return false;
      if (typeFilter && item.type !== typeFilter) return false;
      if (searchKeyword && !(item.title.includes(searchKeyword) || item.content.includes(searchKeyword))) return false;
      return true;
    });
  }

  function updateCounts() {
    const tabMap = {
      unread: n => n.status === 'unread' && !n.archived,
      read: n => n.status === 'read' && !n.archived,
      important: n => n.important && !n.archived,
      archived: n => n.archived
    };
    document.querySelectorAll('.notifications__tab').forEach(tab => {
      const status = tab.getAttribute('data-status');
      const count = notifications.filter(tabMap[status]).length;
      const countSpan = tab.querySelector('.notifications__count');
      if (countSpan) countSpan.textContent = count;
    });
  }

  function getPagedNotifications(list) {
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return {
      pageList: list.slice(start, end),
      total,
      totalPages
    };
  }

  function rerender() {
    const filtered = filterNotifications();
    const { pageList, total, totalPages } = getPagedNotifications(filtered);
    renderNotifications(pageList);
    updateCounts();
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
      selectAll.checked = pageList.length > 0 && pageList.every(n => selectedIds.has(n.id));
    }
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) pageInfo.textContent = `第 ${total === 0 ? 0 : currentPage} 页 / 共 ${totalPages} 页`;
    document.getElementById('pagePrev').disabled = currentPage <= 1;
    document.getElementById('pageNext').disabled = currentPage >= totalPages;
  }

  // tab切换
  const tabs = document.querySelectorAll('.notifications__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('notifications__tab--active'));
      this.classList.add('notifications__tab--active');
      currentTab = this.getAttribute('data-status');
      selectedIds.clear();
      currentPage = 1;
      rerender();
    });
  });

  // 搜索
  const searchInput = document.querySelector('.notifications__search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      searchKeyword = this.value.trim();
      currentPage = 1;
      rerender();
    });
  }

  // 类型筛选
  const typeSelect = document.querySelector('.notifications__type-filter');
  if (typeSelect) {
    typeSelect.addEventListener('change', function() {
      typeFilter = this.value;
      currentPage = 1;
      rerender();
    });
  }

  // 全选
  const selectAll = document.getElementById('select-all');
  if (selectAll) {
    selectAll.addEventListener('change', function() {
      const filtered = filterNotifications();
      if (this.checked) {
        filtered.forEach(n => selectedIds.add(n.id));
      } else {
        filtered.forEach(n => selectedIds.delete(n.id));
      }
      rerender();
    });
  }

  // 卡片checkbox
  function delegateCardCheckbox() {
    document.getElementById('notifications-list')?.addEventListener('change', function(e) {
      if (e.target.classList.contains('notifications__card-checkbox')) {
        const id = Number(e.target.closest('.notifications__card').dataset.id);
        if (e.target.checked) selectedIds.add(id);
        else selectedIds.delete(id);
        rerender();
      }
    });
  }
  delegateCardCheckbox();

  // 批量操作
  function batchUpdate(fn) {
    notifications.forEach(n => {
      if (selectedIds.has(n.id)) fn(n);
    });
    selectedIds.clear();
    rerender();
  }
  document.querySelector('.notifications__action--readall')?.addEventListener('click', () => {
    batchUpdate(n => { n.status = 'read'; });
  });
  document.querySelector('.notifications__action--important')?.addEventListener('click', () => {
    batchUpdate(n => { n.important = true; });
  });
  document.querySelector('.notifications__action--archive')?.addEventListener('click', () => {
    batchUpdate(n => { n.archived = true; });
  });
  document.querySelector('.notifications__action--delete')?.addEventListener('click', () => {
    notifications = notifications.filter(n => !selectedIds.has(n.id));
    selectedIds.clear();
    currentPage = 1;
    rerender();
  });

  // 详情弹窗
  function delegateDetailModal() {
    document.getElementById('notifications-list')?.addEventListener('click', function(e) {
      if (e.target.classList.contains('notifications__card-detail')) {
        const id = Number(e.target.closest('.notifications__card').dataset.id);
        const n = notifications.find(n => n.id === id);
        if (!n) return;
        const modal = document.getElementById('notification-modal');
        const body = modal.querySelector('.notifications__modal-body');
        body.innerHTML = `
          <div style="font-size:2.2rem;margin-bottom:10px;">${typeConfig[n.type]?.icon || '🔔'}</div>
          <h2 style="margin-bottom:8px;">${n.title}</h2>
          <div style="color:#6b7280;margin-bottom:12px;">${n.time}</div>
          <div style="font-size:1.08rem;line-height:1.7;">${n.content}</div>
        `;
        modal.style.display = '';
      }
    });
    document.querySelector('.notifications__modal-close')?.addEventListener('click', function() {
      document.getElementById('notification-modal').style.display = 'none';
    });
    document.getElementById('notification-modal')?.addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });
  }
  delegateDetailModal();

  // 初始渲染
  rerender();

  document.getElementById('pagePrev')?.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      rerender();
    }
  });
  document.getElementById('pageNext')?.addEventListener('click', function() {
    const filtered = filterNotifications();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage < totalPages) {
      currentPage++;
      rerender();
    }
  });
};

// TODO: 实现筛选、搜索、tab切换、批量操作、详情弹窗、动画等交互 