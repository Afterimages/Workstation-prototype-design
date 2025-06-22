// 资源下载页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 模拟资源数据
    const resourcesData = [
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
            fileSize: '2.5MB',
            downloadCount: 156,
            uploadDate: '2024-01-15',
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
            fileSize: '1.8MB',
            downloadCount: 89,
            uploadDate: '2024-01-10',
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
            fileSize: '4.2MB',
            downloadCount: 203,
            uploadDate: '2024-01-05',
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
            fileSize: '3.1MB',
            downloadCount: 127,
            uploadDate: '2024-01-08',
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
            fileSize: '15.6MB',
            downloadCount: 78,
            uploadDate: '2024-01-12',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 6,
            title: '机器学习算法源代码包',
            titleEn: 'Machine Learning Algorithm Source Code Package',
            category: 'technical',
            categoryName: '技术成果',
            categoryNameEn: 'Technical Achievements',
            description: '实验室开发的机器学习算法完整源代码，包含注释说明和示例程序。',
            descriptionEn: 'Complete source code of machine learning algorithms developed by the laboratory, including comments and example programs.',
            fileType: 'zip',
            fileSize: '8.9MB',
            downloadCount: 234,
            uploadDate: '2024-01-03',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 7,
            title: '省部级科研项目申请书',
            titleEn: 'Provincial and Ministerial Research Project Application',
            category: 'funding',
            categoryName: '基金申报书',
            categoryNameEn: 'Funding Proposals',
            description: '省部级科研项目申请书的成功案例，可作为申请类似项目的参考模板。',
            descriptionEn: 'Successful case of provincial and ministerial research project application, which can be used as a reference template for similar project applications.',
            fileType: 'doc',
            fileSize: '2.1MB',
            downloadCount: 67,
            uploadDate: '2024-01-06',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 8,
            title: '人工智能在医疗诊断中的应用研究',
            titleEn: 'Application Research of Artificial Intelligence in Medical Diagnosis',
            category: 'research',
            categoryName: '研究报告',
            categoryNameEn: 'Research Reports',
            description: '探讨人工智能技术在医疗诊断领域的应用前景和技术挑战。',
            descriptionEn: 'Exploring the application prospects and technical challenges of artificial intelligence technology in medical diagnosis.',
            fileType: 'pdf',
            fileSize: '3.8MB',
            downloadCount: 145,
            uploadDate: '2024-01-09',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 9,
            title: '实验数据可视化工具操作指南',
            titleEn: 'Experimental Data Visualization Tool Operation Guide',
            category: 'software',
            categoryName: '软件手册',
            categoryNameEn: 'Software Manuals',
            description: '实验室数据可视化工具的操作指南，包含界面介绍、功能使用和常见问题解答。',
            descriptionEn: 'Operation guide for laboratory data visualization tools, including interface introduction, function usage and FAQ.',
            fileType: 'pdf',
            fileSize: '2.7MB',
            downloadCount: 93,
            uploadDate: '2024-01-11',
            downloadUrl: '#',
            previewUrl: '#'
        },
        {
            id: 10,
            title: '神经科学实验技术培训材料',
            titleEn: 'Neuroscience Experiment Technology Training Materials',
            category: 'teaching',
            categoryName: '教学材料',
            categoryNameEn: 'Teaching Materials',
            description: '神经科学实验技术的培训材料，包含实验原理、操作步骤和注意事项。',
            descriptionEn: 'Training materials for neuroscience experiment technology, including experimental principles, operation steps and precautions.',
            fileType: 'ppt',
            fileSize: '12.3MB',
            downloadCount: 56,
            uploadDate: '2024-01-14',
            downloadUrl: '#',
            previewUrl: '#'
        }
    ];

    let currentCategory = 'all';
    let currentSearch = '';
    let filteredResources = [...resourcesData];

    // 获取DOM元素
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryTabs = document.getElementById('categoryTabs');
    const resourcesGrid = document.getElementById('resourcesGrid');
    const noResults = document.getElementById('noResults');

    // 文件类型图标映射
    const fileTypeIcons = {
        'pdf': '📄',
        'doc': '📝',
        'ppt': '📊',
        'xls': '📈',
        'zip': '📦',
        'code': '💻'
    };

    // 文件类型CSS类映射
    const fileTypeClasses = {
        'pdf': 'icon-pdf',
        'doc': 'icon-doc',
        'ppt': 'icon-ppt',
        'xls': 'icon-xls',
        'zip': 'icon-zip',
        'code': 'icon-code'
    };

    // 渲染资源卡片
    function renderResourceCard(resource) {
        const isEnglish = document.documentElement.lang === 'en';
        const title = isEnglish ? resource.titleEn : resource.title;
        const description = isEnglish ? resource.descriptionEn : resource.description;
        const categoryName = isEnglish ? resource.categoryNameEn : resource.categoryName;
        
        return `
            <div class="resource-card">
                <div class="resource-header">
                    <div class="resource-icon ${fileTypeClasses[resource.fileType]}">
                        ${fileTypeIcons[resource.fileType]}
                    </div>
                    <div class="resource-info">
                        <h3>${title}</h3>
                        <span class="category">${categoryName}</span>
                    </div>
                </div>
                <div class="resource-description">${description}</div>
                <div class="resource-meta">
                    <span>${resource.fileSize}</span>
                    <span>${resource.downloadCount} 次下载</span>
                    <span>${formatDate(resource.uploadDate)}</span>
                </div>
                <div class="resource-actions">
                    <a href="${resource.downloadUrl}" class="btn-download" onclick="handleDownload(${resource.id})">
                        ${isEnglish ? 'Download' : '下载'}
                    </a>
                    <a href="${resource.previewUrl}" class="btn-preview" onclick="handlePreview(${resource.id})">
                        ${isEnglish ? 'Preview' : '预览'}
                    </a>
                </div>
            </div>
        `;
    }

    // 格式化日期
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN');
    }

    // 过滤资源
    function filterResources() {
        filteredResources = resourcesData.filter(resource => {
            const matchesCategory = currentCategory === 'all' || resource.category === currentCategory;
            const matchesSearch = currentSearch === '' || 
                resource.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                resource.titleEn.toLowerCase().includes(currentSearch.toLowerCase()) ||
                resource.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                resource.descriptionEn.toLowerCase().includes(currentSearch.toLowerCase());
            
            return matchesCategory && matchesSearch;
        });

        renderResources();
    }

    // 渲染资源列表
    function renderResources() {
        if (filteredResources.length === 0) {
            resourcesGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            resourcesGrid.style.display = 'grid';
            noResults.style.display = 'none';
            
            resourcesGrid.innerHTML = filteredResources.map(resource => 
                renderResourceCard(resource)
            ).join('');
        }
    }

    // 搜索功能
    function handleSearch() {
        currentSearch = searchInput.value.trim();
        filterResources();
    }

    // 分类切换
    function handleCategoryChange(category) {
        currentCategory = category;
        
        // 更新分类标签状态
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        filterResources();
    }

    // 下载处理
    window.handleDownload = function(resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
            // 模拟下载
            alert(`开始下载: ${resource.title}`);
            // 实际项目中这里会触发文件下载
            console.log(`Downloading: ${resource.title}`);
        }
    };

    // 预览处理
    window.handlePreview = function(resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
            // 模拟预览
            alert(`预览文件: ${resource.title}`);
            // 实际项目中这里会打开预览窗口
            console.log(`Previewing: ${resource.title}`);
        }
    };

    // 事件监听器
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // 分类标签点击事件
    categoryTabs.addEventListener('click', function(e) {
        if (e.target.classList.contains('category-tab')) {
            const category = e.target.dataset.category;
            handleCategoryChange(category);
        }
    });

    // 初始化页面
    function initPage() {
        renderResources();
        
        // 设置搜索框占位符
        const isEnglish = document.documentElement.lang === 'en';
        searchInput.placeholder = isEnglish ? 'Search resources...' : '搜索资源...';
    }

    // 页面初始化
    initPage();

    // 语言切换处理
    document.addEventListener('languageChanged', function() {
        initPage();
    });
}); 