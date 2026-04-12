const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

// Typewriter animation
if (document.body.classList.contains('home-page')) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function typeLines() {
    const lines = [...document.querySelectorAll('.typing-container [data-text]')]
      .filter(el => !el.classList.contains('line-2'));
    const line2 = document.querySelector('.line-2');
    const cursor = document.querySelector('.typed-cursor');
    if (!cursor || !lines.length) return;

    // Fade in line-2 after a short delay, independently
    if (line2) setTimeout(() => line2.classList.add('visible'), 800);

    for (const line of lines) {
      const text = line.dataset.text;
      const delay = Number(line.dataset.delay) || 80;
      const isSara = line.classList.contains('line-sara');

      cursor.classList.toggle('cursor-pink', isSara);
      line.appendChild(cursor);

      for (const char of [...text]) {
        cursor.insertAdjacentText('beforebegin', char);
        await sleep(delay);
      }

      await sleep(1000);
    }
  }

  typeLines();
}

// Home page: header becomes visible after scrolling past hero
if (document.body.classList.contains("home-page")) {
  const hero = document.querySelector("#hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const threshold = hero.offsetHeight * 0.5;
      document.body.classList.toggle("header-scrolled", window.scrollY > threshold);
    });
  }
}