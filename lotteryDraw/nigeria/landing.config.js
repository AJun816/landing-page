export default {
    // 背景配置
    background: {
    imageUrl: 'https://picsum.photos/id/1043/1920/1080', // 背景图URL
    overlayColor: '#000000', // 覆盖层颜色
    overlayOpacity: 0.6 // 覆盖层透明度 (0-1)
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
    description: 'Claim your special discount before it expires. This offer is available for a limited time only, so act fast!', // 描述文本
    bulletPoints: [ // 要点列表
    'Instant access to exclusive deals',
    'No hidden fees or charges',
    'Special bonus for first-time users',
    '24/7 customer support'
    ],
    ctaButton: {
    text: 'Claim Your Offer Now', // 按钮文本
    url: 'https://example.com/offer' // 按钮链接
}
},

    // 倒计时配置
    countdown: {
    label: 'Hurry! Offer ends in:', // 倒计时标签
    totalSeconds: 1800, // 总倒计时秒数 (24小时)
    showDays: true, // 是否显示天数
    labels: { // 时间单位标签
    day: 'Days',
    hour: 'Hrs',
    minute: 'Min',
    second: 'Sec'
}
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
    targetUrl: 'https://example.com/offer', // 重定向目标URL
    countdownSeconds: 3, // 倒计时秒数
    message: 'You will be redirected in:', // 倒计时消息
    secondsLabel: 'seconds', // 秒数标签
    allowSkip: true // 是否允许手动跳过
}
};
