// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .skill-item, .project, .testimonial');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Enhanced scroll animations with stagger effects
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Stagger children animations
            const staggerItems = entry.target.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Enhanced scroll progress with dynamic colors
let ticking = false;

function updateScrollProgress() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollCurrent = window.pageYOffset;
    const scrollPercentage = Math.min((scrollCurrent / scrollTotal) * 100, 100);

    const scrollBar = document.getElementById('scrollBar');
    scrollBar.style.transform = `scaleX(${scrollPercentage / 100})`;

    // Dynamic color based on scroll position
    const hue = 120 + (scrollPercentage * 0.6); // Green to teal transition
    scrollBar.style.filter = `hue-rotate(${hue - 120}deg)`;

    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;

            // Custom smooth scroll with easing
            const start = window.pageYOffset;
            const distance = offsetTop - start;
            const duration = 1000;
            let startTime = null;

            function ease(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }

            function scroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = ease(progress);

                window.scrollTo(0, start + distance * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            }

            requestAnimationFrame(scroll);
        }
    });
});

// Enhanced navigation with dynamic effects
const navContainer = document.getElementById('navContainer');
let lastScrollY = window.pageYOffset;

function updateNavigation() {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 100) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', updateNavigation, { passive: true });

// Parallax effects for sections
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .skills::before');

    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
}

window.addEventListener('scroll', updateParallax, { passive: true });

// Skill items interactive animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
        this.style.animationDelay = `${index * 0.1}s`;
        this.classList.add('pulse');
    });

    item.addEventListener('mouseleave', function () {
        this.classList.remove('pulse');
    });
});

// Initialize with dramatic entrance
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    document.body.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);

    // Trigger initial animations
    updateScrollProgress();
    updateNavigation();
});

// Add magnetic effect to CTA buttons
document.querySelectorAll('.hero-cta, .project-link').forEach(button => {
    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// Add typing effect to hero subtitle
// const heroSubtitle = document.querySelector('.hero-subtitle');
// const originalText = heroSubtitle.textContent;
// heroSubtitle.textContent = '';

// setTimeout(() => {
//     let i = 0;
//     function typeWriter() {
//         if (i < originalText.length) {
//             heroSubtitle.textContent += originalText.charAt(i);
//             i++;
//             setTimeout(typeWriter, 30);
//         }
//     }
//     typeWriter();
// }, 1500);





{/* <section id="about" class="section">
    <div class="section-header">
        <span class="section-label reveal">About</span>
        <h2 class="section-title reveal">Building solutions that matter</h2>
    </div>

    <div class="about-grid">
        <div class="about-image reveal">
            <div
                style="width: 100%; height: 100%; background: var(--gradient-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 0.9rem;">
                Professional Photo</div>
        </div>
        <div class="about-text reveal">
            <h3>Creating value through thoughtful engineering</h3>
            <p>
                I specialize in building robust backend systems and AI-driven solutions that solve real business
                problems.
                My experience spans fintech platforms, booking systems, and intelligent applications that users
                actually want to use.
            </p>
            <p>
                Based in Lagos, I work with startups and established companies to create technology that drives
                growth,
                improves efficiency, and delivers measurable results. I believe the best software feels invisible to
                users
                while being rock-solid underneath.
            </p>
            <p>
                When I'm not coding, I'm exploring new technologies, contributing to open source, or thinking about
                how AI can make everyday tasks more intuitive and powerful.
            </p>
        </div>
    </div>
</section> */}
