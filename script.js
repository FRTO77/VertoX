// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    let mobileMenuOpen = false;
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOpen = !mobileMenuOpen;
            
            if (mobileMenuOpen) {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = 'rgba(15, 15, 35, 0.98)';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderTop = '1px solid rgba(138, 43, 226, 0.3)';
                
                // Animate hamburger to X
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                navLinksContainer.style.display = 'none';
                
                // Reset hamburger
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Navigation background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Close mobile menu on scroll
        if (mobileMenuOpen && mobileMenuToggle) {
            navLinksContainer.style.display = 'none';
            mobileMenuOpen = false;
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger counter animation for stat numbers
                if (entry.target.classList.contains('stat-card')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.hasAttribute('data-animated')) {
                        animateStatNumber(statNumber);
                        statNumber.setAttribute('data-animated', 'true');
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .tech-item, .stat-card, .timeline-item, .projection-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation for statistics
    function animateStatNumber(element) {
        const text = element.textContent;
        let target = 0;
        let suffix = '';
        
        // Parse the number and suffix
        if (text.includes('B')) {
            target = parseFloat(text) * 1000000000;
            suffix = 'B';
        } else if (text.includes('M')) {
            target = parseFloat(text) * 1000000;
            suffix = 'M';
        } else if (text.includes('K')) {
            target = parseFloat(text) * 1000;
            suffix = 'K';
        } else {
            target = parseInt(text.replace(/[^\d]/g, ''));
        }
        
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                if (suffix === 'B') {
                    element.textContent = (start / 1000000000).toFixed(1) + 'B';
                } else if (suffix === 'M') {
                    element.textContent = (start / 1000000).toFixed(0) + 'M';
                } else if (suffix === 'K') {
                    element.textContent = (start / 1000).toFixed(0) + 'K';
                } else {
                    element.textContent = Math.floor(start).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = text; // Reset to original
            }
        }
        updateCounter();
    }
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Typewriter effect for hero title
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
    
    // Initialize typewriter effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
    
    // Add loading animation for tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
    
    // Add floating animation to funding amount
    const fundingAmount = document.querySelector('.funding-amount');
    if (fundingAmount) {
        fundingAmount.classList.add('pulse');
        
        setInterval(() => {
            fundingAmount.style.textShadow = `
                0 0 20px rgba(138, 43, 226, 0.8),
                0 0 40px rgba(138, 43, 226, 0.6),
                0 0 60px rgba(138, 43, 226, 0.4)
            `;
            
            setTimeout(() => {
                fundingAmount.style.textShadow = '0 0 20px rgba(138, 43, 226, 0.3)';
            }, 1000);
        }, 3000);
    }
    
    // Contact form animation (if added later)
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add gradient text animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #8a2be2, #9370db, #8a2be2)';
            this.style.backgroundClip = 'text';
            this.style.webkitBackgroundClip = 'text';
            this.style.webkitTextFillColor = 'transparent';
            this.style.backgroundSize = '200% 100%';
            this.style.animation = 'gradient-shift 2s ease infinite';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.background = 'none';
            this.style.webkitTextFillColor = '#e6e6e6';
            this.style.animation = 'none';
        });
    });
    
    // Add CSS animation for gradient shift
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization - throttle scroll events
    let ticking = false;
    
    function updateScroll() {
        // Scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    // Initialize AOS-like animations
    function initAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Call initialization
    initAnimations();
    
    console.log('VertoX website loaded successfully! 🚀');
});