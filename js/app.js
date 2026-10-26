/* =====================================================================
 *  app.js — ตรรกะการทำงานทั้งหมด (ไม่ต้องแก้ไฟล์นี้ก็ได้)
 *  อ่านข้อมูลจาก CONFIG ใน config.js
 * ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderCounter();
  startCountdown();
  renderTimeline();
  renderGallery();
  renderLetter();
  setupMusic();
  setupLightbox();
  spawnHearts();
});

/* ---------- HERO ---------- */
function renderHero() {
  document.getElementById("heroTitle").textContent = CONFIG.hero.title;
  document.getElementById("heroSubtitle").textContent = CONFIG.hero.subtitle;
  document.title = CONFIG.hero.title;
}

/* ---------- ตัวนับเวลา count-up (ปี/เดือน/วัน + วันรวม) ---------- */
function getStartDate() {
  const s = CONFIG.couple.startDate;
  return new Date(s.year, s.month - 1, s.day);
}

function diffYMD(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // จำนวนวันของเดือนก่อนหน้า end
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function renderCounter() {
  const start = getStartDate();
  const now = new Date();
  const { years, months, days } = diffYMD(start, now);
  const totalDays = Math.max(0, Math.floor((now - start) / 86400000));

  const values = { years, months, days, totalDays };
  document.querySelectorAll(".counter .num").forEach((el) => {
    const key = el.dataset.k;
    animateNumber(el, values[key] ?? 0);
  });
}

function animateNumber(el, target) {
  const duration = 1200;
  const startTime = performance.now();
  function step(t) {
    const p = Math.min((t - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- นับถอยหลังครบรอบปีถัดไป ---------- */
function startCountdown() {
  const start = getStartDate();
  const now = new Date();

  // วันครบรอบปีถัดไป
  let next = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (next < now) next = new Date(now.getFullYear() + 1, start.getMonth(), start.getDate());

  const diffDays = Math.ceil((next - now) / 86400000);
  const el = document.getElementById("cdDays");
  if (diffDays === 0) {
    document.getElementById("countdown").innerHTML =
      '<p class="countdown-label">🎉 วันนี้คือวันครบรอบของเรา! 🎉</p>';
  } else {
    el.textContent = diffDays.toLocaleString();
  }
}

/* ---------- ไทม์ไลน์ ---------- */
function renderTimeline() {
  const wrap = document.getElementById("timelineList");
  wrap.innerHTML = CONFIG.timeline
    .map(
      (item, i) => `
      <div class="timeline-item" data-emoji="${item.emoji || "💗"}" style="animation-delay:${i * 0.08}s">
        <span class="timeline-date">${escapeHtml(item.date)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.desc || "")}</p>
      </div>`
    )
    .join("");
}

/* ---------- แกลเลอรี ---------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = CONFIG.gallery
    .map(
      (img, i) => `
      <div class="gallery-item" data-src="${escapeAttr(img.src)}" data-cap="${escapeAttr(img.caption || "")}" style="animation-delay:${i * 0.06}s">
        <img src="${escapeAttr(img.src)}" alt="${escapeAttr(img.caption || "ความทรงจำ")}" loading="lazy" />
        ${img.caption ? `<span class="cap">${escapeHtml(img.caption)}</span>` : ""}
      </div>`
    )
    .join("");
}

/* ---------- จดหมายรัก ---------- */
function renderLetter() {
  document.getElementById("letterTitle").textContent = CONFIG.letter.title;
  document.getElementById("letterBody").innerHTML = CONFIG.letter.paragraphs
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
  document.getElementById("letterSign").textContent = CONFIG.letter.signature;
}

/* ---------- เพลงประกอบ ---------- */
function setupMusic() {
  const cfg = CONFIG.music;
  if (!cfg.src) return;

  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  audio.src = cfg.src;
  btn.hidden = false;

  let playing = false;
  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      btn.classList.remove("playing");
    } else {
      audio.play().catch(() => {});
      btn.classList.add("playing");
    }
    playing = !playing;
  });
}

/* ---------- Lightbox ---------- */
function setupLightbox() {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");

  document.getElementById("galleryGrid").addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    img.src = item.dataset.src;
    cap.textContent = item.dataset.cap || "";
    lb.hidden = false;
  });

  const close = () => (lb.hidden = true);
  document.getElementById("lightboxClose").addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ---------- หัวใจลอย ---------- */
function spawnHearts() {
  const bg = document.getElementById("heartsBg");
  const emojis = ["💖", "💕", "💗", "🩷", "❤️"];
  setInterval(() => {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
    h.style.animationDuration = 6 + Math.random() * 6 + "s";
    bg.appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }, 700);
}

/* ---------- utils ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}
