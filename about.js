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
  document.querySelector('h2').textContent = isEN ? 'About the Lab' : '实验室简介';
  document.querySelectorAll('.about-block h3')[0].textContent = isEN ? 'History' : '历史沿革';
  document.querySelectorAll('.about-block h3')[1].textContent = isEN ? 'Mission & Goals' : '发展目标';
  document.querySelectorAll('.about-block h3')[2].textContent = isEN ? 'Organization' : '组织架构';
  document.querySelectorAll('.about-block h3')[3].textContent = isEN ? 'Advisors' : '导师介绍';
  document.querySelectorAll('.about-block p')[0].textContent = isEN ? 'Founded in 2012, the Cognitive & Intelligent Science Lab at XX University focuses on cutting-edge research in cognitive science and artificial intelligence. The team consists of professors, postdocs, PhD and master students, and undertakes national and provincial research projects.' : '认知与智能科学实验室成立于2012年，依托XX大学信息科学与工程学院，致力于认知科学与人工智能交叉领域的前沿研究。实验室团队由多名教授、博士及硕士研究生组成，承担多项国家及省部级科研项目。';
  document.querySelectorAll('.about-block p')[1].textContent = isEN ? 'With the mission of "Cognition Empowers Intelligence, Intelligence Serves Society", the lab focuses on cognitive modeling, AI, brain-computer interface, and intelligent perception, promoting theoretical innovation and talent cultivation.' : '实验室以"认知赋能智能，智能服务社会"为使命，聚焦认知建模、人工智能、脑机接口、智能感知等方向，推动理论创新与技术应用，培养高水平创新型人才。';
  document.querySelectorAll('.about-block ul')[0].innerHTML = isEN
    ? '<li>Director: Prof. Zhang Wei</li><li>Deputy Director: Assoc. Prof. Li Na</li><li>Academic Committee: Experts from inside and outside the university</li><li>Research Team: Postdocs, PhD and master students</li>'
    : '<li>主任：张伟 教授</li><li>副主任：李娜 副教授</li><li>学术委员会：多名校内外专家</li><li>研究团队：博士后、博士、硕士研究生</li>';
  document.querySelectorAll('.team-member div')[0].innerHTML = isEN ? 'Zhang Wei<br>Professor<br>Research: Cognitive Modeling, AI' : '张伟<br>教授<br>研究方向：认知建模、人工智能';
  document.querySelectorAll('.team-member div')[1].innerHTML = isEN ? 'Li Na<br>Associate Professor<br>Research: BCI, Intelligent Perception' : '李娜<br>副教授<br>研究方向：脑机接口、智能感知';
  document.querySelector('.footer div').textContent = isEN ? 'Contact: lab@cislab.edu.cn | Address: XX University, XX Building, Room XX' : '联系方式：lab@cislab.edu.cn | 地址：XX大学XX楼XX室';
  document.querySelector('.footer').children[1].textContent = isEN ? '© 2024 Cognitive & Intelligent Science Lab | ICP xxxxx' : '© 2024 认知与智能科学实验室 | 粤ICP备xxxx号';
  document.getElementById('to-top').textContent = isEN ? 'Back to Top' : '返回顶部';
};

// 实验室介绍页面功能脚本
document.addEventListener('DOMContentLoaded', function() {
    // 引入图片加载器
    const script = document.createElement('script');
    script.src = 'js/image-loader.js';
    document.head.appendChild(script);

    // 统计数字动画
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000; // 2秒动画
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 16);
        });
    }

    // 图片加载完成后的回调
    function onImagesLoaded() {
        // 为环境图片添加点击放大效果
        const envCards = document.querySelectorAll('.env-card img');
        envCards.forEach(img => {
            img.addEventListener('click', function() {
                showImageModal(this.src, this.alt);
            });
        });
    }

    // 图片模态框
    function showImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-content">
                <span class="image-modal-close">&times;</span>
                <img src="${src}" alt="${alt}">
                <p>${alt}</p>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .image-modal.show {
                opacity: 1;
            }
            .image-modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 8px;
                overflow: hidden;
            }
            .image-modal-content img {
                width: 100%;
                height: auto;
                display: block;
            }
            .image-modal-content p {
                padding: 16px;
                margin: 0;
                text-align: center;
                color: #333;
            }
            .image-modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                color: white;
                cursor: pointer;
                background: rgba(0,0,0,0.5);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // 显示动画
        setTimeout(() => modal.classList.add('show'), 10);
        
        // 关闭事件
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('image-modal-close')) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }, 300);
            }
        });
    }

    // 滚动动画
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察需要动画的元素
        const animateElements = document.querySelectorAll('.about-content, .environment-grid, .stat-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // 初始化
    setTimeout(() => {
        animateNumbers();
        initScrollAnimations();
        
        // 等待图片加载完成后初始化图片相关功能
        if (window.ImageLoader) {
            onImagesLoaded();
        } else {
            // 降级处理
            setTimeout(onImagesLoaded, 1000);
        }
    }, 500);
}); 