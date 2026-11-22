(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveals: add .in when an element comes into view
  var items = document.querySelectorAll(".rv, .dr, .st");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Mobile call bar: show once the hero button has scrolled away, hide at the contact section
  var bar = document.getElementById("callbar");
  var hero = document.getElementById("hero-actions");
  var contact = document.getElementById("contact");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroIn = true, contactIn = false;
    var update = function () { bar.classList.toggle("is-on", !heroIn && !contactIn); };
    new IntersectionObserver(function (e) { heroIn = e[0].isIntersecting; update(); }).observe(hero);
    if (contact) new IntersectionObserver(function (e) { contactIn = e[0].isIntersecting; update(); }).observe(contact);
  }
})();
