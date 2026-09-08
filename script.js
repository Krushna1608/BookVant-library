let selectedMode = { type: 'class', val: 10 }; 
let isLoggedIn = false;

// Dynamic SVG Cover Generator for reliable display
function generateCoverDataUrl(title, color) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="180" viewBox="0 0 130 180">
        <rect width="130" height="180" fill="${color}" rx="6"/>
        <rect x="8" y="8" width="114" height="164" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.4" rx="4"/>
        <text x="65" y="80" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">${title}</text>
        <text x="65" y="110" fill="#f39c12" font-size="10" font-family="sans-serif" text-anchor="middle">TEXTBOOK</text>
    </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// Navigation Logic
function showSection(sectionId) {
    if (sectionId === 'dashboard-section' && !isLoggedIn) {
        alert("Please login first to view textbooks!");
        showSection('auth-section');
        return;
    }

    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(sec => sec.style.display = 'none');

    document.getElementById(sectionId).style.display = 'block';

    if (sectionId !== 'dashboard-section') {
        document.getElementById("dashboard-section").style.display = 'none';
    }
}

// Auth Controls
function showRegister() {
    document.getElementById("login-card").style.display = "none";
    document.getElementById("register-card").style.display = "block";
    document.getElementById("forgot-card").style.display = "none";
}

function showLogin() {
    document.getElementById("login-card").style.display = "block";
    document.getElementById("register-card").style.display = "none";
    document.getElementById("forgot-card").style.display = "none";
    document.getElementById("login-error").style.display = "none";
}

function showForgotPassword() {
    document.getElementById("login-card").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.getElementById("forgot-card").style.display = "block";
}

function togglePasswordVisibility() {
    const passInput = document.getElementById("reg-password");
    passInput.type = (passInput.type === "password") ? "text" : "password";
}

// Email Regex Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 1. Registration with Strict Email Check
function registerStudent() {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-password").value.trim();

    if (!name || !email || !pass) {
        alert("Please fill in all fields!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid Email ID (e.g. name@domain.com)");
        return;
    }

    localStorage.setItem("registered_name", name);
    localStorage.setItem("registered_email", email.toLowerCase());
    localStorage.setItem("registered_password", pass);

    alert("Registration Successful! You can now log in.");
    showLogin();
}

// 2. Login with Email Detection & Credential Checking
function loginStudent() {
    const emailInput = document.getElementById("login-email").value.trim().toLowerCase();
    const passInput = document.getElementById("login-password").value.trim();
    const errorDiv = document.getElementById("login-error");

    if (!isValidEmail(emailInput)) {
        errorDiv.innerText = "Please enter a valid Email ID address!";
        errorDiv.style.display = "block";
        return;
    }

    const savedEmail = localStorage.getItem("registered_email");
    const savedPass = localStorage.getItem("registered_password");
    const savedName = localStorage.getItem("registered_name");

    if (!savedEmail) {
        errorDiv.innerText = "No registered account found. Please register first!";
        errorDiv.style.display = "block";
        return;
    }

    if (emailInput === savedEmail && passInput === savedPass) {
        isLoggedIn = true;
        errorDiv.style.display = "none";
        
        showSection('dashboard-section');
        document.getElementById("dashboard-section").style.display = "block";
        document.getElementById("logout-btn").style.display = "inline-block";
        document.getElementById("welcome-user").innerText = `Welcome, ${savedName}!`;
        
        renderBooks();
    } else {
        errorDiv.innerText = "Incorrect Email ID or Password!";
        errorDiv.style.display = "block";
    }
}

// 3. Reset Password
function resetPassword() {
    const emailInput = document.getElementById("forgot-email").value.trim().toLowerCase();
    const newPass = document.getElementById("new-password").value.trim();
    const savedEmail = localStorage.getItem("registered_email");

    if (emailInput === savedEmail && newPass !== "") {
        localStorage.setItem("registered_password", newPass);
        alert("Password updated successfully!");
        showLogin();
    } else {
        alert("Email ID not found in records!");
    }
}

// 4. Logout
function logoutStudent() {
    isLoggedIn = false;
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    showSection('auth-section');
    showLogin();
}

// -------------------------------------------------------------
// TEXTBOOK DATABASE (Std 1-10 & Std 11-12 Science/Commerce/Arts)
// -------------------------------------------------------------
const booksDatabase = {
    10: {
        marathi: [
            { subject: "मराठी कुमारभारती", cover: generateCoverDataUrl("Marathi", "#2a5298"), url: "https://books.ebalbharati.in/pdfs/1001000267.pdf" },
            { subject: "गणित भाग १ (बीजगणित)", cover: generateCoverDataUrl("Maths 1", "#27ae60"), url: "https://books.ebalbharati.in/pdfs/1001000268.pdf" },
            { subject: "विज्ञान १", cover: generateCoverDataUrl("Science 1", "#e67e22"), url: "https://books.ebalbharati.in/pdfs/1001000270.pdf" }
        ],
        semi: [
            { subject: "Science & Tech Part 1", cover: generateCoverDataUrl("Science 1", "#e67e22"), url: "https://books.ebalbharati.in/pdfs/1003000270.pdf" },
            { subject: "Science & Tech Part 2", cover: generateCoverDataUrl("Science 2", "#27ae60"), url: "https://books.ebalbharati.in/pdfs/1003000271.pdf" },
            { subject: "Mathematics Part 1", cover: generateCoverDataUrl("Algebra", "#2a5298"), url: "https://books.ebalbharati.in/pdfs/1003000268.pdf" }
        ],
        english: [
            { subject: "English Kumarbharati", cover: generateCoverDataUrl("English", "#8e44ad"), url: "https://books.ebalbharati.in/pdfs/1003000267.pdf" },
            { subject: "Science & Tech Part 1", cover: generateCoverDataUrl("Science 1", "#e67e22"), url: "https://books.ebalbharati.in/pdfs/1003000270.pdf" },
            { subject: "Mathematics Part 1", cover: generateCoverDataUrl("Algebra", "#2a5298"), url: "https://books.ebalbharati.in/pdfs/1003000268.pdf" }
        ]
    },
    // Junior College English Medium Streams
    jrCollege: {
        11: {
            science: [
                { subject: "Physics (Std 11)", cover: generateCoverDataUrl("Physics 11", "#16a085"), url: "https://books.ebalbharati.in/pdfs/1103020001.pdf" },
                { subject: "Chemistry (Std 11)", cover: generateCoverDataUrl("Chemistry 11", "#d35400"), url: "https://books.ebalbharati.in/pdfs/1103020002.pdf" },
                { subject: "Mathematics Part 1", cover: generateCoverDataUrl("Maths 11", "#2980b9"), url: "https://books.ebalbharati.in/pdfs/1103020003.pdf" },
                { subject: "Biology (Std 11)", cover: generateCoverDataUrl("Biology 11", "#27ae60"), url: "https://books.ebalbharati.in/pdfs/1103020004.pdf" }
            ],
            commerce: [
                { subject: "Book-Keeping & Accountancy", cover: generateCoverDataUrl("BK 11", "#2980b9"), url: "https://books.ebalbharati.in/pdfs/1103020005.pdf" },
                { subject: "Economics (Std 11)", cover: generateCoverDataUrl("Economics 11", "#8e44ad"), url: "https://books.ebalbharati.in/pdfs/1103020006.pdf" },
                { subject: "Secretarial Practice (SP)", cover: generateCoverDataUrl("SP 11", "#f39c12"), url: "https://books.ebalbharati.in/pdfs/1103020007.pdf" },
                { subject: "OCM (Std 11)", cover: generateCoverDataUrl("OCM 11", "#c0392b"), url: "https://books.ebalbharati.in/pdfs/1103020008.pdf" }
            ],
            arts: [
                { subject: "English Yuvakbharati", cover: generateCoverDataUrl("English 11", "#8e44ad"), url: "https://books.ebalbharati.in/pdfs/1103000001.pdf" },
                { subject: "Political Science", cover: generateCoverDataUrl("Pol Sci 11", "#27ae60"), url: "https://books.ebalbharati.in/pdfs/1103020009.pdf" },
                { subject: "History (Std 11)", cover: generateCoverDataUrl("History 11", "#d35400"), url: "https://books.ebalbharati.in/pdfs/1103020010.pdf" },
                { subject: "Sociology (Std 11)", cover: generateCoverDataUrl("Sociology 11", "#16a085"), url: "https://books.ebalbharati.in/pdfs/1103020011.pdf" }
            ]
        },
        12: {
            science: [
                { subject: "Physics (Std 12)", cover: generateCoverDataUrl("Physics 12", "#16a085"), url: "https://books.ebalbharati.in/pdfs/1203020001.pdf" },
                { subject: "Chemistry (Std 12)", cover: generateCoverDataUrl("Chemistry 12", "#d35400"), url: "https://books.ebalbharati.in/pdfs/1203020002.pdf" },
                { subject: "Mathematics Part 1", cover: generateCoverDataUrl("Maths 12", "#2980b9"), url: "https://books.ebalbharati.in/pdfs/1203020003.pdf" },
                { subject: "Biology (Std 12)", cover: generateCoverDataUrl("Biology 12", "#27ae60"), url: "https://books.ebalbharati.in/pdfs/1203020004.pdf" }
            ],
            commerce: [
                { subject: "Book-Keeping & Accountancy", cover: generateCoverDataUrl("BK 12", "#2980b9"), url: "https://books.ebalbharati.in/pdfs/1203020001.pdf" },
                { subject: "Secretarial Practice (SP)", cover: generateCoverDataUrl("SP 12", "#f39c12"), url: "https://books.ebalbharati.in/pdfs/1203020003.pdf" },
                { subject: "Economics (Std 12)", cover: generateCoverDataUrl("Economics 12", "#8e44ad"), url: "https://books.ebalbharati.in/pdfs/1203020004.pdf" },
                { subject: "OCM (Std 12)", cover: generateCoverDataUrl("OCM 12", "#c0392b"), url: "https://books.ebalbharati.in/pdfs/1203020002.pdf" }
            ],
            arts: [
                { subject: "English Yuvakbharati", cover: generateCoverDataUrl("English 12", "#8e44ad"), url: "https://books.ebalbharati.in/pdfs/1203000001.pdf" },
                { subject: "Political Science", cover: generateCoverDataUrl("Pol Sci 12", "#27ae60"), url: "https://books.ebalbharati.in/pdfs/1203020005.pdf" },
                { subject: "History (Std 12)", cover: generateCoverDataUrl("History 12", "#d35400"), url: "https://books.ebalbharati.in/pdfs/1203020006.pdf" },
                { subject: "Psychology (Std 12)", cover: generateCoverDataUrl("Psychology 12", "#16a085"), url: "https://books.ebalbharati.in/pdfs/1203020007.pdf" }
            ]
        }
    }
};

function selectClass(std) {
    selectedMode = { type: 'class', val: std };
    renderBooks();
    document.querySelector(".books-section").scrollIntoView({ behavior: 'smooth' });
}

function selectStream(std, stream) {
    selectedMode = { type: 'stream', std: std, stream: stream };
    renderBooks();
    document.querySelector(".books-section").scrollIntoView({ behavior: 'smooth' });
}

function changeMedium() {
    if (selectedMode.type === 'class') {
        renderBooks();
    }
}

// Render Function
function renderBooks() {
    const title = document.getElementById("selected-class-title");
    const container = document.getElementById("books-grid");
    container.innerHTML = "";

    let booksToDisplay = [];

    if (selectedMode.type === 'class') {
        const std = selectedMode.val;
        const medium = document.getElementById("medium-select").value;
        title.innerText = `Standard ${std} Textbooks (${medium.toUpperCase()} MEDIUM)`;

        if (booksDatabase[std] && booksDatabase[std][medium]) {
            booksToDisplay = booksDatabase[std][medium];
        } else {
            // Sample Fallback Books with SVGs
            booksToDisplay = [
                { subject: `Std ${std} Language`, cover: generateCoverDataUrl("Language", "#8e44ad"), url: "#" },
                { subject: `Std ${std} Mathematics`, cover: generateCoverDataUrl("Maths", "#2980b9"), url: "#" },
                { subject: `Std ${std} Science`, cover: generateCoverDataUrl("Science", "#27ae60"), url: "#" }
            ];
        }
    } else if (selectedMode.type === 'stream') {
        const { std, stream } = selectedMode;
        title.innerText = `Standard ${std}th ${stream.toUpperCase()} Stream (English Medium)`;

        if (booksDatabase.jrCollege[std] && booksDatabase.jrCollege[std][stream]) {
            booksToDisplay = booksDatabase.jrCollege[std][stream];
        }
    }

    booksToDisplay.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        
        card.innerHTML = `
            <img src="${book.cover}" alt="${book.subject}" class="book-cover">
            <h4>${book.subject}</h4>
            <a href="${book.url}" target="_blank" class="btn-read">Read / Download PDF</a>
        `;
        container.appendChild(card);
    });
}