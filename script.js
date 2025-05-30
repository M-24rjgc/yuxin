// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initADHDDemo();
    initContactForm();
    initAnimations();
    initDownloadFeatures();
    initADHDFriendlyFeatures();
    initWarmInteractions();
    initFontSelector();
    initMemoryDemo();
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
                button.style.background = 'linear-gradient(135deg, #C8A882, #B8956A)';

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
            background: linear-gradient(135deg, #C8A882, #B8956A);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 16px rgba(200, 168, 130, 0.3);
            border: 2px solid var(--primary-color);
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

// ADHD友好功能增强
function initADHDFriendlyFeatures() {
    // 段落点击高亮功能
    const paragraphs = document.querySelectorAll('.hero-description, .section-header p, .feature-card p, .innovation-info p, .demo-item p, .contact-item p');

    paragraphs.forEach(p => {
        p.addEventListener('click', function() {
            // 移除其他段落的高亮
            paragraphs.forEach(para => para.classList.remove('paragraph-highlighted'));

            // 高亮当前段落
            this.classList.add('paragraph-highlighted');

            // 添加温馨的点击反馈
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // 3秒后自动取消高亮
            setTimeout(() => {
                this.classList.remove('paragraph-highlighted');
            }, 3000);
        });
    });

    // 添加段落高亮样式
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .paragraph-highlighted {
            background: linear-gradient(135deg, rgba(222, 136, 119, 0.15), rgba(160, 82, 45, 0.1)) !important;
            border-left: 4px solid var(--primary-color) !important;
            box-shadow: 0 4px 12px rgba(222, 136, 119, 0.2) !important;
            transform: translateX(8px) !important;
        }
    `;
    document.head.appendChild(highlightStyle);

    // 键盘导航增强
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // 增强Tab键焦点可见性
            setTimeout(() => {
                const focused = document.activeElement;
                if (focused && focused.tagName !== 'BODY') {
                    focused.style.outline = '3px solid var(--primary-color)';
                    focused.style.outlineOffset = '3px';
                }
            }, 10);
        }
    });
}

// 温馨交互功能
function initWarmInteractions() {
    // 为按钮添加温馨的悬停效果
    const buttons = document.querySelectorAll('.btn, .feature-tag, .nav-link');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(222, 136, 119, 0.25)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // 为卡片添加温馨的交互效果
    const cards = document.querySelectorAll('.feature-card, .innovation-item, .demo-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 8px 25px rgba(222, 136, 119, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    // 添加温馨的页面加载动画
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';

        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease, transform 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }

    // 为表单输入添加温馨的反馈
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 4px rgba(222, 136, 119, 0.15)';
            this.style.backgroundColor = 'rgba(255, 245, 230, 0.5)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.style.backgroundColor = '';
        });
    });
}

// 字体选择器功能
function initFontSelector() {
    const fontSelector = document.querySelector('.font-selector');
    const toggle = document.querySelector('.font-selector-toggle');
    const options = document.querySelector('.font-options');
    const fontOptions = document.querySelectorAll('.font-option');

    // 字体映射
    const fontMap = {
        'marugo': 'var(--font-marugo)',
        'noto': 'var(--font-noto)',
        'source': 'var(--font-source)',
        'inter': 'var(--font-inter)',
        'lexend': 'var(--font-lexend)',
        'atkinson': 'var(--font-atkinson)'
    };

    // 从本地存储加载字体偏好
    const savedFont = localStorage.getItem('preferred-font') || 'marugo';
    applyFont(savedFont);
    updateActiveOption(savedFont);

    // 切换字体选择器显示/隐藏
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        options.classList.toggle('active');

        // 更新箭头方向
        const chevron = toggle.querySelector('.fa-chevron-down, .fa-chevron-up');
        if (options.classList.contains('active')) {
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        } else {
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    });

    // 点击页面其他地方关闭字体选择器
    document.addEventListener('click', function(e) {
        if (!fontSelector.contains(e.target)) {
            options.classList.remove('active');
            const chevron = toggle.querySelector('.fa-chevron-up, .fa-chevron-down');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    });

    // 字体选项点击事件
    fontOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const fontKey = this.getAttribute('data-font');

            // 应用字体
            applyFont(fontKey);

            // 更新活动状态
            updateActiveOption(fontKey);

            // 保存到本地存储
            localStorage.setItem('preferred-font', fontKey);

            // 关闭选择器
            options.classList.remove('active');
            const chevron = toggle.querySelector('.fa-chevron-up, .fa-chevron-down');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');

            // 显示字体切换通知
            showFontChangeNotification(this.querySelector('.font-option-name').textContent);
        });

        // 悬停预览效果
        option.addEventListener('mouseenter', function() {
            const fontKey = this.getAttribute('data-font');
            document.body.style.transition = 'font-family 0.2s ease';
            document.body.style.fontFamily = fontMap[fontKey];
        });

        option.addEventListener('mouseleave', function() {
            const currentFont = localStorage.getItem('preferred-font') || 'marugo';
            document.body.style.fontFamily = fontMap[currentFont];
        });
    });

    // 应用字体到整个页面
    function applyFont(fontKey) {
        const fontFamily = fontMap[fontKey];
        if (fontFamily) {
            document.documentElement.style.setProperty('--font-family', fontFamily);
            document.body.style.fontFamily = fontFamily;
        }
    }

    // 更新活动选项
    function updateActiveOption(fontKey) {
        fontOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-font') === fontKey) {
                option.classList.add('active');
            }
        });
    }

    // 键盘导航支持
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
        }
    });

    fontOptions.forEach((option, index) => {
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextOption = fontOptions[index + 1] || fontOptions[0];
                nextOption.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevOption = fontOptions[index - 1] || fontOptions[fontOptions.length - 1];
                prevOption.focus();
            } else if (e.key === 'Escape') {
                options.classList.remove('active');
                toggle.focus();
            }
        });
    });
}

// 显示字体切换通知
function showFontChangeNotification(fontName) {
    const notification = document.createElement('div');
    notification.className = 'font-change-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-font"></i>
            <span>已切换到 ${fontName}</span>
        </div>
    `;

    // 添加通知样式
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .font-change-notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-heavy);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--font-family);
        }

        .font-change-notification .notification-content {
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

// 记忆演示功能
function initMemoryDemo() {
    // 添加延迟确保DOM完全加载
    setTimeout(() => {
        const navDots = document.querySelectorAll('.nav-dot');
        const memoryModules = document.querySelectorAll('.memory-module');
        const progressText = document.querySelector('.progress-text');
        const progressCounter = document.querySelector('.progress-counter');

        console.log('记忆演示初始化:', {
            navDots: navDots.length,
            memoryModules: memoryModules.length,
            progressText: !!progressText,
            progressCounter: !!progressCounter
        });

        if (navDots.length === 0 || memoryModules.length === 0) {
            console.warn('记忆演示元素未找到，稍后重试...');
            setTimeout(initMemoryDemo, 1000);
            return;
        }

        // 模块名称映射
        const moduleNames = {
            'timeline': '时间地点记录',
            'personal': '人物信息表',
            'events': '重大生活事件',
            'psychology': '当前心理状况',
            'lifestyle': '生活状况',
            'family': '家庭关系'
        };

        // 导航点击事件
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const targetModule = this.getAttribute('data-target');

                // 移除所有活动状态
                navDots.forEach(d => d.classList.remove('active'));
                memoryModules.forEach(m => m.classList.remove('active'));

                // 添加当前活动状态
                this.classList.add('active');
                const targetElement = document.querySelector(`[data-module="${targetModule}"]`);
                if (targetElement) {
                    targetElement.classList.add('active');
                }

                // 更新进度指示器
                if (progressText && progressCounter) {
                    progressText.textContent = moduleNames[targetModule] || '未知模块';
                    progressCounter.textContent = `${index + 1}/${navDots.length}`;

                    // 添加更新动画
                    progressText.style.transform = 'scale(1.1)';
                    progressCounter.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        progressText.style.transform = '';
                        progressCounter.style.transform = '';
                    }, 200);
                }

                // 添加点击反馈
                this.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });

            // 悬停效果
            dot.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(1.2)';
                    this.style.background = 'var(--secondary-color)';
                }
            });

            dot.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = '';
                    this.style.background = '';
                }
            });
        });

        // 自动轮播功能
        let currentIndex = 0;
        let autoPlayInterval;

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % navDots.length;
                navDots[currentIndex].click();
            }, 5000); // 增加到5秒，因为有更多模块
        };

        startAutoPlay();

        // 鼠标悬停时暂停自动轮播
        const memoryDemo = document.querySelector('.memory-demo');
        if (memoryDemo) {
            memoryDemo.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            memoryDemo.addEventListener('mouseleave', () => {
                // 重新启动自动轮播
                startAutoPlay();
            });
        }

        // 记录项点击事件
        const recordItems = document.querySelectorAll('.record-item');
        recordItems.forEach(item => {
            item.addEventListener('click', function() {
                // 添加点击效果
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 6px 20px rgba(222, 136, 119, 0.3)';

                // 显示详细信息提示
                showMemoryDetailNotification();

                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
            });
        });

        // 字段悬停效果增强
        const fields = document.querySelectorAll('.field');
        fields.forEach(field => {
            field.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(222, 136, 119, 0.15)';
                this.style.color = 'var(--primary-color)';
                this.style.fontWeight = '600';
            });

            field.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.color = '';
                this.style.fontWeight = '';
            });
        });
    }, 100); // setTimeout结束
}

// 显示记忆详情通知
function showMemoryDetailNotification() {
    const notification = document.createElement('div');
    notification.className = 'memory-detail-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>记忆档案系统可以详细记录和管理用户的心理状态变化</span>
        </div>
    `;

    // 添加通知样式
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .memory-detail-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 16px rgba(222, 136, 119, 0.3);
            border: 2px solid var(--accent-color);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 300px;
        }

        .memory-detail-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .memory-detail-notification i {
            font-size: 1.2rem;
            opacity: 0.9;
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


