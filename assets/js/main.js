/* ============================================================================
 * Loya Trivia — Landing behaviour
 * ----------------------------------------------------------------------------
 * Reads window.LoyaSiteConfig (assets/js/site-config.js) and wires up:
 *   - store buttons (enabled / "Çok yakında")
 *   - dynamic text (app name, support email, identifiers, stats, year)
 *   - mobile nav, FAQ accordion, header shadow, scroll reveal
 * No frameworks. Safe to load on every page (handles missing elements).
 * ==========================================================================*/
(function () {
  "use strict";

  var config = window.LoyaSiteConfig || {};

  /* ---- tiny DOM helpers ---- */
  function each(selector, fn) {
    document.querySelectorAll(selector).forEach(fn);
  }
  function setText(selector, value) {
    if (value == null) return;
    each(selector, function (el) {
      el.textContent = value;
    });
  }
  function setAttr(selector, name, value) {
    each(selector, function (el) {
      el.setAttribute(name, value);
    });
  }

  /* ----------------------------------------------------- text injection ---- */
  function injectText() {
    var stats = config.stats || {};
    var legal = config.legal || {};

    setText("[data-app-name]", config.appName);
    setText("[data-publisher-name]", config.publisherName);
    setText("[data-support-email]", config.supportEmail);
    setText("[data-android-package]", config.androidPackageName);
    setText("[data-ios-bundle]", config.iosBundleId);
    setText("[data-last-updated]", legal.lastUpdated);
    setText("[data-controller-name]", legal.controllerName);
    setText("[data-controller-address]", legal.controllerAddress);
    setText("[data-min-age]", legal.minAge);

    // Stats (only if present in config)
    setText("[data-stat-modes]", stats.modeCount);
    setText("[data-stat-jokers]", stats.jokerCount);
    if (stats.correctPoints != null)
      setText(
        "[data-rule-correct]",
        (stats.correctPoints > 0 ? "+" : "") + stats.correctPoints
      );
    setText("[data-rule-wrong]", stats.wrongPoints);
    setText("[data-rule-joker]", stats.jokerCost);

    setAttr(
      "[data-support-mailto]",
      "href",
      "mailto:" + (config.supportEmail || "")
    );

    // Current year in footer
    each("[data-year]", function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------- Apple Smart App Banner ------ */
  // Adds <meta name="apple-itunes-app"> so Safari on iOS shows an install
  // banner once the App Store numeric ID is configured.
  function configureAppleBanner() {
    if (!config.appStoreAppId) return;
    if (document.querySelector('meta[name="apple-itunes-app"]')) return;
    var meta = document.createElement("meta");
    meta.name = "apple-itunes-app";
    meta.content = "app-id=" + config.appStoreAppId;
    document.head.appendChild(meta);
  }

  /* --------------------------------------------------- store badges -------- */
  // Official App Store / Google Play badges are ALWAYS shown active (never
  // greyed out). The outbound link only goes live once the store is marked
  // available in config — so flipping `published`/`storeAvailability` at launch
  // is the only change needed. Until then badges scroll to the download anchor.
  function configureStoreButtons() {
    var links = config.storeLinks || {};
    var avail = config.storeAvailability || {};

    each("[data-store]", function (badge) {
      var store = badge.dataset.store;
      var href = links[store];
      var isLive = (config.published || avail[store]) && !!href;

      if (isLive) {
        badge.href = href;
        badge.target = "_blank";
        badge.rel = "noopener";
      } else {
        badge.href = "#indir";
        badge.removeAttribute("target");
      }
    });
  }

  /* ------------------------------------------------------- social links ---- */
  function configureSocial() {
    var social = config.social || {};
    var labels = { instagram: "Instagram", twitter: "X", youtube: "YouTube" };
    var glyph = { instagram: "◎", twitter: "𝕏", youtube: "▶" };

    each("[data-social-row]", function (row) {
      var html = "";
      Object.keys(labels).forEach(function (key) {
        if (social[key]) {
          html +=
            '<a href="' +
            social[key] +
            '" target="_blank" rel="noopener" aria-label="' +
            labels[key] +
            '">' +
            glyph[key] +
            "</a>";
        }
      });
      row.innerHTML = html;
    });
  }

  /* ------------------------------------------------ screenshots / media ---- */
  // Fills the hero device and the screenshot gallery from config.media.
  function escapeAttr(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Screenshot inside the iPhone frame (assets/img/iphone.png).
  var DEVICE_FRAME = "assets/img/iphone.png";
  function deviceInner(src, alt) {
    return (
      '<img class="device-shot" src="' +
      escapeAttr(src) +
      '" alt="' +
      escapeAttr(alt) +
      '" loading="lazy" />' +
      '<img class="device-frame" src="' +
      DEVICE_FRAME +
      '" alt="" aria-hidden="true" />'
    );
  }

  function shotSrc(shot) {
    return typeof shot === "string" ? shot : shot && shot.src;
  }

  function configureMedia() {
    var media = config.media || {};
    var shots = Array.isArray(media.screenshots) ? media.screenshots : [];

    // Hero device — heroScreenshot, else the first gallery shot.
    var hero = document.querySelector("[data-hero-device]");
    if (hero) {
      var heroSrc = media.heroScreenshot || shotSrc(shots[0]);
      if (heroSrc) {
        hero.innerHTML = deviceInner(
          heroSrc,
          (config.appName || "") + " ekran görüntüsü"
        );
      } else {
        hero.hidden = true;
      }
    }

    // Gallery — one framed device per screenshot, then reveal the section.
    var section = document.querySelector("[data-shots-section]");
    var row = document.querySelector("[data-shots-row]");
    if (section && row && shots.length) {
      row.innerHTML = shots
        .map(function (shot) {
          var src = shotSrc(shot);
          if (!src) return "";
          var alt = (typeof shot === "object" && shot.alt) || "Ekran görüntüsü";
          return '<div class="device">' + deviceInner(src, alt) + "</div>";
        })
        .join("");
      if (row.children.length) section.hidden = false;
    }
  }

  /* ----------------------------------------------------- mobile nav -------- */
  function configureNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------- FAQ ---------- */
  function configureFaq() {
    each("[data-faq-question]", function (button) {
      button.addEventListener("click", function () {
        var item = button.closest("[data-faq-item]");
        if (!item) return;
        var open = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
      });
    });
  }

  /* -------------------------------------------------- header shadow -------- */
  function configureHeader() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------- scroll reveal -------- */
  function configureReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("in");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------- init ------ */
  injectText();
  configureAppleBanner();
  configureMedia();
  configureStoreButtons();
  configureSocial();
  configureNav();
  configureFaq();
  configureHeader();
  configureReveal();
})();
