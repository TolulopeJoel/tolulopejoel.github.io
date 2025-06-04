document.addEventListener('DOMContentLoaded', () => {
    // Performance Optimization: Debounce function to limit rapid event firing
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

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

    // Initialize all features
    const init = () => {
        initScrollAnimations();
        initNavbarBehavior();
        initWagonAnimation();
        initTextReveal();
        initSmoothScroll();
    };

    init();
});