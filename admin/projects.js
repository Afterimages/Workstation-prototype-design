// 项目管理页面脚本
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
  const statusFilter = document.getElementById('statusFilter');
  const addProjectBtn = document.getElementById('addProjectBtn');
  const projectModal = document.getElementById('projectModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const projectForm = document.getElementById('projectForm');
  const modalTitle = document.getElementById('modalTitle');
  const projectsTableBody = document.getElementById('projectsTableBody');

  // 模拟项目数据
  let projects = [
    {
      id: 1,
      name: '基于深度学习的认知过程建模',
      category: 'research',
      leader: '张明华',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      progress: 65,
      status: 'ongoing',
      budget: 50.0,
      description: '本项目旨在利用深度学习技术建立更准确的认知过程模型，为认知科学研究提供新的技术手段。',
      members: '张明华、李思思、王浩然',
      goals: '建立基于深度学习的认知过程建模框架，提高认知模型的准确性和可解释性。'
    },
    {
      id: 2,
      name: '认知计算平台v3.0开发',
      category: 'development',
      leader: '李思思',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      progress: 45,
      status: 'ongoing',
      budget: 30.0,
      description: '开发新一代认知计算平台，提供更强大的认知建模和分析工具。',
      members: '李思思、陈小雨、刘志强',
      goals: '完成认知计算平台v3.0的开发，提供完整的认知建模工具链。'
    },
    {
      id: 3,
      name: '多模态感知融合算法研究',
      category: 'research',
      leader: '王浩然',
      startDate: '2024-02-01',
      endDate: '2024-06-30',
      progress: 80,
      status: 'ongoing',
      budget: 25.0,
      description: '研究多模态感知数据的融合算法，提高感知系统的准确性和鲁棒性。',
      members: '王浩然、张明华',
      goals: '提出创新的多模态感知融合算法，在多个应用场景中验证其有效性。'
    },
    {
      id: 4,
      name: '脑机接口技术合作研究',
      category: 'cooperation',
      leader: '刘志强',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      progress: 30,
      status: 'ongoing',
      budget: 80.0,
      description: '与外部机构合作开展脑机接口技术研究，推动相关技术的产业化应用。',
      members: '刘志强、张明华、李思思',
      goals: '建立稳定的脑机接口技术合作平台，推动技术成果转化。'
    },
    {
      id: 5,
      name: '认知科学基础理论研究',
      category: 'research',
      leader: '张明华',
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      progress: 100,
      status: 'completed',
      budget: 40.0,
      description: '开展认知科学基础理论研究，为实验室的科研工作奠定理论基础。',
      members: '张明华、王浩然',
      goals: '完成认知科学基础理论体系的构建，发表高水平学术论文。'
    },
    {
      id: 6,
      name: '人工智能教育平台开发',
      category: 'development',
      leader: '陈小雨',
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      progress: 15,
      status: 'planning',
      budget: 20.0,
      description: '开发面向教育领域的人工智能平台，为教学和科研提供支持。',
      members: '陈小雨、李思思',
      goals: '完成人工智能教育平台的开发，支持多种教学模式和场景。'
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
    filterProjects();
  });

  // 分类筛选
  categoryFilter.addEventListener('change', function() {
    filterProjects();
  });

  // 状态筛选
  statusFilter.addEventListener('change', function() {
    filterProjects();
  });

  // 添加项目按钮
  addProjectBtn.addEventListener('click', function() {
    currentEditId = null;
    modalTitle.textContent = '添加项目';
    projectForm.reset();
    
    // 设置默认开始时间为当前日期
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('projectStartDate').value = today;
    
    projectModal.style.display = 'flex';
  });

  // 关闭弹窗
  closeModal.addEventListener('click', function() {
    projectModal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', function() {
    projectModal.style.display = 'none';
  });

  // 点击弹窗外部关闭
  projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
      projectModal.style.display = 'none';
    }
  });

  // 表单提交
  projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(projectForm);
    const projectData = {
      name: formData.get('name'),
      category: formData.get('category'),
      leader: formData.get('leader'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      progress: parseInt(formData.get('progress')) || 0,
      status: formData.get('status'),
      budget: parseFloat(formData.get('budget')) || 0,
      description: formData.get('description'),
      members: formData.get('members'),
      goals: formData.get('goals')
    };

    if (currentEditId) {
      // 编辑现有项目
      const index = projects.findIndex(item => item.id === currentEditId);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...projectData };
        showNotification('项目信息更新成功！', 'success');
      }
    } else {
      // 添加新项目
      const newId = Math.max(...projects.map(item => item.id)) + 1;
      projects.push({
        id: newId,
        ...projectData
      });
      showNotification('项目添加成功！', 'success');
    }

    renderProjects();
    projectModal.style.display = 'none';
  });

  // 编辑项目
  projectsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const project = projects.find(item => item.id === id);
      if (project) {
        currentEditId = id;
        modalTitle.textContent = '编辑项目';
        
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectLeader').value = project.leader;
        document.getElementById('projectStartDate').value = project.startDate;
        document.getElementById('projectEndDate').value = project.endDate;
        document.getElementById('projectProgress').value = project.progress;
        document.getElementById('projectStatus').value = project.status;
        document.getElementById('projectBudget').value = project.budget;
        document.getElementById('projectDescription').value = project.description || '';
        document.getElementById('projectMembers').value = project.members || '';
        document.getElementById('projectGoals').value = project.goals || '';
        
        projectModal.style.display = 'flex';
      }
    }
  });

  // 删除项目
  projectsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      const project = projects.find(item => item.id === id);
      if (project && confirm(`确定要删除项目"${project.name}"吗？`)) {
        projects = projects.filter(item => item.id !== id);
        renderProjects();
        showNotification('项目删除成功！', 'success');
      }
    }
  });

  // 筛选项目
  function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilterValue = categoryFilter.value;
    const statusFilterValue = statusFilter.value;
    
    const filteredProjects = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm) ||
                           project.leader.toLowerCase().includes(searchTerm) ||
                           (project.description && project.description.toLowerCase().includes(searchTerm)) ||
                           (project.members && project.members.toLowerCase().includes(searchTerm)) ||
                           (project.goals && project.goals.toLowerCase().includes(searchTerm));
      const matchesCategory = !categoryFilterValue || project.category === categoryFilterValue;
      const matchesStatus = !statusFilterValue || project.status === statusFilterValue;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    renderProjects(filteredProjects);
  }

  // 渲染项目列表
  function renderProjects(data = projects) {
    projectsTableBody.innerHTML = '';
    
    data.forEach(project => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${project.name}</td>
        <td><span class="category-tag ${project.category}">${getCategoryName(project.category)}</span></td>
        <td>${project.leader}</td>
        <td>${project.startDate}</td>
        <td>${project.endDate}</td>
        <td>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${project.progress}%"></div>
            <span class="progress-text">${project.progress}%</span>
          </div>
        </td>
        <td><span class="status-badge ${project.status}">${getStatusName(project.status)}</span></td>
        <td>
          <button class="action-btn edit" data-id="${project.id}">编辑</button>
          <button class="action-btn delete" data-id="${project.id}">删除</button>
        </td>
      `;
      projectsTableBody.appendChild(row);
    });
  }

  // 获取分类名称
  function getCategoryName(category) {
    const categoryNames = {
      'research': '研究项目',
      'development': '开发项目',
      'cooperation': '合作项目',
      'funding': '资助项目'
    };
    return categoryNames[category] || category;
  }

  // 获取状态名称
  function getStatusName(status) {
    const statusNames = {
      'planning': '规划中',
      'ongoing': '进行中',
      'completed': '已完成',
      'suspended': '暂停'
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

  // 初始化页面
  renderProjects();
}); 