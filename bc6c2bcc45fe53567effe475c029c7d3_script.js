// Collado Nexus Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeScrollAnimations();
    initializeQuoteForm();
    initializeAnimatedText();
    initializeParallax();
    initializeLogoEffects();
});

// Smooth scrolling navigation
function initializeNavigation() {
    // Update active navigation item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation item based on scroll position
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll to quote section
function scrollToQuote() {
    const quoteSection = document.getElementById('quote');
    const headerOffset = 80;
    const elementPosition = quoteSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.service-card, .mission-text, .about-text, .stat-item, .location-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animated text for hero subtitle
function initializeAnimatedText() {
    const animatedTexts = [
        'Financial Strategy',
        'Brand Management', 
        'Global Logistics',
        'Import & Export',
        'Marketing Solutions',
        'Business Consulting'
    ];
    
    const animatedElement = document.querySelector('.animated-text');
    let currentIndex = 0;

    setInterval(() => {
        if (animatedElement) {
            animatedElement.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % animatedTexts.length;
                animatedElement.textContent = animatedTexts[currentIndex];
                animatedElement.style.opacity = '1';
            }, 300);
        }
    }, 3000);
}

// Parallax effect for hero background
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Quote form handling
function initializeQuoteForm() {
    const form = document.getElementById('quoteForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        showFormMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'SENDING...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showFormMessage('Thank you for your inquiry! Our team will contact you within 24 hours.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Individual field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    clearFieldError({ target: field });
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required.';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            errorMessage = 'Please enter a valid phone number.';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.style.borderColor = '#E53E3E';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#E53E3E';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '#333C4F';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 16px;
        margin-top: 24px;
        border-radius: 4px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);'
            : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
        }
    `;
    
    // Insert message after form
    const form = document.getElementById('quoteForm');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 13, 20, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 13, 20, 0.95)';
    }
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Loading animation for page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        if (target === '∞') return; // Skip infinity symbol
        
        const targetNumber = parseInt(target);
        let current = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.mission-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Logo Interactive Effects
function initializeLogoEffects() {
    const logoContainers = document.querySelectorAll('.logo-container');
    const heroLogoImage = document.querySelector('.hero-logo-image');
    
    // Add glow effect on hover for navigation logo
    logoContainers.forEach(container => {
        const logoImage = container.querySelector('.logo-image');
        
        container.addEventListener('mouseenter', function() {
            if (logoImage) {
                logoImage.classList.add('logo-glow');
                // Add lion crown effect
                logoImage.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) brightness(1.1)';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            if (logoImage) {
                logoImage.classList.remove('logo-glow');
                logoImage.style.filter = '';
            }
        });
    });
    
    // Enhanced parallax effect for hero logo
    if (heroLogoImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const rotation = scrolled * 0.05;
            heroLogoImage.style.transform = `translateY(${rate}px) rotate(${rotation}deg)`;
            
            // Add subtle glow based on scroll position
            const glowIntensity = Math.min(scrolled / 500, 0.5);
            heroLogoImage.style.filter = `drop-shadow(0 0 ${10 + glowIntensity * 20}px rgba(212, 175, 55, ${0.2 + glowIntensity}))`;
        });
        
        // Enhanced hover effects for hero logo
        heroLogoImage.addEventListener('mouseenter', function() {
            this.style.animation = 'heroLogoReveal 0.5s ease-out forwards, infinityPulse 2s ease-in-out infinite';
            this.style.transform = 'scale(1.05)';
        });
        
        heroLogoImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.animation = 'float 6s ease-in-out 2s infinite';
        });
        
        // Click effect for hero logo
        heroLogoImage.addEventListener('click', function() {
            // Lion crown reveal effect
            this.style.transform = 'scale(0.95) rotate(-2deg)';
            this.style.filter = 'brightness(1.2) contrast(1.1)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.02) rotate(1deg)';
                this.style.filter = 'brightness(1) contrast(1)';
            }, 150);
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = '';
            }, 300);
        });
    }
    
    // Add click effect to navigation logo
    logoContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // If it's the navigation logo, scroll to top
            if (this.closest('.navbar')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Logo entrance animation with intersection observer
    const logoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logoImage = entry.target.querySelector('.logo-image, .hero-logo-image');
                if (logoImage) {
                    logoImage.classList.add('logo-loading');
                    setTimeout(() => {
                        logoImage.classList.remove('logo-loading');
                    }, 1500);
                }
                logoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe both navigation and hero logos
    document.querySelectorAll('.logo-container, .hero-logo').forEach(logo => {
        logoObserver.observe(logo);
    });
    
    // Add floating particles effect around logo (optional enhancement)
    createFloatingParticles();
}

// Create floating particles effect around logo
function createFloatingParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #D4AF37, #3B82F6);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${20 + Math.random() * 60}%;
            top: ${20 + Math.random() * 60}%;
        `;
        heroSection.appendChild(particle);
    }
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-10px) translateX(-5px) scale(0.9);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-30px) translateX(-15px) scale(1.05);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(particleStyle);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any modals or reset forms
    if (e.key === 'Escape') {
        // Add any cleanup needed
    }
    
    // Enter key on CTA button
    if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
        scrollToQuote();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveNavItem, 100));