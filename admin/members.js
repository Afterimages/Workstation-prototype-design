// 成员管理页面脚本
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
  const roleFilter = document.getElementById('roleFilter');
  const statusFilter = document.getElementById('statusFilter');
  const addMemberBtn = document.getElementById('addMemberBtn');
  const memberModal = document.getElementById('memberModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const memberForm = document.getElementById('memberForm');
  const modalTitle = document.getElementById('modalTitle');
  const membersTableBody = document.getElementById('membersTableBody');

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

  var notificationsBtn = document.getElementById('notificationsBtn');
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showNotificationDropdown(notificationData);
    });
  }
  updateNotificationBadge();

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

  // 模拟成员数据
  let members = [
    {
      id: 1,
      name: '张明华',
      role: 'advisor',
      major: '认知科学',
      email: 'zhang@cislab.edu.cn',
      phone: '13800138001',
      status: 'active',
      bio: '张明华教授，认知科学领域知名专家，在认知建模和人工智能交叉领域有深入研究。',
      research: '认知建模、人工智能、脑机接口',
      avatar: '../pic/head/head1.png'
    },
    {
      id: 2,
      name: '李思思',
      role: 'phd',
      major: '人工智能',
      email: 'li@cislab.edu.cn',
      phone: '13800138002',
      status: 'active',
      bio: '李思思，博士研究生，专注于深度学习在认知科学中的应用研究。',
      research: '深度学习、认知计算、神经网络',
      avatar: '../pic/head/head1.png'
    },
    {
      id: 3,
      name: '王浩然',
      role: 'master',
      major: '机器学习',
      email: 'wang@cislab.edu.cn',
      phone: '13800138003',
      status: 'active',
      bio: '王浩然，硕士研究生，研究方向为机器学习算法优化。',
      research: '机器学习、算法优化、数据挖掘',
      avatar: '../pic/head/head1.png'
    },
    {
      id: 4,
      name: '陈小雨',
      role: 'undergraduate',
      major: '计算机科学',
      email: 'chen@cislab.edu.cn',
      phone: '13800138004',
      status: 'active',
      bio: '陈小雨，本科生，对人工智能和认知科学有浓厚兴趣。',
      research: '人工智能基础、认知科学入门',
      avatar: '../pic/head/head1.png'
    },
    {
      id: 5,
      name: '刘志强',
      role: 'researcher',
      major: '脑机接口',
      email: 'liu@cislab.edu.cn',
      phone: '13800138005',
      status: 'visiting',
      bio: '刘志强研究员，脑机接口领域专家，目前作为访问学者在实验室工作。',
      research: '脑机接口、神经工程、生物信号处理',
      avatar: '../pic/head/head1.png'
    }
  ];

  let currentEditId = null;

  // 侧边栏切换
  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
  });

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
    filterMembers();
  });

  // 角色筛选
  roleFilter.addEventListener('change', function() {
    filterMembers();
  });

  // 状态筛选
  statusFilter.addEventListener('change', function() {
    filterMembers();
  });

  // 添加成员按钮
  addMemberBtn.addEventListener('click', function() {
    currentEditId = null;
    modalTitle.textContent = '添加成员';
    memberForm.reset();
    memberModal.style.display = 'flex';
  });

  // 关闭弹窗
  closeModal.addEventListener('click', function() {
    memberModal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', function() {
    memberModal.style.display = 'none';
  });

  // 点击弹窗外部关闭
  memberModal.addEventListener('click', function(e) {
    if (e.target === memberModal) {
      memberModal.style.display = 'none';
    }
  });

  // 表单提交
  memberForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(memberForm);
    const memberData = {
      name: formData.get('name'),
      role: formData.get('role'),
      major: formData.get('major'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      status: formData.get('status'),
      bio: formData.get('bio'),
      research: formData.get('research')
    };

    if (currentEditId) {
      // 编辑现有成员
      const index = members.findIndex(item => item.id === currentEditId);
      if (index !== -1) {
        members[index] = { ...members[index], ...memberData };
        showNotification('成员信息更新成功！', 'success');
      }
    } else {
      // 添加新成员
      const newId = Math.max(...members.map(item => item.id)) + 1;
      members.push({
        id: newId,
        avatar: '../pic/head/head1.png', // 默认头像
        ...memberData
      });
      showNotification('成员添加成功！', 'success');
    }

    renderMembers();
    memberModal.style.display = 'none';
  });

  // 编辑成员
  membersTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const member = members.find(item => item.id === id);
      if (member) {
        currentEditId = id;
        modalTitle.textContent = '编辑成员';
        
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberRole').value = member.role;
        document.getElementById('memberMajor').value = member.major;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberPhone').value = member.phone || '';
        document.getElementById('memberStatus').value = member.status;
        document.getElementById('memberBio').value = member.bio || '';
        document.getElementById('memberResearch').value = member.research || '';
        
        memberModal.style.display = 'flex';
      }
    }
  });

  // 删除成员
  membersTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      const member = members.find(item => item.id === id);
      if (member && confirm(`确定要删除成员"${member.name}"吗？`)) {
        members = members.filter(item => item.id !== id);
        renderMembers();
        showNotification('成员删除成功！', 'success');
      }
    }
  });

  // 筛选成员
  function filterMembers() {
    const searchTerm = searchInput.value.toLowerCase();
    const roleFilterValue = roleFilter.value;
    const statusFilterValue = statusFilter.value;
    
    const filteredMembers = members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm) ||
                           member.major.toLowerCase().includes(searchTerm) ||
                           member.email.toLowerCase().includes(searchTerm) ||
                           (member.bio && member.bio.toLowerCase().includes(searchTerm)) ||
                           (member.research && member.research.toLowerCase().includes(searchTerm));
      const matchesRole = !roleFilterValue || member.role === roleFilterValue;
      const matchesStatus = !statusFilterValue || member.status === statusFilterValue;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    renderMembers(filteredMembers);
  }

  // 渲染成员列表
  function renderMembers(data = members) {
    membersTableBody.innerHTML = '';
    
    data.forEach(member => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="member-avatar">
            <img src="${member.avatar}" alt="${member.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2YzNmZDMiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo='">
          </div>
        </td>
        <td>${member.name}</td>
        <td><span class="role-tag ${member.role}">${getRoleName(member.role)}</span></td>
        <td>${member.major}</td>
        <td>${member.email}</td>
        <td><span class="status-badge ${member.status}">${getStatusName(member.status)}</span></td>
        <td>
          <button class="action-btn edit" data-id="${member.id}">编辑</button>
          <button class="action-btn delete" data-id="${member.id}">删除</button>
        </td>
      `;
      membersTableBody.appendChild(row);
    });
  }

  // 获取角色名称
  function getRoleName(role) {
    const roleNames = {
      'advisor': '导师',
      'phd': '博士生',
      'master': '硕士生',
      'undergraduate': '本科生',
      'researcher': '研究员'
    };
    return roleNames[role] || role;
  }

  // 获取状态名称
  function getStatusName(status) {
    const statusNames = {
      'active': '在职',
      'graduated': '已毕业',
      'visiting': '访问学者'
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

  // 附加样式（美化通知下拉）
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

  // 初始化页面
  renderMembers();
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