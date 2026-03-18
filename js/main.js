// 柠檬智校官网主JavaScript文件
// 包含现代化交互功能和性能优化

class LemonWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.smoothScrolling();
        this.navbarScrollEffect();
        this.animateOnScroll();
        this.formValidation();
        this.themeToggle();
        this.lazyLoadImages();
        this.mobileMenu();
        this.pageTransitions();
    }

    // 平滑滚动导航
    smoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // 页面内链接平滑滚动
        document.querySelectorAll('a[href^="./"]:not([href$=".pdf"])').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('href');
                this.navigateToPage(url);
            });
        });
    }

    // 导航栏滚动效果
    navbarScrollEffect() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 隐藏/显示导航栏
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            
            // 添加滚动样式
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // 滚动动画
    animateOnScroll() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.feature-card, .stat-item, .page-section').forEach(el => {
            el.classList.add('loading');
            observer.observe(el);
        });
    }

    // 表单验证
    formValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const isValid = this.validateForm(formData, form);
                
                if (isValid) {
                    this.submitForm(formData, form);
                }
            });
        });
    }

    validateForm(formData, form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!formData.get(field.name) || formData.get(field.name).trim() === '') {
                this.showError(field, '此字段为必填项');
                isValid = false;
            } else if (field.type === 'email' && !this.isValidEmail(formData.get(field.name))) {
                this.showError(field, '请输入有效的邮箱地址');
                isValid = false;
            } else if (field.type === 'tel' && !this.isValidPhone(formData.get(field.name))) {
                this.showError(field, '请输入有效的手机号码');
                isValid = false;
            } else {
                this.hideError(field);
            }
        });
        
        return isValid;
    }

    showError(field, message) {
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#f44336';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.5rem';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        field.style.borderColor = '#f44336';
    }

    hideError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '#e0e0e0';
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    isValidPhone(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    }

    submitForm(formData, form) {
        // 模拟表单提交
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = '提交中...';
        
        // 模拟API调用
        setTimeout(() => {
            alert('感谢您的咨询！我们的客户经理将在24小时内与您联系。');
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    }

    // 主题切换
    themeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                this.updateThemeToggleIcon(themeToggle, isDark);
            });

            // 初始化主题
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.body.classList.add('dark-mode');
                this.updateThemeToggleIcon(themeToggle, true);
            }
        }
    }

    updateThemeToggleIcon(button, isDark) {
        button.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // 图片懒加载
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // 移动端菜单
    mobileMenu() {
        // 创建移动端菜单按钮
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-toggle';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            color: var(--text-primary);
        `;

        const navbarContainer = document.querySelector('.navbar .container');
        if (navbarContainer) {
            navbarContainer.insertBefore(mobileMenuButton, navbarContainer.firstChild);
        }

        // 响应式菜单切换
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        this.handleMobileMenu(mediaQuery);
        mediaQuery.addListener(this.handleMobileMenu.bind(this));
    }

    handleMobileMenu(e) {
        const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (e.matches) {
            // 移动端
            mobileMenuButton.style.display = 'block';
            navLinks.style.display = 'none';
            
            mobileMenuButton.addEventListener('click', () => {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '1rem';
                    navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                    mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
                }
            });
        } else {
            // 桌面端
            mobileMenuButton.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
        }
    }

    // 页面切换动画
    pageTransitions() {
        // 为页面切换添加淡入淡出效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // 页面导航（用于SPA-like体验）
    navigateToPage(url) {
        // 简单的页面预加载
        fetch(url)
            .then(response => response.text())
            .then(html => {
                // 这里可以实现更复杂的SPA逻辑
                // 目前先使用标准页面跳转
                window.location.href = url;
            })
            .catch(error => {
                console.error('Navigation error:', error);
                window.location.href = url;
            });
    }
}

// 初始化网站
document.addEventListener('DOMContentLoaded', () => {
    new LemonWebsite();
    
    // 性能监控
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
});

// 服务工作者注册（用于PWA）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}