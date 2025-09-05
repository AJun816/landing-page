// 倒计时功能 - 5分钟，显示到毫秒，参考拼多多秒杀风格
function startCountdown() {
    // 设置倒计时为5分钟（5 * 60 * 1000毫秒）
    let totalMilliseconds = 3 * 60 * 1000;
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const millisecondsEl = document.getElementById('milliseconds');

    function updateTimer() {
        // 计算剩余的分钟、秒和毫秒
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = totalMilliseconds % 1000;

        // 更新显示，确保格式正确
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        millisecondsEl.textContent = milliseconds.toString().padStart(3, '0');

        // 添加数字变化时的动画效果
        if (milliseconds % 100 === 0) {
            millisecondsEl.classList.add('pulse');
            setTimeout(() => millisecondsEl.classList.remove('pulse'), 100);
        }

        if (seconds % 5 === 0 && milliseconds < 10) {
            secondsEl.classList.add('pulse');
            setTimeout(() => secondsEl.classList.remove('pulse'), 200);
        }

        if (minutes % 1 === 0 && seconds === 0 && milliseconds < 10) {
            minutesEl.classList.add('pulse');
            setTimeout(() => minutesEl.classList.remove('pulse'), 300);
        }

        // 减少一毫秒
        totalMilliseconds--;

        // 当倒计时结束时
        if (totalMilliseconds < 0) {
            clearInterval(timerInterval);
            // 倒计时结束后显示已结束状态
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            millisecondsEl.textContent = '000';

            // 更改按钮文本
            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.textContent = 'Акция закончилась';
            downloadBtn.style.opacity = '0.7';
            downloadBtn.style.pointerEvents = 'none';
        }
    }

    // 立即更新一次
    updateTimer();
    // 每毫秒更新一次（实际浏览器可能有最小间隔限制）
    const timerInterval = setInterval(updateTimer, 1);
}

// 退出弹窗功能
function setupExitModal() {
    const exitModal = document.getElementById('exitModal');
    const leaveBtn = document.getElementById('leaveBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // 标记是否已点击下载按钮
    let downloadClicked = false;

    // 监听下载按钮点击
    downloadBtn.addEventListener('click', () => {
        downloadClicked = true;
    });

    // 显示弹窗
    function showModal() {
        // 如果用户已经点击了下载按钮，则不显示弹窗
        if (downloadClicked) return;

        exitModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 隐藏弹窗
    function hideModal() {
        exitModal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复滚动
    }

    // 按钮事件
    leaveBtn.addEventListener('click', () => {
        hideModal();
        // 允许关闭页面
        window.close();
        // 如果浏览器阻止关闭，可导航到空白页
        // setTimeout(() => window.location.href = 'about:blank', 100);
    });

    // 监听页面关闭/刷新事件
    window.addEventListener('beforeunload', (e) => {
        // 如果用户已经点击了下载按钮，则不显示弹窗
        if (downloadClicked) return;

        // 显示自定义弹窗
        showModal();
        // 大多数现代浏览器会忽略自定义消息
        e.preventDefault();
        e.returnValue = '';
        return '';
    });

    // 按ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exitModal.classList.contains('active')) {
            hideModal();
        }
    });
}

// 添加页面加载动画
function setupPageLoad() {
    document.body.classList.add('loaded');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    setupExitModal();
    setupPageLoad();
});
