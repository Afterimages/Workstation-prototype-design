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

  // 初始化页面
  renderAchievements();
}); 