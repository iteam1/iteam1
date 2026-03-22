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
                    
                    if (elementPosition.top < windowHeight * 0.95) {
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
                
                if (elementPosition.top < windowHeight * 0.95) {
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
    
    // Animated number counters
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 1400;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }

    // Project category filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                const items = document.querySelectorAll('.project-item, .showcase-item');
                items.forEach(item => {
                    const cat = item.getAttribute('data-category') || '';
                    if (filter === 'all' || cat.includes(filter)) {
                        item.style.opacity = '1';
                        item.style.transform = '';
                        item.style.pointerEvents = '';
                    } else {
                        item.style.opacity = '0.2';
                        item.style.transform = 'scale(0.97)';
                        item.style.pointerEvents = 'none';
                    }
                });
            });
        });
    }

    // Fancy grid sparkle + line trace effect
    (function() {
        const heroGrid = document.querySelector('.hero-grid-bg');
        if (!heroGrid) return;

        const GRID = 55;
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;';
        heroGrid.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = heroGrid.offsetWidth;
            canvas.height = heroGrid.offsetHeight;
        }
        resize();
        new ResizeObserver(resize).observe(heroGrid);

        let mx = -9999, my = -9999;
        let sparks = [], traces = [];

        heroGrid.addEventListener('mousemove', function(e) {
            const r = this.getBoundingClientRect();
            mx = e.clientX - r.left;
            my = e.clientY - r.top;
            this.style.setProperty('--grid-mouse-x', mx + 'px');
            this.style.setProperty('--grid-mouse-y', my + 'px');
        });
        heroGrid.addEventListener('mouseleave', function() {
            mx = -9999; my = -9999;
            this.style.setProperty('--grid-mouse-x', '-999px');
            this.style.setProperty('--grid-mouse-y', '-999px');
        });

        function nearbyIntersections(radius) {
            const pts = [];
            const x0 = Math.floor((mx - radius) / GRID) * GRID;
            const y0 = Math.floor((my - radius) / GRID) * GRID;
            for (let x = x0; x <= mx + radius; x += GRID) {
                for (let y = y0; y <= my + radius; y += GRID) {
                    const d = Math.hypot(x - mx, y - my);
                    if (d <= radius) pts.push({ x, y, d });
                }
            }
            return pts;
        }

        function spawnEffects() {
            if (mx < 0) return;
            const pts = nearbyIntersections(180);

            // Intersection sparkle dots
            pts.forEach(p => {
                if (Math.random() < 0.12) {
                    sparks.push({
                        x: p.x, y: p.y,
                        life: 0,
                        maxLife: 35 + Math.random() * 55,
                        size: 0.5 + Math.random() * 0.8,
                        alpha: 0.4 + Math.random() * 0.4,
                        color: Math.random() < 0.7 ? '0,229,215' : '0,180,160'
                    });
                }
            });

            // Line traces: shoot along a random grid line from a nearby intersection
            if (Math.random() < 0.08 && pts.length > 0) {
                const p = pts[Math.floor(Math.random() * pts.length)];
                const horiz = Math.random() < 0.5;
                const length = (60 + Math.random() * 120) * (Math.random() < 0.5 ? 1 : -1);
                traces.push({
                    x: p.x, y: p.y,
                    horiz,
                    length,
                    life: 0,
                    maxLife: 40 + Math.random() * 40,
                    alpha: 0.6 + Math.random() * 0.4
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Math.random() < 0.5) spawnEffects();

            // Draw sparks
            sparks = sparks.filter(s => s.life < s.maxLife);
            sparks.forEach(s => {
                s.life++;
                const t = s.life / s.maxLife;
                const a = s.alpha * Math.sin(t * Math.PI);
                const r = s.size * (1 + t * 0.8);
                const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 2.5);
                g.addColorStop(0,   `rgba(${s.color},${a})`);
                g.addColorStop(0.4, `rgba(${s.color},${a * 0.3})`);
                g.addColorStop(1,   `rgba(${s.color},0)`);
                ctx.beginPath();
                ctx.arc(s.x, s.y, r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            });

            // Draw line traces
            traces = traces.filter(t => t.life < t.maxLife);
            traces.forEach(t => {
                t.life++;
                const progress = t.life / t.maxLife;
                const a = t.alpha * Math.sin(progress * Math.PI);
                const currentLen = t.length * progress;
                ctx.beginPath();
                if (t.horiz) {
                    ctx.moveTo(t.x, t.y);
                    ctx.lineTo(t.x + currentLen, t.y);
                } else {
                    ctx.moveTo(t.x, t.y);
                    ctx.lineTo(t.x, t.y + currentLen);
                }
                ctx.strokeStyle = `rgba(0,229,215,${a})`;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 6;
                ctx.shadowColor = `rgba(0,229,215,${a})`;
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(draw);
        }
        draw();
    })();

    // Spotlight card hover effect (Devin.ai-style)
    const spotlightCards = document.querySelectorAll('.preview-card, .project-item, .showcase-item, .contact-box');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--mouse-x', '50%');
            this.style.setProperty('--mouse-y', '50%');
        });
    });

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
