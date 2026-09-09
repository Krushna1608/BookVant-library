// =============================================================
// PART 1: GLOBAL VARIABLES, AUTHENTICATION & TEXTBOOK DATABASE
// =============================================================

let selectedMode = { type: 'class', val: 1 }; // Default Std 1
let isLoggedIn = false;

// Page Section Navigation
function showSection(sectionId) {
    if (sectionId === 'dashboard-section' && !isLoggedIn) {
        alert("कृपया पुस्तके पाहण्यासाठी प्रथम लॉगिन करा!");
        showSection('auth-section');
        return;
    }

    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(sec => sec.style.display = 'none');

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    if (sectionId !== 'dashboard-section') {
        const dash = document.getElementById("dashboard-section");
        if (dash) dash.style.display = 'none';
    }
}

// AUTHENTICATION CONTROLS
function showRegister() {
    document.getElementById("login-card").style.display = "none";
    document.getElementById("register-card").style.display = "block";
    document.getElementById("forgot-card").style.display = "none";
}

function showLogin() {
    document.getElementById("login-card").style.display = "block";
    document.getElementById("register-card").style.display = "none";
    document.getElementById("forgot-card").style.display = "none";
    const err = document.getElementById("login-error");
    if (err) err.style.display = "none";
}

function showForgotPassword() {
    document.getElementById("login-card").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.getElementById("forgot-card").style.display = "block";
}

function togglePasswordVisibility() {
    const passInput = document.getElementById("reg-password");
    if (passInput) {
        passInput.type = (passInput.type === "password") ? "text" : "password";
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function registerStudent() {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-password").value.trim();

    if (!name || !email || !pass) {
        alert("कृपया सर्व माहिती भरा!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("कृपया योग्य Email ID टाका (उदा. name@domain.com)");
        return;
    }

    localStorage.setItem("registered_name", name);
    localStorage.setItem("registered_email", email.toLowerCase());
    localStorage.setItem("registered_password", pass);

    alert("नोंदणी यशस्वी झाली! आता तुम्ही लॉगिन करू शकता.");
    showLogin();
}

function loginStudent() {
    const emailInput = document.getElementById("login-email").value.trim().toLowerCase();
    const passInput = document.getElementById("login-password").value.trim();
    const errorDiv = document.getElementById("login-error");

    if (!isValidEmail(emailInput)) {
        errorDiv.innerText = "कृपया योग्य Email ID टाका!";
        errorDiv.style.display = "block";
        return;
    }

    const savedEmail = localStorage.getItem("registered_email");
    const savedPass = localStorage.getItem("registered_password");
    const savedName = localStorage.getItem("registered_name");

    if (!savedEmail) {
        errorDiv.innerText = "हे अकाऊंट सापडले नाही. कृपया प्रथम रजिस्टर करा!";
        errorDiv.style.display = "block";
        return;
    }

    if (emailInput === savedEmail && passInput === savedPass) {
        isLoggedIn = true;
        errorDiv.style.display = "none";
        
        showSection('dashboard-section');
        const logoutBtn = document.getElementById("logout-btn");
        const welcomeUser = document.getElementById("welcome-user");
        
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (welcomeUser) welcomeUser.innerText = `Welcome, ${savedName}!`;
        
        renderBooks();
    } else {
        errorDiv.innerText = "चुकीचा Email ID किंवा Password!";
        errorDiv.style.display = "block";
    }
}

function resetPassword() {
    const emailInput = document.getElementById("forgot-email").value.trim().toLowerCase();
    const newPass = document.getElementById("new-password").value.trim();
    const savedEmail = localStorage.getItem("registered_email");

    if (emailInput === savedEmail && newPass !== "") {
        localStorage.setItem("registered_password", newPass);
        alert("पासवर्ड यशस्वीरित्या बदलला गेला आहे!");
        showLogin();
    } else {
        alert("हा Email ID रेकॉर्डमध्ये सापडला नाही!");
    }
}

function logoutStudent() {
    isLoggedIn = false;
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.style.display = "none";
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    showSection('auth-section');
    showLogin();
}

// TEXTBOOK DATABASE (Std 1 to 12)
const booksDatabase = {
    1: {
        marathi: [
            { subject: "इयत्ता १ ली - मराठी (बालभारती)", cover: "images/1m(m).jpg", url: "pdf/marathi.pdf" },
            { subject: "इयत्ता १ ली - गणित (मराठी माध्यम)", cover: "images/1ma(m).jpg", url: "pdf/maths(m).pdf" },
            { subject: "इयत्ता १ ली - इंग्रजी (My English Book)", cover: "images/1e(m).jpg", url: "pdf/english.pdf" }
        ],
        english: [
            { subject: "Std 1 - English", cover: "images/1e(e).jpg", url: "pdf/english(e).pdf" },
            { subject: "Std 1 - Mathematics (English)", cover: "images/1ma(e).jpg", url: "pdf/maths(e).pdf" },
            { subject: "Std 1 - Marathi", cover: "images/1m(e).jpg", url: "pdf/marathi.pdf" }
        ],
        semi: [
            { subject: "Std 1 - Mathematics (English)", cover: "images/1ma(e).jpg", url: "pdf/maths(e).pdf" },
            { subject: "इयत्ता १ ली - मराठी", cover: "images/1m(m).jpg", url: "pdf/marathi.pdf" },
            { subject: "Std 1 - English", cover: "images/1e(m).jpg", url: "pdf/english.pdf" }
        ]
    },
    2: {
        marathi: [
            { subject: "इयत्ता २ री - मराठी (बालभारती)", cover: "images/2m(m).jpg", url: "pdf/2marathi.pdf" },
            { subject: "इयत्ता २ री - गणित (मराठी माध्यम)", cover: "images/2ma(m).jpg", url: "pdf/2maths(m).pdf" },
            { subject: "इयत्ता २ री - इंग्रजी (My English Book)", cover: "images/2e(m).jpg", url: "pdf/2english.pdf" }
        ],
        english: [
            { subject: "Std 2 - English", cover: "images/2e(e).jpg", url: "pdf/2english(e).pdf" },
            { subject: "Std 2 - Mathematics (English)", cover: "images/2ma(e).jpg", url: "pdf/2maths(e).pdf" },
            { subject: "Std 2 - Marathi", cover: "images/2m(e).jpg", url: "pdf/2marathi(e).pdf" }
        ],
        semi: [
            { subject: "Std 2 - Mathematics (English)", cover: "images/2ma(e).jpg", url: "pdf/2maths(e).pdf" },
            { subject: "इयत्ता २ री - मराठी", cover: "images/2m(m).jpg", url: "pdf/2marathi.pdf" },
            { subject: "Std 2 - English", cover: "images/2e(m).jpg", url: "pdf/2english.pdf" }
        ]
    },
    3: {
        marathi: [
            { subject: "इयत्ता ३ री - मराठी (बालभारती)", cover: "images/3m(m).jpg", url: "pdf/3marathi(m).pdf" },
            { subject: "इयत्ता ३ री - माय इंग्लिश बुक", cover: "images/3e(m).jpg", url: "pdf/3english(m).pdf" },
            { subject: "इयत्ता ३ री - गणित", cover: "images/3ma(m).jpg", url: "pdf/3maths(m).pdf" },
            { subject: "इयत्ता ३ री - आपल्या सभोवतालचे जग भा-१", cover: "images/3s(m).jpg", url: "pdf/3science(m).pdf" },
            { subject: "इयत्ता ३ री - आपल्या सभोवतालचे जग भा-२", cover: "images/3s2(m).jpg", url: "pdf/3science2(m).pdf" }
        ],
        english: [
            { subject: "Std 3 - Marathi", cover: "images/3m(e).jpg", url: "pdf/3marathi(e).pdf" },
            { subject: "Std 3 - English", cover: "images/3e(e).jpg", url: "pdf/3english(e).pdf" },
            { subject: "Std 3 - Mathematics", cover: "images/3ma(e).jpg", url: "pdf/3maths(e).pdf" },
            { subject: "Std 3 - The World Around Us", cover: "images/3s(e).jpg", url: "pdf/3science(e).pdf" },
            { subject: "Std 3 - The World Around Us 2", cover: "images/3s2(e).jpg", url: "pdf/3science2(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ३ री - मराठी", cover: "images/3m(m).jpg", url: "pdf/3marathi(m).pdf" },
            { subject: "Std 3 - English", cover: "images/3e(m).jpg", url: "pdf/3english(m).pdf" },
            { subject: "Std 3 - Mathematics", cover: "images/3ma(e).jpg", url: "pdf/3maths(e).pdf" },
            { subject: "Std 3 - The World Around Us", cover: "images/3s(e).jpg", url: "pdf/3science(e).pdf" },
            { subject: "Std 3 - The World Around Us 2", cover: "images/3s2(e).jpg", url: "pdf/3science2(e).pdf" }
        ]
    },
    4: {
        marathi: [
            { subject: "इयत्ता ४ री - मराठी (बालभारती)", cover: "images/4m(m).jpg", url: "pdf/4marathi(m).pdf" },
            { subject: "इयत्ता ४ री - माय इंग्लिश बुक", cover: "images/4e(m).jpg", url: "pdf/4english(m).pdf" },
            { subject: "इयत्ता ४ री - गणित मराठी", cover: "images/4ma(m).jpg", url: "pdf/4maths(m).pdf" },
            { subject: "इयत्ता ४ री - आपल्या सभोवतालचे जग भा-२", cover: "images/4h(m).jpg", url: "pdf/4history(m).pdf" }
        ],
        english: [
            { subject: "Std 4 - Marathi", cover: "images/4m(e).jpg", url: "pdf/4marathi(e).pdf" },
            { subject: "Std 4 - English", cover: "images/4e(e).jpg", url: "pdf/4english(e).pdf" },
            { subject: "Std 4 - Mathematics", cover: "images/4ma(e).jpg", url: "pdf/4maths(e).pdf" },
            { subject: "Std 4 - The World Around Us 2", cover: "images/4h(e).jpg", url: "pdf/4history(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ४ री - मराठी (बालभारती)", cover: "images/4m(m).jpg", url: "pdf/4marathi(m).pdf" },
            { subject: "इयत्ता ४ री - आपल्या सभोवतालचे जग भा-२", cover: "images/4h(m).jpg", url: "pdf/4history(m).pdf" },
            { subject: "Std 4 - English", cover: "images/4e(m).jpg", url: "pdf/4english(m).pdf" },
            { subject: "Std 4 - Mathematics", cover: "images/4ma(e).jpg", url: "pdf/4maths(e).pdf" }
        ]
    },
    5: {
        marathi: [
            { subject: "इयत्ता ५ वी - मराठी (बालभारती)", cover: "images/5m(m).jpg", url: "pdf/5marathi(m).pdf" },
            { subject: "इयत्ता ५ वी - माय इंग्लिश बुक", cover: "images/5e(m).jpg", url: "pdf/5english(m).pdf" },
            { subject: "इयत्ता ५ वी - गणित (मराठी)", cover: "images/5ma(m).jpg", url: "pdf/5maths(m).pdf" },
            { subject: "इयत्ता ५ वी - हिंदी (सुलभभारती)", cover: "images/5h.jpg", url: "pdf/5hindi(m).pdf" },
            { subject: "इयत्ता ५ वी - परिसर अभ्यास भाग-१", cover: "images/5s1(m).jpg", url: "pdf/5science(m).pdf" },
            { subject: "इयत्ता ५ वी - परिसर अभ्यास भाग-२", cover: "images/5s2(m).jpg", url: "pdf/5science2(m).pdf" }
        ],
        english: [
            { subject: "Std 5 - Marathi", cover: "images/5m(e).jpg", url: "pdf/5marathi(e).pdf" },
            { subject: "Std 5 - English", cover: "images/5e(e).jpg", url: "pdf/5english(e).pdf" },
            { subject: "Std 5 - Mathematics", cover: "images/5ma(e).jpg", url: "pdf/5maths(e).pdf" },
            { subject: "Std 5 - Hindi", cover: "images/5h.jpg", url: "pdf/5hindi(m).pdf" },
            { subject: "Std 5 - Environmental Studies 1", cover: "images/5s1(e).jpg", url: "pdf/5science(e).pdf" },
            { subject: "Std 5 - Environmental Studies 2", cover: "images/5s2(e).jpg", url: "pdf/5science2(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ५ वी - मराठी (बालभारती)", cover: "images/5m(m).jpg", url: "pdf/5marathi(m).pdf" },
            { subject: "इयत्ता ५ वी - हिंदी (सुलभभारती)", cover: "images/5h.jpg", url: "pdf/5hindi(m).pdf" },
            { subject: "Std 5 - English", cover: "images/5e(m).jpg", url: "pdf/5english(m).pdf" },
            { subject: "Std 5 - Mathematics", cover: "images/5ma(e).jpg", url: "pdf/5maths(e).pdf" },
            { subject: "Std 5 - Environmental Studies 1", cover: "images/5s(e).jpg", url: "pdf/5science(e).pdf" },
            { subject: "Std 5 - Environmental Studies 2", cover: "images/5s2(e).jpg", url: "pdf/5science2(e).pdf" }
        ]
    },
    6: {
        marathi: [
            { subject: "इयत्ता ६ वी - मराठी (बालभारती)", cover: "images/6m(m).jpg", url: "pdf/6marathi(m).pdf" },
            { subject: "इयत्ता ६ वी - माय इंग्लिश बुक", cover: "images/6e(m).jpg", url: "pdf/6english(m).pdf" },
            { subject: "इयत्ता ६ वी - गणित (मराठी)", cover: "images/6ma(m).jpg", url: "pdf/6maths(m).pdf" },
            { subject: "इयत्ता ६ वी - इतिहास व नागरिकशास्त्र", cover: "images/6hi.jpg", url: "pdf/6history(m).pdf" },
            { subject: "इयत्ता ६ वी - सामान्य विज्ञान", cover: "images/6s(m).jpg", url: "pdf/6science(m).pdf" },
            { subject: "इयत्ता ६ वी - भूगोल", cover: "images/6g(m).jpg", url: "pdf/6geo(m).pdf" }
        ],
        english: [
            { subject: "Std 6 - Marathi", cover: "images/6m(e).jpg", url: "pdf/6marathi(e).pdf" },
            { subject: "Std 6 - English", cover: "images/6e(e).jpg", url: "pdf/6english(e).pdf" },
            { subject: "Std 6 - Mathematics", cover: "images/6ma(e).jpg", url: "pdf/6maths(e).pdf" },
            { subject: "Std 6 - History and Civics", cover: "images/6hi(e).jpg", url: "pdf/6history(e).pdf" },
            { subject: "Std 6 - General Science", cover: "images/6s(e).jpg", url: "pdf/6science(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ६ वी - मराठी (बालभारती)", cover: "images/6m(m).jpg", url: "pdf/6marathi(m).pdf" },
            { subject: "इयत्ता ६ वी - इतिहास व नागरिकशास्त्र", cover: "images/6hi.jpg", url: "pdf/6history(m).pdf" },
            { subject: "Std 6 - English", cover: "images/6e(m).jpg", url: "pdf/6english(m).pdf" },
            { subject: "Std 6 - Mathematics", cover: "images/6ma(e).jpg", url: "pdf/6maths(e).pdf" },
            { subject: "Std 6 - General Science", cover: "images/6s(e).jpg", url: "pdf/6science(e).pdf" },
            { subject: "इयत्ता ६ वी - भूगोल", cover: "images/6g(m).jpg", url: "pdf/6geo(m).pdf" }
        ]
    }
};
// =============================================================
// PART 2: CONTINUATION OF DATABASE, RENDER & FIXED DIRECT PDF OPEN
// =============================================================

// Adding Std 7-12 to booksDatabase
Object.assign(booksDatabase, {
    7: {
        marathi: [
            { subject: "इयत्ता ७ वी - मराठी (बालभारती)", cover: "images/7m(m).jpg", url: "pdf/7marathi(m).pdf" },
            { subject: "इयत्ता ७ वी - माय इंग्लिश बुक", cover: "images/7e(m).jpg", url: "pdf/7english(m).pdf" },
            { subject: "इयत्ता ७ वी - गणित (मराठी)", cover: "images/7ma(m).jpg", url: "pdf/7maths(m).pdf" },
            { subject: "इयत्ता ७ वी - हिंदी (सुलभभारती)", cover: "images/7h.jpg", url: "pdf/7hindi.pdf" },
            { subject: "इयत्ता ७ वी - सामान्य विज्ञान", cover: "images/7s(m).jpg", url: "pdf/7science(m).pdf" },
            { subject: "इयत्ता ७ वी - इतिहास व नागरिकशास्त्र", cover: "images/7hi(m).jpg", url: "pdf/7history(m).pdf" },
            { subject: "इयत्ता ७ वी - भूगोल", cover: "images/7g(m).jpg", url: "pdf/7geo(m).pdf" }
        ],
        english: [
            { subject: "Std 7 - Marathi", cover: "images/7m(e).jpg", url: "pdf/7marathi(e).pdf" },
            { subject: "Std 7 - English", cover: "images/7e(e).jpg", url: "pdf/7english(e).pdf" },
            { subject: "Std 7 - Mathematics", cover: "images/7ma(e).jpg", url: "pdf/7maths(e).pdf" },
            { subject: "Std 7 - Hindi", cover: "images/7h.jpg", url: "pdf/7hindi.pdf" },
            { subject: "Std 7 - General Science", cover: "images/7s(e).jpg", url: "pdf/7science(e).pdf" },
            { subject: "Std 7 - History And Civics", cover: "images/7hi(e).jpg", url: "pdf/7history(e).pdf" },
            { subject: "Std 7 - Geography", cover: "images/7g(e).jpg", url: "pdf/7geo(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ७ वी - मराठी (बालभारती)", cover: "images/7m(m).jpg", url: "pdf/7marathi(m).pdf" },
            { subject: "इयत्ता ७ वी - हिंदी (सुलभभारती)", cover: "images/7h.jpg", url: "pdf/7hindi.pdf" },
            { subject: "Std 7 - English", cover: "images/7e(m).jpg", url: "pdf/7english(m).pdf" },
            { subject: "Std 7 - Mathematics", cover: "images/7ma(e).jpg", url: "pdf/7maths(e).pdf" },
            { subject: "Std 7 - General Science", cover: "images/7s(e).jpg", url: "pdf/7science(e).pdf" },
            { subject: "इयत्ता ७ वी - भूगोल", cover: "images/7g(m).jpg", url: "pdf/7geo(m).pdf" },
            { subject: "इयत्ता ७ वी - इतिहास व नागरिकशास्त्र", cover: "images/7hi(m).jpg", url: "pdf/7history(m).pdf" }
        ]
    },
    8: {
        marathi: [
            { subject: "इयत्ता ८ वी - मराठी (बालभारती)", cover: "images/8m(m).jpg", url: "pdf/8marathi(m).pdf" },
            { subject: "इयत्ता ८ वी - माय इंग्लिश बुक", cover: "images/8e(m).jpg", url: "pdf/8english(m).pdf" },
            { subject: "इयत्ता ८ वी - गणित (मराठी)", cover: "images/8ma(m).jpg", url: "pdf/8maths(m).pdf" },
            { subject: "इयत्ता ८ वी - हिंदी (सुलभभारती)", cover: "images/8h.jpg", url: "pdf/8hindi.pdf" },
            { subject: "इयत्ता ८ वी - सामान्य विज्ञान", cover: "images/8s(m).jpg", url: "pdf/8science(m).pdf" },
            { subject: "इयत्ता ८ वी - इतिहास व नागरिकशास्त्र", cover: "images/8hi(m).jpg", url: "pdf/8history(m).pdf" },
            { subject: "इयत्ता ८ वी - भूगोल", cover: "images/8g(m).jpg", url: "pdf/8geo(m).pdf" }
        ],
        english: [
            { subject: "Std 8 - Marathi", cover: "images/8m(e).jpg", url: "pdf/8marathi(e).pdf" },
            { subject: "Std 8 - English", cover: "images/8e(e).jpg", url: "pdf/8english(e).pdf" },
            { subject: "Std 8 - Mathematics", cover: "images/8ma(e).jpg", url: "pdf/8maths(e).pdf" },
            { subject: "Std 8 - Hindi", cover: "images/8h.jpg", url: "pdf/8hindi.pdf" },
            { subject: "Std 8 - General Science", cover: "images/8s(e).jpg", url: "pdf/8science(e).pdf" },
            { subject: "Std 8 - History And Civics", cover: "images/8hi(e).jpg", url: "pdf/8history(e).pdf" },
            { subject: "Std 8 - Geography", cover: "images/8g(e).jpg", url: "pdf/8geo(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ८ वी - मराठी (बालभारती)", cover: "images/8m(m).jpg", url: "pdf/8marathi(m).pdf" },
            { subject: "इयत्ता ८ वी - हिंदी (सुलभभारती)", cover: "images/8h.jpg", url: "pdf/8hindi.pdf" },
            { subject: "Std 8 - English", cover: "images/8e(m).jpg", url: "pdf/8english(m).pdf" },
            { subject: "Std 8 - Mathematics", cover: "images/8ma(e).jpg", url: "pdf/8maths(e).pdf" },
            { subject: "इयत्ता ८ वी - इतिहास व नागरिकशास्त्र", cover: "images/8hi(m).jpg", url: "pdf/8history(m).pdf" },
            { subject: "Std 8 - General Science", cover: "images/8s(e).jpg", url: "pdf/8science(e).pdf" },
            { subject: "इयत्ता ८ वी - भूगोल", cover: "images/8g(m).jpg", url: "pdf/8geo(m).pdf" }
        ]
    },
    9: {
        marathi: [
            { subject: "इयत्ता ९ वी - मराठी (बालभारती)", cover: "images/9m(m).jpg", url: "pdf/9marathi(m).pdf" },
            { subject: "इयत्ता ९ वी - माय इंग्लिश बुक", cover: "images/9e(m).jpg", url: "pdf/9english(m).pdf" },
            { subject: "इयत्ता ९ वी - गणित भाग-१ (मराठी)", cover: "images/9ma(m).jpg", url: "pdf/9maths(m).pdf" },
            { subject: "इयत्ता ९ वी - गणित भाग-२ (मराठी)", cover: "images/9ma2(m).jpg", url: "pdf/9maths2(m).pdf" },
            { subject: "इयत्ता ९ वी - हिंदी (सुलभभारती)", cover: "images/9h.jpg", url: "pdf/9hindi.pdf" },
            { subject: "इयत्ता ९ वी - विज्ञान आणि तंत्रज्ञान", cover: "images/9s(m).jpg", url: "pdf/9science(m).pdf" },
            { subject: "इयत्ता ९ वी - इतिहास व नागरिकशास्त्र", cover: "images/9hi(m).jpg", url: "pdf/9history(m).pdf" },
            { subject: "इयत्ता ९ वी - भूगोल", cover: "images/9g(m).jpg", url: "pdf/9geo(m).pdf" }
        ],
        english: [
            { subject: "Std 9 - Marathi", cover: "images/9m(e).jpg", url: "pdf/9marathi(e).pdf" },
            { subject: "Std 9 - English", cover: "images/9e(e).jpg", url: "pdf/9english(e).pdf" },
            { subject: "Std 9 - Mathematics part-1", cover: "images/9ma(e).jpg", url: "pdf/9maths(e).pdf" },
            { subject: "Std 9 - Mathematics part-2", cover: "images/9ma2(e).jpg", url: "pdf/9maths2(e).pdf" },
            { subject: "Std 9 - Hindi", cover: "images/9h.jpg", url: "pdf/9hindi.pdf" },
            { subject: "Std 9 - Science & Technology", cover: "images/9s(e).jpg", url: "pdf/9science(e).pdf" },
            { subject: "Std 9 - History & Political Science", cover: "images/9hi(e).jpg", url: "pdf/9history(e).pdf" },
            { subject: "Std 9 - Geography", cover: "images/9g(e).jpg", url: "pdf/9geo(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता ९ वी - मराठी (बालभारती)", cover: "images/9m(m).jpg", url: "pdf/9marathi(m).pdf" },
            { subject: "इयत्ता ९ वी - हिंदी (सुलभभारती)", cover: "images/9h.jpg", url: "pdf/9hindi.pdf" },
            { subject: "Std 9 - English", cover: "images/9e(m).jpg", url: "pdf/9english(m).pdf" },
            { subject: "Std 9 - Mathematics part-1", cover: "images/9ma(e).jpg", url: "pdf/9maths(e).pdf" },
            { subject: "Std 9 - Mathematics part-2", cover: "images/9ma2(e).jpg", url: "pdf/9maths2(e).pdf" },
            { subject: "Std 9 - Science & Technology", cover: "images/9s(e).jpg", url: "pdf/9science(e).pdf" },
            { subject: "इयत्ता ९ वी - इतिहास व नागरिकशास्त्र", cover: "images/9hi(m).jpg", url: "pdf/9history(m).pdf" },
            { subject: "इयत्ता ९ वी - भूगोल", cover: "images/9g(m).jpg", url: "pdf/9geo(m).pdf" }
        ]
    },
    10: {
        marathi: [
            { subject: "इयत्ता १० वी - मराठी (बालभारती)", cover: "images/10m(m).jpg", url: "pdf/10marathi(m).pdf" },
            { subject: "इयत्ता १० वी - माय इंग्लिश बुक", cover: "images/10e(m).jpg", url: "pdf/10english(m).pdf" },
            { subject: "इयत्ता १० वी - गणित भाग-१ (मराठी)", cover: "images/10ma(m).jpg", url: "pdf/10maths(m).pdf" },
            { subject: "इयत्ता १० वी - गणित भाग-२ (मराठी)", cover: "images/10ma2(m).jpg", url: "pdf/10maths2(m).pdf" },
            { subject: "इयत्ता १० वी - हिंदी (सुलभभारती)", cover: "images/10h.jpg", url: "pdf/10hindi.pdf" },
            { subject: "इयत्ता १० वी - विज्ञान आणि तंत्रज्ञान भाग-१", cover: "images/10s(m).jpg", url: "pdf/10science(m).pdf" },
            { subject: "इयत्ता १० वी - विज्ञान आणि तंत्रज्ञान भाग-२", cover: "images/10s2(m).jpg", url: "pdf/10science2(m).pdf" },
            { subject: "इयत्ता १० वी - इतिहास व नागरिकशास्त्र", cover: "images/10hi(m).jpg", url: "pdf/10history(m).pdf" },
            { subject: "इयत्ता १० वी - भूगोल", cover: "images/10g(m).jpg", url: "pdf/10geo(m).pdf" }
        ],
        english: [
            { subject: "Std 10 - Marathi", cover: "images/10m(e).jpg", url: "pdf/10marathi(e).pdf" },
            { subject: "Std 10 - English", cover: "images/10e(e).jpg", url: "pdf/10english(e).pdf" },
            { subject: "Std 10 - Mathematics part-1", cover: "images/10ma(e).jpg", url: "pdf/10maths(e).pdf" },
            { subject: "Std 10 - Mathematics part-2", cover: "images/10ma2(e).jpg", url: "pdf/10maths2(e).pdf" },
            { subject: "Std 10 - Hindi", cover: "images/10h.jpg", url: "pdf/10hindi.pdf" },
            { subject: "Std 10 - Science & Technology part-1", cover: "images/10s(e).jpg", url: "pdf/10science(e).pdf" },
            { subject: "Std 10 - Science & Technology part-2", cover: "images/10s2(e).jpg", url: "pdf/10science2(e).pdf" },
            { subject: "Std 10 - History & Political Science", cover: "images/10hi(e).jpg", url: "pdf/10history(e).pdf" },
            { subject: "Std 10 - Geography", cover: "images/10g(e).jpg", url: "pdf/10geo(e).pdf" }
        ],
        semi: [
            { subject: "इयत्ता १० वी - मराठी (बालभारती)", cover: "images/10m(m).jpg", url: "pdf/10marathi(m).pdf" },
            { subject: "इयत्ता १० वी - हिंदी (सुलभभारती)", cover: "images/10h.jpg", url: "pdf/10hindi.pdf" },
            { subject: "Std 10 - English", cover: "images/10e(m).jpg", url: "pdf/10english(m).pdf" },
            { subject: "Std 10 - Mathematics part-1", cover: "images/10ma(e).jpg", url: "pdf/10maths(e).pdf" },
            { subject: "Std 10 - Mathematics part-2", cover: "images/10ma2(e).jpg", url: "pdf/10maths2(e).pdf" },
            { subject: "Std 10 - Science & Technology part-1", cover: "images/10s(e).jpg", url: "pdf/10science(e).pdf" },
            { subject: "Std 10 - Science & Technology part-2", cover: "images/10s2(e).jpg", url: "pdf/10science2(e).pdf" },
            { subject: "इयत्ता १० वी - इतिहास व नागरिकशास्त्र", cover: "images/10hi(m).jpg", url: "pdf/10history(m).pdf" },
            { subject: "इयत्ता १० वी - भूगोल", cover: "images/10g(m).jpg", url: "pdf/10geo(m).pdf" }
        ]
    },
    11: {
        science: [
            { subject: "11th Physics", cover: "images/11p.jpg", url: "pdf/11phy.pdf" },
            { subject: "11th Chemistry", cover: "images/11c.jpg", url: "pdf/11che.pdf" },
            { subject: "11th Mathematics & Statistics Part 1", cover: "images/11ma.jpg", url: "pdf/11ma.pdf" },
            { subject: "11th Mathematics & Statistics Part 2", cover: "images/11ma2.jpg", url: "pdf/11ma2.pdf" },
            { subject: "11th Biology", cover: "images/11b1.jpg", url: "pdf/11bio.pdf" },
            { subject: "11th English", cover: "images/11en.jpg", url: "pdf/11en.pdf" }
        ],
        commerce: [
            { subject: "11th Book-keeping & Accountancy", cover: "images/11bk.jpg", url: "pdf/11bk.pdf" },
            { subject: "11th Economics", cover: "images/11e.jpg", url: "pdf/11eco.pdf" },
            { subject: "11th Organization of Commerce (OCM)", cover: "images/11oc.jpg", url: "pdf/11oc.pdf" },
            { subject: "11th Secretarial Practice (SP)", cover: "images/11sp.jpg", url: "pdf/11sp.pdf" },
            { subject: "11th Mathematics & Statistics Part 1", cover: "images/11m.jpg", url: "pdf/11m.pdf" },
            { subject: "11th Mathematics & Statistics Part 2", cover: "images/11m2.jpg", url: "pdf/11m2.pdf" },
            { subject: "11th English", cover: "images/11en.jpg", url: "pdf/11en.pdf" }
        ],
        arts: [
            { subject: "11th History", cover: "images/11h.jpg", url: "pdf/11history.pdf" },
            { subject: "11th Political Science", cover: "images/11po.jpg", url: "pdf/11political.pdf" },
            { subject: "11th Sociology", cover: "images/11si.jpg", url: "pdf/11sic.pdf" },
            { subject: "11th Mathematics & Statistics Part 1", cover: "images/11ma.jpg", url: "pdf/11ma.pdf" },
            { subject: "11th Mathematics & Statistics Part 2", cover: "images/11ma2.jpg", url: "pdf/11ma2.pdf" },
            { subject: "11th English", cover: "images/11en.jpg", url: "pdf/11en.pdf" }
        ]
    },
    12: {
        science: [
            { subject: "12th Physics", cover: "images/12p.jpg", url: "pdf/12phy.pdf" },
            { subject: "12th Chemistry", cover: "images/12c.jpg", url: "pdf/12che.pdf" },
            { subject: "12th Mathematics & Statistics Part 1", cover: "images/12ma.jpg", url: "pdf/12ma.pdf" },
            { subject: "12th Mathematics & Statistics Part 2", cover: "images/12ma2.jpg", url: "pdf/12ma2.pdf" },
            { subject: "12th Biology", cover: "images/12b.jpg", url: "pdf/12bio.pdf" },
            { subject: "12th English", cover: "images/12en.jpg", url: "pdf/12en.pdf" }
        ],
        commerce: [
            { subject: "12th Book-keeping & Accountancy", cover: "images/12bk.jpg", url: "pdf/12bk.pdf" },
            { subject: "12th Economics", cover: "images/12e.jpg", url: "pdf/12eco.pdf" },
            { subject: "12th Organization of Commerce (OCM)", cover: "images/12oc.jpg", url: "pdf/12oc.pdf" },
            { subject: "12th Secretarial Practice (SP)", cover: "images/12sp.jpg", url: "pdf/12sp.pdf" },
            { subject: "12th Mathematics & Statistics Part 1", cover: "images/12m.jpg", url: "pdf/12m.pdf" },
            { subject: "12th Mathematics & Statistics Part 2", cover: "images/12m2.jpg", url: "pdf/12m2.pdf" },
            { subject: "12th English", cover: "images/12en.jpg", url: "pdf/12en.pdf" }
        ],
        arts: [
            { subject: "12th History", cover: "images/12h.jpg", url: "pdf/12h.pdf" },
            { subject: "12th Political Science", cover: "images/12po.jpg", url: "pdf/12po.pdf" },
            { subject: "12th Mathematics & Statistics Part 1", cover: "images/12ma.jpg", url: "pdf/12ma.pdf" },
            { subject: "12th Mathematics & Statistics Part 2", cover: "images/12ma2.jpg", url: "pdf/12ma2.pdf" },
            { subject: "12th English", cover: "images/12en.jpg", url: "pdf/12en.pdf" }
        ]
    }
});

// DISPLAY & RENDER LOGIC
function selectClass(std) {
    selectedMode = { type: 'class', val: std };
    renderBooks();
    const booksSec = document.querySelector(".books-section");
    if (booksSec) booksSec.scrollIntoView({ behavior: 'smooth' });
}

function selectStream(std, stream) {
    selectedMode = { type: 'stream', std: std, stream: stream };
    renderBooks();
    const booksSec = document.querySelector(".books-section");
    if (booksSec) booksSec.scrollIntoView({ behavior: 'smooth' });
}

function changeMedium() {
    if (selectedMode.type === 'class') {
        renderBooks();
    }
}

function renderBooks() {
    const title = document.getElementById("selected-class-title");
    const container = document.getElementById("books-grid");
    if (!container) return;

    container.innerHTML = "";
    let booksToDisplay = [];

    if (selectedMode.type === 'class') {
        const std = selectedMode.val;
        const mediumSelect = document.getElementById("medium-select");
        const medium = mediumSelect ? mediumSelect.value : "marathi";
        
        if (title) {
            title.innerText = `Standard ${std} Textbooks (${medium.toUpperCase()} MEDIUM)`;
        }

        if (booksDatabase[std] && booksDatabase[std][medium]) {
            booksToDisplay = booksDatabase[std][medium];
        }
    } else if (selectedMode.type === 'stream') {
        const std = selectedMode.std;
        const stream = selectedMode.stream;

        if (title) {
            title.innerText = `Standard ${std}th (${stream.toUpperCase()}) Textbooks`;
        }

        if (booksDatabase[std] && booksDatabase[std][stream]) {
            booksToDisplay = booksDatabase[std][stream];
        }
    }

    if (booksToDisplay.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666;'>ह्या इयत्तेसाठी किंवा विषयासाठी पुस्तके उपलब्ध नाहीत.</p>";
        return;
    }

    booksToDisplay.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        
        card.innerHTML = `
            <img src="${book.cover}" alt="${book.subject}" class="book-cover" style="width: 130px; height: 180px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://via.placeholder.com/130x180?text=No+Image'">
            <h4 style="margin: 10px 0; font-size: 14px;">${book.subject}</h4>
            <button onclick="openPdfModal('${book.url}')" class="btn-read" style="padding: 8px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Read PDF</button>
        `;
        container.appendChild(card);
    });
}

// DIRECT PDF OPEN FUNCTION (FIXED FOR ALL BROWSERS)
function openPdfModal(pdfUrl) {
    if (pdfUrl) {
        window.open(pdfUrl, '_blank');
    } else {
        alert("PDF फाईल सापडली नाही!");
    }
}