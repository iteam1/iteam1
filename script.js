// Main JavaScript file for iteam1 website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu handling
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar ul');
    
    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.navbar ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navbarMenu && navbarMenu.classList.contains('active') && !event.target.closest('.navbar')) {
            navbarMenu.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navbarMenu && navbarMenu.classList.contains('active')) {
                        navbarMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Animation for scroll appearance if not already defined
    function handleElementsAnimation() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        if (animateElements.length > 0) {
            const checkVisibility = function() {
                animateElements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition.top < windowHeight * 0.9) {
                        element.classList.add('visible');
                    }
                });
            };
            
            // Check on scroll
            window.addEventListener('scroll', checkVisibility);
            
            // Check on page load
            checkVisibility();
        }
    }

    // Call the function on page load
    handleElementsAnimation();

    // Update copyright year automatically
    // Set current year in footer
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    if (yearElements.length > 0) {
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // Responsive projects/cards handling for touch devices
    const cards = document.querySelectorAll('.card');
    
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-focus');
            }, {passive: true});
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-focus');
                }, 300);
            }, {passive: true});
        });
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const checkVisibility = function() {
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (elementPosition.top < windowHeight * 0.9) {
                    element.classList.add('animate');
                }
            });
        };
        
        // Check on scroll
        window.addEventListener('scroll', checkVisibility);
        
        // Check on page load
        checkVisibility();
    }
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Thanks for your message! We will get back to you soon.';
                
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.parentNode.insertBefore(successMsg, submitBtn.nextSibling);
                
                // Reset form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }
        });
        
        // Remove error class on input focus
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Projects video lazy loading
    const videos = document.querySelectorAll('iframe[src*="youtube.com"]');
    
    if (videos.length > 0) {
        const loadVideo = function(video) {
            const src = video.getAttribute('src');
            if (src && src.indexOf('autoplay=1') === -1) {
                video.setAttribute('src', src.replace('?', '?autoplay=0&'));
            }
        };
        
        const handleIntersection = function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadVideo(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '0px',
            threshold: 0.1
        });
        
        videos.forEach(video => {
            observer.observe(video);
        });
    }
});
