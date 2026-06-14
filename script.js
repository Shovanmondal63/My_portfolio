/* =============== LOADER =============== */
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const siteWrapper = document.getElementById('siteWrapper');

let progress = 0;
const totalDuration = 7000; // 7 seconds
const interval = 50; // ms
const step = (interval / totalDuration) * 100;

const progressTimer = setInterval(() => {
    progress = Math.min(progress + step + (Math.random() * 0.5), 100);
    const rounded = Math.floor(progress);
    loaderBar.style.width = rounded + '%';
    loaderPercent.textContent = rounded + '%';

    if (progress >= 100) {
        clearInterval(progressTimer);
        loaderBar.style.width = '100%';
        loaderPercent.textContent = '100%';

        setTimeout(() => {
            loader.classList.add('hidden');
            siteWrapper.classList.add('visible');
            // Trigger scroll-based animations after reveal
            checkReveal();
            animateSkillBars();
        }, 400);
    }
}, interval);


/* =============== TYPEWRITER =============== */
const roles = [
    'Software Developer',
    'Full-Stack Developer',
    'App Developer',
    'Problem Solver',
    'Open Source Enthusiast'
];

let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIdx];

    if (!isDeleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    setTimeout(typeLoop, isDeleting ? 55 : 90);
}

// Start typewriter after loader finishes
setTimeout(typeLoop, 7500);


/* =============== SCROLL REVEAL =============== */
function checkReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('in-view');
        }
    });
}

window.addEventListener('scroll', checkReveal);


/* =============== SKILL BARS =============== */
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => fill.classList.add('animated'));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) observer.observe(skillsSection);
}


/* =============== SLIDER =============== */
const slider = document.getElementById("slider");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let index = 0;
const cardWidth = 324; // 300px card + 24px gap

if (next && prev && slider) {
    next.addEventListener("click", () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (index * cardWidth < maxScroll) {
            index++;
            slider.style.transform = `translateX(-${index * cardWidth}px)`;
        }
    });

    prev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            slider.style.transform = `translateX(-${index * cardWidth}px)`;
        }
    });

}

// CV button: try PDF download then always navigate to resume.html
const cvBtn = document.getElementById('cvBtn');
if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
            const link = document.createElement('a');
            link.href = 'Resume.pdf';
            link.download = 'Shovan.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch(_) {}
        setTimeout(() => { window.location.href = 'resume.html'; }, 300);
    });
}


/* =============== ACTIVE NAV LINK =============== */
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current || (current === '' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
    });
});


/* =============== SECURITY =============== */
document.addEventListener('contextmenu', e => {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
});

document.addEventListener('keydown', e => {
    if ((e.ctrlKey && ['c','x','s','u'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i')) {
        e.preventDefault();
        alert("This action is disabled.");
    }
});




/* =============== MOBILE NAV =============== */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
const mobileNavClose = document.getElementById('mobileNavClose');

function openMobileNav() {
    mobileNav && mobileNav.classList.add('open');
    mobileNavBackdrop && mobileNavBackdrop.classList.add('open');
}

function closeMobileNav() {
    mobileNav && mobileNav.classList.remove('open');
    mobileNavBackdrop && mobileNavBackdrop.classList.remove('open');
}

if (navToggle) navToggle.addEventListener('click', openMobileNav);
if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
