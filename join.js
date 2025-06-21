// 申请按钮点击跳转到表单
const applyBtns = document.querySelectorAll('.apply-btn');
const applicationForm = document.getElementById('applicationForm');

applyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const jobType = btn.dataset.job;
    const positionSelect = document.getElementById('appPosition');
    
    // 设置对应的职位选项
    positionSelect.value = jobType;
    
    // 滚动到申请表单
    applicationForm.scrollIntoView({ behavior: 'smooth' });
  });
});

// 表单提交处理
applicationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // 获取表单数据
  const formData = new FormData(applicationForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const position = formData.get('position');
  const education = formData.get('education');
  const major = formData.get('major');
  const experience = formData.get('experience');
  const motivation = formData.get('motivation');
  const resume = formData.get('resume');
  
  // 简单验证
  if (!name || !email || !phone || !position || !education || !major) {
    alert('请填写所有必填字段！');
    return;
  }
  
  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('请输入有效的邮箱地址！');
    return;
  }
  
  // 文件验证
  if (resume && resume.size > 5 * 1024 * 1024) {
    alert('简历文件大小不能超过5MB！');
    return;
  }
  
  // 模拟提交成功
  alert('申请提交成功！我们会尽快审核您的申请并与您联系。');
  applicationForm.reset();
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
  document.querySelector('h2').textContent = isEN ? 'Join Us' : '加入我们';
  
  // 更新招聘信息
  document.querySelector('.recruitment-section h3').textContent = isEN ? 'Job Openings' : '招聘信息';
  const jobTitles = isEN ? ['Postdoctoral Researcher', 'PhD Student', 'Master Student', 'Research Assistant'] : ['博士后研究员', '博士研究生', '硕士研究生', '研究助理'];
  const jobDescs = isEN ? [
    'Engage in cognitive science, AI, or brain-computer interface research. PhD degree in related fields required.',
    'Recruiting PhD students in cognitive science, computer science, biomedical engineering and related fields.',
    'Recruiting master students in computer science, AI, cognitive science and related fields.',
    'Assist with daily research work. Bachelor degree or above required, research experience preferred.'
  ] : [
    '从事认知科学、人工智能或脑机接口相关研究，要求具有相关领域博士学位。',
    '招收认知科学、计算机科学、生物医学工程等相关专业的博士研究生。',
    '招收计算机科学、人工智能、认知科学等相关专业的硕士研究生。',
    '协助实验室日常研究工作，要求本科及以上学历，有相关研究经验优先。'
  ];
  const jobTypes = isEN ? ['Full-time', 'Full-time', 'Full-time', 'Full-time'] : ['全职', '全日制', '全日制', '全职'];
  const jobLocations = isEN ? ['Guangzhou', 'Guangzhou', 'Guangzhou', 'Guangzhou'] : ['广州', '广州', '广州', '广州'];
  const jobSalaries = isEN ? ['Negotiable', 'Scholarship', 'Scholarship', 'Negotiable'] : ['面议', '奖学金', '奖学金', '面议'];
  const applyTexts = isEN ? ['Apply', 'Apply', 'Apply', 'Apply'] : ['申请职位', '申请职位', '申请职位', '申请职位'];
  
  document.querySelectorAll('.job-card').forEach((card, i) => {
    card.querySelector('h4').textContent = jobTitles[i];
    card.querySelector('.job-desc').textContent = jobDescs[i];
    card.querySelector('.job-type').textContent = jobTypes[i];
    card.querySelector('.job-location').textContent = jobLocations[i];
    card.querySelector('.job-salary').textContent = jobSalaries[i];
    card.querySelector('.apply-btn').textContent = applyTexts[i];
  });
  
  // 更新申请流程
  document.querySelector('.process-section h3').textContent = isEN ? 'Application Process' : '申请流程';
  const stepTitles = isEN ? ['Submit Application', 'Initial Screening', 'Interview', 'Offer'] : ['提交申请', '初步筛选', '面试交流', '录用通知'];
  const stepDescs = isEN ? [
    'Fill out application form and upload resume',
    'Lab conducts initial review of application materials',
    'Interview with candidates who pass initial screening',
    'Issue offer letter after successful interview'
  ] : [
    '填写申请表格并上传简历',
    '实验室对申请材料进行初步审核',
    '通过初步筛选的候选人进行面试',
    '面试通过后发放录用通知'
  ];
  
  document.querySelectorAll('.step').forEach((step, i) => {
    step.querySelector('h4').textContent = stepTitles[i];
    step.querySelector('p').textContent = stepDescs[i];
  });
  
  // 更新申请表单
  document.querySelector('.application-section h3').textContent = isEN ? 'Application Form' : '申请表单';
  document.querySelector('label[for="appName"]').textContent = isEN ? 'Name *' : '姓名 *';
  document.querySelector('label[for="appEmail"]').textContent = isEN ? 'Email *' : '邮箱 *';
  document.querySelector('label[for="appPhone"]').textContent = isEN ? 'Phone *' : '电话 *';
  document.querySelector('label[for="appPosition"]').textContent = isEN ? 'Position *' : '申请职位 *';
  document.querySelector('label[for="appEducation"]').textContent = isEN ? 'Highest Education *' : '最高学历 *';
  document.querySelector('label[for="appMajor"]').textContent = isEN ? 'Major *' : '专业 *';
  document.querySelector('label[for="appExperience"]').textContent = isEN ? 'Research Experience' : '研究经历';
  document.querySelector('label[for="appMotivation"]').textContent = isEN ? 'Motivation' : '申请动机';
  document.querySelector('label[for="appResume"]').textContent = isEN ? 'Resume Upload *' : '简历上传 *';
  
  // 更新选择框选项
  document.querySelector('#appPosition option[value=""]').textContent = isEN ? 'Please select position' : '请选择职位';
  document.querySelector('#appPosition option[value="postdoc"]').textContent = isEN ? 'Postdoctoral Researcher' : '博士后研究员';
  document.querySelector('#appPosition option[value="phd"]').textContent = isEN ? 'PhD Student' : '博士研究生';
  document.querySelector('#appPosition option[value="master"]').textContent = isEN ? 'Master Student' : '硕士研究生';
  document.querySelector('#appPosition option[value="assistant"]').textContent = isEN ? 'Research Assistant' : '研究助理';
  
  document.querySelector('#appEducation option[value=""]').textContent = isEN ? 'Please select education' : '请选择学历';
  document.querySelector('#appEducation option[value="bachelor"]').textContent = isEN ? 'Bachelor' : '本科';
  document.querySelector('#appEducation option[value="master"]').textContent = isEN ? 'Master' : '硕士';
  document.querySelector('#appEducation option[value="phd"]').textContent = isEN ? 'PhD' : '博士';
  
  document.querySelector('#appExperience').placeholder = isEN ? 'Please describe your research experience, project experience, etc...' : '请描述您的研究经历、项目经验等...';
  document.querySelector('#appMotivation').placeholder = isEN ? 'Please explain your reasons for applying and expectations...' : '请说明您申请该职位的原因和期望...';
  document.querySelector('small').textContent = isEN ? 'Supports PDF, Word format, file size not exceeding 5MB' : '支持PDF、Word格式，文件大小不超过5MB';
  document.querySelector('.submit-btn').textContent = isEN ? 'Submit Application' : '提交申请';
  
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
}; 