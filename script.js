/* =========================================================
   MUTHURAJ MUDALIAR - PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================
   ELEMENTS
   ========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");

const currentYear = document.getElementById("currentYear");


/* =========================
   MOBILE NAVIGATION
   ========================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    /* Close mobile menu after clicking a link */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================
   DARK / LIGHT THEME
   ========================= */

if (themeToggle) {

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        themeToggle.textContent = "☾";

    } else {

        themeToggle.textContent = "☀";

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLightTheme =
            document.body.classList.contains("light-theme");


        if (isLightTheme) {

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

            themeToggle.textContent = "☾";

        } else {

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

            themeToggle.textContent = "☀";

        }

    });

}


/* =========================
   CURRENT YEAR
   ========================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================
   ACTIVE NAVIGATION
   ========================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = sectionId;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");


        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".stat-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".achievement-card, " +
        ".certification-card, " +
        ".contact-content"
    );


/*
   Add reveal class to elements.
*/

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/*
   Intersection Observer
*/

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    /*
       Fallback for older browsers.
    */

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================
   PROJECT CARD STAGGER
   ========================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 80}ms`;

});


/* =========================
   SKILL CARD STAGGER
   ========================= */

const skillCards =
    document.querySelectorAll(".skill-card");


skillCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 60}ms`;

});


/* =========================
   SMOOTH SCROLL
   ========================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================
   CLOSE MENU WHEN CLICKING
   OUTSIDE THE MENU
   ========================= */

if (navMenu && menuToggle) {

    document.addEventListener(
        "click",
        event => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                navMenu.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                navMenu.classList.remove("open");

                menuToggle.textContent = "☰";

            }

        }
    );

}


/* =========================
   ESC KEY CLOSES MOBILE MENU
   ========================= */

if (navMenu && menuToggle) {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                navMenu.classList.remove("open");

                menuToggle.textContent = "☰";

            }

        }
    );

}


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    window.addEventListener(
        "scroll",
        () => {

            /*
               Use the CSS variable for both themes.
               This avoids forcing a white border
               when the light theme is active.
            */

            if (window.scrollY > 50) {

                navbar.style.borderBottomColor =
                    "var(--border-hover)";

            } else {

                navbar.style.borderBottomColor =
                    "var(--border)";

            }

        },
        { passive: true }
    );

}


/* =========================
   TYPING EFFECT
   ========================= */

/*
   IMPORTANT:

   Target #typing-text instead of the entire
   .hero h2 element.

   This prevents the parent <h2> from being
   destroyed/recreated while the text changes,
   which prevents layout flickering.
*/

const typingText =
    document.getElementById("typing-text");


const typingTexts = [
    "Information Technology Engineer",
    "Software Developer",
    "AI Enthusiast",
    "Problem Solver"
];


let textIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingText) {
        return;
    }


    const currentText =
        typingTexts[textIndex];


    /* =========================
       TYPING
       ========================= */

    if (!deleting) {

        characterIndex++;


        typingText.textContent =
            currentText.substring(
                0,
                characterIndex
            );


        /*
           Finished typing current word.
           Keep it visible for a while.
        */

        if (
            characterIndex >=
            currentText.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1800
            );

            return;

        }


        setTimeout(
            typeEffect,
            70
        );

        return;
    }


    /* =========================
       DELETING
       ========================= */

    characterIndex--;


    typingText.textContent =
        currentText.substring(
            0,
            characterIndex
        );


    /*
       Finished deleting current word.
    */

    if (characterIndex <= 0) {

        characterIndex = 0;

        deleting = false;

        textIndex =
            (textIndex + 1) %
            typingTexts.length;


        /*
           Small pause before starting
           the next word.
        */

        setTimeout(
            typeEffect,
            300
        );

        return;

    }


    setTimeout(
        typeEffect,
        40
    );

}


/*
   Start typing after the page has
   had time to render.
*/

if (typingText) {

    setTimeout(
        typeEffect,
        1200
    );

}


/* =========================
   PAGE LOAD
   ========================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add("loaded");

        updateActiveNavigation();

    }
);


/* =========================
   PREVENT HASH JUMP ON LOAD
   ========================= */

if (window.location.hash) {

    setTimeout(
        () => {

            window.scrollTo(0, 0);

        },
        1
    );

}