// รายการเมนูอาหารอย่างน้อย 5 รายการ
const menus = [
  {
    name: "ผัดไทย",
    desc: "เส้นจันท์ผัดกับซอสรสเข้มข้น กุ้งสด ไข่ และถั่วงอก โรยถั่วบดและมะนาว",
    price: "55 บาท",
    image:
      "https://images.unsplash.com/photo-1559339352-12e03944e19c?w=600&h=400&fit=crop",
  },
  {
    name: "ต้มยำกุ้ง",
    desc: "ต้มยำน้ำใสรสจัดจ้านกับกุ้งตัวโต เห็ดฟาง ตะไคร้ ใบมะกรูด และพริกขี้หนู",
    price: "120 บาท",
    image:
      "https://images.unsplash.com/photo-1563622333225-9102d2b1e640?w=600&h=400&fit=crop",
  },
  {
    name: "ส้มตำไทย",
    desc: "ส้มตำปูปลาร้ารสแซ่บจากมะละกอดิบ มะเขือเทศ ถั่วฝักยาว และถั่วลิสงคั่ว",
    price: "45 บาท",
    image:
      "https://images.unsplash.com/photo-1595878492223-167e97e51e5b?w=600&h=400&fit=crop",
  },
  {
    name: "แกงเขียวหวานไก่",
    desc: "แกงเขียวหวานหอมมันกับไก่เนื้อนุ่ม มะเขือพวง ใบโหระพา และกะทิเข้มข้น",
    price: "65 บาท",
    image:
      "https://images.unsplash.com/photo-1603894574373-6ac6b75e44f7?w=600&h=400&fit=crop",
  },
  {
    name: "มะม่วงข้าวเหนียว",
    desc: "ข้าวเหนียวมะม่วงสุกหวานมัน ราดกะทิหอมๆ โรยถั่วคั่วบดเล็กน้อย",
    price: "70 บาท",
    image:
      "https://images.unsplash.com/photo-1582602182771-2b562e21bf9d?w=600&h=400&fit=crop",
  },
];

const foodImage = document.getElementById("foodImage");
const foodName = document.getElementById("foodName");
const foodDesc = document.getElementById("foodDesc");
const foodPrice = document.getElementById("foodPrice");
const pickBtn = document.getElementById("pickBtn");

function pickRandomMenu() {
  const randomIndex = Math.floor(Math.random() * menus.length);
  const menu = menus[randomIndex];

  // ตั้งค่ารูปก่อนแล้วค่อยเปลี่ยนข้อความ (กันภาพกระพริบ)
  foodImage.src = menu.image;
  foodImage.alt = "รูป " + menu.name;

  foodName.textContent = menu.name;
  foodDesc.textContent = menu.desc;
  foodPrice.textContent = menu.price;
}

// เริ่มต้นแสดงเมนูแรกเมื่อโหลดหน้า
pickRandomMenu();

// กดปุ่มสุ่มเมนู
pickBtn.addEventListener("click", () => {
  pickBtn.disabled = true;
  pickBtn.textContent = "กำลังสุ่ม...";

  setTimeout(() => {
    pickRandomMenu();
    pickBtn.disabled = false;
    pickBtn.textContent = "สุ่มเมนูอาหาร";
  }, 400);
});
