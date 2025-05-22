window.addEventListener("load", () => {
  initObserver();  // tu cała logika z IntersectionObserver
});


function initObserver() {
  // 1. pobierz wszystkie linki-kotwice w navbarze
  const links = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
  console.log("🔍 Linków z kotwicami:", links.length);
  if (!links.length) {
    console.warn("⚠️ Nie znalazłem żadnych .nav-link[href^='#'] w .navbar-nav");
    return;
  }

  // 2. zmapuj każdy link na jego target element
  const items = [];
  links.forEach(link => {
    const hash = link.getAttribute('href');
    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (target) {
      items.push({ link, target });
    } else {
      console.warn(`⚠️ Nie znalazłem w DOM elementu o id="${id}"`);
    }
  });
  console.log("✅ Znalezionych par link→element:", items.length);
  if (!items.length) return;

  // 3. ustaw IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const { link } = items.find(i => i.target === entry.target);
      console.log(`→ [${entry.target.id}] visible? ${entry.isIntersecting}`);
      link.classList.toggle("active", entry.isIntersecting);
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  });

  // 4. zacznij obserwować każdy znaleziony element
  items.forEach(({ target }) => observer.observe(target));
}

// Uruchom, gdy DOM będzie gotowy
document.addEventListener("DOMContentLoaded", initObserver);


// startujemy polling już po DOMContentLoaded
document.addEventListener("DOMContentLoaded", initObserver);



