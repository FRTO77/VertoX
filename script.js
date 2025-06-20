// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Elements
    const nav = document.querySelector('nav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Scroll Effect on Navigation
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Show floating CTA after 50% scroll
        const scrollPercent = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const floatingCTA = document.getElementById('floatingCTA');
        
        if (scrollPercent > 50 && !floatingCTA.classList.contains('closed')) {
            floatingCTA.classList.add('show');
        } else if (scrollPercent <= 50) {
            floatingCTA.classList.remove('show');
        }
        
        lastScroll = currentScroll;
    });
    
    // Language Selector
    const langDropdown = document.querySelector('.lang-dropdown');
    if (langDropdown) {
        langDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                const langButton = document.querySelector('.lang-button');
                const flag = this.querySelector('.flag').textContent;
                const langCode = lang.toUpperCase();
                
                // Update button
                langButton.innerHTML = `
                    <span class="flag">${flag}</span>
                    <span>${langCode}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                `;
                
                // Here you would implement actual language switching
                console.log(`Language switched to: ${lang}`);
            });
        });
    }
    
    // Mobile Menu Toggle
    let mobileMenuOpen = false;
    mobileToggle.addEventListener('click', function() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <a href="#how-it-works">How it Works</a>
                <a href="#use-cases">Use Cases</a>
                <a href="#advantages">Advantages</a>
                <a href="#roadmap">Roadmap</a>
                <a href="#about">About</a>
                <div class="mobile-lang">
                    <a href="#" data-lang="en"><span class="flag">🇬🇧</span> English</a>
                    <a href="#" data-lang="ru"><span class="flag">🇷🇺</span> Русский</a>
                    <a href="#" data-lang="ka"><span class="flag">🇬🇪</span> ქართული</a>
                </div>
                <a href="#contact" class="mobile-cta">Get Early Access</a>
            `;
            
            // Style mobile menu
            mobileMenu.style.cssText = `
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 999;
            `;
            
            // Style links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.style.cssText = `
                    color: #a1a1aa;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 12px 0;
                    transition: color 0.3s ease;
                `;
                
                link.addEventListener('mouseenter', function() {
                    this.style.color = '#ffffff';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.color = '#a1a1aa';
                });
            });
            
            // Style mobile language section
            const mobileLang = mobileMenu.querySelector('.mobile-lang');
            mobileLang.style.cssText = `
                display: flex;
                gap: 16px;
                padding: 12px 0;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            `;
            
            // Style CTA
            const mobileCta = mobileMenu.querySelector('.mobile-cta');
            mobileCta.style.cssText = `
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white !important;
                padding: 12px 24px;
                border-radius: 8px;
                text-align: center;
                margin-top: 12px;
            `;
            
            document.body.appendChild(mobileMenu);
            
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            
            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    closeMobileMenu();
                });
            });
        } else {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.remove();
        }
        mobileMenuOpen = false;
        
        // Reset hamburger
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Demo Player
    const demoPlaceholder = document.querySelector('.demo-placeholder');
    if (demoPlaceholder) {
        demoPlaceholder.addEventListener('click', function() {
            // Here you would implement actual video playback
            // For now, we'll show a message
            const demoContainer = document.querySelector('.demo-player');
            demoContainer.innerHTML = `
                <div style="padding: 100px; text-align: center; color: #a1a1aa;">
                    <h3 style="color: #ffffff; margin-bottom: 16px;">Demo Video Coming Soon!</h3>
                    <p>We're preparing an amazing demonstration of VertoX in action.</p>
                    <p>Join our beta program to get early access to live demos.</p>
                </div>
            `;
        });
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('what-grid') ||
                    entry.target.parentElement.classList.contains('cases-grid') ||
                    entry.target.parentElement.classList.contains('testimonials-grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.what-card, .case-card, .timeline-item, .advantage-card, .testimonial-card, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mouse Follow Effect for Cards
    document.querySelectorAll('.what-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // Form Submission
    const earlyAccessForm = document.getElementById('earlyAccessForm');
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"></path>
                </svg>
                <span>Processing...</span>
            `;
            submitBtn.disabled = true;
            
            // Add spinner animation
            const style = document.createElement('style');
            style.textContent = `
                .spinner {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Success!</span>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Add success message below form
                const successMsg = document.createElement('p');
                successMsg.className = 'success-message';
                successMsg.textContent = "We'll notify you before launch. Check your email for confirmation!";
                successMsg.style.cssText = `
                    color: #10b981;
                    margin-top: 16px;
                    animation: fadeIn 0.5s ease;
                `;
                earlyAccessForm.appendChild(successMsg);
                
                // Reset form
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    if (successMsg) {
                        successMsg.remove();
                    }
                }, 3000);
            }, 1500);
        });
    }
    
    // Floating CTA
    const floatingCTA = document.getElementById('floatingCTA');
    const closeFloating = document.querySelector('.close-floating');
    
    if (closeFloating) {
        closeFloating.addEventListener('click', function() {
            floatingCTA.classList.add('closed');
            floatingCTA.classList.remove('show');
        });
    }
    
    // Typing Effect for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
        }, 200);
    }
    
    // Parallax Effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.neural-network, .sound-waves');
        
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('neural-network') ? 0.5 : 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add hover effect to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add glow effect to gradient text on hover
    document.querySelectorAll('.gradient-text').forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))';
            this.style.transition = 'filter 0.3s ease';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
    
    // Performance optimization - throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        // Update animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initialize page
    console.log('VertoX - Breaking language barriers with AI');
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
});
