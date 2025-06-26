// 留言管理页面脚本
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
  const statusFilter = document.getElementById('statusFilter');
  const typeFilter = document.getElementById('typeFilter');
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  const exportBtn = document.getElementById('exportBtn');
  const messagesTableBody = document.getElementById('messagesTableBody');

  // 弹窗相关元素
  const viewMessageModal = document.getElementById('viewMessageModal');
  const replyMessageModal = document.getElementById('replyMessageModal');
  const closeViewModal = document.getElementById('closeViewModal');
  const closeReplyModal = document.getElementById('closeReplyModal');
  const closeViewBtn = document.getElementById('closeViewBtn');
  const cancelReplyBtn = document.getElementById('cancelReplyBtn');
  const replyForm = document.getElementById('replyForm');

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

  // 模拟留言数据
  let messages = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@email.com',
      type: 'inquiry',
      subject: '关于实验室实习机会的咨询',
      content: '您好，我是一名计算机科学专业的大三学生，对认知科学和人工智能非常感兴趣。我想了解实验室是否有暑期实习的机会，以及申请的具体要求和流程。希望能够得到您的回复，谢谢！',
      time: '2024-05-20 14:30',
      status: 'unread',
      reply: null,
      replyTime: null
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@email.com',
      type: 'suggestion',
      subject: '对实验室网站的建议',
      content: '实验室的网站设计很专业，内容也很丰富。不过建议可以增加一些互动功能，比如在线问答或者留言板，这样可以让访客更好地了解实验室的研究方向。另外，建议增加一些研究项目的详细介绍页面。',
      time: '2024-05-19 16:45',
      status: 'read',
      reply: null,
      replyTime: null
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@email.com',
      type: 'cooperation',
      subject: '寻求科研合作机会',
      content: '我是某大学计算机学院的教师，主要从事机器学习相关研究。看到贵实验室在认知科学领域的研究成果，非常感兴趣。希望能够探讨可能的科研合作机会，特别是在多模态感知融合方面的合作。',
      time: '2024-05-18 09:15',
      status: 'replied',
      reply: '感谢您的关注！我们非常欢迎与您进行科研合作。关于多模态感知融合的研究，我们确实有一些正在进行的工作。建议我们可以先安排一次线上会议，详细讨论合作的具体方向和方式。',
      replyTime: '2024-05-19 10:30'
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@email.com',
      type: 'inquiry',
      subject: '关于研究生招生的问题',
      content: '您好，我想咨询一下实验室的研究生招生情况。我本科是心理学专业，对认知科学很感兴趣，想了解实验室是否招收跨专业的学生，以及具体的招生要求和考试科目。',
      time: '2024-05-20 11:20',
      status: 'unread',
      reply: null,
      replyTime: null
    },
    {
      id: 5,
      name: '孙七',
      email: 'sunqi@email.com',
      type: 'other',
      subject: '感谢实验室的回复',
      content: '非常感谢实验室的及时回复！我已经收到了关于实习申请的详细说明，会按照要求准备相关材料。期待能够有机会在实验室学习和工作。',
      time: '2024-05-15 13:30',
      status: 'archived',
      reply: '很高兴收到您的感谢！我们也很期待您的加入。如果在申请过程中有任何问题，随时可以联系我们。祝您申请顺利！',
      replyTime: '2024-05-16 09:45'
    }
  ];

  let currentMessageId = null;

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
    filterMessages();
  });

  // 状态筛选
  statusFilter.addEventListener('change', function() {
    filterMessages();
  });

  // 类型筛选
  typeFilter.addEventListener('change', function() {
    filterMessages();
  });

  // 全部标记已读
  markAllReadBtn.addEventListener('click', function() {
    if (confirm('确定要将所有未读留言标记为已读吗？')) {
      messages.forEach(message => {
        if (message.status === 'unread') {
          message.status = 'read';
        }
      });
      renderMessages();
      showNotification('已将所有未读留言标记为已读！', 'success');
    }
  });

  // 导出留言
  exportBtn.addEventListener('click', function() {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `留言数据_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('留言数据导出成功！', 'success');
  });

  // 查看留言
  messagesTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('view')) {
      const id = parseInt(e.target.dataset.id);
      const message = messages.find(item => item.id === id);
      if (message) {
        showMessageDetail(message);
        // 标记为已读
        if (message.status === 'unread') {
          message.status = 'read';
          renderMessages();
        }
      }
    }
  });

  // 回复留言
  messagesTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('reply')) {
      const id = parseInt(e.target.dataset.id);
      const message = messages.find(item => item.id === id);
      if (message) {
        showReplyForm(message);
      }
    }
  });

  // 删除留言
  messagesTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      const message = messages.find(item => item.id === id);
      if (message && confirm(`确定要删除留言"${message.subject}"吗？`)) {
        messages = messages.filter(item => item.id !== id);
        renderMessages();
        showNotification('留言删除成功！', 'success');
      }
    }
  });

  // 关闭查看弹窗
  closeViewModal.addEventListener('click', function() {
    viewMessageModal.style.display = 'none';
  });

  closeViewBtn.addEventListener('click', function() {
    viewMessageModal.style.display = 'none';
  });

  // 关闭回复弹窗
  closeReplyModal.addEventListener('click', function() {
    replyMessageModal.style.display = 'none';
  });

  cancelReplyBtn.addEventListener('click', function() {
    replyMessageModal.style.display = 'none';
  });

  // 点击弹窗外部关闭
  viewMessageModal.addEventListener('click', function(e) {
    if (e.target === viewMessageModal) {
      viewMessageModal.style.display = 'none';
    }
  });

  replyMessageModal.addEventListener('click', function(e) {
    if (e.target === replyMessageModal) {
      replyMessageModal.style.display = 'none';
    }
  });

  // 从查看弹窗跳转到回复
  document.getElementById('replyFromViewBtn').addEventListener('click', function() {
    viewMessageModal.style.display = 'none';
    const message = messages.find(item => item.id === currentMessageId);
    if (message) {
      showReplyForm(message);
    }
  });

  // 回复表单提交
  replyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(replyForm);
    const replyData = {
      subject: formData.get('subject'),
      content: formData.get('content')
    };

    const message = messages.find(item => item.id === currentMessageId);
    if (message) {
      message.reply = replyData.content;
      message.replyTime = new Date().toLocaleString('zh-CN');
      message.status = 'replied';
      
      renderMessages();
      replyMessageModal.style.display = 'none';
      showNotification('回复发送成功！', 'success');
    }
  });

  // 显示留言详情
  function showMessageDetail(message) {
    currentMessageId = message.id;
    
    document.getElementById('viewName').textContent = message.name;
    document.getElementById('viewEmail').textContent = message.email;
    document.getElementById('viewType').textContent = getTypeName(message.type);
    document.getElementById('viewTime').textContent = message.time;
    document.getElementById('viewContent').textContent = message.content;
    
    if (message.reply) {
      document.getElementById('viewReply').style.display = 'block';
      document.getElementById('viewReplyText').textContent = message.reply;
      document.getElementById('viewReplyTime').textContent = `回复时间：${message.replyTime}`;
    } else {
      document.getElementById('viewReply').style.display = 'none';
    }
    
    viewMessageModal.style.display = 'flex';
  }

  // 显示回复表单
  function showReplyForm(message) {
    currentMessageId = message.id;
    
    document.getElementById('replyToName').textContent = message.name;
    document.getElementById('replyToEmail').textContent = message.email;
    document.getElementById('replySubject').value = `回复：${message.subject}`;
    document.getElementById('replyContent').value = '';
    
    replyMessageModal.style.display = 'flex';
  }

  // 筛选留言
  function filterMessages() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilterValue = statusFilter.value;
    const typeFilterValue = typeFilter.value;
    
    const filteredMessages = messages.filter(message => {
      const matchesSearch = message.name.toLowerCase().includes(searchTerm) ||
                           message.email.toLowerCase().includes(searchTerm) ||
                           message.subject.toLowerCase().includes(searchTerm) ||
                           message.content.toLowerCase().includes(searchTerm);
      const matchesStatus = !statusFilterValue || message.status === statusFilterValue;
      const matchesType = !typeFilterValue || message.type === typeFilterValue;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    renderMessages(filteredMessages);
  }

  // 渲染留言列表
  function renderMessages(data = messages) {
    messagesTableBody.innerHTML = '';
    
    data.forEach(message => {
      const row = document.createElement('tr');
      row.className = `message-row ${message.status}`;
      row.dataset.id = message.id;
      
      row.innerHTML = `
        <td><span class="status-badge ${message.status}">${getStatusName(message.status)}</span></td>
        <td>${message.name}</td>
        <td>${message.email}</td>
        <td><span class="type-tag ${message.type}">${getTypeName(message.type)}</span></td>
        <td>${message.subject}</td>
        <td>${message.time}</td>
        <td>
          <button class="action-btn view" data-id="${message.id}">查看</button>
          <button class="action-btn reply" data-id="${message.id}">回复</button>
          <button class="action-btn delete" data-id="${message.id}">删除</button>
        </td>
      `;
      messagesTableBody.appendChild(row);
    });
  }

  // 获取状态名称
  function getStatusName(status) {
    const statusNames = {
      'unread': '未读',
      'read': '已读',
      'replied': '已回复',
      'archived': '已归档'
    };
    return statusNames[status] || status;
  }

  // 获取类型名称
  function getTypeName(type) {
    const typeNames = {
      'inquiry': '咨询',
      'suggestion': '建议',
      'cooperation': '合作',
      'other': '其他'
    };
    return typeNames[type] || type;
  }

  // 生成CSV数据
  function generateCSV() {
    const headers = ['ID', '留言人', '邮箱', '类型', '主题', '留言内容', '留言时间', '状态', '回复内容', '回复时间'];
    const csvRows = [headers.join(',')];
    
    messages.forEach(message => {
      const row = [
        message.id,
        `"${message.name}"`,
        `"${message.email}"`,
        `"${getTypeName(message.type)}"`,
        `"${message.subject}"`,
        `"${message.content.replace(/"/g, '""')}"`,
        `"${message.time}"`,
        `"${getStatusName(message.status)}"`,
        `"${message.reply ? message.reply.replace(/"/g, '""') : ''}"`,
        `"${message.replyTime || ''}"`
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
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

  // 初始化页面
  renderMessages();
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