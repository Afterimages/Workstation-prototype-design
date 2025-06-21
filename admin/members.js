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

  // 初始化页面
  renderMembers();
}); 