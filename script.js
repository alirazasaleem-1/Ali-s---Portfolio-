/* ==========================================================================
   ALI RAZA SALEEM - PORTFOLIO INTERACTIVITY & SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic current year in footer
    const yearSpan = document.getElementById('yearSpan');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize active link highlight on scroll
    initScrollSpy();
});

// Toggle Mobile Menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburgerIcon = document.querySelector('#hamburger i');
    
    if (navMenu) {
        navMenu.classList.toggle('show');
        if (hamburgerIcon) {
            if (navMenu.classList.contains('show')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-xmark');
            } else {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
            }
        }
    }
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        const hamburgerIcon = document.querySelector('#hamburger i');
        if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            if (hamburgerIcon) {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
            }
        }
    });
});

// Filter Projects by Category
function filterProjects(category) {
    // Update active filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Copy Email Functionality with Feedback
function copyEmail() {
    const email = 'alirazasaleem099@gmail.com';
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    const copyBtn = document.getElementById('copyEmailBtn');

    navigator.clipboard.writeText(email).then(() => {
        if (copyText) copyText.textContent = 'Copied!';
        if (copyIcon) {
            copyIcon.classList.remove('fa-regular', 'fa-copy');
            copyIcon.classList.add('fa-solid', 'fa-check');
        }
        if (copyBtn) copyBtn.classList.add('btn-copied');

        setTimeout(() => {
            if (copyText) copyText.textContent = 'Copy';
            if (copyIcon) {
                copyIcon.classList.remove('fa-solid', 'fa-check');
                copyIcon.classList.add('fa-regular', 'fa-copy');
            }
            if (copyBtn) copyBtn.classList.remove('btn-copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}

// Scroll Spy for Nav Links
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}