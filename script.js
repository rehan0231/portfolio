// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    bar.style.opacity = '1';
                });
            }
        });
    }, observerOptions);

    // Observe skill sections
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });

    // Animate stats counters
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat h4');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    document.querySelector('.about-stats').parentElement.parentElement && 
    statsObserver.observe(document.querySelector('.about-stats'));

    // Animate project cards
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });

    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floatingCard = document.querySelector('.floating-card');
        if (floatingCard) {
            floatingCard.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Typing animation for code lines
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Rotate code lines
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;
    setInterval(() => {
        codeLines.forEach(line => line.style.opacity = '0.3');
        codeLines[currentLine].style.opacity = '1';
        typeWriter(codeLines[currentLine], codeLines[currentLine].textContent, 50);
        currentLine = (currentLine + 1) % codeLines.length;
    }, 3000);

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate form submission
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Message Sent! 🎉';
            button.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                this.reset();
            }, 2000);
        }, 1500);
    });

    // Scroll animations for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Particle background for hero (optional enhancement)
    createParticles();
});

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Particle system for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

// Add CSS for particles (will be injected dynamically)
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        top: 100vh;
        animation: particles linear infinite;
        pointer-events: none;
    }
    
    @keyframes particles {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
        }
        
        .hero-title {
            font-size: 2.5rem;
        }
        
        .about-content,
        .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .skills-grid {
            grid-template-columns: 1fr;
        }
        
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
    
    /* Additional animations */
    .project-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .project-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Skill bar animations */
    .progress {
        height: 8px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 4px;
        width: 0;
        opacity: 0;
        transition: width 2s ease, opacity 0.5s ease;
        margin-top: 5px;
    }
    
    .skill-bar {
        margin-bottom: 1.5rem;
    }
    
    .skill-bar span {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
    }
`;
document.head.appendChild(style);

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});