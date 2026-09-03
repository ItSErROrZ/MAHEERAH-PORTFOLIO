document.body.classList.add("reveal-ready");

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const backTop = document.getElementById("backTop");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");

/* ================= THEME TOGGLE ================= */
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
    body.dataset.theme = savedTheme;
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "light" ? "☀" : "☾";
    themeToggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
}

themeToggle.addEventListener("click", () => {
    const newTheme = body.dataset.theme === "light" ? "dark" : "light";
    body.dataset.theme = newTheme;
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeIcon(newTheme);
});

/* ================= MOBILE MENU ================= */
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

/* ================= BACK TO TOP ================= */
window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }

    updateActiveNav();
});

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ================= ACTIVE NAV ================= */
function updateActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    let current = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
}

/* ================= SCROLL REVEAL ================= */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealItems.forEach(item => observer.observe(item));

/* Show hero immediately */
document.querySelectorAll("#home .reveal").forEach(item => {
    setTimeout(() => item.classList.add("visible"), 150);
});

/* ================= CLOSE MENU ON RESIZE ================= */
window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        nav.classList.remove("open");
    }
});


// Contact form: open the user's email app with the entered message.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const subject = encodeURIComponent("Portfolio Contact from " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n\n" +
      "Message:\n" + message
    );

    window.location.href =
      "mailto:maheerahnoorwaqarahmed@gmail.com?subject=" +
      subject + "&body=" + body;
  });
}
