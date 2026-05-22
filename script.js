(function () {
  "use strict";

  initLoader();
  initHeader();
  initParallax();
  initReveal();
  initSlider();

  /* ------------------------------------------------------------------ */
  /* Loading screen（必ず非表示化・DOM削除まで行う）                      */
  /* ------------------------------------------------------------------ */
  function initLoader() {
    var loader = document.getElementById("pageLoader");
    var body = document.body;
    if (!loader || !body) {
      body && body.classList.remove("is-loading");
      return;
    }

    var finished = false;
    var MIN_SHOW_MS = 900;
    var MAX_WAIT_MS = 6000;
    var startedAt = Date.now();

    function hideLoader() {
      if (finished) return;

      var remain = MIN_SHOW_MS - (Date.now() - startedAt);
      if (remain < 0) remain = 0;

      setTimeout(function () {
        if (finished) return;
        finished = true;

        loader.classList.add("is-complete");
        loader.classList.add("is-hidden");
        body.classList.remove("is-loading");

        setTimeout(function () {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 800);
      }, remain);
    }

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
    }

    setTimeout(hideLoader, MAX_WAIT_MS);
  }

  /* ------------------------------------------------------------------ */
  /* Header: scroll state + mobile menu                                  */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var menuBtn = document.getElementById("menuBtn");
    var mobileNav = document.getElementById("mobileNav");

    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", function () {
        var open = mobileNav.classList.toggle("is-open");
        menuBtn.classList.toggle("is-active", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        mobileNav.setAttribute("aria-hidden", String(!open));
      });

      mobileNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileNav.classList.remove("is-open");
          menuBtn.classList.remove("is-active");
          menuBtn.setAttribute("aria-expanded", "false");
          mobileNav.setAttribute("aria-hidden", "true");
        });
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Hero & decorative parallax                                            */
  /* ------------------------------------------------------------------ */
  function initParallax() {
    var hero = document.getElementById("hero");
    var heroBg = document.getElementById("heroBg");
    var parallaxEls = document.querySelectorAll("[data-parallax]");
    var ticking = false;

    function updateParallax() {
      if (heroBg) {
        var y = window.scrollY;
        var heroH = hero ? hero.offsetHeight : window.innerHeight;
        if (y <= heroH) {
          var offset = y * 0.38;
          heroBg.style.transform =
            "translate3d(0, " + offset + "px, 0) scale(1.06)";
        }
      }

      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.3;
        var center = rect.top + rect.height / 2 - vh / 2;
        var shift = center * speed * -0.12;
        var isSide =
          el.classList.contains("deco-circle--left") ||
          el.classList.contains("deco-circle--right");
        el.style.transform = isSide
          ? "translateY(calc(-50% + " + shift + "px))"
          : "translate3d(0, " + shift + "px, 0)";
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateParallax();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                         */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
      );
      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Coupon slider                                                         */
  /* ------------------------------------------------------------------ */
  function initSlider() {
    var track = document.getElementById("sliderTrack");
    var viewport = document.getElementById("sliderViewport");
    var prevBtn = document.getElementById("prevSlide");
    var nextBtn = document.getElementById("nextSlide");

    if (!track || !viewport || !prevBtn || !nextBtn) return;

    var GAP = 16;
    var index = 0;
    var touchStartX = 0;
    var touchDelta = 0;
    var isDragging = false;

    function cardStep() {
      var card = track.children[0];
      return card ? card.getBoundingClientRect().width + GAP : 226;
    }

    function maxIndex() {
      var overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (overflow <= 0) return 0;
      return Math.ceil(overflow / cardStep());
    }

    function setTransform(px, animate) {
      track.classList.toggle("is-dragging", !animate);
      track.style.transform = "translate3d(" + px + "px, 0, 0)";
    }

    function goTo(i, animate) {
      var mx = maxIndex();
      index = Math.max(0, Math.min(i, mx));
      setTransform(-index * cardStep(), animate !== false);
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= mx;
    }

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });

    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });

    function pointerDown(clientX) {
      touchStartX = clientX;
      touchDelta = 0;
      isDragging = true;
      track.classList.add("is-dragging");
    }

    function pointerMove(clientX) {
      if (!isDragging) return;
      touchDelta = clientX - touchStartX;
      setTransform(-index * cardStep() + touchDelta, false);
    }

    function pointerUp() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove("is-dragging");
      var threshold = cardStep() * 0.22;
      if (touchDelta < -threshold) {
        goTo(index + 1);
      } else if (touchDelta > threshold) {
        goTo(index - 1);
      } else {
        goTo(index);
      }
      touchDelta = 0;
    }

    viewport.addEventListener(
      "touchstart",
      function (e) {
        pointerDown(e.touches[0].clientX);
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchmove",
      function (e) {
        pointerMove(e.touches[0].clientX);
      },
      { passive: true }
    );

    viewport.addEventListener("touchend", pointerUp);

    viewport.addEventListener("mousedown", function (e) {
      e.preventDefault();
      pointerDown(e.clientX);
    });

    window.addEventListener("mousemove", function (e) {
      pointerMove(e.clientX);
    });

    window.addEventListener("mouseup", pointerUp);

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        goTo(Math.min(index, maxIndex()));
      }, 120);
    });

    goTo(0, false);
  }
})();
