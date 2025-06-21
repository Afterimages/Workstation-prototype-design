// 新闻详情数据
const newsDetails = {
  1: {
    title: '实验室荣获省级科技进步奖',
    date: '2024-06-01',
    category: '获奖',
    content: `
      <p>我实验室在认知科学与人工智能交叉领域的研究成果获得省级科技进步一等奖，这是对我实验室科研实力的充分肯定。</p>
      <p>该奖项主要表彰了实验室在以下方面的突出贡献：</p>
      <ul>
        <li>认知过程建模理论的创新性突破</li>
        <li>脑机接口技术的实际应用推广</li>
        <li>智能感知算法的工程化实现</li>
        <li>产学研合作模式的探索与实践</li>
      </ul>
      <p>实验室将继续秉承"认知赋能智能，智能服务社会"的使命，在相关领域开展更深入的研究工作，为科技进步和社会发展做出更大贡献。</p>
    `
  },
  2: {
    title: '新一代脑机接口系统发布',
    date: '2024-05-20',
    category: '技术发布',
    content: `
      <p>实验室成功研发新一代脑机接口系统，在信号处理精度和响应速度方面取得重大突破，为神经康复领域带来新的可能。</p>
      <p>新系统的主要特点包括：</p>
      <ul>
        <li>信号采集精度提升40%，达到国际先进水平</li>
        <li>响应时间缩短至50毫秒以内</li>
        <li>支持多通道并行处理，可同时处理16路脑电信号</li>
        <li>采用深度学习算法，识别准确率达到95%以上</li>
        <li>模块化设计，便于集成到不同应用场景</li>
      </ul>
      <p>该系统已在多家医院进行临床试验，在脑卒中康复、脊髓损伤患者辅助控制等方面取得了显著效果。</p>
    `
  },
  3: {
    title: '团队成员论文被顶会录用',
    date: '2024-05-10',
    category: '学术成果',
    content: `
      <p>实验室博士生张明的论文《基于深度学习的认知过程建模》被国际顶级会议NeurIPS 2024录用，展现了实验室在学术研究方面的实力。</p>
      <p>该论文的主要贡献包括：</p>
      <ul>
        <li>提出了新的认知过程建模框架CogNet</li>
        <li>设计了专门用于认知建模的注意力机制</li>
        <li>在多个认知任务数据集上验证了方法的有效性</li>
        <li>开源了相关代码和数据集</li>
      </ul>
      <p>NeurIPS是机器学习领域最顶级的国际会议之一，论文录用率仅为20%左右。此次论文被录用，标志着实验室在认知科学和人工智能交叉领域的研究达到了国际先进水平。</p>
    `
  },
  4: {
    title: '举办智能科学前沿讲座',
    date: '2024-04-28',
    category: '学术活动',
    content: `
      <p>实验室邀请国际知名学者举办智能科学前沿讲座，吸引了校内外200余名师生参加，促进了学术交流与合作。</p>
      <p>讲座邀请了以下知名学者：</p>
      <ul>
        <li>Prof. John Smith (MIT) - 认知科学前沿进展</li>
        <li>Dr. Sarah Johnson (Stanford) - 脑机接口技术发展</li>
        <li>Prof. Michael Chen (UC Berkeley) - 人工智能伦理与安全</li>
      </ul>
      <p>讲座内容涵盖了认知科学、人工智能、脑机接口等多个前沿领域，为师生们提供了宝贵的学习和交流机会。讲座结束后，实验室与多位学者达成了合作意向，将在未来开展联合研究项目。</p>
    `
  },
  5: {
    title: '实验室开放日活动圆满结束',
    date: '2024-04-15',
    category: '活动',
    content: `
      <p>实验室成功举办开放日活动，向公众展示了最新的科研成果和技术应用，增强了社会对人工智能技术的认知。</p>
      <p>开放日活动包括：</p>
      <ul>
        <li>科研成果展示：脑机接口演示、智能机器人互动</li>
        <li>科普讲座：人工智能发展历程与未来展望</li>
        <li>技术体验：VR认知训练、智能诊断系统体验</li>
        <li>互动交流：与研究人员面对面交流</li>
      </ul>
      <p>活动吸引了来自社会各界的人士参加，包括学生、教师、企业代表和普通市民。通过此次活动，实验室向社会展示了人工智能技术的实际应用价值，提高了公众对科技创新的关注度。</p>
    `
  },
  6: {
    title: '与知名企业签署合作协议',
    date: '2024-03-30',
    category: '合作',
    content: `
      <p>实验室与某知名科技企业签署战略合作协议，将在智能医疗、教育AI等领域开展深度合作，推动产学研融合发展。</p>
      <p>合作内容包括：</p>
      <ul>
        <li>联合研发智能医疗诊断系统</li>
        <li>开发个性化教育AI助手</li>
        <li>建立产学研合作基地</li>
        <li>共同申请国家级科研项目</li>
        <li>人才培养与交流计划</li>
      </ul>
      <p>此次合作将充分发挥实验室在基础研究方面的优势和企业在产品化方面的经验，实现优势互补，共同推动人工智能技术在医疗和教育领域的应用发展。</p>
    `
  }
};

// 新闻弹窗功能
const modal = document.getElementById('newsModal');
const closeBtn = document.querySelector('.close-btn');
const newsItems = document.querySelectorAll('.news-item');

newsItems.forEach(item => {
  item.addEventListener('click', () => {
    const newsId = item.dataset.id;
    const newsData = newsDetails[newsId];
    
    document.getElementById('modalTitle').textContent = newsData.title;
    document.getElementById('modalDate').textContent = newsData.date;
    document.getElementById('modalCategory').textContent = newsData.category;
    document.getElementById('modalContent').innerHTML = newsData.content;
    
    modal.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// 分页功能
const pageBtns = document.querySelectorAll('.page-btn');
pageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 这里可以添加实际的分页逻辑
  });
});

// 返回顶部
const toTopBtn = document.getElementById('to-top');
toTopBtn.onclick = () => window.scrollTo({top:0,behavior:'smooth'});

// 简单中英文切换
const langSwitch = document.getElementById('lang-switch');
let isEN = false;
langSwitch.onclick = () => {
  isEN = !isEN;
  langSwitch.textContent = isEN ? '中' : 'EN';
  document.querySelector('.logo').textContent = isEN ? 'Cognitive & Intelligent Science Lab' : '认知与智能科学实验室';
  document.querySelectorAll('nav a')[0].textContent = isEN ? 'Home' : '首页';
  document.querySelectorAll('nav a')[1].textContent = isEN ? 'About' : '实验室简介';
  document.querySelectorAll('nav a')[2].textContent = isEN ? 'Research' : '科研方向';
  document.querySelectorAll('nav a')[3].textContent = isEN ? 'Achievements' : '成果展示';
  document.querySelectorAll('nav a')[4].textContent = isEN ? 'News' : '新闻动态';
  document.querySelectorAll('nav a')[5].textContent = isEN ? 'Contact' : '联系我们';
  document.querySelectorAll('nav a')[6].textContent = isEN ? 'Join Us' : '加入我们';
  document.querySelector('h2').textContent = isEN ? 'News & Notices' : '新闻动态';
  
  // 更新新闻列表内容（简化版，实际项目中可以扩展）
  const newsTitles = isEN ? [
    'Lab Wins Provincial Science and Technology Progress Award',
    'New Generation Brain-Computer Interface System Released',
    'Team Member\'s Paper Accepted by Top Conference',
    'Intelligent Science Frontier Lecture Held',
    'Lab Open Day Event Successfully Concluded',
    'Strategic Cooperation Agreement Signed with Leading Enterprise'
  ] : [
    '实验室荣获省级科技进步奖',
    '新一代脑机接口系统发布',
    '团队成员论文被顶会录用',
    '举办智能科学前沿讲座',
    '实验室开放日活动圆满结束',
    '与知名企业签署合作协议'
  ];
  
  document.querySelectorAll('.news-content h3').forEach((title, i) => {
    title.textContent = newsTitles[i];
  });
  
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
}; 