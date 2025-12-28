/**
 * Canada Mexico Visa Info - Interactive Features
 * Enhanced JavaScript for better engagement
 * Includes bot detection for AdSense compliance
 * V2: Added engagement-boosting features to reduce bounce rate
 */

(function() {
    'use strict';

    // Bot detection - runs first
    const isBot = detectBot();
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Skip initialization for bots
        if (isBot) {
            console.log('Bot detected - limited functionality');
            markAsBot();
            return;
        }
        
        initSmoothScroll();
        initScrollAnimations();
        initHeaderScroll();
        initReadingProgress();
        initFAQTracking();
        initScrollDepthTracking();
        initEngagementTracking();
        initHumanVerification();
        
        // NEW: Engagement-boosting features
        initExitIntentPopup();
        initEngagementPrompts();
        initScrollRewards();
        initTimeOnPageTracker();
    }

    /**
     * Bot Detection System
     * Checks for common bot signatures
     */
    function detectBot() {
        const ua = navigator.userAgent.toLowerCase();
        
        // Known bot user agents
        const botPatterns = [
            'bot', 'crawl', 'spider', 'slurp', 'mediapartners',
            'adsbot', 'bingbot', 'googlebot', 'yandex', 'baidu',
            'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot',
            'embedly', 'quora link preview', 'showyoubot', 'outbrain',
            'pinterest', 'developers.google.com', 'slackbot', 'vkshare',
            'w3c_validator', 'redditbot', 'applebot', 'whatsapp',
            'flipboard', 'tumblr', 'bitlybot', 'skypeuripreview',
            'nuzzel', 'discordbot', 'google page speed', 'qwantify',
            'pinterestbot', 'bitrix', 'xing-contenttabreceiver',
            'chrome-lighthouse', 'headlesschrome', 'phantomjs', 'selenium'
        ];
        
        // Check user agent
        for (const pattern of botPatterns) {
            if (ua.includes(pattern)) {
                return true;
            }
        }
        
        // Check for headless browser indicators
        if (navigator.webdriver) return true;
        if (!navigator.languages || navigator.languages.length === 0) return true;
        if (navigator.plugins && navigator.plugins.length === 0 && ua.includes('chrome')) return true;
        
        // Check for suspicious properties
        if (window._phantom || window.__nightmare || window.callPhantom) return true;
        if (document.documentElement.getAttribute('webdriver')) return true;
        
        return false;
    }

    /**
     * Mark page for bot traffic (for server-side tracking)
     */
    function markAsBot() {
        document.documentElement.classList.add('is-bot');
        
        // Disable ad loading for bots (prevents invalid impressions)
        const adUnits = document.querySelectorAll('.adsbygoogle');
        adUnits.forEach(ad => {
            ad.style.display = 'none';
        });
        
        // Set cookie/storage for server-side detection
        try {
            sessionStorage.setItem('isBot', 'true');
        } catch(e) {}
    }

    /**
     * Human verification through interaction
     * Tracks real user behavior patterns
     */
    function initHumanVerification() {
        let humanScore = 0;
        let verified = false;
        
        const verifyHuman = () => {
            if (verified) return;
            humanScore++;
            
            // After multiple human-like interactions, mark as verified
            if (humanScore >= 3) {
                verified = true;
                document.documentElement.classList.add('human-verified');
                try {
                    sessionStorage.setItem('humanVerified', 'true');
                } catch(e) {}
                console.log('Human user verified');
            }
        };
        
        // Track human-like behaviors
        document.addEventListener('mousemove', debounce(verifyHuman, 1000), { once: false });
        document.addEventListener('scroll', debounce(verifyHuman, 1000), { once: false });
        document.addEventListener('touchstart', verifyHuman, { once: true });
        document.addEventListener('keydown', verifyHuman, { once: true });
        
        // Check for natural mouse movement patterns
        let lastX = 0, lastY = 0, movements = 0;
        document.addEventListener('mousemove', (e) => {
            const deltaX = Math.abs(e.clientX - lastX);
            const deltaY = Math.abs(e.clientY - lastY);
            
            // Real humans have varied, non-linear mouse movements
            if (deltaX > 0 && deltaY > 0 && deltaX !== deltaY) {
                movements++;
                if (movements >= 5) {
                    verifyHuman();
                }
            }
            
            lastX = e.clientX;
            lastY = e.clientY;
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    /**
     * Intersection Observer for scroll animations
     */
    function initScrollAnimations() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add animation class to elements
        const animatedElements = document.querySelectorAll(
            '.content-section, .info-card, .feature-list li, .provides-card, .engagement-block, ' +
            '.step-item, .disclaimer-item, .fact-card, .country-spotlight, .reason-card, ' +
            '.faq-item, .offer-card, .resource-card, .related-card'
        );

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index % 6 * 0.08}s, transform 0.5s ease ${index % 6 * 0.08}s`;
            observer.observe(el);
        });

        // Add CSS for visible state
        const style = document.createElement('style');
        style.textContent = `
            .is-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Header background change on scroll
     */
    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        
        if (!header) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    // Add/remove scrolled class
                    if (currentScroll > 50) {
                        header.classList.add('is-scrolled');
                    } else {
                        header.classList.remove('is-scrolled');
                    }

                    ticking = false;
                });
                
                ticking = true;
            }
        });

        // Add scrolled styles
        const style = document.createElement('style');
        style.textContent = `
            .site-header.is-scrolled {
                box-shadow: 0 2px 12px rgba(27, 77, 62, 0.1);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Reading progress indicator
     */
    function initReadingProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #1B4D3E 0%, #D4A373 100%);
                z-index: 1001;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);

        // Update on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(progress, 100) + '%';
        });
    }

    /**
     * FAQ interaction tracking
     */
    function initFAQTracking() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach((item, index) => {
            item.addEventListener('toggle', function() {
                if (this.open) {
                    // Log FAQ open (for analytics integration)
                    console.log('FAQ opened:', index + 1, this.querySelector('.faq-question')?.textContent);
                }
            });
        });
    }

    /**
     * Track scroll depth for engagement metrics
     */
    function initScrollDepthTracking() {
        const thresholds = [25, 50, 75, 90, 100];
        const reached = new Set();

        function checkScrollDepth() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            thresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !reached.has(threshold)) {
                    reached.add(threshold);
                    console.log('Scroll depth reached:', threshold + '%');
                    // Future: Send to analytics
                }
            });
        }

        window.addEventListener('scroll', debounce(checkScrollDepth, 250));
    }

    /**
     * Track user engagement patterns
     */
    function initEngagementTracking() {
        let startTime = Date.now();
        let totalActiveTime = 0;
        let isActive = true;

        // Track visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                totalActiveTime += Date.now() - startTime;
                isActive = false;
            } else {
                startTime = Date.now();
                isActive = true;
            }
        });

        // Log time on page before leaving
        window.addEventListener('beforeunload', () => {
            if (isActive) {
                totalActiveTime += Date.now() - startTime;
            }
            console.log('Total time on page:', Math.round(totalActiveTime / 1000), 'seconds');
        });

        // Track clicks on key elements
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, .related-card, .resource-card');
            if (target) {
                const label = target.textContent?.trim().substring(0, 50) || 'Unknown';
                console.log('Element clicked:', label);
            }
        });
    }

    /**
     * Utility: Debounce function
     */
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

    /**
     * Track outbound link clicks
     */
    function trackOutboundLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', function() {
                const href = this.getAttribute('href');
                console.log('Outbound link clicked:', href);
                // Future: integrate with analytics
            });
        });
    }

    // Initialize tracking after page load
    window.addEventListener('load', trackOutboundLinks);

    /**
     * Exit Intent Popup - Captures users about to leave
     * Shows a compelling reason to stay
     */
    function initExitIntentPopup() {
        let popupShown = false;
        
        // Only show on article pages
        if (!document.querySelector('.blog-article, .article-content')) return;
        
        // Create popup
        const popup = document.createElement('div');
        popup.id = 'exitPopup';
        popup.innerHTML = `
            <div class="exit-popup-overlay">
                <div class="exit-popup-content">
                    <button class="exit-popup-close" onclick="document.getElementById('exitPopup').style.display='none'">&times;</button>
                    <h2>⏳ Wait! Don't Miss This...</h2>
                    <p>You've only seen <strong><span id="readPercent">0</span>%</strong> of this guide!</p>
                    <p>The best part (step-by-step action plan) is below. Keep reading to get:</p>
                    <ul>
                        <li>✅ Exact requirements for your situation</li>
                        <li>✅ Cost breakdown in your currency</li>
                        <li>✅ Common mistakes to avoid</li>
                        <li>✅ Free resources and official links</li>
                    </ul>
                    <button class="exit-popup-btn" onclick="document.getElementById('exitPopup').style.display='none'; window.scrollBy({top: 300, behavior: 'smooth'});">
                        Continue Reading →
                    </button>
                    <p class="exit-popup-note">Or press ESC to leave</p>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #exitPopup { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; }
            .exit-popup-overlay { 
                width: 100%; height: 100%; 
                background: rgba(0,0,0,0.8); 
                display: flex; align-items: center; justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .exit-popup-content {
                background: white; padding: 30px; border-radius: 16px; max-width: 450px; margin: 20px;
                text-align: center; position: relative; animation: slideUp 0.3s ease;
            }
            .exit-popup-close { 
                position: absolute; top: 10px; right: 15px; 
                background: none; border: none; font-size: 28px; cursor: pointer; color: #666;
            }
            .exit-popup-content h2 { color: #dc3545; margin-bottom: 15px; }
            .exit-popup-content ul { text-align: left; margin: 20px 0; padding-left: 20px; }
            .exit-popup-content li { margin: 8px 0; color: #333; }
            .exit-popup-btn {
                background: linear-gradient(135deg, #28a745, #20c997); color: white;
                border: none; padding: 15px 30px; font-size: 18px; border-radius: 8px;
                cursor: pointer; width: 100%; margin-top: 15px; font-weight: 600;
            }
            .exit-popup-btn:hover { transform: scale(1.02); }
            .exit-popup-note { font-size: 12px; color: #999; margin-top: 15px; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        `;
        document.head.appendChild(style);
        
        // Exit intent detection (mouse leaving viewport at top)
        document.addEventListener('mouseout', (e) => {
            if (popupShown) return;
            if (e.clientY < 10 && e.relatedTarget === null) {
                const scrollPercent = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
                // Only show if they haven't read much
                if (scrollPercent < 50) {
                    document.getElementById('readPercent').textContent = scrollPercent;
                    popup.style.display = 'block';
                    popupShown = true;
                }
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') popup.style.display = 'none';
        });
    }

    /**
     * Engagement Prompts - Micro-interactions that keep users scrolling
     */
    function initEngagementPrompts() {
        // Create floating engagement bar
        const engageBar = document.createElement('div');
        engageBar.id = 'engageBar';
        engageBar.innerHTML = `
            <div class="engage-content">
                <span class="engage-icon">📖</span>
                <span class="engage-text">Keep scrolling for the good stuff...</span>
                <span class="engage-arrow">↓</span>
            </div>
        `;
        document.body.appendChild(engageBar);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #engageBar {
                position: fixed; bottom: 120px; left: 50%; transform: translateX(-50%);
                background: linear-gradient(135deg, #26374A, #3d5a80); color: white;
                padding: 12px 24px; border-radius: 50px; z-index: 9990;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: none;
                animation: bounce 2s infinite;
            }
            .engage-content { display: flex; align-items: center; gap: 10px; }
            .engage-icon { font-size: 20px; }
            .engage-text { font-size: 14px; font-weight: 500; }
            .engage-arrow { animation: arrowBounce 1s infinite; }
            @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-5px); } }
            @keyframes arrowBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
            #engageBar.hide { display: none !important; }
        `;
        document.head.appendChild(style);
        
        // Show/hide based on scroll and time
        let hasShown = false;
        setTimeout(() => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent < 20 && !hasShown) {
                engageBar.style.display = 'block';
                hasShown = true;
                
                // Hide after 5 seconds or on scroll
                setTimeout(() => { engageBar.style.display = 'none'; }, 5000);
            }
        }, 3000);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 20) {
                engageBar.style.display = 'none';
            }
        });
    }

    /**
     * Scroll Rewards - Visual feedback for scrolling progress
     */
    function initScrollRewards() {
        const milestones = [25, 50, 75, 100];
        const reached = new Set();
        
        // Create reward toast
        const toast = document.createElement('div');
        toast.id = 'scrollToast';
        document.body.appendChild(toast);
        
        const style = document.createElement('style');
        style.textContent = `
            #scrollToast {
                position: fixed; top: 80px; right: 20px;
                background: linear-gradient(135deg, #28a745, #20c997); color: white;
                padding: 15px 25px; border-radius: 12px; z-index: 9995;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                transform: translateX(150%); transition: transform 0.3s ease;
                font-weight: 600;
            }
            #scrollToast.show { transform: translateX(0); }
        `;
        document.head.appendChild(style);
        
        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 3000);
        }
        
        window.addEventListener('scroll', debounce(() => {
            const scrollPercent = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !reached.has(milestone)) {
                    reached.add(milestone);
                    
                    const messages = {
                        25: "🔥 25% - You're getting to the good part!",
                        50: "⭐ Halfway there! Key info coming up...",
                        75: "🚀 75% - Almost done! Action steps below!",
                        100: "🎉 You made it! Now take action!"
                    };
                    
                    showToast(messages[milestone]);
                }
            });
        }, 500));
    }

    /**
     * Time on Page Tracker - Shows user how long they've been reading
     */
    function initTimeOnPageTracker() {
        // Only on article pages
        if (!document.querySelector('.blog-article, .article-content')) return;
        
        let seconds = 0;
        
        // Create timer display
        const timer = document.createElement('div');
        timer.id = 'readingTimer';
        timer.innerHTML = '<span class="timer-icon">⏱️</span> Reading: <span id="timerValue">0:00</span>';
        document.body.appendChild(timer);
        
        const style = document.createElement('style');
        style.textContent = `
            #readingTimer {
                position: fixed; top: 80px; left: 20px;
                background: rgba(38, 55, 74, 0.95); color: white;
                padding: 10px 18px; border-radius: 8px; z-index: 9990;
                font-size: 14px; font-weight: 500;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                display: none;
            }
            .timer-icon { margin-right: 5px; }
            @media (max-width: 768px) {
                #readingTimer { top: auto; bottom: 130px; left: 10px; font-size: 12px; padding: 8px 12px; }
            }
        `;
        document.head.appendChild(style);
        
        // Start timer after 5 seconds (to filter quick bounces)
        setTimeout(() => {
            timer.style.display = 'block';
            
            setInterval(() => {
                if (!document.hidden) {
                    seconds++;
                    const mins = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    document.getElementById('timerValue').textContent = 
                        `${mins}:${secs.toString().padStart(2, '0')}`;
                }
            }, 1000);
        }, 5000);
    }

})();
