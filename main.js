// 首页功能脚本
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const carousel = document.getElementById('carousel');
    const carouselInner = document.getElementById('carousel-inner');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const carouselData = [
        { src: './pic/1.jpg', alt: '实验室环境', title: '现代化实验室环境' },
        { src: './pic/2.jpg', alt: '研究设备', title: '先进的研究设备' },
        { src: './pic/3.jpg', alt: '团队合作', title: '团队协作研究' }
    ];
    
    let currentIndex = 0;
    
    function initCarousel() {
        carouselData.forEach(item => {
            const img = document.createElement('img');
            img.alt = item.alt;
            img.title = item.title;
            img.setAttribute('data-src', item.src);
            carouselInner.appendChild(img);
        });
        updateCarousel();
    }
    
    function loadSlideImage(index) {
        const images = carouselInner.querySelectorAll('img');
        if (index < 0 || index >= images.length) return;
        const image = images[index];
        if (image && image.hasAttribute('data-src') && window.imageLoader) {
            window.imageLoader.loadImage(image);
        }
    }

    function updateCarousel() {
        const images = carouselInner.querySelectorAll('img');
        images.forEach((img, idx) => {
            if (idx === currentIndex) {
                img.classList.add('active');
                loadSlideImage(idx);
            } else {
                img.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    const entryBtns = document.querySelectorAll('.entry-btn');
    entryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            let url = '';
            
            switch(text) {
                case '首页': url = 'index.html'; break;
                case '新闻': url = 'news.html'; break;
                case '留言': url = 'contact.html'; break;
                case '团队': url = 'about.html'; break;
                case '加入我们': url = 'join.html'; break;
            }
            
            if (url) window.location.href = url;
        });
    });
    
    initCarousel();
    
    const importantImages = [
        './pic/head/head1.png', './pic/icon/home.png', './pic/icon/horn.png',
        './pic/icon/comment.png', './pic/icon/me.png', './pic/icon/love.png'
    ];
    
    setTimeout(() => {
        if (window.imageLoader) {
            window.imageLoader.preloadImages(importantImages);
        }
    }, 500);
});

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