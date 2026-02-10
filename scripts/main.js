// ============================================
// TEKERS - Main JavaScript
// ============================================

const initApp = () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Handle cross-page navigation links (for services/projects pages)
    const crossPageLinks = document.querySelectorAll('a[href*="index.html#"]');
    crossPageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Let the browser navigate, the hash will be handled on the new page
        });
    });

    // Navbar Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        // Remove existing listeners to avoid duplicates if initApp is called multiple times
        // Since we can't easily remove anonymous functions, we assume initApp is called once
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Check if link is to another page (contains index.html)
                if (href && href.includes('index.html#')) {
                    return;
                }

                // For same-page links
                e.preventDefault();
                const targetId = href;
                if (!targetId || targetId === '#') return;

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

    if (sections.length > 0 && navLinks) {
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
    }

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
    if (statNumbers.length > 0) {
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
    }

    // Google Auth & EmailJS
    initializeAuthAndContact(contactForm);

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const heroText = document.querySelector('.hero-text');

        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Hover effects
    document.querySelectorAll('.service-card, .project-card, .info-card').forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Force scroll to top on load (User request)
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Hash navigation
    // scrollToHash(); // Disabled per user request

    // Fade in body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Hash change handler
    window.addEventListener('hashchange', () => {
        scrollToHash();
        // Update active link logic...
        if (navLinks) {
            const hash = window.location.hash;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash || link.getAttribute('href').endsWith(hash)) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Section reveal animations
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
};

// Helper for hash scrolling
function scrollToHash() {
    // Disabled per user request - always ensure top on load
    // if (window.location.hash) { ... }
    return;
}

// User state
let currentUser = null;
let isSigningIn = false;
let googleSigninContainer, userProfile, userAvatar, logoutButton;

const GOOGLE_CLIENT_ID = '1077996978994-o02a67ascf2qkjc6ruumqa7o8g4n94es.apps.googleusercontent.com';
const EMAILJS_SERVICE_ID = 'service_nf8rry8';
const EMAILJS_TEMPLATE_ID = 'template_89gkm91';
const EMAILJS_PUBLIC_KEY = 'VBtsTa6iew5vcaeG-';

function initializeAuthAndContact(contactForm) {
    // DOM references need to be fetched NOW
    googleSigninContainer = document.getElementById('google-signin-button');
    userProfile = document.getElementById('user-profile');
    userAvatar = document.getElementById('user-avatar');
    logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.removeEventListener('click', handleLogout); // clear old if any
        logoutButton.addEventListener('click', handleLogout);
    }

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Check Google Auth loading
    const checkGoogle = setInterval(() => {
        if (typeof google !== 'undefined' && google.accounts) {
            clearInterval(checkGoogle);
            initializeGoogleSignIn();
            updateHeaderUI();
            console.log('✅ [System] Google Identity Services loaded successfully');
        }
    }, 100);

    setTimeout(() => {
        clearInterval(checkGoogle);
        if (typeof google === 'undefined' || !google.accounts) {
            if (googleSigninContainer) {
                console.error('❌ [System] Google Identity Services failed to load.');
                showNotification('Google Sign-In unavailable', 'error');
                googleSigninContainer.innerHTML = '<button class="btn btn-secondary" onclick="window.location.reload()">Retry Sign-In</button>';
            }
        }
    }, 5000);

    // Contact form
    if (contactForm) {
        // Clone to remove old listeners
        const newForm = contactForm.cloneNode(true);
        contactForm.parentNode.replaceChild(newForm, contactForm);

        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            if (!formData.subject || !formData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!currentUser) {
                window.pendingMessage = formData;
                showNotification('Signing in to send your message...', 'info');
                triggerGoogleSignIn();
            } else {
                sendEmailMessage(newForm, formData); // Pass form reference
            }
        });
    }
}

function updateHeaderUI() {
    googleSigninContainer = document.getElementById('google-signin-button'); // refetch
    userProfile = document.getElementById('user-profile');
    const wrapper = document.getElementById('signin-wrapper');
    userAvatar = document.getElementById('user-avatar');

    if (!wrapper || !userProfile) return;

    if (currentUser) {
        wrapper.style.display = 'none';
        userProfile.style.display = 'flex';
        if (userAvatar) {
            userAvatar.src = currentUser.picture || '';
            userAvatar.alt = currentUser.name || 'User Avatar';
        }
    } else {
        wrapper.style.display = 'block';
        userProfile.style.display = 'none';
    }
}

function initializeGoogleSignIn() {
    googleSigninContainer = document.getElementById('google-signin-button');
    if (!googleSigninContainer) return;

    if (typeof google !== 'undefined' && google.accounts) {
        if (!GOOGLE_CLIENT_ID) return;
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });
        google.accounts.id.renderButton(
            googleSigninContainer,
            { type: 'standard', theme: 'filled_blue', size: 'large', text: 'signin_with', shape: 'pill', width: 250, locale: 'en' }
        );
        googleSigninContainer.style.opacity = '0.01';
    }
}

function handleCredentialResponse(response) {
    try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const credential = JSON.parse(jsonPayload);
        currentUser = {
            id: credential.sub,
            name: credential.name,
            email: credential.email,
            picture: credential.picture
        };
        updateHeaderUI();
        isSigningIn = false;
        if (window.pendingMessage) {
            const form = document.getElementById('contact-form'); // re-get form
            if (form) sendEmailMessage(form, window.pendingMessage);
            window.pendingMessage = null;
        }
    } catch (error) {
        console.error('Error handling credential response:', error);
        showNotification('Sign-in failed.', 'error');
        isSigningIn = false;
    }
}

function triggerGoogleSignIn() {
    googleSigninContainer = document.getElementById('google-signin-button');
    if (isSigningIn || !googleSigninContainer) return;
    isSigningIn = true;

    // Logic to click the hidden button... (simplified for brevity)
    const button = googleSigninContainer.querySelector('div[role="button"], iframe');
    if (button) {
        if (button.click) button.click();
        else {
            const clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
            button.dispatchEvent(clickEvent);
        }
    } else {
        showNotification('Please click the Sign-In button.', 'info');
        isSigningIn = false;
    }
}

function handleLogout() {
    currentUser = null;
    updateHeaderUI();
    window.pendingMessage = null;
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.disableAutoSelect();
    }
    showNotification('Signed out successfully', 'success');
}

function sendEmailMessage(form, formData) {
    if (!currentUser) return;

    const submitButton = form.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;

    const browserInfo = getBrowserInfo();
    const templateParams = {
        from_name: currentUser.name,
        from_email: currentUser.email,
        subject: formData.subject,
        message: formData.message,
        user_id: currentUser.id,
        browser: browserInfo.browser,
        device_type: browserInfo.deviceType,
        operating_system: browserInfo.os,
        submission_date: new Date().toLocaleString()
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                submitButton.innerHTML = '<span>Message Sent!</span>';
                submitButton.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                showNotification('Message sent!', 'success');
                form.reset();
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
            })
            .catch((err) => {
                console.error(err);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                showNotification('Failed to send.', 'error');
            });
    }
}

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';

    let deviceType = 'Desktop';
    if (/mobile/i.test(ua)) deviceType = 'Mobile';

    let os = 'Unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';

    return { browser, deviceType, os };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00ff88' : 'var(--color-primary)'};
        color: white; padding: 1rem 1.5rem; border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); z-index: 10000;
        animation: slideIn 0.3s ease; font-weight: 500;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    `;
    document.head.appendChild(style);
}

// Listen for layout load
document.addEventListener('layoutLoaded', initApp);

// Also verify if layout was already loaded (race condition)
if (document.getElementById('navbar')) {
    // If navbar exists, verify if it's the component or just the placeholder?
    // The placeholder is <div id="header"></div>. The component contains <nav id="navbar">.
    // So if #navbar exists, the component is loaded (or it's the old static page).
    // Safe to init.
    // add small delay to ensure everything is settled?
    initApp();
}
