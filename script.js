document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for scroll animations
    const initScrollAnimations = () => {
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all elements with reveal classes
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });
    };

    // Navbar Scroll Behavior
    const initNavbarBehavior = () => {
        const nav = document.querySelector('nav');
        let lastScroll = 0;

        const handleNavScroll = () => {
            const currentScroll = window.pageYOffset;
            nav.classList.toggle('scrolled', currentScroll > 50);
            nav.classList.toggle('hidden', currentScroll > lastScroll && currentScroll > 100);
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleNavScroll);
    };

    // Wagon Animation Management
    const initWagonAnimation = () => {
        const wagonContainer = document.querySelector('.wagon-container');
        const wheels = document.querySelectorAll('.wheel');

        const updateWagonAnimation = () => {
            const containerWidth = wagonContainer.offsetWidth;
            const wheelCircumference = 2 * Math.PI * 40;
            const rotations = containerWidth / wheelCircumference;

            wheels.forEach(wheel => {
                const animationDuration = window.innerWidth <= 480 ? 3 :
                    window.innerWidth <= 768 ? 5 : 7;

                wheel.style.animation = `
                    rotateWheel ${animationDuration / rotations}s linear infinite,
                    bounceWheel 0.6s linear infinite
                `;
            });
        };

        window.addEventListener('resize', updateWagonAnimation);
        window.addEventListener('load', updateWagonAnimation);
    };

    // Text Reveal on Scroll
    const initTextReveal = () => {
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optional: Stop observing after revealing
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.text-reveal').forEach(el => observer.observe(el));
    };

    // Smooth Scroll
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    const pronouns = ['She', 'He', 'They'];
    let currentIndex = 0;
    let intervalId = null;

    const changePronoun = () => {
        const pronounElement = document.getElementById('changing-pronoun');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % pronouns.length;
            pronounElement.textContent = pronouns[currentIndex];
        }, 300);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    intervalId = setInterval(changePronoun, 1500);
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    });

    const testimonialSection = document.querySelector('.testimonials-section');
    observer.observe(testimonialSection);

    // Project Cards
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                card.classList.toggle('active');
                if (card.classList.contains('active')) {
                    const cardRect = card.getBoundingClientRect();
                    const isFullyVisible = (
                        cardRect.top >= 0 &&
                        cardRect.bottom <= window.innerHeight
                    );

                    if (!isFullyVisible) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    }

    // Timeline/Stepper Demo Interactivity
    function initTimelineStepperDemo() {
        const steps = document.querySelectorAll('#timeline-demo .timeline-step');

        steps.forEach((step, idx) => {
            step.classList.toggle('active', idx === current);
        });


    }

    // Main Project Timeline: On-Scroll Activation
    function initMainProjectTimelineScroll() {
        const timeline = document.querySelector('.main-project-timeline');
        if (!timeline) return;
        const steps = Array.from(timeline.querySelectorAll('.timeline-step'));

        function activateStepOnScroll() {
            let minDist = Infinity;
            let activeIdx = 0;
            steps.forEach((step, idx) => {
                const rect = step.getBoundingClientRect();
                // Distance from center of viewport
                const dist = Math.abs((rect.top + rect.bottom) / 2 - window.innerHeight / 2);
                if (dist < minDist) {
                    minDist = dist;
                    activeIdx = idx;
                }
            });
            steps.forEach((step, idx) => {
                step.classList.toggle('active', idx === activeIdx);
            });
        }

        window.addEventListener('scroll', activateStepOnScroll, { passive: true });
        window.addEventListener('resize', activateStepOnScroll);
        activateStepOnScroll();
    }

    // Initialize all features
    const init = () => {
        initScrollAnimations();
        initNavbarBehavior();
        initWagonAnimation();
        initTextReveal();
        initSmoothScroll();
        initProjectCards();
        initTimelineStepperDemo();
        initMainProjectTimelineScroll();
    };

    init();
});