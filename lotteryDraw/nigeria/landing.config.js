export default {
    // 背景配置
    background: {
        imageUrl: require('./src/assets/background.png'), // 背景图URL (使用require确保正确加载)
        overlayColor: '#000000', // 覆盖层颜色
        overlayOpacity: 0.3 // 覆盖层透明度 (0-1)
    },

    // Logo配置
    logo: {
        url: 'https://picsum.photos/id/237/200/200', // Logo URL
        alt: 'Lucky Offer Logo' // Logo alt文本
    },

    // 内容配置
    content: {
        title: 'Exclusive Limited Time Offer', // 主标题
        subtitle: 'Only for our valued customers', // 副标题
        description: 'Claim your special discount before it expires', // 描述文本
        bulletPoints: [ // 要点列表
            'Instant access to exclusive deals',
            'No hidden fees or charges'
        ],
        ctaButton: {
            text: 'Claim Your Offer Now', // 按钮文本
            url: 'https://example.com/offer' // 按钮链接
        }
    },
    // 倒计时配置
    countdown: {
        label: '🔥 活动火热进行中！倒计时 🔥', // 倒计时标题
        totalDuration: 60000, // 总时长，毫秒为单位
        labels: {
            minute: '分',   // 可替换成 Min / 分 / 分钟 / Minutos 等
            second: '秒',   // 可替换成 Sec / 秒 / Sekunden / Segundos
            millisecond: '毫秒' // 可替换成 Ms / 毫秒 / Millisekunden / Milisegundos
        }
    },
    // 老虎机配置
    slotMachine: {
        title: "🎰 幸运老虎机 🎰",
        buttonText: "抽奖",
        reels: [
            ["🍒", "🍋", "🍊", "⭐", "💎"],
            ["🍒", "🍋", "🍊", "⭐", "💎"],
            ["🍒", "🍋", "🍊", "⭐", "💎"]
        ]
    },
    // 大转盘
    prizeWheel: {
        title: "🎡 幸运大转盘 🎡",
        buttonText: "开始抽奖",
        segments: [
            { label: "🎁 奖品A" },
            { label: "🎉 奖品B" },
            { label: "💎 奖品C" },
            { label: "🍀 奖品D" },
            { label: "⭐ 奖品E" },
            { label: "🎊 奖品F" }
        ]
    },
    // 退出确认配置
    exitConfirm: {
        title: 'Wait! Don\'t Leave', // 弹窗标题
        message: 'Are you sure you want to leave? You might miss this exclusive offer!', // 弹窗消息
        stayButtonText: 'Stay & Claim', // 留下按钮文本
        leaveButtonText: 'Leave' // 离开按钮文本
    },

    // 自动重定向配置
    redirect: {
        targetUrl: 'www.baidu.com', // 重定向目标URL
        countdownSeconds: 3, // 倒计时秒数
        message: 'You will be redirected in:', // 倒计时消息
        secondsLabel: 'seconds', // 秒数标签
        allowSkip: true // 是否允许手动跳过
    }
};
