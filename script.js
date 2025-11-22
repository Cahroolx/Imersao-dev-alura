// Elementos do DOM
const navLinks = document.querySelectorAll('.nav-link');
const progressBar = document.getElementById('progressBar');
const sections = document.querySelectorAll('.section');

// ============================================
// SCROLL PROGRESS BAR
// ============================================

function updateProgressBar() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateProgressBar);

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

function updateActiveNav() {
    let currentSection = 0;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - window.innerHeight / 2) {
            currentSection = index;
        }
    });
    
    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// SCROLL TO SECTION
// ============================================

function scrollToSection(sectionIndex) {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
        const targetSection = sections[sectionIndex];
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// NAV LINK CLICK HANDLERS
// ============================================

navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        scrollToSection(index);
    });
});

// ============================================
// INTERSECTION OBSERVER PARA ANIMAÇÕES
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona classe de animação quando elemento entra na viewport
            entry.target.style.opacity = '1';
            entry.target.style.animation = entry.target.className.match(/animate-\w+/)?.[0] || 'fade-in-up 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observa elementos animados
document.querySelectorAll('[class*="animate-"]').forEach(el => {
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// EFEITO PARALLAX PARA BLOBS
// ============================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const blobs = document.querySelectorAll('.hero-blob');
    
    blobs.forEach((blob, index) => {
        const speed = 0.5 + (index * 0.1);
        blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ============================================
// ANIMAÇÕES AO CARREGAR A PÁGINA
// ============================================

window.addEventListener('load', () => {
    // Anima elementos com delay
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    animatedElements.forEach((el, index) => {
        const delay = el.style.animationDelay || `${index * 0.1}s`;
        el.style.animationDelay = delay;
    });
});

// ============================================
// HOVER EFFECTS PARA CARDS
// ============================================

const cards = document.querySelectorAll('.idol-card, .title-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============================================
// BOTÕES CTA
// ============================================

const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Cria efeito de ripple
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(0, 0, 0, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// ANIMAÇÃO DE RIPPLE
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a barra de progresso ao carregar
    updateProgressBar();
    updateActiveNav();
    
    // Log de inicialização
    console.log('Corinthians - Uma Viagem no Tempo');
    console.log('Site carregado com sucesso!');
});

// ============================================
// PERFORMANCE: Debounce para scroll
// ============================================

let scrollTimeout;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        updateProgressBar();
        updateActiveNav();
    });
}, { passive: true });
