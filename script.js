/**
 * Classic Tow Service — Main Script
 * Vanilla JS only | No jQuery | No frameworks
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. MOBILE MENU & HAMBURGER TOGGLE
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const primaryNav = document.getElementById('primary-nav') || document.querySelector('.primary-nav') || document.getElementById('mobile-nav');

  if (hamburger && primaryNav) {
    const toggleMenu = (open) => {
      const isCurrentlyOpen = hamburger.getAttribute('aria-expanded') === 'true';
      const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;
      
      hamburger.setAttribute('aria-expanded', String(shouldOpen));
      primaryNav.classList.toggle('open', shouldOpen);
      hamburger.classList.toggle('active', shouldOpen);
      document.body.classList.toggle('nav-open', shouldOpen);
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (primaryNav.classList.contains('open') && !primaryNav.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
        toggleMenu(false);
        hamburger.focus();
      }
    });

    // Mobile Dropdown toggles
    const dropdownBtns = primaryNav.querySelectorAll('.nav-dropdown-btn, .dropdown-toggle');
    dropdownBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // Blur to prevent persistent focus
        btn.blur();

        // On mobile/tablet (< 1024px)
        if (window.innerWidth < 1024) {
          const parentItem = btn.closest('.nav-item--dropdown, .has-dropdown');
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';

          // If clicking an <a> tag that is already open on mobile, let it navigate to services.html
          if (btn.tagName === 'A' && isExpanded) {
            return;
          }

          if (btn.tagName === 'A' && !isExpanded) {
            e.preventDefault();
            btn.setAttribute('aria-expanded', 'true');
            if (parentItem) parentItem.classList.add('open');
          } else if (btn.tagName === 'BUTTON') {
            e.preventDefault();
            btn.setAttribute('aria-expanded', String(!isExpanded));
            if (parentItem) parentItem.classList.toggle('open', !isExpanded);
          }
        }
      });
    });
  }

  /* ============================================================
     2. STICKY HEADER ON SCROLL
     ============================================================ */
  const siteHeader = document.getElementById('site-header') || document.querySelector('.site-header');
  if (siteHeader) {
    const checkScroll = () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ============================================================
     3. FAQ ACCORDION (Supports .faq-question and .accordion-trigger)
     ============================================================ */
  const accordionButtons = document.querySelectorAll('.faq-question, .accordion-trigger');
  accordionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetPanel = btn.nextElementSibling || document.getElementById(btn.getAttribute('aria-controls'));

      // Close other accordion items in the same container
      const container = btn.closest('.accordion, .faq-list, .faq-accordion');
      if (container) {
        container.querySelectorAll('.faq-question, .accordion-trigger').forEach((otherBtn) => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherPanel = otherBtn.nextElementSibling || document.getElementById(otherBtn.getAttribute('aria-controls'));
            if (otherPanel) {
              otherPanel.classList.remove('open');
              otherPanel.setAttribute('hidden', '');
            }
          }
        });
      }

      btn.setAttribute('aria-expanded', String(!isExpanded));
      if (targetPanel) {
        targetPanel.classList.toggle('open', !isExpanded);
        if (!isExpanded) {
          targetPanel.removeAttribute('hidden');
        } else {
          targetPanel.setAttribute('hidden', '');
        }
      }
    });
  });

  /* ============================================================
     4. SMOOTH SCROLL FOR IN-PAGE ANCHORS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        if (primaryNav && primaryNav.classList.contains('open')) {
          hamburger.setAttribute('aria-expanded', 'false');
          primaryNav.classList.remove('open');
          document.body.classList.remove('nav-open');
        }
      }
    });
  });

  /* ============================================================
     5. COOKIE BANNER
     ============================================================ */
  const cookieBanner = document.getElementById('cookie-banner') || document.getElementById('cookie-notice') || document.querySelector('.cookie-banner, .cookie-notice');
  const cookieAccept = document.getElementById('cookie-accept') || (cookieBanner && cookieBanner.querySelector('.btn--primary, #cookie-accept'));
  const cookieClose  = document.getElementById('cookie-close')  || (cookieBanner && cookieBanner.querySelector('.btn--outline, #cookie-close'));

  if (cookieBanner) {
    if (!localStorage.getItem('cookie_accepted')) {
      cookieBanner.classList.remove('hidden');
    } else {
      cookieBanner.classList.add('hidden');
    }

    const dismissCookie = () => {
      localStorage.setItem('cookie_accepted', '1');
      cookieBanner.classList.add('hidden');
    };

    if (cookieAccept) cookieAccept.addEventListener('click', dismissCookie);
    if (cookieClose)  cookieClose.addEventListener('click',  dismissCookie);
  }

  /* ============================================================
     6. FOOTER CURRENT YEAR
     ============================================================ */
  const yearEls = document.querySelectorAll('#footer-year, .current-year');
  const curYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = curYear;
  });

  /* ============================================================
     7. FORM VALIDATION
     ============================================================ */
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      // Check honeypot
      const honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value.trim() !== '') {
        e.preventDefault();
        return;
      }

      // Check required fields
      let hasError = false;
      const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      requiredInputs.forEach((input) => {
        const errSpan = document.getElementById(`${input.id}-error`) || input.nextElementSibling;
        if (!input.value.trim()) {
          input.classList.add('input-error');
          if (errSpan && errSpan.classList.contains('form-error')) {
            errSpan.textContent = 'This field is required.';
            errSpan.classList.add('visible');
          }
          hasError = true;
        } else {
          input.classList.remove('input-error');
          if (errSpan && errSpan.classList.contains('form-error')) {
            errSpan.classList.remove('visible');
          }
        }
      });

      if (hasError) {
        e.preventDefault();
      }
    });
  });

  /* ============================================================
     8. EXPANDING SERVICES ACCORDION INTERACTION (Auto-Play, Hover & Click)
     ============================================================ */
  const serviceOptions = Array.from(document.querySelectorAll('.options .option'));
  const optionsContainer = document.querySelector('.options');
  if (serviceOptions.length) {
    let currentIndex = serviceOptions.findIndex((opt) => opt.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;

    let autoPlayTimer = null;
    let isPaused = false;
    const AUTO_DELAY = 3500; // Changes card every 3.5 seconds

    const activateOptionByIndex = (index) => {
      currentIndex = index;
      serviceOptions.forEach((opt, idx) => {
        const isActive = idx === index;
        opt.classList.toggle('active', isActive);
        opt.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      if (isPaused) return;
      autoPlayTimer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % serviceOptions.length;
        activateOptionByIndex(nextIndex);
      }, AUTO_DELAY);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    // Pause on hover or keyboard focus, resume on leave
    if (optionsContainer) {
      optionsContainer.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoPlay();
      });
      optionsContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoPlay();
      });
      optionsContainer.addEventListener('focusin', () => {
        isPaused = true;
        stopAutoPlay();
      });
      optionsContainer.addEventListener('focusout', () => {
        isPaused = false;
        startAutoPlay();
      });
    }

    // Interactive card triggers
    serviceOptions.forEach((option, idx) => {
      option.addEventListener('mouseenter', () => {
        activateOptionByIndex(idx);
      });

      option.addEventListener('click', (e) => {
        if (e.target.closest('.option-cta')) return;
        activateOptionByIndex(idx);
      });

      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('.option-cta')) {
            e.preventDefault();
            activateOptionByIndex(idx);
          }
        }
      });
    });

    // Pause when tab is in background
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoPlay();
      } else if (!isPaused) {
        startAutoPlay();
      }
    });

    // Start auto-cycling
    startAutoPlay();
  }

  /* ============================================================
     9. SLIDER CONTROLLER (Google Reviews & Carousels)
     ============================================================ */
  const initSlider = ({ trackId, prevId, nextId, dotsId, slideClass, autoPlayDelay = 4500 }) => {
    const track = document.getElementById(trackId);
    if (!track) return;

    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsId);
    const slides = Array.from(track.querySelectorAll(slideClass));
    let autoPlayTimer = null;

    const getScrollStep = () => {
      if (!slides.length) return 300;
      const cardWidth = slides[0].getBoundingClientRect().width;
      const gap = 24;
      return cardWidth + gap;
    };

    const buildDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      slides.forEach((slide, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.setAttribute('role', 'tab');
        dot.addEventListener('click', () => {
          slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    };

    const updateActiveDot = () => {
      if (!dotsContainer) return;
      const trackLeft = track.getBoundingClientRect().left;
      let closestIdx = 0;
      let minDiff = Infinity;
      slides.forEach((slide, idx) => {
        const diff = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === closestIdx);
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const step = getScrollStep();
        if (track.scrollLeft <= 10) {
          track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: -step, behavior: 'smooth' });
        }
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const step = getScrollStep();
        const maxScroll = track.scrollWidth - track.clientWidth - 10;
        if (track.scrollLeft >= maxScroll) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step, behavior: 'smooth' });
        }
        resetAutoPlay();
      });
    }

    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveDot, 60);
    }, { passive: true });

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });

    const startAutoPlay = () => {
      stopAutoPlay();
      if (autoPlayDelay > 0) {
        autoPlayTimer = setInterval(() => {
          if (nextBtn) nextBtn.click();
        }, autoPlayDelay);
      }
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    };

    const resetAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    track.addEventListener('touchstart', stopAutoPlay, { passive: true });
    track.addEventListener('touchend', startAutoPlay, { passive: true });

    buildDots();
    startAutoPlay();
  };

  // Init Services Slider
  initSlider({
    trackId: 'services-track',
    prevId: 'services-prev',
    nextId: 'services-next',
    dotsId: 'services-dots',
    slideClass: '.service-card',
    autoPlayDelay: 4500
  });

  // Init Google Reviews Slider
  initSlider({
    trackId: 'reviews-track',
    prevId: 'reviews-prev',
    nextId: 'reviews-next',
    dotsId: 'reviews-dots',
    slideClass: '.review-card',
    autoPlayDelay: 5000
  });

  /* ============================================================
     10. SERVICE FILTER PILLS (Services Hub Page)
     ============================================================ */
  const filterPills = document.querySelectorAll('.filter-pill');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');
  if (filterPills.length && serviceCards.length) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');

        serviceCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || (category && category.includes(filter))) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ============================================================
     11. HORIZONTAL SELECTOR ANIMATION (Navbar Inspiration)
     ============================================================ */
  function initHoriSelector() {
    const navList = document.querySelector('.primary-nav .nav-list');
    if (!navList) return;

    let horiSelector = navList.querySelector('.hori-selector');
    if (!horiSelector) {
      horiSelector = document.createElement('div');
      horiSelector.className = 'hori-selector';
      horiSelector.innerHTML = '<div class="left"></div><div class="right"></div>';
      navList.prepend(horiSelector);
    }

    const navItems = navList.querySelectorAll('.nav-item, .nav-list > li:not(.hori-selector)');
    if (!navItems.length) return;

    // Detect active item from class or page URL (including inside dropdowns)
    let currentActive = navList.querySelector('.nav-item.active, .nav-list > li.active, .nav-list > li:has(a.active)');
    if (!currentActive) {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      navItems.forEach(item => {
        const links = item.querySelectorAll('a');
        links.forEach(link => {
          if (link && (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html'))) {
            item.classList.add('active');
            currentActive = item;
          }
        });
      });
    }

    if (!currentActive && navItems.length) {
      currentActive = navItems[0];
      currentActive.classList.add('active');
    }

    function setSelectorPosition(targetItem, instant = false) {
      if (!targetItem || !horiSelector) return;
      if (window.innerWidth < 1024) {
        horiSelector.style.opacity = '0';
        return;
      }

      const listRect = navList.getBoundingClientRect();
      const itemRect = targetItem.getBoundingClientRect();

      const left = itemRect.left - listRect.left;
      const width = itemRect.width;

      if (instant) {
        horiSelector.style.transition = 'none';
      }
      horiSelector.style.left = left + 'px';
      horiSelector.style.width = width + 'px';
      horiSelector.style.opacity = '1';

      if (instant) {
        void horiSelector.offsetHeight; // Force reflow
        setTimeout(() => {
          horiSelector.style.transition = '';
        }, 50);
      }
    }

    // Set initial position instantly without slow slide-in
    setSelectorPosition(currentActive, true);
    setTimeout(() => {
      setSelectorPosition(currentActive, true);
    }, 40);

    // Re-verify position once custom fonts and assets are fully loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setSelectorPosition(currentActive, true);
      });
    }
    window.addEventListener('load', () => {
      setSelectorPosition(currentActive, true);
    });

    const servicesDropdown = document.getElementById('services-dropdown') || navList.querySelector('.nav-dropdown, .dropdown-menu');
    const servicesItem = navList.querySelector('.nav-item--dropdown, .has-dropdown');

    // Hover animation: glide smoothly to hovered item
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        navItems.forEach(i => i.classList.remove('is-hovered'));
        item.classList.add('is-hovered');
        setSelectorPosition(item, false);
      });

      item.addEventListener('click', (e) => {
        // If clicking a sublink in dropdown, let link navigate
        if (e.target.closest('.nav-dropdown, .dropdown-menu')) return;
        navItems.forEach(i => i.classList.remove('active', 'is-hovered'));
        item.classList.add('active');
        currentActive = item;
        setSelectorPosition(item, false);
      });
    });

    // While mouse is inside the services dropdown, lock the selector on Services!
    if (servicesDropdown && servicesItem) {
      servicesDropdown.addEventListener('mouseenter', () => {
        navItems.forEach(i => i.classList.remove('is-hovered'));
        servicesItem.classList.add('is-hovered');
        setSelectorPosition(servicesItem, false);
      });
      servicesDropdown.addEventListener('mouseleave', (e) => {
        const related = e.relatedTarget;
        if (!related || (!servicesItem.contains(related) && !navList.contains(related))) {
          navItems.forEach(i => i.classList.remove('is-hovered'));
          setSelectorPosition(currentActive, false);
        }
      });
    }

    // When mouse leaves nav-list, return to current active item unless over dropdown
    navList.addEventListener('mouseleave', (e) => {
      const related = e.relatedTarget;
      if (related && (navList.contains(related) || (servicesDropdown && servicesDropdown.contains(related)))) {
        return;
      }
      navItems.forEach(i => i.classList.remove('is-hovered'));
      setSelectorPosition(currentActive, false);
    });

    window.addEventListener('resize', () => {
      setSelectorPosition(currentActive, false);
    });
  }

  initHoriSelector();

  /* ============================================================
     18. BACK TO TOP BUTTON
     ============================================================ */
  function initBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.id = 'back-to-top';
      btn.setAttribute('aria-label', 'Back to top');
      btn.setAttribute('title', 'Back to top');
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      document.body.appendChild(btn);
    }

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      btn.blur();
    });
  }

  initBackToTop();

  /* ============================================================
     19. FLOATING WHATSAPP BUTTON (3D TOW TRUCK BADGE)
     ============================================================ */
  function initFloatingWhatsApp() {
    let waBtn = document.getElementById('floating-whatsapp');
    if (!waBtn) {
      waBtn = document.createElement('a');
      waBtn.id = 'floating-whatsapp';
      waBtn.className = 'floating-whatsapp';
      waBtn.href = 'https://wa.me/919654284747?text=Hi%2C%20I%20need%20a%20tow.%20My%20location%20is%3A%20';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener noreferrer';
      waBtn.setAttribute('aria-label', 'Chat with Classic Tow Service on WhatsApp');
      waBtn.setAttribute('title', 'Chat on WhatsApp (+91 96542 84747)');
      waBtn.innerHTML = '<span class="floating-whatsapp__pulse" aria-hidden="true"></span><img src="WhatsApp%20Tow%20Truck%20Icon%20for%20floating%20whatsapp.webp" alt="WhatsApp Tow Truck Icon" width="64" height="64" loading="eager" /><span class="floating-whatsapp__tooltip">Chat on WhatsApp</span>';
      document.body.appendChild(waBtn);
    }
  }

  initFloatingWhatsApp();

  /* ============================================================
     20. FLOATING LOCATION BUTTON (AUTO-INJECTION FALLBACK)
     ============================================================ */
  function initFloatingLocation() {
    let locBtn = document.getElementById('floating-location');
    if (!locBtn) {
      locBtn = document.createElement('a');
      locBtn.id = 'floating-location';
      locBtn.className = 'floating-location';
      locBtn.href = 'https://wa.me/919654284747?text=Hi%2C%20I%20need%20a%20tow.%20Sharing%20my%20location%3A%20';
      locBtn.setAttribute('aria-label', 'Send your location on WhatsApp');
      locBtn.setAttribute('title', 'Send Your Location on WhatsApp');
      locBtn.innerHTML = '<span class="floating-location__pulse" aria-hidden="true"></span><img src="WhatsApp%20Location%20Sharing%20Icon.webp" alt="Send Location on WhatsApp" width="64" height="64" loading="eager" /><span class="floating-location__tooltip">Send Your Location on WhatsApp</span>';
      document.body.appendChild(locBtn);
    }
  }

  initFloatingLocation();

  /* ============================================================
     21. SEND YOUR LOCATION ON WHATSAPP (HERO CTA & FLOATING)
     ============================================================ */
  function executeLocationShare(targetBtn) {
    const btn = targetBtn || document.querySelector('.floating-location') || document.querySelector('.btn--whatsapp-location');
    const tooltip = btn ? btn.querySelector('.floating-location__tooltip') : null;
    const labelSpan = btn ? btn.querySelector('span:not(.btn-location-icon-wrap):not(.floating-location__pulse):not(.floating-location__tooltip)') : null;
    const defaultText = labelSpan ? labelSpan.textContent : '';
    const defaultTooltip = tooltip ? tooltip.textContent : '';
    const phone = '919654284747';

    if (btn) {
      btn.classList.add('is-locating');
      if (labelSpan && !tooltip) labelSpan.textContent = 'Getting GPS Location...';
      if (tooltip) tooltip.textContent = 'Detecting GPS Location...';
    }

    function resetButton() {
      if (btn) {
        btn.classList.remove('is-locating');
        if (labelSpan && defaultText) labelSpan.textContent = defaultText;
        if (tooltip && defaultTooltip) tooltip.textContent = defaultTooltip;
      }
    }

    function openUrl(url) {
      const opened = window.open(url, '_blank');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        window.location.href = url;
      }
    }

    function handleSuccess(pos) {
      const lat = pos.coords.latitude.toFixed(6);
      const lng = pos.coords.longitude.toFixed(6);
      const mapLink = `https://maps.google.com/?q=${lat},${lng}`;
      const msg = `Hi Classic Tow Service, I need emergency towing assistance. Here is my exact Google Maps location:\n${mapLink}`;
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      
      openUrl(waUrl);
      resetButton();
    }

    function handleFallback(err) {
      if (err) console.warn('Geolocation unavailable or denied:', err);
      const fallbackMsg = `Hi Classic Tow Service, I need emergency towing assistance. Sharing my location from my phone:`;
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(fallbackMsg)}`;
      
      // Open Google Maps in a tab so the user can see their pin if needed
      window.open('https://www.google.com/maps', '_blank');
      // Open WhatsApp directly
      openUrl(waUrl);
      resetButton();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleFallback,
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0
        }
      );
    } else {
      handleFallback();
    }
  }

  window.sendLocationOnWhatsApp = function(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const target = e ? (e.currentTarget || e.target.closest('.btn--whatsapp-location, .floating-location')) : null;
    executeLocationShare(target);
  };

  document.addEventListener('click', (e) => {
    const locBtn = e.target.closest('.btn--whatsapp-location, .floating-location');
    if (locBtn) {
      e.preventDefault();
      executeLocationShare(locBtn);
    }
  });

});
