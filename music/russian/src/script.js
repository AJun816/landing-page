// 1. 倒计时功能（独立函数）
function startCountdown() {
    let totalMilliseconds = 3 * 60 * 1000; // 3分钟倒计时
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const millisecondsEl = document.getElementById('milliseconds');

    function updateTimer() {
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = totalMilliseconds % 1000;

        // 格式化显示
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        millisecondsEl.textContent = milliseconds.toString().padStart(3, '0');

        // 数字变化动画
        if (milliseconds % 100 === 0) millisecondsEl.classList.add('pulse');
        setTimeout(() => millisecondsEl.classList.remove('pulse'), 100);
        if (seconds % 5 === 0 && milliseconds < 10) secondsEl.classList.add('pulse');
        setTimeout(() => secondsEl.classList.remove('pulse'), 200);
        if (minutes % 1 === 0 && seconds === 0 && milliseconds < 10) minutesEl.classList.add('pulse');
        setTimeout(() => minutesEl.classList.remove('pulse'), 300);

        totalMilliseconds--;

        // 倒计时结束逻辑
        if (totalMilliseconds < 0) {
            clearInterval(timerInterval);
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            millisecondsEl.textContent = '000';
            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.textContent = 'Акция закончилась';
            downloadBtn.style.opacity = '0.7';
            downloadBtn.style.pointerEvents = 'none';
        }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1);
}

// 2. 退出弹窗功能（独立函数）
function setupExitModal() {
    const exitModal = document.getElementById('exitModal');
    const leaveBtn = document.getElementById('leaveBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    let downloadClicked = false;

    downloadBtn.addEventListener('click', () => { downloadClicked = true; });

    function showModal() {
        if (downloadClicked) return;
        exitModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        exitModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    leaveBtn.addEventListener('click', () => {
        hideModal();
        window.close(); // 或导航到空白页：setTimeout(() => window.location.href = 'about:blank', 100);
    });

    window.addEventListener('beforeunload', (e) => {
        if (downloadClicked) return;
        showModal();
        e.preventDefault();
        e.returnValue = '';
        return '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exitModal.classList.contains('active')) hideModal();
    });
}


// 4. 页面加载动画（独立函数）
function setupPageLoad() {
    document.body.classList.add('loaded');
}

/**
 * 根据 URL 路径设置页面背景图
 */
function setBackgroundByUrl() {
  const pathSegments = window.location.pathname.split("/").filter((s) => s);
  const theme = pathSegments[0] || "default";

  // 低清图（提前准备一张小图，命名 bg-small.webp）
  const lowResImg = `/assets/${theme}/bg-small.webp`;
  const highResImg = `/assets/${theme}/background.webp`;

  document.body.style.backgroundImage = `url("${lowResImg}")`;

  const img = new Image();
  img.src = highResImg;
  img.onload = () => {
    document.body.style.backgroundImage = `url("${highResImg}")`;
  };
}


// 5. 总初始化函数（整合所有逻辑）
function initPage() {
    startCountdown();       // 启动倒计时
    setupExitModal();       // 初始化退出弹窗
    setupPageLoad();        // 处理页面加载动画
    setBackgroundByUrl();   // 根据 URL 设置背景图
}

// 页面加载完成后，执行总初始化
document.addEventListener('DOMContentLoaded', initPage);
