document.addEventListener("wheel", function(event) {
    event.preventDefault(); // Standart skrollni bloklaymiz
    let screenHeight = window.innerHeight; // Ekran balandligini olamiz
    
    if (event.deltaY > 0) {
        window.scrollBy({ top: screenHeight, behavior: "smooth" });
    } else {
        window.scrollBy({ top: -screenHeight, behavior: "smooth" });
    }
});

// ______________________________________________________________________________________

document.addEventListener("DOMContentLoaded", function () {
    const mainLinks = document.querySelectorAll("#main_link");
    const contactLinks = document.querySelectorAll("#contact_link");
    const personalLinks = document.querySelectorAll("#personal_link");

    const mainSection = document.getElementById("main");
    const contactSection = document.getElementById("contact");
    const personalSection = document.getElementById("personal");

    // Hamma sahifalarni yashirish funksiyasi
    function hideAllSections() {
        mainSection.style.display = "none";
        contactSection.style.display = "none";
        personalSection.style.display = "none";
    }

    // URL ni tekshirib, kerakli sahifani ko‘rsatish
    function checkURL() {
        if (window.location.search.includes("page=contact")) {
            hideAllSections();
            contactSection.style.display = "block";
        } else if (window.location.search.includes("page=personal")) {
            hideAllSections();
            personalSection.style.display = "block";
        } else {
            hideAllSections();
            mainSection.style.display = "block";
        }
    }

    // Sahifa yuklanganda URL ni tekshirish
    checkURL();

    // Tugmalar bosilganda sahifalarni o‘zgartirish
    function addClickEvent(links, section, page) {
        links.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                hideAllSections();
                section.style.display = "block";
                history.pushState({ page: page }, "", `?page=${page}`);
            });
        });
    }

    addClickEvent(mainLinks, mainSection, "main");
    addClickEvent(contactLinks, contactSection, "contact");
    addClickEvent(personalLinks, personalSection, "personal");

    // Brauzer orqaga yoki oldinga bosilganda sahifalarni almashtirish
    window.onpopstate = function () {
        checkURL();
    };
});

// ______________________________________________________________________________________


document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    
    const botToken = "8107663164:AAFRS_7owwhapK9-Kch3DXAf3uqpTEuOXJE";
    const chatId = "7761304842";
    
    const text = `📩 Yangi habar!%0A👤 Ism: ${name}%0A📞 Telefon: ${phone}%0A✉️ Habar: ${message}`;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Habar yuborildi!");
                document.getElementById("contactForm").reset();
            } else {
                alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
            }
        })
        .catch(error => alert("Tarmoq xatosi: " + error));
});

// ______________________________________________________________________________________

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".personal_message").forEach((messageDiv, index) => {
        const textElement = messageDiv.querySelector("p");
        const button = messageDiv.querySelector(".copy_btn");

        // P tegi ichiga raqam qo‘shish
        if (textElement) {
            textElement.innerHTML = `<strong>${index + 1}. </strong>` + textElement.innerHTML;
        }

        // Nusxalash funksiyasi
        button.addEventListener("click", function () {
            const textToCopy = textElement.textContent.trim(); // Faqat <p> ichidagi matnni olamiz
            navigator.clipboard.writeText(textToCopy).then(() => {
                button.textContent = "✅Copied!";
                setTimeout(() => button.textContent = "📋Copy", 2000);
            }).catch(err => {
                console.error("Nusxalab bo‘lmadi:", err);
            });
        });
    });
});


// ______________________________________________________________________________________

function checkPassword() {
    const correctPassword = "12"; // To‘g‘ri parol
    const userInput = document.getElementById("password");
    const modal = document.getElementById("modal");
    const content = document.getElementById("personal_content");
    const alertMessage = document.getElementById("modalAlert");

    if (userInput.value === correctPassword) {
        modal.style.display = "none"; // Modalni yopish
        content.style.display = "block"; // Kontentni ko‘rsatish
    } else {
        alertMessage.style.display = "block"; // ❌ Ogohlantirishni chiqarish
        userInput.value = ""; // 📌 Inputni tozalash
        userInput.focus(); // 🔍 Inputga fokus berish

        // 🔄 2 soniyadan keyin alertni yashirish
        setTimeout(() => {
            alertMessage.style.display = "none";
        }, 2000);
    }
}

// Enter tugmasi bosilganda parolni tekshirish
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkPassword();
    }
});