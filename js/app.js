/* =====================================================================
 *  app.js — ตรรกะการทำงานทั้งหมด (ไม่ต้องแก้ไฟล์นี้ก็ได้)
 *  อ่านข้อมูลจาก CONFIG ใน config.js
 * ===================================================================== */

// ฟังก์ชันเริ่มเล่นเพลง (ตั้งค่าโดย setupMusic) ให้ปุ่ม intro เรียกได้
let startMusicFn = null;

document.addEventListener("DOMContentLoaded", () => {
  renderBackground();
  renderHero();
  renderCounter();
  startCountdown();
  renderTimeline();
  renderReasons();
  renderGallery();
  renderLetter();
  setupMusic();
  setupLightbox();
  spawnHearts();
  setupIntro();
});

/* ---------- หน้า intro "คลิกเพื่อเปิด" ---------- */
function setupIntro() {
  const intro = document.getElementById("intro");
  const btn = document.getElementById("introBtn");
  const gift = document.getElementById("introGift");
  const cfg = CONFIG.intro || {};

  if (cfg.title) document.getElementById("introTitle").textContent = cfg.title;
  if (cfg.subtitle) document.getElementById("introSub").textContent = cfg.subtitle;
  if (cfg.buttonText) btn.textContent = cfg.buttonText;

  // ไอคอนกลางหน้า intro: ใช้รูปถ้ามี ไม่งั้นใช้อีโมจิ
  if (cfg.iconImage) {
    gift.innerHTML = `<img src="${cfg.iconImage}" alt="intro" class="intro-gift-img" />`;
  } else if (cfg.icon) {
    gift.textContent = cfg.icon;
  }

  const open = () => {
    if (intro.classList.contains("opening")) return;
    intro.classList.add("opening");
    gift.classList.add("pop");
    // เริ่มเพลงทันที (ผู้ใช้กดคลิกแล้ว เบราว์เซอร์จึงอนุญาต)
    if (typeof startMusicFn === "function") startMusicFn();
    // เริ่มเอฟเฟกต์พิมพ์ดีดที่คำคม
    startLetterTyping();
    setTimeout(() => {
      intro.style.display = "none";
      document.body.classList.remove("intro-locked");
    }, 900);
  };

  document.body.classList.add("intro-locked");
  btn.addEventListener("click", open);
  gift.addEventListener("click", open);
}

/* ---------- ภาพพื้นหลัง ---------- */
function renderBackground() {
  const cfg = CONFIG.background;
  if (!cfg || !cfg.image) return;
  const el = document.getElementById("bgImage");
  el.style.backgroundImage = `url("${cfg.image}")`;
  el.style.opacity = cfg.opacity != null ? cfg.opacity : 0.12;
}

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

/* ---------- เหตุผลที่รัก (การ์ดพลิกได้) ---------- */
function renderReasons() {
  const cfg = CONFIG.reasons;
  const section = document.getElementById("reasons");
  if (!cfg || !cfg.items || !cfg.items.length) {
    if (section) section.style.display = "none";
    return;
  }

  if (cfg.heading) document.getElementById("reasonsHeading").textContent = cfg.heading;
  document.getElementById("reasonsSub").textContent = cfg.subheading || "";

  const grid = document.getElementById("reasonsGrid");
  grid.innerHTML = cfg.items
    .map(
      (r, i) => `
      <div class="reason-card" style="animation-delay:${i * 0.07}s" tabindex="0" role="button" aria-label="เปิดอ่านเหตุผล">
        <div class="reason-inner">
          <div class="reason-front">
            <span class="reason-no">${i + 1}</span>
            <span class="reason-title">${escapeHtml(r.title || "เหตุผลที่รัก")}</span>
            <span class="reason-hint">คลิกเพื่อเปิด 💗</span>
          </div>
          <div class="reason-back">
            <p>${escapeHtml(r.text || "")}</p>
          </div>
        </div>
      </div>`
    )
    .join("");

  grid.querySelectorAll(".reason-card").forEach((card) => {
    const toggle = () => card.classList.toggle("flipped");
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });
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
  // สร้างย่อหน้าว่างไว้ก่อน แล้วค่อยพิมพ์ทีละตัวด้วย startLetterTyping()
  document.getElementById("letterBody").innerHTML = CONFIG.letter.paragraphs
    .map(() => `<p class="type-line"></p>`)
    .join("");
  document.getElementById("letterSign").textContent = CONFIG.letter.signature;

  // เผื่อกรณีผู้ใช้เลื่อนมาถึงจดหมายโดยไม่ผ่านปุ่ม intro → เริ่มพิมพ์เมื่อมองเห็น
  const letterSec = document.getElementById("letter");
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      startLetterTyping();
      io.disconnect();
    }
  }, { threshold: 0.4 });
  io.observe(letterSec);
}

/* ---------- เอฟเฟกต์พิมพ์ดีดที่คำคม ---------- */
let letterTyped = false;
function startLetterTyping() {
  if (letterTyped) return;
  letterTyped = true;

  const lines = Array.from(document.querySelectorAll("#letterBody .type-line"));
  const texts = CONFIG.letter.paragraphs;
  let li = 0;

  function typeLine() {
    if (li >= lines.length) return;
    const el = lines[li];
    const text = texts[li];
    el.classList.add("typing");
    let ci = 0;
    const timer = setInterval(() => {
      el.textContent = text.slice(0, ci + 1);
      ci++;
      if (ci >= text.length) {
        clearInterval(timer);
        el.classList.remove("typing");
        li++;
        setTimeout(typeLine, 400); // หน่วงก่อนขึ้นบรรทัดถัดไป
      }
    }, 55); // ความเร็วพิมพ์ (มิลลิวินาที/ตัวอักษร)
  }
  typeLine();
}

/* ---------- เพลงประกอบ ---------- */
function setupMusic() {
  const cfg = CONFIG.music;
  const btn = document.getElementById("musicToggle");

  // กรณีที่ 1: เล่นเพลงจาก YouTube
  if (cfg.youtubeId) {
    btn.hidden = false;
    setupYouTubeMusic(cfg.youtubeId, btn);
    return;
  }

  // กรณีที่ 2: เล่นไฟล์เสียงปกติ (mp3)
  if (!cfg.src) return;
  const audio = document.getElementById("bgMusic");
  audio.src = cfg.src;
  btn.hidden = false;

  let playing = false;
  const play = () => { audio.play().catch(() => {}); btn.classList.add("playing"); playing = true; };
  const pause = () => { audio.pause(); btn.classList.remove("playing"); playing = false; };
  startMusicFn = play; // ให้ปุ่ม intro เริ่มเพลงได้
  btn.addEventListener("click", () => (playing ? pause() : play()));
}

/* ---------- เล่นเพลงจาก YouTube ผ่าน IFrame API ---------- */
let ytReady = false;
let ytPlayer = null;
let ytPlaying = false;

function setupYouTubeMusic(videoId, btn) {
  // โหลดสคริปต์ YouTube IFrame API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("ytPlayer", {
      height: "0",
      width: "0",
      videoId: videoId,
      playerVars: { autoplay: 0, loop: 1, playlist: videoId, playsinline: 1 },
      events: {
        onReady: () => { ytReady = true; },
      },
    });
  };

  const playYt = () => { if (ytReady && ytPlayer) { ytPlayer.playVideo(); btn.classList.add("playing"); ytPlaying = true; } };
  const pauseYt = () => { if (ytPlayer) { ytPlayer.pauseVideo(); btn.classList.remove("playing"); ytPlaying = false; } };
  startMusicFn = playYt; // ให้ปุ่ม intro เริ่มเพลงได้

  btn.addEventListener("click", () => (ytPlaying ? pauseYt() : playYt()));
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
