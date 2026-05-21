(function () {
  "use strict";

  var banner = document.getElementById("familyBanner");
  if (!banner) return;

  var img = banner.querySelector(".family-banner__img");

  function markReady() {
    banner.classList.add("is-ready");
  }

  function whenImageReady(callback) {
    if (!img) {
      callback();
      return;
    }

    if (img.complete && img.naturalWidth > 0) {
      callback();
      return;
    }

    img.addEventListener("load", callback, { once: true });
    img.addEventListener("error", callback, { once: true });
  }

  whenImageReady(markReady);

  /* 画像読込が遅い場合でも必ず表示 */
  setTimeout(markReady, 1200);
})();
