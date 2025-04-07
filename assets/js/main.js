
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Fetching countries data
   */
  async function fetchCountryData() {
    try {
      // Fetch country data from the API
      const response = await fetch(`https://flagcdn.com/en/codes.json`);
      const data = await response.json();

      // Get the container holding all country cards
      const container = document.getElementById("countries-container");

      Object.entries(data).forEach(([code, name]) => {

        // Create the country card
        const countryDiv = document.createElement("div");

        // Add classes to the country div for stlying
        countryDiv.classList.add("card", "align-items-center");
        countryDiv.style.width = "18rem";

        // Prepare the elements
        const countryNameElement = document.createElement("h5");
        const imgFlag = document.createElement("img");
        
        // You can guess what flag is excluded here! <3
        if ( code != "il" ) {
          
          // Set the country name
          countryNameElement.textContent = name;
          
          // Set the image source and alt text and styles
          imgFlag.src = `https://flagcdn.com/256x192/${code}.png`;
          imgFlag.alt = `${name} flag`;
          imgFlag.style.width = "50%";
          imgFlag.style.margin = "2.5rem 0";

          // Append elements to the country div
          countryDiv.appendChild(imgFlag);
          countryDiv.appendChild(countryNameElement);

          // Append the country div to the container
          container.appendChild(countryDiv);
          }
        });
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
  }

  // Load country data only if the page is the countries page
  if ( document.body.classList.contains("countries-page") ) {
    window.addEventListener("load", fetchCountryData);
  }

  /**
   * Fetching flags data
   */
  async function fetchFlagsData() {
    try {
      // Fetch country data from the API
      const response = await fetch(`https://flagcdn.com/en/codes.json`);
      const data = await response.json();

      // Get the container holding all country cards
      const container = document.getElementById("flags-container");

      Object.entries(data).forEach(([code, name]) => {

        // You can guess what "country" is excluded here! <3
        if ( code != "il" ) {

          // Create the country card
          const flagDiv = document.createElement("div");
  
          // Add classes to the country div for stlying
          flagDiv.classList.add("flag-item", "card", "align-items-center");
          flagDiv.style.width = "18rem";
  
          // Prepare the elements
          const imgFlag = document.createElement("img");
          
          // Set the image source and alt text and styles
          imgFlag.src = `https://flagcdn.com/256x192/${code}.png`;
          imgFlag.style.margin = "1.5rem 0";

          // Create the div that will contain the preview link and icon
          const previewDiv = document.createElement("div");
          previewDiv.classList.add("flag-links", "d-flex", "align-items-center", "justify-content-center");

          // Create a link to the flag for preview and hover effect
          const flagLink = document.createElement("a");
          flagLink.href = `https://flagcdn.com/w2560/${code}.jpg`;
          flagLink.title = `${name}'s flag`;
          flagLink.classList.add("glightbox", "preview-link", "text-center");

          // Create the preview icon
          const previewIcon = document.createElement("i");
          previewIcon.classList.add("bi", "bi-arrows-angle-expand");

          // Append the preview icon to the link
          flagLink.appendChild(previewIcon);

          // Append the link to the preview div
          previewDiv.appendChild(flagLink);

          // Append the flag and the preview div to the flag div
          flagDiv.appendChild(imgFlag);
          flagDiv.appendChild(previewDiv);

          // Append the country div to the container
          container.appendChild(flagDiv);

          // Initialize GLightbox for the flag link
          GLightbox({ selector: '.glightbox' });

          }
        });
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
  }

  // Load flags only if the page is the flags page
  if ( document.body.classList.contains("flags-page") ) {
    window.addEventListener("load", fetchFlagsData);
  }

})();