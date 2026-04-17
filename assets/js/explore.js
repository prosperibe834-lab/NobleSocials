                    // Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";
    preloader.style.transition = "0.5s ease";

    setTimeout(() => {
        preloader.style.display = "none";
    }, 500);
});



// TOGGLE MENU
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});



                        // Main page
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ctaForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        
        // Simple feedback for the user
        const button = form.querySelector('button');
        const originalText = button.innerText;
        
        button.innerText = "Welcome!";
        button.style.backgroundColor = "#D4AF37"; // Change to accent-gold on success
        
        console.log(`Email collected: ${email}`);
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = "";
            form.reset();
        }, 3000);
    });

    // Optional: Add a subtle float animation to the image
    const image = document.querySelector('.image-wrapper');
    window.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        image.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});


                    // V3- Hero page
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.v3-trust-section');
    const counters = document.querySelectorAll('.v3-counter');
    let hasAnimated = false;

    const formatNumber = (num, format) => {
        if (format === 'millions') {
            return (num / 1000000).toFixed(0) + 'M';
        } else if (format === 'percent') {
            return num;
        } else {
            return num.toLocaleString();
        }
    };

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const format = counter.getAttribute('data-format');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const update = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = formatNumber(Math.ceil(current), format);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = formatNumber(target, format);
                }
            };
            update();
        });
    };

    // Trigger animation when section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            startCounting();
            hasAnimated = true;
        }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
});

                    // What we offer
/**
 * Classic Scroll Animation for Section V4
 */
const initV4Animations = () => {
    const animatedElements = document.querySelectorAll('.v4-reveal-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the delay from the data attribute
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                // Set the delay and add the active class
                setTimeout(() => {
                    entry.target.classList.add('v4-active');
                }, delay);
                
                // Stop watching once it has animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
};

// Run on load
document.addEventListener('DOMContentLoaded', initV4Animations);

                    // V5 Service

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.v5-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay from HTML data attribute
                const delay = entry.target.getAttribute('data-delay');
                
                setTimeout(() => {
                    entry.target.classList.add('v5-active');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});

                    // V6 Card header
document.addEventListener('DOMContentLoaded', () => {
    // 1. Staggered Pop-in Scroll Animation for Section V6
    const animatedElements = document.querySelectorAll('.v6-reveal, .v6-reveal-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get the unique delay set on the HTML attribute
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                // Trigger animation after delay
                setTimeout(() => {
                    entry.target.classList.add('v6-active');
                }, delay);
                
                // Stop observing after animation triggers once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of element is visible
    });
    
    animatedElements.forEach(el => observer.observe(el));
});


                            // V7 header
        /* Optional JS: Adds subtle scroll-triggered glow effects */
        document.addEventListener('DOMContentLoaded', () => {
            const steps = document.querySelectorAll('.step');
            
            const handleScroll = () => {
                const triggerPoint = window.innerHeight * 0.8;
                steps.forEach(step => {
                    const stepTop = step.getBoundingClientRect().top;
                    if (stepTop < triggerPoint) {
                        step.classList.add('active'); // You can use this class to trigger CSS animations if desired
                        // For example, make the number pulsate faster or change the background geometry
                    }
                });
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Check once on load
        });


                    // Testimonial Section
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        speed: 600,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Adds a fade effect between swipes for a premium feel
        effect: "creative",
        creativeEffect: {
            prev: { opacity: 0, translate: [-20, 0, 0] },
            next: { opacity: 0, translate: [20, 0, 0] },
        },
    });
});


                            // Frequently Asked Questions
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
});

