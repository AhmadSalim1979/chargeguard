// Shared site chrome behavior: mobile nav toggle + active nav link.
// Loaded on every page; must stay defensive since not every page has the
// same header markup (older utility pages may lack data-nav-toggle).
(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav] a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (href !== '/' && path.indexOf(href) === 0)) {
      a.classList.add('is-active');
    }
  });
})();
