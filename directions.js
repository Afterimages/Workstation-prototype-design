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
  document.querySelector('h2').textContent = isEN ? 'Research Directions' : '科研方向';
  const titles = isEN ? ['Cognitive Modeling','Artificial Intelligence','Brain-Computer Interface','Intelligent Perception'] : ['认知建模','人工智能','脑机接口','智能感知'];
  const descs = isEN ? [
    'Theoretical modeling and simulation of human cognition, integrating neuroscience, psychology, and AI to explore the essence of cognition and intelligent behavior.',
    'Focus on machine learning, deep learning, NLP, and develop intelligent algorithms and systems for healthcare, education, industry, etc.',
    'Research on EEG signal acquisition, processing, and decoding for efficient brain-device interaction, supporting neuro-rehabilitation and intelligent control.',
    'Multimodal perception and fusion (vision, audio, tactile, etc.) to enhance intelligent systems\' understanding and adaptation to complex environments.'
  ] : [
    '研究人类认知过程的理论建模与仿真，结合神经科学、心理学与人工智能方法，探索认知机制与智能行为的本质。',
    '聚焦机器学习、深度学习、自然语言处理等领域，开发智能算法与系统，推动AI在医疗、教育、工业等行业的应用。',
    '开展脑电信号采集、处理与解码技术研究，实现人脑与外部设备的高效交互，助力神经康复与智能控制。',
    '研究多模态感知与融合技术，包括视觉、听觉、触觉等，提升智能系统对复杂环境的理解与适应能力。'
  ];
  const projects = isEN ? [
    'Related Project: Cognitive Process Modeling Platform',
    'Related Projects: Intelligent Diagnosis System, AI Assistant for Education',
    'Related Projects: Brain-controlled Prosthetics, Neuro-rehabilitation Training System',
    'Related Projects: Multimodal Perception Robot, Environmental Perception Platform'
  ] : [
    '相关项目：认知过程建模平台开发',
    '相关项目：智能诊断系统、教育AI助手',
    '相关项目：脑控假肢、神经康复训练系统',
    '相关项目：多模态感知机器人、环境感知平台'
  ];
  document.querySelectorAll('.direction-card').forEach((card, i) => {
    card.querySelector('h3').textContent = titles[i];
    card.querySelector('p').textContent = descs[i];
    card.querySelector('.project-link').textContent = projects[i];
  });
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
}; 