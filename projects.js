// 示例项目数据，可后续替换为后端接口
const PROJECTS = [
  {
    id: 1,
    name: '基于深度学习的认知过程建模',
    direction: '认知建模',
    leader: '张明华',
    status: 'ongoing',
    desc: '利用深度学习方法对人类认知过程进行建模，提升模型的解释性和预测能力。',
    start: '2024-01-15',
    end: '2024-12-31',
    progress: 65,
    details: '项目详细介绍：\n- 研究目标：构建高精度认知过程模型\n- 关键技术：深度神经网络、认知建模\n- 队伍成员：张明华、李思思等',
    en: {
      name: 'Cognitive Process Modeling with Deep Learning',
      direction: 'Cognitive Modeling',
      leader: 'Minghua Zhang',
      status: 'ongoing',
      desc: 'Modeling human cognitive processes using deep learning to improve interpretability and prediction.',
      details: 'Project Details:\n- Goal: Build high-precision cognitive process models\n- Key Tech: Deep neural networks, cognitive modeling\n- Team: Minghua Zhang, Sisi Li, etc.'
    }
  },
  {
    id: 2,
    name: '认知计算平台v3.0开发',
    direction: '人工智能',
    leader: '李思思',
    status: 'ongoing',
    desc: '开发新一代认知计算平台，支持多模态数据处理与智能分析。',
    start: '2024-03-01',
    end: '2024-08-31',
    progress: 45,
    details: '项目详细介绍：\n- 研究目标：平台架构升级\n- 关键技术：AI算法、多模态数据融合\n- 队伍成员：李思思、王浩然等',
    en: {
      name: 'Cognitive Computing Platform v3.0',
      direction: 'Artificial Intelligence',
      leader: 'Sisi Li',
      status: 'ongoing',
      desc: 'Developing a new generation cognitive computing platform for multimodal data and intelligent analysis.',
      details: 'Project Details:\n- Goal: Platform architecture upgrade\n- Key Tech: AI algorithms, multimodal data fusion\n- Team: Sisi Li, Haoran Wang, etc.'
    }
  },
  {
    id: 3,
    name: '脑机接口技术合作研究',
    direction: '脑机接口',
    leader: '刘志强',
    status: 'ongoing',
    desc: '联合企业开展脑机接口关键技术攻关，推动产业化应用。',
    start: '2024-01-01',
    end: '2024-12-31',
    progress: 30,
    details: '项目详细介绍：\n- 研究目标：脑信号解码与交互\n- 关键技术：脑电信号处理、神经反馈\n- 队伍成员：刘志强、张明华等',
    en: {
      name: 'BCI Technology Cooperative Research',
      direction: 'Brain-Computer Interface',
      leader: 'Zhiqiang Liu',
      status: 'ongoing',
      desc: 'Cooperating with industry to tackle key BCI technologies and promote industrial application.',
      details: 'Project Details:\n- Goal: Brain signal decoding and interaction\n- Key Tech: EEG processing, neurofeedback\n- Team: Zhiqiang Liu, Minghua Zhang, etc.'
    }
  },
  {
    id: 4,
    name: '多模态感知融合算法研究',
    direction: '智能感知',
    leader: '王浩然',
    status: 'ongoing',
    desc: '研究多模态感知信息融合算法，提升环境感知能力。',
    start: '2024-02-01',
    end: '2024-06-30',
    progress: 80,
    details: '项目详细介绍：\n- 研究目标：多模态融合\n- 关键技术：传感器网络、环境感知\n- 队伍成员：王浩然、李思思等',
    en: {
      name: 'Multimodal Perception Fusion Algorithms',
      direction: 'Intelligent Perception',
      leader: 'Haoran Wang',
      status: 'ongoing',
      desc: 'Research on multimodal perception fusion algorithms to enhance environmental awareness.',
      details: 'Project Details:\n- Goal: Multimodal fusion\n- Key Tech: Sensor networks, environmental perception\n- Team: Haoran Wang, Sisi Li, etc.'
    }
  }
];

const PAGE_SIZE = 4;
let currentPage = 1;
let currentLang = 'zh';

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || '';
}

function renderProjects() {
  const direction = document.getElementById('directionFilter').value;
  const status = document.getElementById('statusFilter').value;
  let filtered = PROJECTS.filter(p => {
    let match = true;
    if (direction && p.direction !== direction && (!p.en || p.en.direction !== direction)) match = false;
    if (status && p.status !== status && (!p.en || p.en.status !== status)) match = false;
    return match;
  });
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (currentPage > totalPages) currentPage = 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const list = filtered.slice(start, end);
  const listEl = document.getElementById('projects-list');
  listEl.innerHTML = list.map(p => `
    <div class="project-item" data-id="${p.id}">
      <div class="project-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width:${p.progress}%"></div>
        </div>
        <div class="progress-text">${p.progress}%</div>
      </div>
      <div class="project-content">
        <h3>${currentLang==='zh'?p.name:p.en.name}</h3>
        <p>${currentLang==='zh'?p.desc:p.en.desc}</p>
        <div class="project-meta">
          <span class="project-direction">${currentLang==='zh'?p.direction:p.en.direction}</span>
          <span class="project-leader">${currentLang==='zh'?p.leader:p.en.leader}</span>
          <span class="project-date">${p.start} ~ ${p.end}</span>
          <span class="project-status ${p.status}">${renderStatus(p.status)}</span>
        </div>
      </div>
    </div>
  `).join('') || `<div style="padding:2em;text-align:center;">${currentLang==='zh'?'暂无相关项目':'No projects found.'}</div>`;
  renderPagination(totalPages);
  bindDetailEvents();
}

function renderStatus(status) {
  if(currentLang==='zh'){
    if(status==='planning') return '规划中';
    if(status==='ongoing') return '进行中';
    if(status==='completed') return '已完成';
    if(status==='suspended') return '暂停';
  }else{
    if(status==='planning') return 'Planning';
    if(status==='ongoing') return 'Ongoing';
    if(status==='completed') return 'Completed';
    if(status==='suspended') return 'Suspended';
  }
  return status;
}

function renderPagination(totalPages) {
  const pag = document.getElementById('pagination');
  if (totalPages <= 1) { pag.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn${i===currentPage?' active':''}" data-page="${i}">${i}</button>`;
  }
  pag.innerHTML = html;
  pag.querySelectorAll('.page-btn').forEach(btn => {
    btn.onclick = () => { currentPage = +btn.dataset.page; renderProjects(); };
  });
}

function bindDetailEvents() {
  document.querySelectorAll('.project-item').forEach(item => {
    item.onclick = () => {
      const id = +item.dataset.id;
      const p = PROJECTS.find(x => x.id === id);
      const modal = document.getElementById('projectModal');
      const body = document.getElementById('modal-body');
      body.innerHTML = `
        <h2>${currentLang==='zh'?p.name:p.en.name}</h2>
        <div class="modal-meta">
          <span>${currentLang==='zh'?p.direction:p.en.direction}</span>
          <span>${currentLang==='zh'?p.leader:p.en.leader}</span>
          <span>${p.start} ~ ${p.end}</span>
          <span class="project-status ${p.status}">${renderStatus(p.status)}</span>
        </div>
        <div class="modal-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${p.progress}%"></div></div>
          <span class="progress-text">${p.progress}%</span>
        </div>
        <div class="modal-desc">${currentLang==='zh'?p.details:p.en.details}</div>
      `;
      modal.style.display = 'block';
    };
  });
}

document.getElementById('closeModal').onclick = () => {
  document.getElementById('projectModal').style.display = 'none';
};

// 方向和状态筛选
['directionFilter','statusFilter'].forEach(id => {
  document.getElementById(id).onchange = () => {
    currentPage = 1;
    renderProjects();
  };
});

// URL参数自动筛选
window.onload = () => {
  const direction = getQueryParam('direction');
  if (direction) {
    document.getElementById('directionFilter').value = direction;
  }
  renderProjects();
};

// 简单中英文切换（与common.js联动）
window.switchProjectLang = function(lang) {
  currentLang = lang;
  document.getElementById('projects-title').textContent = lang==='zh'?'相关项目动态':'Project Updates';
  document.getElementById('projects-desc').textContent = lang==='zh'?'展示实验室各科研方向的最新项目进展与动态':'Latest project progress and updates of the lab.';
  renderProjects();
}; 