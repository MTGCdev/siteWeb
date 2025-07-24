// JavaScript principal pour le site MTGC

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    initNavigation();
    initCookieBanner();
    initScrollEffects();
    initSmoothScrolling();
    
    console.log('Site MTGC initialisé');
});

// Navigation mobile
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Fermer le menu lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Fermer le menu lors du clic à l'extérieur
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Header au scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Bannière de consentement aux cookies
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('mtgc-cookie-consent');
    
    if (!cookieConsent) {
        cookieBanner.style.display = 'block';
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('mtgc-cookie-consent', 'accepted');
            cookieBanner.style.display = 'none';
            
            // Ici, vous pouvez activer les cookies/analytics
            console.log('Cookies acceptés');
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('mtgc-cookie-consent', 'declined');
            cookieBanner.style.display = 'none';
            
            console.log('Cookies refusés');
        });
    }
}

// Effets de scroll et animations
function initScrollEffects() {
    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.feature, .service-card, .team-member, .contact-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Défilement fluide
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utilitaires
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

// Validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation de téléphone québécois
function isValidPhone(phone) {
    const phoneRegex = /^(\+1[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Affichage des messages
function showMessage(message, type = 'success') {
    // Supprimer les messages existants
    const existingMessages = document.querySelectorAll('.message-alert');
    existingMessages.forEach(msg => msg.remove());
    
    // Créer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-alert message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Styles pour le message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffc107'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Styles CSS pour les animations (ajoutés dynamiquement)
const style = document.createElement('style');
style.textContent = `
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
    
    .message-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .message-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .message-close:hover {
        opacity: 0.8;
    }
    
    body.nav-open {
        overflow: hidden;
    }
    
    .header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
`;

document.head.appendChild(style);

