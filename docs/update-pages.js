// 批量更新页面脚本
const fs = require('fs');
const path = require('path');

const pages = ['products.html', 'cases.html', 'about.html', 'contact.html'];

pages.forEach(page => {
    const filePath = path.join(__dirname, page);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 更新CSS引用
        content = content.replace('styles.css', 'styles-enhanced.css');
        
        // 添加主题切换按钮
        content = content.replace(
            '<a href="index.html" class="logo">🍋 <span>柠檬智校</span></a>',
            '<a href="index.html" class="logo">🍋 <span>柠檬智校</span></a>\n            <button class="theme-toggle">\n                <i class="fas fa-moon"></i>\n            </button>'
        );
        
        // 更新页脚链接
        content = content.replace(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g, '<li><a href="$1"><i class="fas fa-chevron-right"></i> $2</a></li>');
        
        // 更新联系方式
        content = content.replace(/📞/g, '<i class="fas fa-phone"></i> 📞');
        content = content.replace(/📧/g, '<i class="fas fa-envelope"></i> 📧');
        content = content.replace(/🏢/g, '<i class="fas fa-map-marker-alt"></i> 🏢');
        
        // 添加JavaScript引用
        content = content.replace(
            '</footer>\n\n    <script>',
            '</footer>\n\n    <script src="js/main.js"></script>\n    <!-- Google Analytics (模拟) -->\n    <script>'
        );
        
        // 添加meta标签和字体
        if (!content.includes('Inter:wght')) {
            const headEnd = content.indexOf('</head>');
            const metaTags = `
    <meta name="keywords" content="智慧教育,在线课堂,AI助教,教育大数据,智慧校园,教育科技">
    <meta name="author" content="柠檬智校">
    <meta property="og:title" content="柠檬智校 - 智能教育解决方案">
    <meta property="og:description" content="柠檬智校提供全方位的智慧教育解决方案，服务全国1000+学校和教育机构。">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://lemonzhixiao.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">`;
            content = content.slice(0, headEnd) + metaTags + content.slice(headEnd);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${page}`);
    }
});

console.log('All pages updated successfully!');