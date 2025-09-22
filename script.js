// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Progress Bar
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);
        return progressBar;
    }

    const progressBar = createProgressBar();

    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    // Navbar background on scroll
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', function() {
        updateProgressBar();
        updateNavbar();
        animateOnScroll();
        highlightActiveNavLink();
    });

    // Intersection Observer for animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Highlight active navigation link
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinksList = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Add animation classes to elements
    function addAnimationClasses() {
        // Add fade-in to various elements
        const fadeElements = document.querySelectorAll('.research-item, .publication-item, .award-item, .skill-category');
        fadeElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${index * 0.1}s`;
        });

        // Add slide-in animations
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add('slide-in-left');
            } else {
                item.classList.add('slide-in-right');
            }
        });

        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Floating elements animation
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');

        floatingElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            let position = 0;

            function animate() {
                position += speed * 0.5;
                element.style.transform = `translateY(${Math.sin(position * 0.01) * 10}px) rotate(${position * 0.5}deg)`;
                requestAnimationFrame(animate);
            }

            animate();
        });
    }

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize typing effect
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    }

    // Add parallax to scroll event (throttled)
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    function updateScrollEffects() {
        parallaxEffect();
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);

    // Smooth reveal animations for stats
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                if (stat.textContent.includes('.')) {
                    stat.textContent = current.toFixed(2);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 50);
        });
    }

    // Trigger stats animation when stats section is in view
    const statsSection = document.querySelector('.quick-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Copy email to clipboard functionality
    function addCopyEmailFeature() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const email = this.getAttribute('href').replace('mailto:', '');

                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary notification
                    showNotification('Email copied to clipboard!');
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification('Email copied to clipboard!');
                });
            });
        });
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Back to top button
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
    }

    // Initialize all features
    function init() {
        addAnimationClasses();
        animateFloatingElements();
        addCopyEmailFeature();
        createBackToTopButton();

        // Initial scroll check
        animateOnScroll();
        updateProgressBar();
        updateNavbar();
        highlightActiveNavLink();
    }

    // Run initialization
    init();

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);

        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join('') === konamiSequence.join('')) {
            showNotification('🎉 Easter egg found! You are awesome!');
            // Add some fun visual effect
            document.body.style.animation = 'rainbow 2s ease infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });

    // Add rainbow animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Throttle scroll events
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Replace scroll event listener with throttled version
    window.removeEventListener('scroll', updateScrollEffects);
    window.addEventListener('scroll', throttle(() => {
        updateProgressBar();
        updateNavbar();
        animateOnScroll();
        highlightActiveNavLink();
    }, 16)); // ~60fps

    // CV Download Function
    window.downloadCV = function() {
        // Create a temporary link to download the CV
        const link = document.createElement('a');
        link.href = 'cv.docx'; // 你可以把简历文件放在这里
        link.download = 'Tianzuo_Yuan_CV.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('CV download started!');
    };

    // Profile photo error handling
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'flex';
            }
        });

        profilePhoto.addEventListener('load', function() {
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'none';
            }
        });
    }

    console.log('🚀 Tianzuo Yuan\'s portfolio loaded successfully!');
    console.log('🎯 Built with passion for academic excellence');
    console.log('💡 Try the Konami code for a surprise!');
});