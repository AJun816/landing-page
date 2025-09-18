export default {
    // 背景配置
    background: {
        imageUrl: require('./src/assets/background.svg'), // 背景图URL (使用require确保正确加载)
        overlayColor: '#000000', // 覆盖层颜色
        overlayOpacity: 0.6 // 调整透明度以更好显示SVG细节
    },

    // Logo配置
    logo: {
        url: require('./src/assets/logo-new.svg'), // Logo URL
        alt: 'WinWise Logo' // Logo alt文本
    },

    // 内容配置 - 尼日利亚市场
    content: {
        title: ' ', // 主标题
        subtitle: '', // 副标题
        description: '', // 描述文本
        bulletPoints: [ // 要点列表
            'iPhone 14, 13 Pro, Inverter AC, iWATCH, EARPOD',
            'Exciting prizes for lucky winners'
        ],
        ctaButton: {
            text: 'SUBSCRIBE', // 按钮文本
            url: 'https://top.htgjai.com/click' // 按钮链接
        }
    },
    // 倒计时配置
    countdown: {
        label: '🔥 Lucky You! First Day Free – Last Day of the Offer!🔥', // 倒计时标题
        totalDuration: 60000, // 总时长，毫秒为单位
        labels: {
            minute: 'min',   // 使用英文表示
            second: 'sec',   // 使用英文表示
            millisecond: 'ms' // 使用英文表示
        }
    },
    // 老虎机配置 - 尼日利亚市场
    slotMachine: {
        title: "🎰 Nigerian Lucky Slot 🎰",
        buttonText: "Play Now",
        reels: [
            ["📱", "💻", "⌚", "🎧", "❄️"],
            ["📱", "💻", "⌚", "🎧", "❄️"],
            ["📱", "💻", "⌚", "🎧", "❄️"]
        ]
    },
    // 大转盘 - 尼日利亚市场
    prizeWheel: {
        title: "🎡 WinWise Prize Wheel 🎡",
        buttonText: "Spin Now",
        segments: [
            { label: "iPhone 14" },
            { label: "iPhone 13 Pro" },
            { label: "Inverter AC" },
            { label: "iWatch" },
            { label: "EarPods" },
            { label: "Discount" }
        ]
    },
    // 退出确认配置
    exitConfirm: {
        title: 'Wait! Don\'t Leave', // 弹窗标题
        message: 'Are you sure you want to leave? You might miss your chance to win amazing gadgets!', // 弹窗消息
        stayButtonText: 'Stay & Play', // 留下按钮文本
        leaveButtonText: 'Leave' // 离开按钮文本
    },

    // 自动重定向配置
    redirect: {
        targetUrl: 'https://top.htgjai.com/click', // 重定向目标URL
        countdownSeconds: 180, // 倒计时秒数
        message: 'You will be redirected in:', // 倒计时消息
        secondsLabel: 'seconds', // 秒数标签
        allowSkip: true, // 是否允许手动跳过
        skipButtonText: 'Skip →' // 跳过按钮文本
    }
};
