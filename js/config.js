/* =====================================================================
 *  ★ แก้ข้อมูลทั้งหมดของคุณที่ไฟล์นี้ที่เดียว ★
 *  เปลี่ยนชื่อ, วันที่, รูปภาพ, ไทม์ไลน์, จดหมาย และเพลงได้เลย
 * ===================================================================== */

const CONFIG = {
  /* ---------- ข้อมูลคู่รัก ---------- */
  couple: {
    name1: "Kittaya",       // ชื่อคนที่ 1
    name2: "Thanida",       // ชื่อคนที่ 2
    // วันที่เริ่มคบกัน (ปี, เดือน, วัน) — เดือนเริ่มที่ 1 = มกราคม
    startDate: { year: 2024, month: 11, day: 24 },
  },

  /* ---------- ข้อความบนหัวเว็บ ---------- */
  hero: {
    title: "Two Years of Us",
    subtitle: "Kittaya ❤️ Thanida · 24 · XI · MMXXVI",
    // รูปคู่บนหัวเว็บ — ใส่ path เช่น "images/couple.png" หรือเว้นว่าง "" ถ้าไม่ต้องการ
    photo: "images/couple.png",
  },

  /* ---------- หน้า intro (คลิกเพื่อเปิด) ---------- */
  intro: {
    title: "Two Years of Us",
    subtitle: "คลิกเพื่อเปิดของขวัญของเรา 💝",
    buttonText: "เปิด 💕",
    // ไอคอนกลางหน้า intro — ใส่เป็นอีโมจิ เช่น "🐱" "🎁"
    icon: "🐱",
    // หรือใส่รูปแทนอีโมจิ เช่น "images/cat.png" (ถ้าตั้งค่านี้ จะใช้รูปแทน icon)
    iconImage: "images/cat.png",
  },

  /* ---------- ภาพพื้นหลัง ----------
   * ใส่ path รูปในโฟลเดอร์ images/ หรือ URL รูป
   * เว้นว่าง "" ถ้าไม่ต้องการภาพพื้นหลัง
   */
  background: {
    image: "images/logo.png",
    opacity: 0.22,   // ความเข้มของภาพพื้นหลัง (0 = จาง, 1 = เต็ม)
  },

  /* ---------- จดหมายรัก 💌 ---------- */
  letter: {
    title: "Two Years of Us",
    // ใช้ \n เพื่อขึ้นบรรทัดใหม่ แต่ละย่อหน้าคั่นด้วยคอมมา
    paragraphs: [
      "To love someone is not simply to want them in your life,",
      "but to want to become someone worthy of being in theirs.",
    ],
    signature: "24 · XI · MMXXVI",
  },

  /* ---------- เหตุผลที่รัก 💝 ----------
   * style: "prose" = แสดงเป็นจดหมายยาวต่อเนื่อง (ใช้ paragraphs)
   *        "cards" = แสดงเป็นการ์ดพลิกได้ (ใช้ items: [{title, text}])
   */
  reasons: {
    style: "prose",
    heading: "Reasons Why I Love You 💝",
    subheading: "",
    // ข้อความจดหมายยาว — แต่ละย่อหน้าคั่นด้วยคอมมา
    // ใส่ "**...**" รอบประโยคที่ต้องการเน้น (จะกลายเป็นตัวหนาสีชมพู)
    paragraphs: [
      "I love you for who you are, not just for the person you show the world, but also for the person you are when no one is watching.",
      "I love the way you think, the way you care, the way you carry your responsibilities, and the strength you show even on days when life feels heavy.",
      "I love you not because you are perfect, but because you are human. You have your own fears, flaws, struggles, and moments of uncertainty. And I want you to know that you don't have to be strong all the time to be loved by me.",
      "I love the little things about you, the moments we share, the conversations that stay with me, and even the ordinary days that become meaningful simply because I get to spend them with you.",
      "I love you because being with you has taught me that love is more than a feeling. It is patience, understanding, honesty, forgiveness, and the willingness to keep learning how to love each other better.",
      "And perhaps, one of the biggest reasons I love you is this: I want to be someone who makes your life a little lighter, your difficult days a little easier, and your happiest moments even more beautiful.",
      "I cannot promise that I will always get everything right. But I can promise that I want to keep growing, keep understanding you, and keep becoming someone who loves you in the ways you deserve to be loved.",
      "**I love you not only for who you are, but also for who I become when I choose to love you.**",
      "And after two years, through all the beautiful moments and the lessons we have learned, my heart still finds reasons to choose you.",
    ],
    // ใช้เมื่อ style = "cards"
    items: [],
  },

  /* ---------- แกลเลอรีรูปภาพ 🖼️ ----------
   * ใส่ลิงก์รูป (URL) หรือ path รูปในโฟลเดอร์ images/
   * caption = คำบรรยายใต้รูป (จะไม่ใส่ก็ได้)
   */
  gallery: [
    { src: "https://picsum.photos/seed/love1/600/400", caption: "ครั้งแรกที่เจอกัน" },
    { src: "https://picsum.photos/seed/love2/600/400", caption: "ทริปแรกด้วยกัน" },
    { src: "https://picsum.photos/seed/love3/600/400", caption: "วันเกิดปีนั้น" },
    { src: "https://picsum.photos/seed/love4/600/400", caption: "ปีใหม่ที่อบอุ่น" },
    { src: "https://picsum.photos/seed/love5/600/400", caption: "มื้อเย็นสุดพิเศษ" },
    { src: "https://picsum.photos/seed/love6/600/400", caption: "ช่วงเวลาสบาย ๆ" },
  ],

  /* ---------- สวนดอกทิวลิป 🌷 ----------
   * heading = หัวข้อ section
   * subheading = คำอธิบายใต้หัวข้อ
   * flowers = ข้อความประจำดอกแต่ละดอก (คลิกดอกเพื่อเปิดอ่าน)
   *   title = หัวข้อสั้น ๆ, text = ข้อความ/ความทรงจำ
   * ใส่กี่ดอกก็ได้ — ดอกจะเรียงในสวนอัตโนมัติ
   */
  garden: {
    heading: "🌷 สวนดอกไม้ของเรา",
    subheading: "แตะดอกทิวลิปแต่ละดอก เพื่อเปิดอ่านความทรงจำ 💐",
    flowers: [
      { title: "วันที่เราเริ่มต้น", text: "24 พฤศจิกายน 2024 วันที่เราตกลงเดินไปด้วยกัน ตอนนั้นยังไม่รู้เลยว่าจะมาไกลได้ขนาดนี้" },
      { title: "เรื่องเล็ก ๆ ในทุกวัน", text: "แค่ได้กินข้าวด้วยกัน คุยเรื่อยเปื่อยก่อนนอน หรือเถียงกันว่าจะดูหนังเรื่องไหนดี ก็มีความสุขแล้ว" },
      { title: "น้องอันยอง", text: "ตั้งแต่มีอันยอง บ้านก็อบอุ่นขึ้นเยอะ เป็นเหมือนลูกตัวน้อยที่เราดูแลด้วยกัน 🐱" },
      { title: "วันที่เหนื่อย", text: "มีหลายวันที่ต่างคนต่างเหนื่อย แต่พอได้เจอหน้ากัน ความเหนื่อยก็เบาลงไปเยอะ" },
      { title: "เวลาที่งอน", text: "ถึงจะมีงอนกันบ้าง ผิดใจกันบ้าง แต่สุดท้ายก็คุยกันจนเข้าใจ แล้วก็กลับมาดีเหมือนเดิม" },
      { title: "สิ่งที่ชอบในตัวเธอ", text: "ชอบที่เธอเป็นคนตั้งใจ รับผิดชอบ และยังอ่อนโยนกับคนรอบตัวเสมอ" },
      { title: "ความตั้งใจของเรา", text: "ไม่ได้อยากให้ทุกอย่างสมบูรณ์แบบ แค่อยากค่อย ๆ เรียนรู้ที่จะรักกันให้ดีขึ้นในทุก ๆ วัน" },
      { title: "สองปีของเรา", text: "ผ่านมาสองปี มีทั้งวันที่หัวเราะและวันที่ร้องไห้ แต่ดีใจที่ผ่านมันมาด้วยกัน และยังเลือกกันอยู่เสมอ ❤️" },
    ],
  },

  /* ---------- เพลงประกอบ 🎵 ----------
   * ใส่ไฟล์เพลงในโฟลเดอร์ music/ แล้วใส่ชื่อไฟล์ หรือใส่ URL เพลงก็ได้
   * ตั้ง src เป็น "" (ค่าว่าง) ถ้าไม่ต้องการเพลง
   */
  music: {
    // ใส่ไฟล์เพลง (mp3) ไว้ในโฟลเดอร์ music/ แล้วใส่ชื่อไฟล์ที่นี่ หรือเว้นว่าง ""
    src: "",
    // หรือใส่ YouTube video ID เพื่อเล่นเพลงจาก YouTube (ถ้าตั้งค่านี้ จะใช้ YouTube แทน src)
    youtubeId: "UgrXNEpKQo4",
    title: "เพลงของเรา",
  },
};
