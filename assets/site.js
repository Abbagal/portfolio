/* ==========================================================
   Shared header, navigation and footer for every page.
   To add/rename a menu item, edit the NAV list below only.
   ========================================================== */
(function () {
  var NAV = [
    ["index.html", "Home"],
    ["profile.html", "Profile"],
    ["research.html", "Research"],
    ["publications.html", "Publications"],
    ["students.html", "Research Group"],
    ["teaching.html", "Teaching"],
    ["outreach.html", "Lectures & Service"],
    ["contact.html", "Contact"]
  ];
  var UPDATED = "January 2026"; // change this when the site is updated

  var here = location.pathname.split("/").pop() || "index.html";

  var links = NAV.map(function (n) {
    return '<li><a href="' + n[0] + '"' + (n[0] === here ? ' class="active"' : "") + ">" + n[1] + "</a></li>";
  }).join("");

  var header =
    '<div class="topbar"><div class="wrap">' +
      '<span>Department of Civil Engineering · IIT Bombay</span>' +
      '<span><a href="mailto:dasaka@iitb.ac.in">dasaka@iitb.ac.in</a> · +91-22-2576 7316</span>' +
    "</div></div>" +
    '<header class="site"><div class="wrap">' +
      '<a class="brand" href="index.html"><b>Prof. Dasaka S. Murty</b><span>Geotechnical Engineering · IIT Bombay</span></a>' +
      '<button class="menu-btn" aria-label="Menu" aria-expanded="false">☰ Menu</button>' +
      '<nav class="main"><ul>' + links + "</ul></nav>" +
    "</div></header>";

  var footer =
    '<footer class="site"><div class="wrap">' +
      '<div class="cols">' +
        "<div><h4>Prof. Satyanarayana Murty Dasaka</h4>" +
          "Professor, Department of Civil Engineering<br>Indian Institute of Technology Bombay<br>Powai, Mumbai – 400 076, India</div>" +
        "<div><h4>Quick links</h4><ul>" +
          '<li><a href="publications.html">Publications</a></li>' +
          '<li><a href="students.html">Research Group</a></li>' +
          '<li><a href="research.html#projects">Sponsored Projects</a></li>' +
          '<li><a href="contact.html">Contact</a></li></ul></div>' +
        "<div><h4>IIT Bombay</h4><ul>" +
          '<li><a href="https://www.civil.iitb.ac.in/" target="_blank" rel="noopener">Civil Engineering Dept.</a></li>' +
          '<li><a href="https://www.civil.iitb.ac.in/faculty/details/dasaka-murty" target="_blank" rel="noopener">Official faculty profile</a></li>' +
          '<li><a href="https://www.iitb.ac.in/" target="_blank" rel="noopener">IIT Bombay</a></li></ul></div>' +
      "</div>" +
      '<div class="bottom"><span>© ' + new Date().getFullYear() + " Prof. Dasaka S. Murty, IIT Bombay</span><span>Last updated: " + UPDATED + "</span></div>" +
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
