// RADEN - Bespoke Diamond Jewelry
// Site Interactions

document.addEventListener('DOMContentLoaded', function() {

    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Work showcase navigation
    const workNavItems = document.querySelectorAll('.work-nav-item');
    const workShowcase = document.querySelector('.work-showcase');

    // Work showcase data
    const workItems = [
        {
            video: 'assets/videos/panther-ring.mp4',
            name: 'Panther Ring Assembly',
            type: 'Custom Design',
            count: '01/05'
        },
        {
            video: 'assets/videos/work-2.mp4',
            name: 'Rainbow Nautilus',
            type: 'Bespoke Creation',
            count: '02/05'
        },
        {
            video: 'assets/videos/work-3.mp4',
            name: '10CT Cushion',
            type: 'Engagement Ring',
            count: '03/05'
        },
        {
            video: 'assets/videos/work-4.mp4',
            name: 'Cuban Link',
            type: 'Chain Collection',
            count: '04/05'
        }
    ];

    let currentWorkIndex = 0;

    workNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index === currentWorkIndex) return;

            // Update active state
            workNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update content
            currentWorkIndex = index;
            updateWorkShowcase(index);
        });
    });

    function updateWorkShowcase(index) {
        const work = workItems[index];
        if (!work) return;

        const workCount = document.querySelector('.work-count');
        const workName = document.querySelector('.work-name');
        const workType = document.querySelector('.work-type');
        const workVideo = document.querySelector('.work-video video');

        if (workCount) workCount.textContent = work.count;
        if (workName) workName.textContent = work.name;
        if (workType) workType.textContent = work.type;
        if (workVideo) {
            workVideo.src = work.video;
            workVideo.load();
            workVideo.play();
        }
    }

    // Work items click handler
    const workItemsLinks = document.querySelectorAll('.work-item');
    workItemsLinks.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Navigate to work section and select item
            const workSection = document.querySelector('.work');
            if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (workNavItems[index + 1]) {
                        workNavItems[index + 1].click();
                    }
                }, 500);
            }
        });
    });

    // Play button functionality
    const playButton = document.querySelector('.play-button');
    const workVideo = document.querySelector('.work-video video');

    if (playButton && workVideo) {
        playButton.addEventListener('click', () => {
            if (workVideo.paused) {
                workVideo.play();
                playButton.style.opacity = '0';
            } else {
                workVideo.pause();
                playButton.style.opacity = '1';
            }
        });

        workVideo.addEventListener('play', () => {
            playButton.style.opacity = '0';
        });

        workVideo.addEventListener('pause', () => {
            playButton.style.opacity = '1';
        });
    }

    // Menu toggle (for mobile - would need to add menu modal)
    const menuButton = document.querySelector('.nav-menu');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            // Add menu modal functionality here if needed
            console.log('Menu clicked');
        });
    }

    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.filter = 'brightness(1.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.filter = 'brightness(1)';
        });
    });

    // Service items hover
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .service-item {
            transition: transform 0.3s ease, background 0.3s ease;
        }
        .play-button {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect on hero
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroVideo.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        });
    }

    console.log('RADEN site loaded');
});
