/**
 * WC Travel Info - Interactive Features
 * FIFA World Cup 2026 Educational Content
 * Enhanced JavaScript for better engagement
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initSmoothScroll();
        initScrollAnimations();
        initHeaderScroll();
        initReadingProgress();
        initFAQTracking();
        initScrollDepthTracking();
        initEngagementTracking();
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

})();
