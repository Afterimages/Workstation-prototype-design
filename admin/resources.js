// 后台资源管理脚本
document.addEventListener('DOMContentLoaded', function() {
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
    }

    // 页面初始化
    initPage();
}); 