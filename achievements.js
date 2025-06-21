// 分类过滤功能
const filterBtns = document.querySelectorAll('.filter-btn');
const achievementCards = document.querySelectorAll('.achievement-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    
    // 更新按钮状态
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // 过滤卡片
    achievementCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
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
  document.querySelector('h2').textContent = isEN ? 'Achievements' : '成果展示';
  
  // 更新过滤按钮
  const filterTexts = isEN ? ['All', 'Papers', 'Patents', 'Software', 'Awards'] : ['全部', '论文', '专利', '软件系统', '奖项'];
  document.querySelectorAll('.filter-btn').forEach((btn, i) => {
    btn.textContent = filterTexts[i];
  });
  
  // 更新成果卡片内容
  const titles = isEN ? [
    'Deep Learning-based Cognitive Process Modeling Method',
    'Intelligent Control System Based on EEG Signals',
    'Cognitive Modeling Platform v2.0',
    'Provincial Science and Technology Progress First Prize',
    'Multimodal Perception Fusion Algorithm Research',
    'Intelligent Diagnosis System'
  ] : [
    '基于深度学习的认知过程建模方法',
    '一种基于脑电信号的智能控制系统',
    '认知建模平台v2.0',
    '省级科技进步一等奖',
    '多模态感知融合算法研究',
    '智能诊断系统'
  ];
  
  const descs = isEN ? [
    'Published in Nature Machine Intelligence, proposing a new cognitive modeling framework that achieved SOTA results on multiple benchmark datasets.',
    'Patent invention, realizing real-time control based on EEG signals, applicable to intelligent prosthetics, wheelchairs and other assistive devices.',
    'Open-source software system providing complete cognitive process modeling toolchain, supporting multiple modeling methods and visualization analysis.',
    'Received provincial science and technology progress first prize for outstanding contributions in cognitive science and AI cross-disciplinary research.',
    'Published in IEEE TPAMI, proposing a new multimodal perception fusion method, achieving important breakthroughs in robot perception.',
    'Medical AI system based on deep learning technology, reaching expert level in multiple disease diagnosis tasks.'
  ] : [
    '发表于Nature Machine Intelligence，提出了一种新的认知建模框架，在多个基准数据集上取得了SOTA结果。',
    '发明专利，实现了基于脑电信号的实时控制，可用于智能假肢、轮椅等辅助设备。',
    '开源软件系统，提供完整的认知过程建模工具链，支持多种建模方法和可视化分析。',
    '因在认知科学与人工智能交叉领域的突出贡献，获得省级科技进步一等奖。',
    '发表于IEEE TPAMI，提出了一种新的多模态感知融合方法，在机器人感知领域取得重要突破。',
    '医疗AI系统，基于深度学习技术，在多个疾病诊断任务中达到专家水平。'
  ];
  
  const categories = isEN ? ['Paper', 'Patent', 'Software', 'Award', 'Paper', 'Software'] : ['论文', '专利', '软件系统', '奖项', '论文', '软件系统'];
  
  document.querySelectorAll('.achievement-card').forEach((card, i) => {
    card.querySelector('h3').textContent = titles[i];
    card.querySelector('p').textContent = descs[i];
    card.querySelector('.category').textContent = categories[i];
  });
  
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
}; 