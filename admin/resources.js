// 后台资源管理脚本
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser') || '管理员';
    const headerUsername = document.getElementById('headerUsername');
    if (headerUsername) headerUsername.textContent = currentUser;

    // 模拟资源数据
    let resourcesData = [
        {
            id: 1,
            title: '基于深度学习的图像识别算法研究报告',
            titleEn: 'Deep Learning-based Image Recognition Algorithm Research Report',
            category: 'technical',
            categoryName: '技术成果',
            categoryNameEn: 'Technical Achievements',
            description: '详细介绍实验室在图像识别领域的最新研究成果，包含算法原理、实验数据和性能分析。',
            descriptionEn: 'Detailed introduction to the laboratory\'s latest research achievements in image recognition, including algorithm principles, experimental data and performance analysis.',
            fileType: 'pdf',
            fileName: 'image_recognition_research.pdf',
            fileSize: '2.5MB',
            downloadCount: 156,
            uploadDate: '2024-01-15',
            status: 'active',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 2,
            title: '国家自然科学基金申请书模板',
            titleEn: 'National Natural Science Foundation Application Template',
            category: 'funding',
            categoryName: '基金申报书',
            categoryNameEn: 'Funding Proposals',
            description: '标准化的基金申请书模板，包含格式要求和填写指南，适用于各类科研项目申请。',
            descriptionEn: 'Standardized funding application template with format requirements and filling guidelines, suitable for various research project applications.',
            fileType: 'doc',
            fileName: 'funding_application_template.doc',
            fileSize: '1.8MB',
            downloadCount: 89,
            uploadDate: '2024-01-10',
            status: 'active',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 3,
            title: '认知科学实验室年度研究报告2023',
            titleEn: 'Cognitive Science Laboratory Annual Research Report 2023',
            category: 'research',
            categoryName: '研究报告',
            categoryNameEn: 'Research Reports',
            description: '2023年度实验室研究工作总结，涵盖主要研究方向、重要发现和未来规划。',
            descriptionEn: '2023 annual laboratory research work summary, covering main research directions, important discoveries and future plans.',
            fileType: 'pdf',
            fileName: 'annual_report_2023.pdf',
            fileSize: '4.2MB',
            downloadCount: 203,
            uploadDate: '2024-01-05',
            status: 'active',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 4,
            title: '智能数据分析软件使用手册',
            titleEn: 'Intelligent Data Analysis Software User Manual',
            category: 'software',
            categoryName: '软件手册',
            categoryNameEn: 'Software Manuals',
            description: '实验室自主研发的数据分析软件详细使用说明，包含安装指南、功能介绍和案例分析。',
            descriptionEn: 'Detailed usage instructions for the laboratory\'s self-developed data analysis software, including installation guide, function introduction and case analysis.',
            fileType: 'pdf',
            fileName: 'data_analysis_manual.pdf',
            fileSize: '3.1MB',
            downloadCount: 127,
            uploadDate: '2024-01-08',
            status: 'inactive',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 5,
            title: '认知心理学实验设计课程材料',
            titleEn: 'Cognitive Psychology Experiment Design Course Materials',
            category: 'teaching',
            categoryName: '教学材料',
            categoryNameEn: 'Teaching Materials',
            description: '认知心理学实验设计课程的完整教学材料，包含课件、实验指导书和参考资料。',
            descriptionEn: 'Complete teaching materials for cognitive psychology experiment design course, including courseware, experiment guide and reference materials.',
            fileType: 'zip',
            fileName: 'psychology_course_materials.zip',
            fileSize: '15.6MB',
            downloadCount: 78,
            uploadDate: '2024-01-12',
            status: 'active',
            downloadUrl: '#',
            previewUrl: '#'
        }
    ];

    let currentPage = 1;
    let itemsPerPage = 10;
    let filteredResources = [...resourcesData];
    let editingResourceId = null;

    // 获取DOM元素
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const resourcesTableBody = document.getElementById('resourcesTableBody');
    const pageInfo = document.getElementById('pageInfo');
    const resourceModal = document.getElementById('resourceModal');
    const modalTitle = document.getElementById('modalTitle');
    const resourceForm = document.getElementById('resourceForm');
    const addResourceBtn = document.getElementById('addResourceBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');

    // 文件类型图标映射
    const fileTypeIcons = {
        'pdf': '📄',
        'doc': '📝',
        'ppt': '📊',
        'xls': '📈',
        'zip': '📦',
        'code': '💻'
    };

    // 分类名称映射
    const categoryNames = {
        'technical': '技术成果',
        'funding': '基金申报书',
        'research': '研究报告',
        'software': '软件手册',
        'teaching': '教学材料'
    };

    // 渲染资源表格行
    function renderResourceRow(resource) {
        const fileIcon = fileTypeIcons[resource.fileType] || '📄';
        const categoryClass = `category-${resource.category}`;
        const statusClass = resource.status === 'active' ? 'status-badge published' : 'status-badge draft';
        const statusText = resource.status === 'active' ? '已发布' : '未发布';

        return `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; margin-right: 8px; background: ${getFileTypeColor(resource.fileType)};">
                            ${fileIcon}
                        </div>
                        <div>
                            <div style="font-weight: 500; color: #333;">${resource.title}</div>
                            <div style="font-size: 12px; color: #666;">${resource.fileName}</div>
                        </div>
                    </div>
                </td>
                <td><span class="category-tag ${resource.category}">${resource.categoryName}</span></td>
                <td>${resource.fileSize}</td>
                <td>${resource.downloadCount}</td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>${formatDate(resource.uploadDate)}</td>
                <td>
                    <button class="action-btn edit" onclick="editResource(${resource.id})">编辑</button>
                    <button class="action-btn delete" onclick="deleteResource(${resource.id})">删除</button>
                </td>
            </tr>
        `;
    }

    // 获取文件类型颜色
    function getFileTypeColor(fileType) {
        const colors = {
            'pdf': '#e74c3c',
            'doc': '#3498db',
            'ppt': '#e67e22',
            'xls': '#27ae60',
            'zip': '#9b59b6',
            'code': '#34495e'
        };
        return colors[fileType] || '#e74c3c';
    }

    // 格式化日期
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN');
    }

    // 过滤资源
    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        const statusValue = statusFilter.value;

        filteredResources = resourcesData.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) ||
                                resource.titleEn.toLowerCase().includes(searchTerm) ||
                                resource.fileName.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryValue || resource.category === categoryValue;
            const matchesStatus = !statusValue || resource.status === statusValue;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        currentPage = 1;
        renderResources();
    }

    // 渲染资源列表
    function renderResources() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageResources = filteredResources.slice(startIndex, endIndex);

        resourcesTableBody.innerHTML = pageResources.map(resource => 
            renderResourceRow(resource)
        ).join('');

        // 更新分页信息
        const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
        pageInfo.textContent = `第 ${currentPage} 页，共 ${totalPages} 页`;
    }

    // 切换页面
    window.changePage = function(direction) {
        const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
        const newPage = currentPage + direction;

        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            renderResources();
        }
    };

    // 打开添加模态框
    window.openAddModal = function() {
        editingResourceId = null;
        modalTitle.textContent = '添加资源';
        resourceForm.reset();
        resourceModal.style.display = 'block';
    };

    // 打开编辑模态框
    window.editResource = function(resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
            editingResourceId = resourceId;
            modalTitle.textContent = '编辑资源';
            
            // 填充表单数据
            document.getElementById('resourceTitle').value = resource.title;
            document.getElementById('resourceCategory').value = resource.category;
            document.getElementById('resourceDescription').value = resource.description;
            document.getElementById('resourceStatus').value = resource.status;
            
            resourceModal.style.display = 'block';
        }
    };

    // 删除资源
    window.deleteResource = function(resourceId) {
        if (confirm('确定要删除这个资源吗？此操作不可撤销。')) {
            resourcesData = resourcesData.filter(r => r.id !== resourceId);
            filterResources();
            showNotification('资源删除成功', 'success');
        }
    };

    // 保存资源
    function saveResource(e) {
        e.preventDefault();
        
        const formData = new FormData(resourceForm);
        const title = formData.get('title');
        const category = formData.get('category');
        const description = formData.get('description');
        const status = formData.get('status');
        const file = formData.get('file');

        if (!title || !category) {
            showNotification('请填写必填字段', 'error');
            return;
        }

        if (editingResourceId) {
            // 编辑现有资源
            const resourceIndex = resourcesData.findIndex(r => r.id === editingResourceId);
            if (resourceIndex !== -1) {
                resourcesData[resourceIndex] = {
                    ...resourcesData[resourceIndex],
                    title: title,
                    category: category,
                    categoryName: categoryNames[category],
                    description: description,
                    status: status
                };
                showNotification('资源更新成功', 'success');
            }
        } else {
            // 添加新资源
            if (!file || file.size === 0) {
                showNotification('请选择要上传的文件', 'error');
                return;
            }

            const newResource = {
                id: Date.now(),
                title: title,
                titleEn: title, // 简化处理，实际项目中应该有英文标题
                category: category,
                categoryName: categoryNames[category],
                categoryNameEn: categoryNames[category], // 简化处理
                description: description,
                descriptionEn: description, // 简化处理
                fileType: getFileType(file.name),
                fileName: file.name,
                fileSize: formatFileSize(file.size),
                downloadCount: 0,
                uploadDate: new Date().toISOString().split('T')[0],
                status: status,
                downloadUrl: '#',
                previewUrl: '#'
            };

            resourcesData.unshift(newResource);
            showNotification('资源添加成功', 'success');
        }

        closeModalFunc();
        filterResources();
    }

    // 关闭模态框
    function closeModalFunc() {
        resourceModal.style.display = 'none';
        editingResourceId = null;
    }

    // 获取文件类型
    function getFileType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        const typeMap = {
            'pdf': 'pdf',
            'doc': 'doc',
            'docx': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'xls': 'xls',
            'xlsx': 'xls',
            'zip': 'zip',
            'rar': 'zip'
        };
        return typeMap[extension] || 'pdf';
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 显示通知
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        // 根据类型设置背景色
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 事件监听器
    searchInput.addEventListener('input', filterResources);
    categoryFilter.addEventListener('change', filterResources);
    statusFilter.addEventListener('change', filterResources);
    addResourceBtn.addEventListener('click', openAddModal);
    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);
    resourceForm.addEventListener('submit', saveResource);

    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === resourceModal) {
            closeModalFunc();
        }
    });

    // 页面初始化
    function initPage() {
        renderResources();
        checkLoginStatus();
        setupEventListeners();
    }

    // 检查登录状态
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        if (!isLoggedIn || !currentUser) {
            window.location.href = '../login.html';
        }
    }

    // 设置事件监听器
    function setupEventListeners() {
        // 退出登录
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('确定要退出登录吗？')) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    window.location.href = '../login.html';
                }
            });
        }

        // 菜单切换
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                document.body.classList.toggle('sidebar-collapsed');
            });
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

        // 顶部导航栏通知下拉列表（悬挂于导航栏下方）
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
    }

    // 页面初始化
    initPage();

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
}); 