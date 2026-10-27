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
    heading: "🤍 24 เรื่องที่ป๊าอยากบอกมี๊",
    subheading: "แตะหัวใจบนช่อดอกไม้ เพื่อเปิดอ่านทีละเรื่อง 💐",
    // โหมดช่อภาพ: ใส่รูปช่อสำเร็จ 1 รูป แล้ววางจุดหัวใจทับตามจำนวนข้อความ
    bouquetImage: "images/bouquet.png",
    // รูปดอกเดี่ยว (ใช้เฉพาะโหมดสวน ถ้าไม่ได้ตั้ง bouquetImage)
    flowerImage: "images/tulip.png",
    flowers: [
      { title: "กลิ่นของมี๊", text: "ป๊าชอบกลิ่นตัวมี๊นะ ไม่รู้เหมือนกันว่าทำไม แต่ชอบดมอยู่ได้ 🤭" },
      { title: "เสียงของมี๊", text: "มี๊ชอบตะคอก ชอบเสียงดัง ป๊าก็ไม่รู้ว่าต้องกลัวหรือชินดี แต่ก็ยังรักมี๊อยู่ดี 555" },
      { title: "หน้าที่ประจำของป๊า", text: "เวลากินข้าวเสร็จ หน้าที่ป๊าคือหยิบน้ำให้มี๊ใช่ไหม 😂 เหมือนเป็นหน้าที่ประจำตำแหน่งที่ไม่มีวันลา" },
      { title: "ผู้เชี่ยวชาญด้านการหายตัว", text: "ป๊าว่าป๊าเริ่มจับทางมี๊ได้แล้วนะ โดยเฉพาะเวลากินข้าวเสร็จแล้วอยู่ ๆ ก็หายตัวไป… อ๋อ ไม่อยากล้างจานนี่เอง! 555" },
      { title: "เรื่องที่ป๊าต้องคอยเตือน", text: "มี๊ไม่ค่อยอยากอาบน้ำ ไม่ค่อยอยากแปรงฟัน แต่ชอบกินลูกอมมาก ป๊านี่มีเรื่องให้ดูแลทุกวันจริง ๆ นะ 😂" },
      { title: "เรื่องกินยาของมี๊", text: "ป๊าอาจจะบ่นมี๊บ้างที่ต้องคอยเรียกกินยาทุกวัน แต่ถ้าวันไหนไม่ได้เรียก ป๊าก็คงเป็นห่วงอยู่ดีแหละ" },
      { title: "ความเก่งของมี๊", text: "ป๊าชอบเวลามี๊ตั้งใจทำงาน ตั้งใจเรียน มี๊เก่งมากนะ ถึงบางทีจะดื้อจนป๊าอยากจะบ้าก็เถอะ แต่ป๊าภูมิใจในตัวมี๊จริง ๆ" },
      { title: "คนสวยของป๊า", text: "มี๊สวยมากนะ ในสายตาป๊า ไม่ได้สวยแค่ตอนแต่งตัวสวย ๆ แต่เป็นมี๊คนเดิมที่ป๊ามองกี่ครั้งก็ยังรู้สึกว่าสวยอยู่ดี ❤️" },
      { title: "แขนของป๊า", text: "ป๊าชอบให้มี๊นอนหนุนแขนนะ ถึงบางทีแขนจะชาแค่ไหน ป๊าก็ไม่ค่อยอยากขยับ กลัวมี๊ตื่น 🤍" },
      { title: "ความตั้งใจของมี๊", text: "มี๊เป็นคนตั้งใจทำงาน ตั้งใจเรียน และเอาจริงเอาจังกับสิ่งที่ทำมาก ป๊าเห็นนะ และป๊าก็ชื่นชมมี๊มากจริง ๆ" },
      { title: "ความดื้อที่คุ้นเคย", text: "บางทีมี๊ก็ดื้อมากจนป๊าไม่รู้จะพูดยังไง แต่สุดท้ายป๊าก็ยังอยากอยู่ข้าง ๆ มี๊อยู่ดีนั่นแหละ 555" },
      { title: "แค่มี๊อยู่ตรงนี้", text: "ป๊าชอบเวลามี๊อยู่ใกล้ ๆ นะ ไม่จำเป็นต้องทำอะไรด้วยกันตลอดก็ได้ แค่มี๊อยู่ตรงนั้น ป๊าก็รู้สึกดีแล้ว" },
      { title: "ความเป็นห่วง", text: "ป๊าอาจจะบ่นมี๊บ่อย แต่เรื่องที่มี๊ไม่สบายหรือมีอะไรให้ต้องเป็นห่วง ป๊าไม่เคยอยากปล่อยผ่านเลยนะ" },
      { title: "ป๊าจำมี๊ได้เยอะนะ", text: "มี๊รู้ไหม บางทีป๊าก็จำเรื่องเล็ก ๆ ของมี๊ได้เยอะกว่าที่มี๊คิดอีกนะ โดยเฉพาะเรื่องที่มี๊ชอบทำซ้ำ ๆ ทุกวัน 555" },
      { title: "เวลามี๊เล่าเรื่องต่าง ๆ", text: "ป๊าชอบเวลามี๊เล่าเรื่องที่มี๊สนใจให้ฟังนะ ถึงบางทีจะมีรายละเอียดเยอะจนป๊าต้องตั้งใจฟังเป็นพิเศษก็เถอะ 🤭" },
      { title: "วันที่มี๊เหนื่อย", text: "มี๊ไม่จำเป็นต้องเก่งไปทุกเรื่องหรอกนะ วันไหนเหนื่อย วันไหนไม่ไหว มี๊พักบ้างก็ได้ ไม่ต้องเก่งตลอดเวลาก็ได้ ป๊าอยากให้มี๊ดูแลตัวเองด้วยนะ" },
      { title: "อีกมุมของมี๊", text: "ถึงมี๊จะเสียงดังและดื้อในบางที แต่ป๊าก็เห็นความอ่อนโยนในตัวมี๊เหมือนกันนะ และป๊าก็ชอบที่ได้รู้จักมี๊ในหลาย ๆ มุมแบบนี้" },
      { title: "มี๊ในแบบของมี๊", text: "ป๊าชอบที่มี๊เป็นมี๊นี่แหละ ไม่ต้องพยายามเป็นคนอื่น ไม่ต้องทำตัวให้น่ารักตลอดเวลา เพราะป๊าก็รักมี๊ในวันที่มี๊เป็นตัวเองที่สุด" },
      { title: "เวลาที่เราไม่เข้าใจกัน", text: "บางวันเราอาจจะมีเรื่องให้ไม่เข้าใจกันบ้าง แต่ป๊าก็ยังอยากคุย อยากปรับความเข้าใจ และอยากหาทางไปต่อด้วยกันนะ" },
      { title: "สิ่งที่ป๊าอยากทำให้มี๊", text: "ป๊าอาจจะดูแลมี๊ได้ไม่เก่งทุกเรื่อง แต่ถ้าเป็นเรื่องที่ป๊าทำให้มี๊ได้ ป๊าก็อยากทำให้มี๊อยู่ดี ไม่ใช่เพราะต้องทำ แต่เพราะป๊าอยากดูแลมี๊จริง ๆ" },
      { title: "ความสุขธรรมดา ๆ", text: "ป๊าชอบเวลาที่ได้ใช้ชีวิตธรรมดา ๆ กับมี๊นะ กินข้าวด้วยกัน อยู่ด้วยกัน ทำเรื่องเดิม ๆ ด้วยกัน แค่นี้ก็เป็นช่วงเวลาที่ป๊ามีความสุขแล้ว" },
      { title: "อนาคตของเรา", text: "ป๊าไม่รู้หรอกว่าอนาคตจะมีอะไรบ้าง แต่ป๊าอยากให้เราค่อย ๆ เรียนรู้กันไป ดูแลกันไป และช่วยกันทำให้ความรักของเราดีขึ้นเรื่อย ๆ นะมี๊" },
      { title: "ครอบครัวของเรา", text: "ป๊าชอบที่มี๊รักและคอยดูแลครอบครัวของมี๊ ทั้งพ่อ แม่ และน้อง รวมถึงรักแม่และครอบครัวของป๊าด้วยนะ ป๊าดีใจที่มี๊รักและใส่ใจคนที่สำคัญกับป๊าเหมือนกัน ต่อจากนี้เรามาช่วยกันดูแลครอบครัวของเรานะมี๊ ไม่ว่าจะเป็นครอบครัวของป๊าหรือของมี๊ ป๊าอยากให้เราคอยดูแลและอยู่ข้าง ๆ ทุกคนไปด้วยกัน เพราะคนที่เรารักก็คือครอบครัวของเรา ❤️" },
      { title: "เหตุผลที่ป๊ายังเลือกมี๊", text: "สุดท้ายแล้ว ป๊าก็ยังชอบมี๊ที่สุดอยู่ดี ทั้งกลิ่นตัว เสียงดัง ความดื้อ ความเก่ง และความสวยของมี๊นั่นแหละ ป๊าไม่ได้รักแค่บางมุมของมี๊นะ ป๊ารักมี๊ทั้งคน และป๊าก็อยากมีมี๊อยู่ในทุก ๆ วันต่อจากนี้ไปนาน ๆ ❤️" },
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
