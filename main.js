// 轮播图图片列表
const carouselImages = [
  'pic/1.jpg',
  'pic/2.jpg',
  'pic/3.jpg',
  'pic/4.jpg',
  'pic/5.jpg',
  'pic/6.jpg',
  'pic/7.png',
  'pic/8.png',
];
let currentIndex = 0;
const carouselInner = document.getElementById('carousel-inner');

function renderCarousel() {
  carouselInner.innerHTML = '';
  carouselImages.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.style.display = idx === currentIndex ? 'block' : 'none';
    carouselInner.appendChild(img);
  });
}
function showSlide(idx) {
  currentIndex = (idx + carouselImages.length) % carouselImages.length;
  renderCarousel();
}
document.getElementById('prevBtn').onclick = () => showSlide(currentIndex - 1);
document.getElementById('nextBtn').onclick = () => showSlide(currentIndex + 1);
let autoTimer = setInterval(() => showSlide(currentIndex + 1), 4000);
carouselInner.onmouseenter = () => clearInterval(autoTimer);
carouselInner.onmouseleave = () => autoTimer = setInterval(() => showSlide(currentIndex + 1), 4000);
renderCarousel();

// 返回顶部
const toTopBtn = document.getElementById('to-top');
toTopBtn.onclick = () => window.scrollTo({top:0,behavior:'smooth'});

// 简单中英文切换（仅首页静态内容，后续可扩展）
const langSwitch = document.getElementById('lang-switch');
let isEN = false;
langSwitch.onclick = () => {
  isEN = !isEN;
  langSwitch.textContent = isEN ? '中' : 'EN';
  document.querySelector('.logo').textContent = isEN ? 'Cognitive & Intelligent Science Lab' : '认知与智能科学实验室';
  document.querySelectorAll('nav a')[0].textContent = isEN ? 'About' : '实验室简介';
  document.querySelectorAll('nav a')[1].textContent = isEN ? 'Research' : '科研方向';
  document.querySelectorAll('nav a')[2].textContent = isEN ? 'Achievements' : '成果展示';
  document.querySelectorAll('nav a')[3].textContent = isEN ? 'News' : '新闻动态';
  document.querySelectorAll('nav a')[4].textContent = isEN ? 'Contact' : '联系我们';
  document.querySelectorAll('nav a')[5].textContent = isEN ? 'Join Us' : '加入我们';
  document.querySelector('.section#directions h2').textContent = isEN ? 'Research Directions' : '科研方向';
  document.querySelector('.section#achievements h2').textContent = isEN ? 'Achievements' : '成果展示';
  document.querySelector('.section#news h2').textContent = isEN ? 'News' : '新闻动态';
  document.querySelector('.section#team h2').textContent = isEN ? 'Team' : '团队成员';
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
  // 其他内容可按需扩展
}; 