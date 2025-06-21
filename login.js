// 登录表单处理
const loginForm = document.getElementById('loginForm');
const rememberCheckbox = document.getElementById('remember');

// 页面加载时检查是否有保存的登录信息
window.addEventListener('load', () => {
  const savedUsername = localStorage.getItem('savedUsername');
  const savedPassword = localStorage.getItem('savedPassword');
  
  if (savedUsername && savedPassword) {
    document.getElementById('username').value = savedUsername;
    document.getElementById('password').value = savedPassword;
    rememberCheckbox.checked = true;
  }
});

// 登录表单提交
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const remember = rememberCheckbox.checked;
  
  // 简单验证
  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }
  
  // 模拟登录验证（实际项目中应该调用后端API）
  if (username === 'admin' && password === 'admin123') {
    // 记住密码功能
    if (remember) {
      localStorage.setItem('savedUsername', username);
      localStorage.setItem('savedPassword', password);
    } else {
      localStorage.removeItem('savedUsername');
      localStorage.removeItem('savedPassword');
    }
    
    // 保存登录状态
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);
    
    alert('登录成功！正在跳转到后台管理...');
    
    // 跳转到后台管理页面
    setTimeout(() => {
      window.location.href = 'admin/dashboard.html';
    }, 1000);
  } else {
    alert('用户名或密码错误！\n\n测试账号：\n用户名：admin\n密码：admin123');
  }
});

// 忘记密码处理
document.querySelector('.forgot-password').addEventListener('click', function(e) {
  e.preventDefault();
  alert('请联系系统管理员重置密码\n邮箱：admin@cislab.edu.cn');
});

// 中英文切换
const langSwitch = document.getElementById('lang-switch');
let isEN = false;
langSwitch.onclick = () => {
  isEN = !isEN;
  langSwitch.textContent = isEN ? '中' : 'EN';
  
  // 更新页面标题
  document.title = isEN ? 'Admin Login - Cognitive & Intelligent Science Lab' : '后台登录 - 认知与智能科学实验室';
  
  // 更新logo和副标题
  document.querySelector('.login-header .logo').textContent = isEN ? 'Cognitive & Intelligent Science Lab' : '认知与智能科学实验室';
  document.querySelector('.login-header .subtitle').textContent = isEN ? 'Admin Management System' : '后台管理系统';
  
  // 更新表单内容
  document.querySelector('.login-form h2').textContent = isEN ? 'User Login' : '用户登录';
  document.querySelector('label[for="username"]').textContent = isEN ? 'Username' : '用户名';
  document.querySelector('label[for="password"]').textContent = isEN ? 'Password' : '密码';
  document.querySelector('#username').placeholder = isEN ? 'Enter username' : '请输入用户名';
  document.querySelector('#password').placeholder = isEN ? 'Enter password' : '请输入密码';
  
  // 更新选项
  document.querySelector('.checkbox-label').innerHTML = isEN 
    ? '<input type="checkbox" id="remember" name="remember"><span class="checkmark"></span>Remember password'
    : '<input type="checkbox" id="remember" name="remember"><span class="checkmark"></span>记住密码';
  document.querySelector('.forgot-password').textContent = isEN ? 'Forgot password?' : '忘记密码？';
  
  // 更新按钮和底部信息
  document.querySelector('.login-btn').textContent = isEN ? 'Login' : '登录';
  document.querySelector('.login-footer p').textContent = isEN ? 'First time login? Contact admin for account' : '首次登录请联系管理员获取账号';
  document.querySelector('.back-home').textContent = isEN ? 'Back to Home' : '返回首页';
};

// 回车键登录
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    loginForm.dispatchEvent(new Event('submit'));
  }
});

// 密码显示/隐藏功能（可选）
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
}

// 添加密码显示/隐藏按钮（可选功能）
// 可以在HTML中添加一个眼睛图标按钮，点击时调用togglePasswordVisibility() 