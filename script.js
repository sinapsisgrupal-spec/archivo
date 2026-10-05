(function () {
  var burger = document.getElementById('burger');
  var links = document.getElementById('links');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function () {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });

  // reveal on scroll + count-up
  function count(el) {
    var end = +el.dataset.count, t0 = null;
    (function step(t) {
      t0 = t0 || t;
      var p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      var c = en.target.querySelector('[data-count]');
      if (c) count(c);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // contact form -> mailto
  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var body = f.msg.value + '\n\n' + f.nombre.value + ' <' + f.email.value + '>';
    document.getElementById('ok').hidden = false;
    location.href = 'mailto:csjspoabaq@cendoj.ramajudicial.gov.co?subject=' +
      encodeURIComponent('Solicitud de ' + f.nombre.value) + '&body=' + encodeURIComponent(body);
  });
})();
