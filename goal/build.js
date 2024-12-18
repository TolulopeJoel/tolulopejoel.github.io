document.addEventListener('DOMContentLoaded', () => {
    // Performance Optimization: Debounce function to limit rapid event firing
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Project Interaction Management
    const initProjectInteraction = () => {
        const projects = document.querySelectorAll('.project-item');
        const projectInfos = document.querySelectorAll('.project-info');

        const updateActiveProject = debounce(() => {
            const halfWindowHeight = window.innerHeight / 2;
            
            projects.forEach((project, index) => {
                const rect = project.getBoundingClientRect();
                const isInView = rect.top <= halfWindowHeight && rect.bottom >= halfWindowHeight;

                if (isInView) {
                    projectInfos.forEach(info => info.classList.remove('active'));
                    projectInfos[index].classList.add('active');
                }
            });
        }, 50);

        window.addEventListener('scroll', updateActiveProject);
        updateActiveProject(); // Initial call
    };

    // Navbar Scroll Behavior
    const initNavbarBehavior = () => {
        const nav = document.querySelector('nav');
        let lastScroll = 0;

        const handleNavScroll = debounce(() => {
            const currentScroll = window.pageYOffset;
            
            nav.classList.toggle('scrolled', currentScroll > 50);
            nav.classList.toggle('hidden', currentScroll > lastScroll && currentScroll > 100);
            
            lastScroll = currentScroll;
        }, 25);

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

        const debouncedUpdateWagonAnimation = debounce(updateWagonAnimation, 100);
        window.addEventListener('resize', debouncedUpdateWagonAnimation);
        window.addEventListener('load', updateWagonAnimation);
    };

    // Custom Cursor and Magnetic Effects
    const initCustomCursor = () => {
        const cursor = {
            dot: document.querySelector('.cursor-dot'),
            outline: document.querySelector('.cursor-outline'),
            magnetics: document.querySelectorAll('.magnetic'),
            
            init() {
                if (!this.dot || !this.outline) {
                  return;
                }
                
                document.body.classList.add('custom-cursor');
                this.bindMouseMove();
                this.bindMagneticEffects();
            },

            bindMouseMove() {
                const updateCursorPosition = (e) => {
                    this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                    this.outline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                };

                document.addEventListener('mousemove', debounce(updateCursorPosition, 10));
            },

            bindMagneticEffects() {
                this.magnetics.forEach(magnetic => {
                    magnetic.addEventListener('mousemove', (e) => {
                        const bound = magnetic.getBoundingClientRect();
                        const magneticStrength = 40;
                        
                        const x = (e.clientX - bound.left) / magnetic.offsetWidth - 0.5;
                        const y = (e.clientY - bound.top) / magnetic.offsetHeight - 0.5;
                        
                        magnetic.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
                    });

                    magnetic.addEventListener('mouseleave', () => {
                        magnetic.style.transform = 'translate(0px, 0px)';
                    });
                });
            }
        };

        cursor.init();
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

    // Initialize all interactive features
    const init = () => {
        initProjectInteraction();
        initNavbarBehavior();
        initWagonAnimation();
        initCustomCursor();
        initTextReveal();
        initSmoothScroll();
    };

    init();
});