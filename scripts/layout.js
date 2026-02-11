/**
 * Layout Loader - Standalone Version
 * Embeds components directly to avoid CORS issues with local file:// protocol.
 * Automatically fixes relative paths for sub-pages.
 */

const HEADER_HTML = `
<!-- Navigation -->
<nav class="navbar" id="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <a href="index.html" class="nav-logo-link">
                <img src="img/logo.png" alt="Tekers Logo" class="logo-image">
            </a>
        </div>
        <ul class="nav-menu" id="nav-menu">
            <li><a href="index.html#home" class="nav-link">Home</a></li>
            <li><a href="index.html#services" class="nav-link">Services</a></li>
            <li><a href="index.html#projects" class="nav-link">Projects</a></li>
            <li><a href="index.html#about" class="nav-link">About</a></li>
            <li><a href="index.html#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="nav-auth" id="nav-auth">
            <!-- Theme Toggle -->
            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark/Light Mode">
                <i class="fas fa-moon"></i>
            </button>
            <div class="signin-wrapper" id="signin-wrapper">
                <div id="google-signin-button" class="google-btn-hidden"></div>
                <button class="btn btn-primary btn-custom-signin" style="padding: 0 1.6rem">
                    <div class="btn-icon-bg">
                        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.119 C -21.864 50.279 -21.734 49.469 -21.484 48.709 L -21.484 45.619 L -25.464 45.619 C -26.284 47.249 -26.754 49.129 -26.754 51.119 C -26.754 53.109 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
                                <path fill="#EA4335" d="M -14.754 43.739 C -12.984 43.739 -11.424 44.349 -10.174 45.539 L -6.714 42.079 C -8.804 40.129 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.619 L -21.484 48.709 C -20.534 45.859 -17.884 43.739 -14.754 43.739 Z" />
                            </g>
                        </svg>
                    </div>
                    <span class="btn-text">Sign in with Google</span>
                </button>
            </div>
            <div id="user-profile" class="user-profile" style="display: none;">
                <img id="user-avatar" class="user-avatar" src="" alt="User Avatar">
                <button id="logout-button" class="logout-button" aria-label="Logout">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="nav-toggle" id="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>
`;

const FOOTER_HTML = `
<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <div class="nav-logo">
                    <a href="index.html">
                        <img src="img/logo.png" alt="Tekers Logo" class="logo-image">
                    </a>
                </div>
                <p>Advanced Technology Solutions</p>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="index.html#projects">Projects</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Explore</h4>
                    <ul class="special-links">
                        <li>
                            <a href="pages/blogs/index.html" class="link-blog">
                                <i class="fas fa-lightbulb"></i>
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="pages/policies/index.html" class="link-policies">
                                <i class="fas fa-shield-alt"></i>
                                Policies & Terms
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Connect</h4>
                    <ul class="special-links">
                        <li>
                            <a href="https://www.facebook.com/tekers.official" target="_blank" class="link-facebook">
                                <i class="fab fa-facebook"></i>
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/tekers.official/" target="_blank" class="link-instagram">
                                <i class="fab fa-instagram"></i>
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@tekers.official" target="_blank" class="link-tiktok">
                                <i class="fab fa-tiktok"></i>
                                TikTok
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Tekers. All rights reserved.</p>
        </div>
    </div>
</footer>
`;

const WHATSAPP_HTML = `
<!-- WhatsApp Floating Button -->
<a href="https://wa.me/201099602388" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
</a>
`;

// Helper: Get root path relative to current page
function getRootPath() {
    const script = document.querySelector('script[src$="layout.js"]');
    if (script) {
        const src = script.getAttribute('src');
        // If src is "../scripts/layout.js", root is "../"
        // If src is "scripts/layout.js", root is ""
        return src.replace('scripts/layout.js', '');
    }
    return '';
}

// Helper: Fix relative paths in HTML string
function fixRelativePaths(container, rootPath) {
    if (!rootPath) return;

    // Fix images
    container.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
            img.setAttribute('src', rootPath + src);
        }
    });

    // Fix links
    container.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        // Don't change anchors (#home), mails (mailto:), numbers (tel:), or absolute links
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            a.setAttribute('href', rootPath + href);
        }
    });
}

// Load Dependencies
const loadDependencies = () => {
    // Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
    }
    // Google Identity Services
    if (!document.querySelector('script[src*="accounts.google.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    // EmailJS
    if (!document.querySelector('script[src*="emailjs"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        document.head.appendChild(script);
    }
};

// Component Loader
const loadComponent = (id, htmlContent) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.innerHTML = htmlContent;

    // Fix paths based on current location
    const rootPath = getRootPath();
    if (rootPath) {
        fixRelativePaths(element, rootPath);
    }
};

// Theme Management
const initTheme = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // Default is dark
        body.classList.remove('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // Toggle event
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        // Update icon
        if (isLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDependencies();

    // Inject content synchronously (simplifies everything)
    loadComponent('header', HEADER_HTML);
    loadComponent('footer', FOOTER_HTML);
    loadComponent('whatsapp', WHATSAPP_HTML);

    // Initialize Theme after header injection
    initTheme();

    // Dispatch event for main.js
    // Small timeout to ensure DOM is settled
    setTimeout(() => {
        document.dispatchEvent(new Event('layoutLoaded'));

        // Manual trigger for active link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        const currentHash = window.location.hash || '#home';
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentHash)) {
                link.classList.add('active');
            }
        });
    }, 0);
});
