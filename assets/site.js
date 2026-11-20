/* ==========================================================
   Shared header (with drop-down menu), footer and small
   page behaviours for every page.
   To add/rename a menu item, edit the NAV list below only.
   ========================================================== */
(function () {
  var NAV = [
    ["index.html", "Home"],
    ["profile.html", "About Me", [
      ["profile.html#education", "Academic Qualification"],
      ["profile.html#experience", "Professional Experience"],
      ["profile.html#awards", "Awards & Recognition"],
      ["profile.html#editorial", "Editorial & Memberships"],
      ["profile.html#reviewer", "Journal Reviewer"]
    ]],
    ["research.html", "Research", [
      ["research.html#areas", "Research Areas"],
      ["research.html#projects", "Sponsored Projects"],
      ["research.html#patents", "Patents"],
      ["research.html#lab", "Laboratory & Consultancy"]
    ]],
    ["students.html", "Supervision", [
      ["students.html#postdoc", "Post Doctoral"],
      ["students.html#phd-current", "Ph.D. – Ongoing"],
      ["students.html#phd-done", "Ph.D. – Completed"],
      ["students.html#mtech", "M.Tech."],
      ["students.html#ms", "M.S. (Engg.)"]
    ]],
    ["publications.html", "Publications", [
      ["publications.html#edited", "Edited Volumes"],
      ["publications.html#journals", "Journal Papers"],
      ["publications.html#chapters", "Book Chapters"],
      ["publications.html#conferences", "Conference Papers"]
    ]],
    ["teaching.html", "Experience", [
      ["teaching.html#courses", "Teaching Experience"],
      ["teaching.html#developed", "Courses Developed"],
      ["teaching.html#qip", "QIP & CEP Courses"],
      ["outreach.html#keynotes", "Keynote & Invited Lectures"],
      ["outreach.html#organised", "Events Organised"],
      ["outreach.html#institute", "Institute & Dept. Service"],
      ["outreach.html#profession", "Professional Service"]
    ]],
    ["contact.html", "Contact"]
  ];
  var UPDATED = "January 2026"; // change this when the site is updated

  var here = location.pathname.split("/").pop() || "index.html";
  var subPages = { "outreach.html": "teaching.html" }; // pages that live under another menu item

  var links = NAV.map(function (n) {
    var active = n[0] === here || subPages[here] === n[0];
    var cls = (n[2] ? "has-sub" : "") + (active ? " active" : "");
    var sub = n[2] ? '<ul class="sub">' + n[2].map(function (s) {
      return '<li><a href="' + s[0] + '">' + s[1].replace("&", "&amp;") + "</a></li>";
    }).join("") + "</ul>" : "";
    return '<li class="' + cls.trim() + '"><a href="' + n[0] + '">' + n[1] + "</a>" + sub + "</li>";
  }).join("");

  var header =
    '<header class="site"><div class="wrap">' +
      '<div class="head-row">' +
        '<div class="brand">' +
          '<h1><a href="index.html">Prof. Dasaka S. Murty</a></h1>' +
          '<p class="sub">Professor, Geotechnical Engineering</p>' +
          "<p>Department of Civil Engineering · IIT Bombay, India</p>" +
        "</div>" +
        '<div class="head-badge"><b>IIT BOMBAY</b>Department of<br>Civil Engineering</div>' +
      "</div>" +
      '<button class="menu-btn" aria-expanded="false">☰ Menu</button>' +
      '<nav class="main"><ul>' + links + "</ul></nav>" +
    "</div></header>";

  var footer =
    '<footer class="site"><div class="wrap">' +
      "<p>" + NAV.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + "</a>"; }).join(" &nbsp;|&nbsp; ") + "</p>" +
      "<p>© " + new Date().getFullYear() + " Prof. Dasaka S. Murty, Indian Institute of Technology Bombay, India · Last updated: " + UPDATED + "</p>" +
    "</div></footer>" +
    '<button class="to-top" aria-label="Back to top">↑</button>';

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // mobile menu
  var btn = document.querySelector(".menu-btn"), nav = document.querySelector("nav.main");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // back-to-top
  var top = document.querySelector(".to-top");
  window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 500); });
  top.addEventListener("click", function () { window.scrollTo({ top: 0 }); });

  // books carousel (home page)
  var car = document.querySelector(".carousel");
  if (car) {
    var slides = car.querySelectorAll(".slide"), dots = document.querySelector(".dots"), i = 0, timer;
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("on", k === i); });
      dots.querySelectorAll("button").forEach(function (d, k) { d.classList.toggle("on", k === i); });
    };
    slides.forEach(function (_, k) {
      var d = document.createElement("button");
      d.setAttribute("aria-label", "Show book " + (k + 1));
      d.addEventListener("click", function () { show(k); });
      dots.appendChild(d);
    });
    var play = function () { timer = setInterval(function () { show(i + 1); }, 3500); };
    car.addEventListener("mouseenter", function () { clearInterval(timer); });
    car.addEventListener("mouseleave", play);
    show(0); play();
  }

  // QR code (home page) — uses qrcode.js from cdnjs
  var qr = document.getElementById("qr");
  if (qr) {
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    s.onload = function () {
      new QRCode(qr, { text: qr.getAttribute("data-url"), width: 184, height: 184, colorDark: "#323534", colorLight: "#ffffff" });
    };
    document.head.appendChild(s);
  }

  // publication search (only on pages with #pubSearch)
  var q = document.getElementById("pubSearch");
  if (q) {
    var items = document.querySelectorAll("ol.pubs li");
    var note = document.getElementById("pubCount");
    var total = items.length;
    var update = function () {
      var term = q.value.trim().toLowerCase(), shown = 0;
      items.forEach(function (li) {
        var ok = !term || li.textContent.toLowerCase().indexOf(term) !== -1;
        li.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      document.querySelectorAll(".pub-block").forEach(function (b) {
        b.classList.toggle("hidden", !b.querySelector("ol.pubs li:not(.hidden)"));
      });
      note.textContent = term ? shown + " of " + total + " items match" : total + " items";
    };
    q.addEventListener("input", update);
    update();
  }
})();
