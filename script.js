document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .footer-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Add active state animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                // Update active navigation state
                updateActiveNavLink(targetId);
            }
        });
    });

    // Function to update active navigation link
    function updateActiveNavLink(targetId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current link
        const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Update active navigation on scroll
    function updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id], footer[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink(`#${sectionId}`);
            }
        });
    }

    // Throttled scroll event for navigation updates
    const throttledNavUpdate = throttle(updateNavOnScroll, 100);
    window.addEventListener('scroll', throttledNavUpdate);

    // Set initial active state
    updateActiveNavLink('#home');

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        // Add floating animation with different delays
        element.style.animation = `float 3s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // Add CSS animation for floating effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .stat-card, .testimonial-card, .mission-card, .vision-card'
    );
    animateElements.forEach(el => intersectionObserver.observe(el));

    // Pagination dots functionality (if needed for future carousel)
    const paginationDots = document.querySelectorAll('.pagination-dot');
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            // Remove active class from all dots
            paginationDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');
        });
    });

    // Floating Action Button functionality
    const floatingBtn = document.querySelector('.floating-action-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function () {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide floating button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.visibility = 'visible';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.visibility = 'hidden';
            }
        });

        // Initially hide the button
        floatingBtn.style.opacity = '0';
        floatingBtn.style.visibility = 'hidden';
        floatingBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }

    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.querySelector('.dark-mode-icon');

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme);

    function updateDarkModeIcon(theme) {
        if (theme === 'dark') {
            darkModeIcon.textContent = '☀️';
        } else {
            darkModeIcon.textContent = '🌙';
        }
    }

    function toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);

        // Add a subtle animation to the toggle button
        darkModeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Header scroll effect with theme awareness
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme === 'dark';

        if (window.scrollY > 50) {
            if (isDark) {
                header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--header-bg)';
            header.style.backdropFilter = 'blur(5px)';
        }
    });

    // Form submission handling (for future contact forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        });
    });

    // Stat cards counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target) => {
        const increment = target / 100;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    };

    // Observe stat cards for counter animation
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                const number = parseInt(text.replace('+', ''));
                animateCounter(statNumber, number);
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => statObserver.observe(card));

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotNotification = document.getElementById('chatbotNotification');

    let isTyping = false;

    // Predefined responses for the AI chatbot
    const chatbotResponses = {
        greetings: [
            "Hello! How can I help you today?",
            "Hi there! What can I do for you?",
            "Welcome to DigiNova! How may I assist you?"
        ],
        services: [
            "We offer software development, mobile applications, AI solutions, and process automation. Which service interests you most?",
            "Our main services include custom software development, mobile app creation, AI/ML solutions, and business process automation. Would you like to know more about any of these?",
            "DigiNova specializes in digital transformation through software development, mobile apps, AI solutions, and automation. What would you like to learn about?"
        ],
        contact: [
            "You can reach us at info@diginova.com or call +234 123 456 7890. We're based in Lagos, Nigeria.",
            "Feel free to contact us via email at info@diginova.com or phone at +234 123 456 7890. Our office is located in Lagos, Nigeria.",
            "Get in touch with us at info@diginova.com or +234 123 456 7890. We're located in Lagos, Nigeria and ready to help!"
        ],
        about: [
            "DigiNova is a leading digital solutions company in Africa, empowering businesses through innovative technology. We've completed 100+ projects for 50+ happy clients over 5+ years.",
            "We're DigiNova - Smart Digital Solutions! Our mission is to empower businesses across Africa through cutting-edge technology and innovative digital strategies.",
            "DigiNova specializes in digital transformation across Africa. We've successfully delivered 100+ projects and served 50+ clients with our innovative solutions."
        ],
        pricing: [
            "Our pricing varies based on project scope and requirements. I'd recommend booking a free consultation to discuss your specific needs and get a customized quote.",
            "Project costs depend on complexity and requirements. We offer free consultations to provide accurate estimates. Would you like to schedule one?",
            "Pricing is tailored to each project's unique needs. Let's schedule a free consultation to discuss your requirements and provide a detailed quote."
        ],
        default: [
            "That's an interesting question! For detailed information, I'd recommend speaking with our team. You can book a free consultation or contact us directly.",
            "I'd be happy to help you with that! For the most accurate information, please reach out to our team at info@diginova.com or book a consultation.",
            "Great question! Our team would be the best to provide detailed information about that. Feel free to contact us or schedule a free consultation."
        ]
    };

    // Function to get chatbot response
    function getChatbotResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return getRandomResponse('greetings');
        } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
            return getRandomResponse('services');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return getRandomResponse('contact');
        } else if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('diginova')) {
            return getRandomResponse('about');
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('quote')) {
            return getRandomResponse('pricing');
        } else {
            return getRandomResponse('default');
        }
    }

    function getRandomResponse(category) {
        const responses = chatbotResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Function to add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;

        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingDiv;
    }

    // Function to send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message || isTyping) return;

        // Add user message
        addMessage(message, true);
        chatbotInput.value = '';

        // Show typing indicator
        isTyping = true;
        const typingIndicator = showTypingIndicator();

        // Simulate AI thinking time
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();

            // Add bot response
            const response = getChatbotResponse(message);
            addMessage(response);

            isTyping = false;
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }

    // Event listeners for chatbot
    chatbotToggle.addEventListener('click', function () {
        chatbotContainer.classList.toggle('active');
        chatbotToggle.classList.toggle('active');

        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
            chatbotNotification.classList.add('hidden');
        }
    });

    chatbotClose.addEventListener('click', function () {
        chatbotContainer.classList.remove('active');
        chatbotToggle.classList.remove('active');
    });

    chatbotSend.addEventListener('click', sendMessage);

    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Prevent chatbot from closing when clicking inside
    chatbotContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', function (e) {
        if (!chatbotContainer.contains(e.target) && !chatbotToggle.contains(e.target)) {
            chatbotContainer.classList.remove('active');
            chatbotToggle.classList.remove('active');
        }
    });

    // Show notification after page load
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            chatbotNotification.classList.remove('hidden');
        }
    }, 5000);

    // Update chatbot theme when dark mode changes
    function updateChatbotTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        // The chatbot will automatically inherit the theme through CSS variables
        // No additional JavaScript needed as we're using CSS custom properties
    }

    // Listen for theme changes
    const themeObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateChatbotTheme();
            }
        });
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Console log for debugging
    console.log('DigiNova website loaded successfully');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add smooth scrolling behavior to the entire page
document.documentElement.style.scrollBehavior = 'smooth';
