
// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#6366f1" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6366f1",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    },
    retina_detect: true
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'light' ||
    (window.matchMedia('(prefers-color-scheme: light)').matches && !localStorage.getItem('theme'))) {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // Save preference
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll animations with GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('.section').forEach(section => {
    gsap.fromTo(section,
        { autoAlpha: 0, y: 50 },
        {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Animate project cards
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.fromTo(card,
        { autoAlpha: 0, y: 30 },
        {
            duration: 0.8,
            autoAlpha: 1,
            y: 0,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});






// Typewriter effect
const typewriterText = document.querySelector('.typewriter h3');
const texts = ['Full Stack Developer', 'Django Developer', '.NET Developer', 'Problem Solver', 'PHP Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end of typing
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex === texts.length) textIndex = 0;
        typingSpeed = 500; // Pause before starting next text
    }

    setTimeout(type, typingSpeed);
}

// Start the typewriter effect
setTimeout(type, 1000);

// Form submission
// document.getElementById("contactForm").addEventListener("submit", function (e) {
//     e.preventDefault(); // prevent normal form submit

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const subject = document.getElementById("subject").value;
//     const message = document.getElementById("message").value;

//     triggerwait(true); // 🔒 lock UI

//     fetch("./send_email.php", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"   // tell PHP it's JSON
//         },
//         body: JSON.stringify({ name, email, subject, message })
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.success) {
//                 alert("✅ " + data.message);
//                 document.getElementById("contactForm").reset(); // clear form
//             } else {
//                 alert("❌ " + data.message);
//             }
//         })
//         .catch(err => {
//             console.error("Fetch error:", err);
//             alert("Something went wrong. Check console for details.");
//         })
//         .finally(() => {
//             triggerwait(false); // 🔓 unlock UI
//         });
// });


// Form submission using EmailJS
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    triggerwait(true); // lock UI

    emailjs.send("service_vc405j9", "template_dx8s3di", {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })
    .then(() => {
        alert("✅ Message sent successfully!");
        document.getElementById("contactForm").reset();
    }, (error) => {
        console.error("EmailJS error:", error);
        alert("❌ Failed to send message. Try again later.");
    })
    .finally(() => {
        triggerwait(false); // unlock UI
    });
});


// 🔧 Function to lock/unlock UI
function triggerwait(lock) {
    let overlay = document.getElementById("overlay");

    if (!overlay) {
        // create overlay if not exists
        overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.5)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        overlay.innerHTML = "<div style='color:white;font-size:1.2rem;'>⏳ Sending your message...</div>";
        document.body.appendChild(overlay);
    }

    overlay.style.display = lock ? "flex" : "none";
}

