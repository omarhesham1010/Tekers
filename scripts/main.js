// ============================================
// TEKERS - Main JavaScript
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');

// Handle cross-page navigation links (for services/projects pages)
document.addEventListener('DOMContentLoaded', () => {
    // Find all links that point to index.html with hash
    const crossPageLinks = document.querySelectorAll('a[href*="index.html#"]');
    
    crossPageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Let the browser navigate, the hash will be handled on the new page
            // No preventDefault needed - we want the navigation to happen
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
if (navLinks && navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if link is to another page (contains index.html)
            if (href && href.includes('index.html#')) {
                // Allow navigation to happen, then scroll on the new page
                // The hash will be handled by the code below
                return; // Let the browser handle the navigation
            }
            
            // For same-page links, prevent default and smooth scroll
            e.preventDefault();
            const targetId = href;
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
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Counter Animation for Stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Observe stat numbers for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (frontend only)
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = '<span>Message Sent!</span>';
            submitButton.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 1500);
        
        // Log form data (for development)
        console.log('Form submitted:', data);
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    const heroText = document.querySelector('.hero-text');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add glow effect on hover for interactive elements
document.querySelectorAll('.service-card, .project-card, .info-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Handle hash navigation when page loads (for cross-page navigation)
function scrollToHash() {
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetSection = document.querySelector(hash);
        
        if (targetSection) {
            // Wait a bit for page to fully load
            setTimeout(() => {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link (only if navLinks exist - i.e., on index.html)
    if (navLinks && navLinks.length > 0) {
        if (window.location.hash) {
            const hash = window.location.hash;
            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash || link.getAttribute('href').endsWith(hash)) {
                    link.classList.add('active');
                }
            });
        } else {
            navLinks[0].classList.add('active');
        }
    }
    
    // Scroll to hash if present (for navigation from other pages)
    scrollToHash();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Also handle hash changes after page load
window.addEventListener('hashchange', () => {
    scrollToHash();
    
    // Update active nav link (only if navLinks exist - i.e., on index.html)
    if (navLinks && navLinks.length > 0) {
        const hash = window.location.hash;
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash || link.getAttribute('href').endsWith(hash)) {
                link.classList.add('active');
            }
        });
    }
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('.section-header, .about-text, .contact-info');

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    sectionObserver.observe(section);
});

// Add cursor trail effect (optional enhancement)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only add trail on certain sections for performance
    const hoveredElement = e.target.closest('.service-card, .project-card, .btn');
    if (hoveredElement) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
