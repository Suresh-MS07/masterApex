// =================================================================================
// SCRIPT FOR MASTER APEX WEBSITE
// Includes:
// 1. Vanta.js 3D Animated Background
// 2. Smooth Scrolling & Active Nav Link Highlighting
// 3. Mobile Navigation Menu Toggle
// 4. Intersection Observer for Reveal-on-Scroll Animations
// 5. Google Sheet Contact Form Submission (UPDATED FOR BOTH FORMS)
// 6. FAQ Accordion Functionality
// =================================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Vanta.js 3D Background Initialization
    try {
        VANTA.FOG({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x8A2BE2,
            midtoneColor: 0x00E5EE,
            lowlightColor: 0x111827,
            baseColor: 0x111827,
            blurFactor: 0.6,
            speed: 1.2,
            zoom: 0.8
        });
    } catch (e) {
        console.error("Vanta.js initialization failed:", e);
        document.getElementById('vanta-background').style.backgroundColor = '#111827'; // Fallback
    }

    // 2. Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = document.querySelector('.menu-toggle i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // 3. Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 4. Intersection Observer for reveal-on-scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // 5. Google Sheet Contact Form Submission
    // *** YEH SABSE IMPORTANT CHANGE HAI ***
    // Yeh script ab dono forms (consultation aur contact) ko dhoondhega
    const form = document.getElementById('consultation-form') || document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyaVS179vTy6KDcstTP0RifQUTQJoCeaABIjquyxwsOpBlsr1oKneJ1_CNTmwoyzwqoUA/exec';

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            formMessage.textContent = 'Sending...';
            formMessage.className = 'sending';
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                    formMessage.className = 'success';
                    form.reset();
                } else {
                    throw new Error(data.error ? JSON.stringify(data.error) : 'An unknown error occurred.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                formMessage.className = 'error';
            })
            .finally(() => {
                submitButton.disabled = false;
            });
        });
    }

    // 6. FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

});

