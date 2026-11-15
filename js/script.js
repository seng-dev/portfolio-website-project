(function () {
  var root = document.documentElement;
  // Theme: saved choice > system preference
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  try {
    var s = localStorage.getItem("theme");
    if (s === "dark" || s === "light") root.setAttribute("data-theme", s);
  } catch (e) {}
  document.getElementById("theme").addEventListener("click", function () {
    var n = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", n);
    try {
      localStorage.setItem("theme", n);
    } catch (e) {}
  });

  // Mobile menu
  var nav = document.getElementById("nav");
  document.getElementById("menu").addEventListener("click", function () {
    nav.classList.toggle("open");
  });
  nav.addEventListener("click", function () {
    nav.classList.remove("open");
  });

  // Typing effect
  var words = [
      "Frontend Developer",
      "Web Designer",
      "Software Engineering Student",
    ],
    wi = 0,
    ci = 0,
    del = false,
    el = document.getElementById("type");
  (function tick() {
    var w = words[wi];
    ci += del ? -1 : 1;
    el.textContent = w.slice(0, ci);
    var d = del ? 45 : 90;
    if (!del && ci === w.length) {
      del = true;
      d = 1400;
    } else if (del && ci === 0) {
      del = false;
      wi = (wi + 1) % words.length;
      d = 350;
    }
    setTimeout(tick, d);
  })();

  // Services
  var I = {
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    phone:
      '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
  };
  var svc = [
    [
      "code",
      "Frontend web development",
      "I do some research before starting my development to choose the right way for the job.",
    ],
    [
      "phone",
      "Fully Responsive",
      "I design my websites for every screen size available and I make sure it looks great on every device.",
    ],
    [
      "code",
      "Beautiful Code",
      "Working on projects, I write beautiful and clean code to make them better readable for any partner or client.",
    ],
    [
      "clock",
      "On Time",
      "Always responsible to complete any given project on time.",
    ],
    [
      "bolt",
      "Quick Learner",
      "I like to learn new things and I have the ability to learn it quickly.",
    ],
    ["wifi", "Online", "Easy to reach and happy to help."],
  ];
  document.getElementById("svc").innerHTML = svc
    .map(function (x) {
      return (
        '<div class="card svc"><div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        I[x[0]] +
        "</svg></div><h3>" +
        x[1] +
        "</h3><p>" +
        x[2] +
        "</p></div>"
      );
    })
    .join("");

  // Projects
  var laptop =
    '<svg viewBox="0 0 110 70"><rect x="14" y="4" width="82" height="50" rx="3" fill="#1c2733"/><rect x="18" y="8" width="74" height="42" fill="#2b7fff"/><path d="M4 58h102l-6 8H10z" fill="#c9ced6"/></svg>';
  var pj = [
    ["Puppy Lovers Page", "t1", "Landing page · HTML & CSS"],
    ["Puppy Lovers Page", "t1", "Gallery layout · Bootstrap"],
    ["Puppy Lovers Page", "t1", "Responsive page · CSS"],
    ["MacBook Pro", "t2", "Apple website rebuild"],
    ["MacBook Pro", "t2", "Media queries practice"],
    ["MacBook Pro", "t2", "Bootstrap framework version"],
  ];
  document.getElementById("proj").innerHTML = pj
    .map(function (p) {
      var inner =
        p[1] === "t1"
          ? "<b>" + p[0] + "</b>"
          : '<span style="position:absolute;top:34px;font-size:1rem">' +
            p[0] +
            '</span><span style="position:absolute;top:60px;font-size:.7rem;font-weight:400">The best for the brightest.</span><span style="margin-top:60px">' +
            laptop +
            "</span>";
      return (
        '<div class="card proj"><div class="thumb ' +
        p[1] +
        '">' +
        inner +
        '</div><div class="cap">' +
        p[0] +
        "<span>" +
        p[2] +
        "</span></div></div>"
      );
    })
    .join("");

  // Skill bars + active nav link on scroll
  var bars = document.querySelectorAll(".fill");
  new IntersectionObserver(
    function (es, o) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          bars.forEach(function (b) {
            b.style.width = b.dataset.w + "%";
          });
          o.disconnect();
        }
      });
    },
    { threshold: 0.3 },
  ).observe(document.querySelector(".skills"));
  var links = [].slice.call(nav.querySelectorAll("a"));
  var secs = links.map(function (a) {
    return document.querySelector(a.getAttribute("href"));
  });
  addEventListener(
    "scroll",
    function () {
      var y = scrollY + 120,
        idx = 0;
      secs.forEach(function (s, i) {
        if (s.offsetTop <= y) idx = i;
      });
      links.forEach(function (a, i) {
        a.classList.toggle("active", i === idx);
      });
    },
    { passive: true },
  );

  // Contact form (front-end validation only)
  var f = document.getElementById("form"),
    m = document.getElementById("msg");
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    [].forEach.call(f.elements, function (i) {
      if (!i.name) return;
      i.classList.remove("err");
      var bad =
        !i.value.trim() ||
        (i.name === "email" && !/^\S+@\S+\.\S+$/.test(i.value));
      if (bad) {
        i.classList.add("err");
        ok = false;
      }
    });
    m.textContent = ok
      ? "Thank you! Your message is ready to send. Connect a backend or email service to deliver it."
      : "Please fill in every field with a valid email address.";
    m.style.color = ok ? "var(--accent)" : "#e5484d";
    if (ok) f.reset();
  });
})();
document.addEventListener("DOMContentLoaded", function () {
  const skills = document.querySelectorAll(".fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target;

          const percentage = progress.getAttribute("data-w");

          progress.style.width = percentage + "%";

          observer.unobserve(progress);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  skills.forEach((skill) => {
    observer.observe(skill);
  });
});
