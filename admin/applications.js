// 申请管理页面脚本
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
  const selectAll = document.getElementById('selectAll');
  const batchApproveBtn = document.getElementById('batchApproveBtn');
  const exportBtn = document.getElementById('exportBtn');
  const applicationsTableBody = document.getElementById('applicationsTableBody');

  // 弹窗相关元素
  const viewApplicationModal = document.getElementById('viewApplicationModal');
  const reviewApplicationModal = document.getElementById('reviewApplicationModal');
  const closeViewModal = document.getElementById('closeViewModal');
  const closeReviewModal = document.getElementById('closeReviewModal');
  const closeViewBtn = document.getElementById('closeViewBtn');
  const cancelReviewBtn = document.getElementById('cancelReviewBtn');
  const reviewForm = document.getElementById('reviewForm');

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

  // 模拟申请数据
  let applications = [
    {
      id: 1,
      name: '张明',
      email: 'zhangming@email.com',
      phone: '13800138001',
      type: 'internship',
      position: '机器学习实习生',
      time: '2024-05-20 14:30',
      startTime: '2024-06-01',
      status: 'pending',
      priority: 'high',
      education: '北京大学计算机科学专业，大三在读',
      research: '参与过机器学习相关项目，熟悉Python和深度学习框架',
      motivation: '对人工智能和认知科学非常感兴趣，希望通过实习深入了解实验室的研究方向，提升自己的专业技能。',
      attachments: ['简历.pdf', '成绩单.pdf', '项目作品.pdf'],
      review: null,
      reviewTime: null,
      score: null
    },
    {
      id: 2,
      name: '李华',
      email: 'lihua@email.com',
      phone: '13800138002',
      type: 'graduate',
      position: '认知科学硕士',
      time: '2024-05-19 16:45',
      startTime: '2024-09-01',
      status: 'interview',
      priority: 'medium',
      education: '清华大学心理学专业，本科毕业',
      research: '本科期间参与认知心理学实验，对认知科学有浓厚兴趣',
      motivation: '希望继续深造认知科学，特别是人工智能与认知科学的交叉领域。',
      attachments: ['简历.pdf', '成绩单.pdf', '推荐信.pdf', '研究计划.pdf'],
      review: '申请人背景符合要求，建议安排面试进一步了解。',
      reviewTime: '2024-05-20 10:30',
      score: 8
    },
    {
      id: 3,
      name: '王强',
      email: 'wangqiang@email.com',
      phone: '13800138003',
      type: 'postdoc',
      position: '人工智能博士后',
      time: '2024-05-18 09:15',
      startTime: '2024-08-01',
      status: 'approved',
      priority: 'high',
      education: '中科院计算所计算机科学博士',
      research: '博士期间主要从事深度学习研究，发表多篇高水平论文',
      motivation: '希望在博士后期间深入研究认知计算和人工智能的融合。',
      attachments: ['简历.pdf', '博士论文.pdf', '发表论文列表.pdf', '推荐信.pdf'],
      review: '申请人学术背景优秀，研究经历丰富，符合博士后要求。',
      reviewTime: '2024-05-19 14:20',
      score: 9
    },
    {
      id: 4,
      name: '赵敏',
      email: 'zhaomin@email.com',
      phone: '13800138004',
      type: 'visiting',
      position: '认知心理学访问学者',
      time: '2024-05-17 11:20',
      startTime: '2024-07-01',
      status: 'rejected',
      priority: 'low',
      education: '某大学心理学博士',
      research: '主要从事传统心理学研究，缺乏认知科学背景',
      motivation: '希望了解认知科学的最新发展。',
      attachments: ['简历.pdf', '研究计划.pdf'],
      review: '申请人研究方向与实验室重点不符，建议寻找更合适的合作机会。',
      reviewTime: '2024-05-18 16:45',
      score: 5
    },
    {
      id: 5,
      name: '孙丽',
      email: 'sunli@email.com',
      phone: '13800138005',
      type: 'cooperation',
      position: '科研合作项目',
      time: '2024-05-16 13:30',
      startTime: '2024-06-15',
      status: 'accepted',
      priority: 'medium',
      education: '某研究所研究员',
      research: '在认知计算领域有丰富经验，希望开展合作研究',
      motivation: '希望与实验室建立长期合作关系，共同推进认知科学的发展。',
      attachments: ['合作提案.pdf', '研究背景.pdf', '团队介绍.pdf'],
      review: '合作提案具有创新性，符合实验室发展方向。',
      reviewTime: '2024-05-17 09:30',
      score: 8
    }
  ];

  let currentApplicationId = null;
  let selectedApplications = new Set();

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
    filterApplications();
  });

  // 状态筛选
  statusFilter.addEventListener('change', function() {
    filterApplications();
  });

  // 类型筛选
  typeFilter.addEventListener('change', function() {
    filterApplications();
  });

  // 全选功能
  selectAll.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.select-item');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAll.checked;
      if (selectAll.checked) {
        selectedApplications.add(parseInt(checkbox.dataset.id));
      } else {
        selectedApplications.delete(parseInt(checkbox.dataset.id));
      }
    });
    updateBatchActions();
  });

  // 单个选择
  applicationsTableBody.addEventListener('change', function(e) {
    if (e.target.classList.contains('select-item')) {
      const id = parseInt(e.target.dataset.id);
      if (e.target.checked) {
        selectedApplications.add(id);
      } else {
        selectedApplications.delete(id);
      }
      updateBatchActions();
      
      // 更新全选状态
      const checkboxes = document.querySelectorAll('.select-item');
      const checkedBoxes = document.querySelectorAll('.select-item:checked');
      selectAll.checked = checkboxes.length === checkedBoxes.length;
    }
  });

  // 批量通过
  batchApproveBtn.addEventListener('click', function() {
    if (selectedApplications.size === 0) {
      showNotification('请先选择要审核的申请！', 'error');
      return;
    }
    
    if (confirm(`确定要通过选中的 ${selectedApplications.size} 个申请吗？`)) {
      selectedApplications.forEach(id => {
        const application = applications.find(item => item.id === id);
        if (application && application.status === 'pending') {
          application.status = 'approved';
          application.review = '批量审核通过';
          application.reviewTime = new Date().toLocaleString('zh-CN');
          application.score = 7;
        }
      });
      renderApplications();
      selectedApplications.clear();
      updateBatchActions();
      showNotification('批量审核完成！', 'success');
    }
  });

  // 导出申请
  exportBtn.addEventListener('click', function() {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `申请数据_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('申请数据导出成功！', 'success');
  });

  // 查看申请
  applicationsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('view')) {
      const id = parseInt(e.target.dataset.id);
      const application = applications.find(item => item.id === id);
      if (application) {
        showApplicationDetail(application);
      }
    }
  });

  // 审核申请
  applicationsTableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('approve') || e.target.classList.contains('reject') || e.target.classList.contains('accept')) {
      const id = parseInt(e.target.dataset.id);
      const application = applications.find(item => item.id === id);
      if (application) {
        showReviewForm(application, e.target.classList.contains('approve') ? 'approve' : e.target.classList.contains('accept') ? 'accept' : 'reject');
      }
    }
  });

  // 关闭查看弹窗
  closeViewModal.addEventListener('click', function() {
    viewApplicationModal.style.display = 'none';
  });

  closeViewBtn.addEventListener('click', function() {
    viewApplicationModal.style.display = 'none';
  });

  // 关闭审核弹窗
  closeReviewModal.addEventListener('click', function() {
    reviewApplicationModal.style.display = 'none';
  });

  cancelReviewBtn.addEventListener('click', function() {
    reviewApplicationModal.style.display = 'none';
  });

  // 点击弹窗外部关闭
  viewApplicationModal.addEventListener('click', function(e) {
    if (e.target === viewApplicationModal) {
      viewApplicationModal.style.display = 'none';
    }
  });

  reviewApplicationModal.addEventListener('click', function(e) {
    if (e.target === reviewApplicationModal) {
      reviewApplicationModal.style.display = 'none';
    }
  });

  // 从查看弹窗跳转到审核
  document.getElementById('approveFromViewBtn').addEventListener('click', function() {
    viewApplicationModal.style.display = 'none';
    const application = applications.find(item => item.id === currentApplicationId);
    if (application) {
      showReviewForm(application, 'approve');
    }
  });

  document.getElementById('rejectFromViewBtn').addEventListener('click', function() {
    viewApplicationModal.style.display = 'none';
    const application = applications.find(item => item.id === currentApplicationId);
    if (application) {
      showReviewForm(application, 'reject');
    }
  });

  // 审核表单提交
  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(reviewForm);
    const reviewData = {
      decision: formData.get('decision'),
      comment: formData.get('comment'),
      score: formData.get('score') ? parseInt(formData.get('score')) : null
    };

    const application = applications.find(item => item.id === currentApplicationId);
    if (application) {
      application.status = reviewData.decision;
      application.review = reviewData.comment;
      application.reviewTime = new Date().toLocaleString('zh-CN');
      application.score = reviewData.score;
      
      renderApplications();
      reviewApplicationModal.style.display = 'none';
      showNotification('审核完成！', 'success');
    }
  });

  // 显示申请详情
  function showApplicationDetail(application) {
    currentApplicationId = application.id;
    
    document.getElementById('viewAvatar').textContent = application.name.charAt(0);
    document.getElementById('viewName').textContent = application.name;
    document.getElementById('viewEmail').textContent = application.email;
    document.getElementById('viewPhone').textContent = application.phone;
    document.getElementById('viewStatus').textContent = getStatusName(application.status);
    document.getElementById('viewStatus').className = `status-badge ${application.status}`;
    document.getElementById('viewPriority').textContent = getPriorityName(application.priority);
    document.getElementById('viewPriority').className = `priority-badge ${application.priority}`;
    
    document.getElementById('viewType').textContent = getTypeName(application.type);
    document.getElementById('viewPosition').textContent = application.position;
    document.getElementById('viewTime').textContent = application.time;
    document.getElementById('viewStartTime').textContent = application.startTime;
    
    document.getElementById('viewEducation').textContent = application.education;
    document.getElementById('viewResearch').textContent = application.research;
    document.getElementById('viewMotivation').textContent = application.motivation;
    
    // 显示附件
    const attachmentsHtml = application.attachments.map(file => 
      `<div class="attachment-item">📎 ${file}</div>`
    ).join('');
    document.getElementById('viewAttachments').innerHTML = attachmentsHtml;
    
    // 显示审核信息
    if (application.review) {
      document.getElementById('viewReview').style.display = 'block';
      document.getElementById('viewReviewContent').textContent = application.review;
      document.getElementById('viewReviewTime').textContent = `审核时间：${application.reviewTime}`;
    } else {
      document.getElementById('viewReview').style.display = 'none';
    }
    
    viewApplicationModal.style.display = 'flex';
  }

  // 显示审核表单
  function showReviewForm(application, action) {
    currentApplicationId = application.id;
    
    const actionText = action === 'approve' ? '通过' : action === 'accept' ? '录用' : '拒绝';
    document.getElementById('reviewTitle').textContent = `${actionText}申请`;
    document.getElementById('reviewName').textContent = application.name;
    document.getElementById('reviewPosition').textContent = application.position;
    
    // 预设审核决定
    document.getElementById('reviewDecision').value = action === 'approve' ? 'approved' : action === 'accept' ? 'accepted' : 'rejected';
    document.getElementById('reviewComment').value = '';
    document.getElementById('reviewScore').value = '';
    
    reviewApplicationModal.style.display = 'flex';
  }

  // 筛选申请
  function filterApplications() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilterValue = statusFilter.value;
    const typeFilterValue = typeFilter.value;
    
    const filteredApplications = applications.filter(application => {
      const matchesSearch = application.name.toLowerCase().includes(searchTerm) ||
                           application.email.toLowerCase().includes(searchTerm) ||
                           application.position.toLowerCase().includes(searchTerm);
      const matchesStatus = !statusFilterValue || application.status === statusFilterValue;
      const matchesType = !typeFilterValue || application.type === typeFilterValue;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    renderApplications(filteredApplications);
  }

  // 渲染申请列表
  function renderApplications(data = applications) {
    applicationsTableBody.innerHTML = '';
    
    data.forEach(application => {
      const row = document.createElement('tr');
      row.className = `application-row ${application.status}`;
      row.dataset.id = application.id;
      
      row.innerHTML = `
        <td><input type="checkbox" class="select-item" data-id="${application.id}"></td>
        <td>
          <div class="applicant-info">
            <div class="applicant-avatar">${application.name.charAt(0)}</div>
            <div class="applicant-details">
              <div class="applicant-name">${application.name}</div>
              <div class="applicant-email">${application.email}</div>
            </div>
          </div>
        </td>
        <td><span class="type-tag ${application.type}">${getTypeName(application.type)}</span></td>
        <td>${application.position}</td>
        <td>${application.time}</td>
        <td><span class="status-badge ${application.status}">${getStatusName(application.status)}</span></td>
        <td><span class="priority-badge ${application.priority}">${getPriorityName(application.priority)}</span></td>
        <td>
          <button class="action-btn view" data-id="${application.id}">查看</button>
          ${application.status === 'pending' ? `<button class="action-btn approve" data-id="${application.id}">通过</button>` : ''}
          ${application.status === 'approved' ? `<button class="action-btn accept" data-id="${application.id}">录用</button>` : ''}
          <button class="action-btn reject" data-id="${application.id}">拒绝</button>
        </td>
      `;
      applicationsTableBody.appendChild(row);
    });
  }

  // 更新批量操作状态
  function updateBatchActions() {
    batchApproveBtn.disabled = selectedApplications.size === 0;
  }

  // 获取状态名称
  function getStatusName(status) {
    const statusNames = {
      'pending': '待审核',
      'approved': '已通过',
      'rejected': '已拒绝',
      'interview': '面试中',
      'accepted': '已录用'
    };
    return statusNames[status] || status;
  }

  // 获取类型名称
  function getTypeName(type) {
    const typeNames = {
      'internship': '实习申请',
      'graduate': '研究生申请',
      'postdoc': '博士后申请',
      'visiting': '访问学者申请',
      'cooperation': '合作申请'
    };
    return typeNames[type] || type;
  }

  // 获取优先级名称
  function getPriorityName(priority) {
    const priorityNames = {
      'high': '高',
      'medium': '中',
      'low': '低'
    };
    return priorityNames[priority] || priority;
  }

  // 生成CSV数据
  function generateCSV() {
    const headers = ['ID', '申请人', '邮箱', '电话', '申请类型', '申请职位', '申请时间', '期望开始时间', '状态', '优先级', '评分', '审核意见', '审核时间'];
    const csvRows = [headers.join(',')];
    
    applications.forEach(application => {
      const row = [
        application.id,
        `"${application.name}"`,
        `"${application.email}"`,
        `"${application.phone}"`,
        `"${getTypeName(application.type)}"`,
        `"${application.position}"`,
        `"${application.time}"`,
        `"${application.startTime}"`,
        `"${getStatusName(application.status)}"`,
        `"${getPriorityName(application.priority)}"`,
        application.score || '',
        `"${application.review ? application.review.replace(/"/g, '""') : ''}"`,
        `"${application.reviewTime || ''}"`
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
  renderApplications();
  updateBatchActions();
}); 