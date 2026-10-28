// ============================================================
// FOODPICKER ITF – Gacha Food (เกมสุ่มเมนูอาหารสไตล์กาชา)
// ใช้รูปจริงจากโฟลเดอร์โปรเจกต์
// ============================================================

// ตั้งค่าพื้นฐาน (แก้ไขได้ตรงนี้)
const STUDENT_ID = "69070154"; // รหัสนักศึกษา (เปลี่ยนได้ตามต้องการ)
const WEEK_LABEL = "Week 15";

// ข้อมูลเมนูอาหาร 5 รายการ (สไตล์กาชามีระดับความแรง)
// rarity: SSR = หายากมาก (สีทอง), SR = หายาก (สีฟ้า), R = ปกติ (สีเงิน)
// rate: อัตราการออก (ยิ่งมากยิ่งออกบ่อย รวมกันต้องเป็น 100)
const menus = [
  {
    name: "ผัดไทยกุ้งสด",
    desc: "เส้นจันท์ผัดซอสสูตรพิเศษ กุ้งตัวโต ไข่ และถั่วงอก โรยถั่วบดและมะนาว",
    price: "65 บาท",
    image: "images (4).jpg",
    rarity: "SSR",
    rate: 3, // 3%
  },
  {
    name: "ต้มยำกุ้งน้ำข้น",
    desc: "ต้มยำน้ำข้นรสจัดจ้าน กุ้งสด เห็ดฟาง ตะไคร้ ใบมะกรูด และพริกขี้หนู",
    price: "120 บาท",
    image: "images (3).jpg",
    rarity: "SR",
    rate: 12, // 12%
  },
  {
    name: "ส้มตำปูปลาร้า",
    desc: "ส้มตำรสแซ่บถึงเครื่อง ปูเค็ม ปลาร้าเข้มข้น มะละกอสดกรอบ",
    price: "55 บาท",
    image: "images (6).jpg",
    rarity: "SR",
    rate: 15, // 15%
  },
  {
    name: "แกงเขียวหวานไก่",
    desc: "แกงเขียวหวานหอมมันกับไก่เนื้อนุ่ม มะเขือพวง ใบโหระพา และกะทิสด",
    price: "70 บาท",
    image: "images (2).jpg",
    rarity: "R",
    rate: 35, // 35%
  },
  {
    name: "มะม่วงข้าวเหนียว",
    desc: "ข้าวเหนียวมูนกับมะม่วงสุกหวานมัน ราดกะทิหอมๆ โรยถั่วคั่วบด",
    price: "50 บาท",
    image: "images (5).jpg",
    rarity: "R",
    rate: 35, // 35%
  },
];

// ---------- องค์ประกอบ DOM ----------
document.getElementById("studentId").textContent = STUDENT_ID;
document.getElementById("weekLabel").textContent = WEEK_LABEL;

const cardWrap = document.getElementById("cardWrap");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");

const rarityBadge = document.getElementById("rarityBadge");
const gachaImage = document.getElementById("gachaImage");
const gachaName = document.getElementById("gachaName");
const gachaDesc = document.getElementById("gachaDesc");
const gachaPrice = document.getElementById("gachaPrice");

const spinBtn = document.getElementById("spinBtn");
const flashOverlay = document.getElementById("flashOverlay");

const resultPopup = document.getElementById("resultPopup");
const popupCard = document.getElementById("popupCard");
const popupRarity = document.getElementById("popupRarity");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupDesc = document.getElementById("popupDesc");
const popupPrice = document.getElementById("popupPrice");
const popupCloseBtn = document.getElementById("popupCloseBtn");

// รูปเริ่มต้นที่แสดงก่อนกดสุ่ม (หน้าแรก)
const DEFAULT_IMAGE = "thai-food-photography-feast-hero.webp";

// ตั้งค่าเริ่มต้นเมื่อโหลดหน้า
gachaImage.src = DEFAULT_IMAGE;
gachaImage.alt = "อาหารแนะนำ";
gachaName.textContent = "กดสุ่มเพื่อเปิดการ์ด";
gachaDesc.textContent = "ของรางวัลจะปรากฏที่นี่หลังจากสุ่ม";
gachaPrice.textContent = "-";
rarityBadge.textContent = "-";
rarityBadge.className = "rarity-badge";
cardFront.style.borderColor = "rgba(255, 255, 255, 0.12)";
cardFront.style.boxShadow = "0 20px 50px rgba(0,0,0,0.7)";
cardFront.classList.remove("shiny");

let isSpinning = false;

// ---------- ฟังก์ชันช่วย ----------
function getRarityColor(rarity) {
  switch (rarity) {
    case "SSR": return "#ffd700";
    case "SR": return "#7df9ff";
    case "R":
    default: return "#c7c4e0";
  }
}

function setCardRarity(rarity) {
  const color = getRarityColor(rarity);
  rarityBadge.className = `rarity-badge rarity-${rarity.toLowerCase()}`;
  rarityBadge.textContent = rarity;

  // กรอบการ์ดด้านหน้าเปลี่ยนสีตามระดับ
  cardFront.style.borderColor = color;
  cardFront.style.boxShadow = `0 0 30px ${color}40, 0 20px 50px rgba(0,0,0,0.7)`;

  // แสงวาบพิเศษเมื่อ SSR
  if (rarity === "SSR") {
    cardFront.classList.add("shiny");
  } else {
    cardFront.classList.remove("shiny");
  }
}

// ---------- ระบบสุ่มกาชา (ถ่วงน้ำหนักตาม rate) ----------
function weightedRandom() {
  const totalRate = menus.reduce((sum, m) => sum + m.rate, 0);
  let random = Math.random() * totalRate;
  for (const menu of menus) {
    if (random < menu.rate) return menu;
    random -= menu.rate;
  }
  return menus[menus.length - 1];
}

// ---------- แอนิเมชันสุ่ม ----------
function spin() {
  if (isSpinning) return;
  isSpinning = true;

  spinBtn.disabled = true;
  spinBtn.textContent = "กำลังสุ่ม…";

  // รีเซ็ตการ์ดด้านหน้าเป็นรูปเริ่มต้นก่อนหมุน (เหมือนปิดการ์ด)
  gachaImage.src = DEFAULT_IMAGE;
  gachaImage.alt = "อาหารแนะนำ";
  gachaName.textContent = "กดสุ่มเพื่อเปิดการ์ด";
  gachaDesc.textContent = "ของรางวัลจะปรากฏที่นี่หลังจากสุ่ม";
  gachaPrice.textContent = "-";
  rarityBadge.textContent = "-";
  rarityBadge.className = "rarity-badge";
  cardFront.style.borderColor = "rgba(255, 255, 255, 0.12)";
  cardFront.style.boxShadow = "0 20px 50px rgba(0,0,0,0.7)";
  cardFront.classList.remove("shiny");

  // แสดงด้านหลังการ์ด (หมุน)
  cardWrap.classList.add("flipped");

  // แสงวาบ
  flashOverlay.classList.add("active");

  // เลือกเมนูสุ่มทันที (แต่ซ่อนไว้ก่อน)
  const result = weightedRandom();

  setTimeout(() => {
    // ปิดแสงวาบ
    flashOverlay.classList.remove("active");

    // กำหนดเนื้อหาลงการ์ดด้านหน้า (มองไม่เห็นเพราะยังหันหลังอยู่)
    setCardRarity(result.rarity);
    gachaImage.src = result.image;
    gachaImage.alt = result.name;
    gachaName.textContent = result.name;
    gachaDesc.textContent = result.desc;
    gachaPrice.textContent = result.price;

    // หมุนกลับมาด้านหน้าเพื่อเผยผล
    cardWrap.classList.remove("flipped");

    // รอให้แอนิเมชันหมุนจบ แสดงผลลัพธ์แบบป๊อปอัป
    setTimeout(() => {
      showResultPopup(result);
      isSpinning = false;
      spinBtn.disabled = false;
      spinBtn.textContent = "สุ่มเมนูอาหาร (1 สุม)";
    }, 850);
  }, 700);
}

// ---------- แสดงผลลัพธ์แบบป๊อปอัป ----------
function showResultPopup(menu) {
  popupRarity.className = `popup-rarity rarity-${menu.rarity.toLowerCase()}`;
  popupRarity.textContent = menu.rarity;

  popupCard.className = `popup-card rarity-${menu.rarity.toLowerCase()}`;

  popupImage.src = menu.image;
  popupImage.alt = menu.name;
  popupName.textContent = menu.name;
  popupDesc.textContent = menu.desc;
  popupPrice.textContent = menu.price;

  resultPopup.classList.add("open");
}

function closeResultPopup() {
  resultPopup.classList.remove("open");
}

// ---------- Event Listeners ----------
spinBtn.addEventListener("click", spin);

popupCloseBtn.addEventListener("click", () => {
  closeResultPopup();
});

// ปิด popup เมื่อคลิกนอกตัวการ์ด
resultPopup.addEventListener("click", (e) => {
  if (e.target === resultPopup) {
    closeResultPopup();
  }
});

// ปุ่ม Esc ปิด popup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resultPopup.classList.contains("open")) {
    closeResultPopup();
  }
});
