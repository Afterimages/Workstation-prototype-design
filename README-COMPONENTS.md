# 前台页面通用组件使用说明

## 概述

为了提高代码复用性和维护性，我们将前台页面的通用设计抽离成了独立的组件和样式文件。

## 文件结构

```
├── components/           # 通用组件
│   ├── header.html      # 导航栏组件
│   └── footer.html      # 页脚组件
├── css/                 # 样式文件
│   └── base.css         # 基础样式（通用样式）
├── js/                  # JavaScript文件
│   ├── common.js        # 通用功能
│   └── component-loader.js  # 组件加载器
├── templates/           # 页面模板
│   └── page-template.html   # 页面模板
└── style.css           # 页面特定样式
```

## 使用方法

### 1. 基础页面结构

每个前台页面都应该包含以下基本结构：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 - 认知与智能科学实验室</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 引入通用导航栏 -->
  <div id="header-container"></div>

  <!-- 页面内容 -->
  <main>
    <!-- 你的页面内容 -->
  </main>

  <!-- 引入通用页脚 -->
  <div id="footer-container"></div>

  <script src="js/common.js"></script>
  <script src="js/component-loader.js"></script>
  <!-- 页面特定的JavaScript -->
</body>
</html>
```

### 2. 使用页面模板

可以使用 `templates/page-template.html` 作为新页面的起点，替换以下占位符：

- `{{PAGE_TITLE}}`: 页面标题
- `{{PAGE_HEADING}}`: 页面主标题
- `{{PAGE_SUBTITLE}}`: 页面副标题
- `{{PAGE_CONTENT}}`: 页面主要内容
- `{{EXTRA_CSS}}`: 额外的CSS引用
- `{{EXTRA_JS}}`: 额外的JavaScript引用

### 3. 组件自动加载

组件加载器会自动检测页面中的组件容器并加载相应的组件：

- `#header-container` → 加载导航栏组件
- `#footer-container` → 加载页脚组件

### 4. 语言切换

页面中的文本可以通过添加 `data-i18n` 属性来支持多语言：

```html
<h2 data-i18n="nav.about">实验室简介</h2>
```

## 通用样式类

### 布局类

- `.container`: 内容容器（最大宽度1200px，居中）
- `.section`: 页面区块（带间距和标题样式）
- `.card`: 卡片样式（带阴影和悬停效果）

### 按钮类

- `.btn`: 主要按钮样式
- `.btn-secondary`: 次要按钮样式

### 表单类

- `.form-group`: 表单组样式
- `.form-group label`: 表单标签样式
- `.form-group input`: 表单输入框样式

### 工具类

- `.text-center`, `.text-left`, `.text-right`: 文本对齐
- `.mt-0` 到 `.mt-4`: 上边距
- `.mb-0` 到 `.mb-4`: 下边距
- `.p-0` 到 `.p-4`: 内边距
- `.d-none`, `.d-block`, `.d-flex`: 显示类型
- `.justify-center`, `.justify-between`: 主轴对齐
- `.align-center`, `.align-start`: 交叉轴对齐

## JavaScript功能

### 语言管理器 (LanguageManager)

```javascript
// 切换语言
window.languageManager.toggleLanguage();

// 获取翻译
const text = window.languageManager.t('nav.about');
```

### 返回顶部 (ScrollToTop)

自动处理返回顶部按钮的显示和点击事件。

### 表单验证 (FormValidator)

```javascript
// 验证表单
if (FormValidator.validateForm(form)) {
  // 表单验证通过
}

// 显示错误信息
FormValidator.showError(input, '错误信息');

// 清除错误信息
FormValidator.clearError(input);
```

### 通知系统 (Notification)

```javascript
// 显示通知
Notification.success('操作成功');
Notification.error('操作失败');
Notification.warning('警告信息');
```

## 响应式设计

所有组件都支持响应式设计：

- 桌面端：≥900px
- 平板端：768px - 899px
- 移动端：<768px

## 自定义组件

### 添加新组件

1. 在 `components/` 目录下创建组件HTML文件
2. 在 `component-loader.js` 中注册组件：

```javascript
this.register('componentName', 'components/component-name.html');
```

3. 在页面中添加容器：

```html
<div id="component-name-container"></div>
```

4. 在组件加载器中添加初始化逻辑：

```javascript
case 'componentName':
  this.initComponentName();
  break;
```

### 扩展样式

- 通用样式放在 `css/base.css` 中
- 页面特定样式放在 `style.css` 中
- 组件特定样式可以创建独立的CSS文件

## 最佳实践

1. **保持一致性**：使用统一的样式类和组件
2. **语义化HTML**：使用合适的HTML标签和属性
3. **无障碍访问**：添加适当的alt属性和ARIA标签
4. **性能优化**：合理使用CSS和JavaScript
5. **代码复用**：优先使用通用组件和样式

## 注意事项

1. 确保所有页面都引入了 `css/base.css` 和 `js/common.js`
2. 组件加载器会自动处理组件的加载和初始化
3. 语言切换功能需要页面文本添加 `data-i18n` 属性
4. 表单验证会自动应用到带有 `needs-validation` 类的表单
5. 响应式设计会自动适配不同屏幕尺寸 