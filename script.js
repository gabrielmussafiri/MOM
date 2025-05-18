        // Mobile Menu Toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Smooth Scrolling for Navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Sticky Header
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'white';
            }
        });
        
        // Testimonial Slider
        const testimonialSlides = document.querySelector('.testimonial-slides');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentTestimonial = 0;
        let testimonialInterval;
        
        function showTestimonial(index) {
            testimonialSlides.style.transform = `translateX(-${index * 100}%)`;
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetTestimonialInterval();
            });
        });
        
        function startTestimonialSlider() {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }
        
        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            startTestimonialSlider();
        }
        
        startTestimonialSlider();
        
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
        
        // Hero Slider Functionality
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroDots = document.querySelectorAll('.hero-dot');
        const heroPrevBtn = document.querySelector('.hero-prev-btn');
        const heroNextBtn = document.querySelector('.hero-next-btn');
        let currentHeroSlide = 0;
        let heroSliderInterval;
        
        function showHeroSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroDots.forEach(dot => dot.classList.remove('active'));
            
            heroSlides[index].classList.add('active');
            heroDots[index].classList.add('active');
            currentHeroSlide = index;
        }
        
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showHeroSlide(index);
                resetHeroSliderInterval();
            });
        });
        
        heroPrevBtn.addEventListener('click', () => {
            currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
            resetHeroSliderInterval();
        });
        
        heroNextBtn.addEventListener('click', () => {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
            resetHeroSliderInterval();
        });
        
        function startHeroSlider() {
            heroSliderInterval = setInterval(() => {
                currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
                showHeroSlide(currentHeroSlide);
            }, 5000);
        }
        
        function resetHeroSliderInterval() {
            clearInterval(heroSliderInterval);
            startHeroSlider();
        }
        
        // Start the hero slider
        startHeroSlider();
        
        // Pause slider on hover
        const heroSlider = document.querySelector('.hero-slider');
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(heroSliderInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            startHeroSlider();
        });
        
        // Gallery Filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter gallery items
                const filter = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Lightbox Functionality
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        let currentLightboxIndex = 0;
        let visibleGalleryItems = [];
        
        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Get currently visible gallery items
                visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
                currentLightboxIndex = visibleGalleryItems.indexOf(item);
                
                const imgSrc = item.querySelector('img').getAttribute('src');
                const imgAlt = item.querySelector('img').getAttribute('alt');
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.textContent = imgAlt;
                lightbox.classList.add('active');
            });
        });
        
        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Previous image
        lightboxPrev.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
            const imgSrc = visibleGalleryItems[currentLightboxIndex].querySelector('img').getAttribute('src');
            const imgAlt = visibleGalleryItems[currentLightboxIndex].querySelector('img').getAttribute('alt');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
        });
        
        // Next image
        lightboxNext.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex + 1) % visibleGalleryItems.length;
            const imgSrc = visibleGalleryItems[currentLightboxIndex].querySelector('img').getAttribute('src');
            const imgAlt = visibleGalleryItems[currentLightboxIndex].querySelector('img').getAttribute('alt');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
        });
        
        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        });
        
        // Service Modal Functionality
        const serviceModal = document.querySelector('.service-modal');
        const modalClose = document.querySelector('.modal-close');
        const modalTitle = document.querySelector('.modal-title');
        const modalImage = document.querySelector('.modal-image img');
        const modalDescription = document.querySelector('.modal-description p');
        const featuresList = document.querySelector('.features-list');
        
        // Service data
        const serviceData = {
            'emergency-medical-coverage': {
                title: 'Emergency Medical Coverage',
                image: 'https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=Emergency+Medical+Coverage',
                description: 'Our 24/7 emergency medical coverage service provides immediate response and professional medical care whenever and wherever you need it. Our team of experienced medical professionals is always ready to handle any emergency situation with expertise and compassion.',
                features: [
                    '24/7 Emergency Response',
                    'Qualified Medical Professionals',
                    'Advanced Medical Equipment',
                    'Rapid Response Time',
                    'Comprehensive Medical Care',
                    'Event Coverage Available'
                ]
            },
            'fire-safety-services': {
                title: 'Fire Safety Services',
                image: 'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=Fire+Safety+Services',
                description: 'Our comprehensive fire safety services ensure your safety and compliance with all fire regulations. We provide expert training, equipment maintenance, and emergency response planning for businesses and events.',
                features: [
                    'Fire Safety Training',
                    'Equipment Inspection & Maintenance',
                    'Emergency Response Planning',
                    'Compliance Consulting',
                    'Fire Safety Audits',
                    'Custom Safety Solutions'
                ]
            },
            'medical-training': {
                title: 'Medical Training',
                image: 'https://via.placeholder.com/800x400/FFD166/333333?text=Medical+Training',
                description: 'Our professional medical training programs are designed to equip individuals and organizations with essential life-saving skills. Learn from certified experts and gain confidence in handling medical emergencies.',
                features: [
                    'CPR Certification',
                    'First Aid Training',
                    'Basic Life Support',
                    'Advanced Medical Skills',
                    'Custom Training Programs',
                    'Certified Instructors'
                ]
            },
            'event-medical-services': {
                title: 'Event Medical Services',
                image: 'https://via.placeholder.com/800x400/06D6A0/FFFFFF?text=Event+Medical+Services',
                description: 'We provide complete medical coverage for events of all sizes. From small gatherings to large festivals, our experienced medical team ensures the safety and well-being of all participants.',
                features: [
                    'Event Medical Coverage',
                    'On-site Medical Staff',
                    'Emergency Response Team',
                    'Medical Equipment Supply',
                    'Custom Coverage Plans',
                    '24/7 Support'
                ]
            }
        };
        
        // Add click event listeners to all "Learn More" buttons
        document.querySelectorAll('.service-card .btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceId = button.closest('.service-card').querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
                openModal(serviceId);
            });
        });
        
        // Open modal function
        function openModal(serviceId) {
            const service = serviceData[serviceId];
            if (service) {
                modalTitle.textContent = service.title;
                modalImage.src = service.image;
                modalImage.alt = service.title;
                modalDescription.textContent = service.description;
                
                // Clear and populate features list
                featuresList.innerHTML = '';
                service.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                serviceModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Close modal function
        function closeModal() {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close modal when clicking the close button
        modalClose.addEventListener('click', closeModal);
        
        // Close modal when clicking outside the modal content
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                closeModal();
            }
        });
        
        // Close modal when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
                closeModal();
            }
        });
   