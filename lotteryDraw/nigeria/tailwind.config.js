/** @type {import('tailwindcss').Config} */
export default {
  // 4.0 中 content 配置与 3.x 一致，指定需要扫描的文件
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  // 主题扩展（可添加尼日利亚风格配色）
  theme: {
    extend: {
      colors: {
        naija: {
          green: '#008751',    // 尼日利亚国旗绿
          white: '#FFFFFF',    // 国旗白
          greenDark: '#006644' // 深绿
        }
      }
    }
  },
  // 4.0 插件配置方式不变
  plugins: []
}
