// 表单提交处理
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // 获取表单数据
  const formData = new FormData(messageForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // 简单验证
  if (!name || !email || !subject || !message) {
    alert('请填写所有必填字段！');
    return;
  }
  
  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('请输入有效的邮箱地址！');
    return;
  }
  
  // 模拟提交成功
  alert('留言提交成功！我们会尽快与您联系。');
  messageForm.reset();
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
  document.querySelector('h2').textContent = isEN ? 'Contact Us' : '联系我们';
  
  // 更新联系信息
  document.querySelector('.contact-info h3').textContent = isEN ? 'Contact Information' : '联系方式';
  document.querySelectorAll('.info-content h4')[0].textContent = isEN ? 'Email' : '邮箱';
  document.querySelectorAll('.info-content h4')[1].textContent = isEN ? 'Phone' : '电话';
  document.querySelectorAll('.info-content h4')[2].textContent = isEN ? 'Address' : '地址';
  document.querySelectorAll('.info-content h4')[3].textContent = isEN ? 'Working Hours' : '工作时间';
  document.querySelectorAll('.info-content p')[1].textContent = isEN ? 'XX University, School of Information Science and Engineering<br>Room XX, Building XX, XX District, XX City' : 'XX大学信息科学与工程学院<br>XX楼XX室，XX市XX区';
  document.querySelectorAll('.info-content p')[3].innerHTML = isEN ? 'Monday-Friday: 9:00-18:00<br>Saturday: 9:00-12:00' : '周一至周五：9:00-18:00<br>周六：9:00-12:00';
  
  // 更新表单
  document.querySelector('.contact-form h3').textContent = isEN ? 'Online Message' : '在线留言';
  document.querySelector('label[for="name"]').textContent = isEN ? 'Name *' : '姓名 *';
  document.querySelector('label[for="email"]').textContent = isEN ? 'Email *' : '邮箱 *';
  document.querySelector('label[for="phone"]').textContent = isEN ? 'Phone' : '电话';
  document.querySelector('label[for="subject"]').textContent = isEN ? 'Subject *' : '主题 *';
  document.querySelector('label[for="message"]').textContent = isEN ? 'Message *' : '留言内容 *';
  document.querySelector('#subject option[value=""]').textContent = isEN ? 'Please select a subject' : '请选择主题';
  document.querySelector('#subject option[value="cooperation"]').textContent = isEN ? 'Project Cooperation' : '项目合作';
  document.querySelector('#subject option[value="visit"]').textContent = isEN ? 'Visit' : '参观访问';
  document.querySelector('#subject option[value="recruitment"]').textContent = isEN ? 'Recruitment Inquiry' : '招聘咨询';
  document.querySelector('#subject option[value="academic"]').textContent = isEN ? 'Academic Exchange' : '学术交流';
  document.querySelector('#subject option[value="other"]').textContent = isEN ? 'Other' : '其他';
  document.querySelector('#message').placeholder = isEN ? 'Please describe your needs or questions in detail...' : '请详细描述您的需求或问题...';
  document.querySelector('.submit-btn').textContent = isEN ? 'Submit Message' : '提交留言';
  
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
}; 