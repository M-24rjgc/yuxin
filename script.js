// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initADHDDemo();
    initContactForm();
    initAnimations();
    initDownloadFeatures();
});

// 导航栏功能
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 汉堡菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接时关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 245, 230, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 245, 230, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    // 创建Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .innovation-item, .arch-layer, .demo-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .innovation-item, .arch-layer, .demo-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .innovation-item:nth-child(even) {
            transform: translateX(-30px);
        }

        .innovation-item:nth-child(even).animate-in {
            transform: translateX(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ADHD友好演示功能
function initADHDDemo() {
    const demoTexts = document.querySelectorAll('.demo-text p');

    demoTexts.forEach(text => {
        text.addEventListener('click', function() {
            // 移除其他元素的高亮
            demoTexts.forEach(t => t.classList.remove('active-highlight'));

            // 添加当前元素的高亮
            this.classList.add('active-highlight');

            // 添加点击反馈
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        // 鼠标悬停效果
        text.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 12px rgba(222, 136, 119, 0.2)';
        });

        text.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // 添加高亮样式
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .active-highlight {
            background: linear-gradient(135deg, #DE8877, #A0522D) !important;
            color: white !important;
            transform: translateX(10px) !important;
            box-shadow: 0 6px 20px rgba(222, 136, 119, 0.3) !important;
        }
    `;
    document.head.appendChild(highlightStyle);
}

// 联系表单功能
function initContactForm() {
    const form = document.querySelector('.contact-form form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            // 显示提交状态
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            button.disabled = true;

            // 模拟发送过程
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> 发送成功';
                button.style.background = '#22c55e';

                // 重置表单
                form.reset();

                // 恢复按钮状态
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 2000);
            }, 1500);
        });

        // 输入框焦点效果
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = '';
            });
        });
    }
}

// 初始化动画
function initAnimations() {
    // 打字机效果
    const typingElements = document.querySelectorAll('.typing-indicator span');
    typingElements.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.2}s`;
    });

    // 聊天消息动画
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';

        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 800);
    });

    // 状态点脉冲动画
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusDot.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
}

// 下载功能
function initDownloadFeatures() {
    // 为所有下载按钮添加点击效果
    const downloadButtons = document.querySelectorAll('.btn-download, a[download]');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';

            // 显示下载提示
            showDownloadNotification(this.getAttribute('download') || '文件');

            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 为视频播放器添加增强功能
    const videoPlayer = document.querySelector('.demo-video-player');
    if (videoPlayer) {
        videoPlayer.addEventListener('loadstart', function() {
            console.log('视频开始加载');
        });

        videoPlayer.addEventListener('canplay', function() {
            console.log('视频可以播放');
        });

        videoPlayer.addEventListener('error', function() {
            console.error('视频加载失败');
            showErrorNotification('视频加载失败，请检查网络连接');
        });
    }
}

// 显示下载通知
function showDownloadNotification(fileName) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-download"></i>
            <span>正在下载 ${fileName}</span>
        </div>
    `;

    // 添加通知样式
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .download-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(notificationStyle);
    document.body.appendChild(notification);

    // 3秒后移除通知
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            document.head.removeChild(notificationStyle);
        }
    }, 3000);
}

// 显示错误通知
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;

    // 添加错误通知样式
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .error-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 4.7s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    `;

    document.head.appendChild(notificationStyle);
    document.body.appendChild(notification);

    // 5秒后移除通知
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            document.head.removeChild(notificationStyle);
        }
    }, 5000);
}

// 工具函数：节流
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


