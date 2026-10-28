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
  renderGarden();
  renderReasons();
  renderGallery();
  renderLetter();
  setupMusic();
  setupLightbox();
  spawnHearts();
  setupIntro();
  setupCatPeek();
});

/* ---------- น้องอันยองโผล่มาทัก ---------- */
function setupCatPeek() {
  const cfg = CONFIG.catPeek;
  if (!cfg || !cfg.enabled || !cfg.messages || !cfg.messages.length) return;

  const peek = document.getElementById("catPeek");
  const img = document.getElementById("catPeekImg");
  const bubble = document.getElementById("catBubble");
  img.src = cfg.image || "images/cat.png";

  let hideTimer = null;

  const showCat = () => {
    const msg = cfg.messages[Math.floor(Math.random() * cfg.messages.length)];
    bubble.textContent = msg;
    // สลับออกฝั่งซ้าย/ขวาสุ่ม
    peek.classList.toggle("left", Math.random() < 0.5);
    peek.classList.add("show");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideCat, 6000);
  };
  const hideCat = () => peek.classList.remove("show");

  // คลิกน้อง → เปลี่ยนคำพูด + หัวใจเด้ง
  peek.addEventListener("click", () => {
    bubble.textContent = cfg.messages[Math.floor(Math.random() * cfg.messages.length)];
    popHeart(peek);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideCat, 6000);
  });

  // โผล่ครั้งแรกหลังเข้าเว็บ ~8 วิ แล้ววนทุก ~28-40 วิ
  const loop = () => {
    showCat();
    setTimeout(loop, 28000 + Math.random() * 12000);
  };
  setTimeout(loop, 8000);
}

function popHeart(parent) {
  const h = document.createElement("span");
  h.className = "cat-pop-heart";
  h.textContent = "💗";
  parent.appendChild(h);
  setTimeout(() => h.remove(), 1000);
}

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

  // รูปคู่บนหัวเว็บ (ถ้ามี)
  if (CONFIG.hero.photo) {
    const wrap = document.getElementById("heroPhotoWrap");
    document.getElementById("heroPhoto").src = CONFIG.hero.photo;
    wrap.hidden = false;
  }
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

/* ---------- โหมดช่อภาพ: จุดหัวใจทับบนรูปช่อ ---------- */
// พิกัดจุดหัวใจ (% ของกรอบภาพ) วางกระจายบนบริเวณดอกทิวลิปของรูปช่อ
// ครอบคลุมได้ถึง 24 จุด — ถ้าข้อความน้อยกว่า จะใช้เท่าที่มี
const BOUQUET_SPOTS = [
  {x:44,y:17},{x:57,y:18},{x:36,y:22},{x:50,y:24},{x:64,y:23},
  {x:29,y:28},{x:43,y:29},{x:57,y:30},{x:71,y:29},{x:24,y:35},
  {x:37,y:35},{x:50,y:36},{x:63,y:36},{x:76,y:35},{x:30,y:42},
  {x:43,y:42},{x:57,y:43},{x:70,y:42},{x:36,y:49},{x:50,y:49},
  {x:64,y:49},{x:43,y:55},{x:57,y:55},{x:50,y:60},
];

function renderBouquetPhoto(cfg, field, section) {
  if (cfg.heading) document.getElementById("gardenHeading").textContent = cfg.heading;
  document.getElementById("gardenSub").textContent = cfg.subheading || "";

  const spots = cfg.flowers
    .map((f, i) => {
      const p = BOUQUET_SPOTS[i] || BOUQUET_SPOTS[BOUQUET_SPOTS.length - 1];
      return `
      <button class="bq-spot" style="left:${p.x}%;top:${p.y}%;--delay:${(i * 0.08).toFixed(2)}s"
              data-title="${escapeAttr(f.title || "")}" data-text="${escapeAttr(f.text || "")}"
              aria-label="${escapeAttr(f.title || "เรื่องเล่า")}">
        <span class="bq-spot-heart">🤍</span>
      </button>`;
    })
    .join("");

  // ประกายกลิตเตอร์/ดาวจาง ๆ กระจายทั่วพื้นหลัง
  let glitter = "";
  const sparkleChars = ["✦", "✧", "⋆", "·", "✫"];
  for (let i = 0; i < 40; i++) {
    const x = (Math.random() * 100).toFixed(1);
    const y = (Math.random() * 100).toFixed(1);
    const size = (0.5 + Math.random() * 1).toFixed(2);
    const delay = (Math.random() * 4).toFixed(2);
    const dur = (2.5 + Math.random() * 2.5).toFixed(2);
    const ch = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    glitter += `<span class="glitter" style="left:${x}%;top:${y}%;font-size:${size}rem;animation-delay:${delay}s;animation-duration:${dur}s">${ch}</span>`;
  }

  field.innerHTML = `
    <div class="garden-glitter" aria-hidden="true">${glitter}</div>
    <div class="bq-photo">
      <img class="bq-photo-img" src="${escapeAttr(cfg.bouquetImage)}" alt="ช่อดอกทิวลิป" />
      <div class="bq-spots">${spots}</div>
    </div>`;

  // คลิกจุด → popup
  const popup = document.getElementById("flowerPopup");
  const pTitle = document.getElementById("flowerPopupTitle");
  const pText = document.getElementById("flowerPopupText");

  field.querySelectorAll(".bq-spot").forEach((spot) => {
    spot.addEventListener("click", (e) => {
      e.stopPropagation();
      pTitle.textContent = spot.dataset.title;
      pText.textContent = spot.dataset.text;
      popup.hidden = false;
      field.querySelectorAll(".bq-spot").forEach((s) => s.classList.remove("active"));
      spot.classList.add("active");
    });
  });

  const closePopup = () => {
    popup.hidden = true;
    field.querySelectorAll(".bq-spot").forEach((s) => s.classList.remove("active"));
  };
  document.getElementById("flowerPopupClose").addEventListener("click", closePopup);
  section.addEventListener("click", (e) => {
    if (e.target.id === "garden" || e.target.id === "gardenField") closePopup();
  });
}

/* ---------- สวนดอกทิวลิป (Blooming Garden) ---------- */
function renderGarden() {
  const cfg = CONFIG.garden;
  const section = document.getElementById("garden");
  if (!cfg || !cfg.flowers || !cfg.flowers.length) {
    if (section) section.style.display = "none";
    return;
  }

  if (cfg.heading) document.getElementById("gardenHeading").textContent = cfg.heading;
  document.getElementById("gardenSub").textContent = cfg.subheading || "";

  const field = document.getElementById("gardenField");

  // ===== โหมดช่อภาพ: รูปช่อ 1 รูป + จุดหัวใจทับตามจำนวนข้อความ =====
  if (cfg.bouquetImage) {
    renderBouquetPhoto(cfg, field, section);
    return;
  }

  const useImage = !!cfg.flowerImage;
  const tulipColors = ["t-pink", "t-rose", "t-purple", "t-peach", "t-red"];

  const n = cfg.flowers.length;
  const mid = (n - 1) / 2; // ดัชนีกลาง

  const flowersHtml = cfg.flowers
    .map((f, i) => {
      const attrs = `data-title="${escapeAttr(f.title || "")}" data-text="${escapeAttr(f.text || "")}" aria-label="${escapeAttr(f.title || "ดอกไม้")}"`;
      const offset = i - mid;                  // ระยะจากกลาง (- ซ้าย, + ขวา)
      const dist = Math.abs(offset);           // ห่างจากกลางเท่าไหร่

      // จัดแบบช่อจริง: กลางสูง+หลัง, ริมเตี้ย+เอียงออก+หน้า
      const angle = (offset * 14).toFixed(1);               // เอียงออกด้านข้าง
      const liftY = (dist * dist * 9).toFixed(0);           // ดอกยิ่งริมยิ่งเตี้ยลง (ลงมา)
      const shiftX = (offset * 22).toFixed(0);              // ขยับออกข้างเป็นวงพัดแคบ
      const scale = (1 - dist * 0.05).toFixed(2);           // ริม ๆ เล็กลงนิด (perspective)
      const z = Math.round(10 - dist);                      // กลางอยู่หลัง ริมอยู่หน้า
      const styleVars = `--angle:${angle}deg; --x:${shiftX}px; --y:${liftY}px; --s:${scale}; --delay:${(i*0.1).toFixed(2)}s; z-index:${z}`;

      if (useImage) {
        return `
      <button class="bq-flower tulip-img" style="${styleVars}" ${attrs}>
        <img src="${escapeAttr(cfg.flowerImage)}" alt="${escapeAttr(f.title || "ดอกไม้")}" />
      </button>`;
      }

      const color = tulipColors[i % tulipColors.length];
      return `
      <button class="bq-flower tulip ${color}" style="${styleVars}" ${attrs}>
        <span class="tulip-bloom">
          <span class="petal petal-l"></span>
          <span class="petal petal-c"></span>
          <span class="petal petal-r"></span>
        </span>
      </button>`;
    })
    .join("");

  // ห่อเป็นช่อ + กระดาษห่อ + โบว์
  field.innerHTML = `
    <div class="bouquet">
      <div class="bq-flowers">${flowersHtml}</div>
      <div class="bq-wrap"></div>
      <div class="bq-ribbon">🎀</div>
    </div>`;

  // คลิกดอก → popup
  const popup = document.getElementById("flowerPopup");
  const pTitle = document.getElementById("flowerPopupTitle");
  const pText = document.getElementById("flowerPopupText");

  field.querySelectorAll(".bq-flower").forEach((flower) => {
    flower.addEventListener("click", (e) => {
      e.stopPropagation();
      pTitle.textContent = flower.dataset.title;
      pText.textContent = flower.dataset.text;
      popup.hidden = false;
      field.querySelectorAll(".bq-flower").forEach((f) => f.classList.remove("active"));
      flower.classList.add("active");
    });
  });

  const closePopup = () => {
    popup.hidden = true;
    field.querySelectorAll(".bq-flower").forEach((f) => f.classList.remove("active"));
  };
  document.getElementById("flowerPopupClose").addEventListener("click", closePopup);
  section.addEventListener("click", (e) => {
    if (e.target.id === "garden" || e.target.id === "gardenField") closePopup();
  });
}

/* ---------- เหตุผลที่รัก ---------- */
function renderReasons() {
  const cfg = CONFIG.reasons;
  const section = document.getElementById("reasons");
  const grid = document.getElementById("reasonsGrid");

  const hasEnvelope = cfg && cfg.style === "envelope" && cfg.paragraphs && cfg.paragraphs.length;
  const hasProse = cfg && cfg.style === "prose" && cfg.paragraphs && cfg.paragraphs.length;
  const hasCards = cfg && cfg.items && cfg.items.length;

  if (!cfg || (!hasEnvelope && !hasProse && !hasCards)) {
    if (section) section.style.display = "none";
    return;
  }

  if (cfg.heading) document.getElementById("reasonsHeading").textContent = cfg.heading;
  document.getElementById("reasonsSub").textContent = cfg.subheading || "";

  // โหมดซองจดหมาย (envelope) — กดเปิดอ่าน
  if (hasEnvelope) {
    grid.className = "reasons-envelope";
    grid.innerHTML = `
      <button class="envelope" id="envelopeBtn" aria-label="เปิดอ่านจดหมาย">
        <span class="env-flap"></span>
        <span class="env-body">
          <span class="env-heart">💗</span>
          <span class="env-label">${escapeHtml(cfg.envelopeLabel || "เปิดอ่านจดหมาย")}</span>
        </span>
        <span class="env-hint">แตะเพื่อเปิด 💌</span>
      </button>`;

    // เตรียมเนื้อหาจดหมายเต็มจอ
    document.getElementById("letterPaperTitle").textContent = cfg.letterTitle || "";
    document.getElementById("letterPaperBody").innerHTML = cfg.paragraphs
      .map((p) => `<p>${formatEmphasis(p)}</p>`)
      .join("");
    document.getElementById("letterPaperSign").textContent = cfg.signature || "";

    const overlay = document.getElementById("letterOverlay");
    const paper = document.getElementById("letterPaper");
    const openLetter = () => {
      overlay.hidden = false;
      document.body.classList.add("intro-locked");
      paper.scrollTop = 0;
    };
    const closeLetter = () => {
      overlay.hidden = true;
      document.body.classList.remove("intro-locked");
    };
    document.getElementById("envelopeBtn").addEventListener("click", openLetter);
    document.getElementById("letterOverlayClose").addEventListener("click", closeLetter);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeLetter(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) closeLetter(); });
    return;
  }

  // โหมดจดหมายยาว (prose)
  if (hasProse) {
    grid.className = "reasons-prose";
    grid.innerHTML = cfg.paragraphs
      .map((p) => `<p>${formatEmphasis(p)}</p>`)
      .join("");
    return;
  }

  // โหมดการ์ดพลิก (cards)
  grid.className = "reasons-grid";
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
  // threshold ต่ำ + rootMargin ติดลบ เพื่อให้เริ่มพิมพ์ทันทีที่การ์ดโผล่เข้ามา
  // (สำคัญบนจอมือถือที่การ์ดอาจสูงกว่าจอ ทำให้เห็นไม่ถึง 40% พร้อมกัน)
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      startLetterTyping();
      io.disconnect();
    }
  }, { threshold: 0.1, rootMargin: "0px 0px -15% 0px" });
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
let ytWantPlay = false; // จำว่าผู้ใช้กดอยากเล่นตอน API ยังไม่พร้อม

function setupYouTubeMusic(videoId, btn) {
  // โหลดสคริปต์ YouTube IFrame API (กันโหลดซ้ำ)
  if (!document.getElementById("yt-iframe-api")) {
    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  const markPlaying = () => { btn.classList.add("playing"); ytPlaying = true; };

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("ytPlayer", {
      height: "0",
      width: "0",
      videoId: videoId,
      playerVars: { autoplay: 0, loop: 1, playlist: videoId, playsinline: 1 },
      events: {
        onReady: () => {
          ytReady = true;
          // ถ้าผู้ใช้กด "เปิด" ไปแล้วตอน API ยังไม่พร้อม → เล่นทันทีตอนนี้
          if (ytWantPlay) { ytPlayer.playVideo(); markPlaying(); }
        },
        // sync สถานะปุ่มกับสถานะจริงของ player
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) { btn.classList.add("playing"); ytPlaying = true; }
          else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) { btn.classList.remove("playing"); ytPlaying = false; }
        },
      },
    });
  };

  const playYt = () => {
    if (ytReady && ytPlayer) { ytPlayer.playVideo(); markPlaying(); }
    else { ytWantPlay = true; }  // ยังไม่พร้อม → จำไว้ เดี๋ยว onReady เล่นให้
  };
  const pauseYt = () => {
    ytWantPlay = false;
    if (ytPlayer) ytPlayer.pauseVideo();
    btn.classList.remove("playing"); ytPlaying = false;
  };
  startMusicFn = playYt; // ให้ปุ่ม intro เริ่มเพลงได้ (ได้ผลบนคอม)

  btn.addEventListener("click", () => (ytPlaying ? pauseYt() : playYt()));

  // บนมือถือ iOS/Safari บล็อกการเล่นจากโค้ด — ต้องให้ผู้ใช้แตะตัว player เอง
  // จึงวาง iframe YouTube จริงซ้อนบนปุ่ม 🎵 (โปร่งใส) ให้การแตะไปโดนตัว player โดยตรง
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (isMobile) document.body.classList.add("yt-mobile");
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
// escape HTML ก่อน แล้วค่อยแปลง **...** เป็นตัวเน้น (ปลอดภัยจาก HTML injection)
function formatEmphasis(str) {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, '<strong class="reason-em">$1</strong>');
}
