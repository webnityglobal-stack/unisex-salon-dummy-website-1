
// PRELOADER
window.addEventListener("load", () => {
    document.getElementById("loader").classList.add("hide");
});

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// HEADER SCROLL EFFECT
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(5,5,5,0.98)";
    } else {
        header.style.background = "rgba(10,10,10,0.94)";
    }
});

// MINIMUM APPOINTMENT DATE
const dateInput = document.getElementById("date");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

// BOOKING FORM - WHATSAPP
const bookingForm = document.getElementById("bookingForm");

// Replace with your actual WhatsApp number.
// Include country code without + or spaces.
const salonWhatsApp = "919876543210";

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const stylist = document.getElementById("stylist").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (!name || !service || !date || !time) {
        alert("Please complete all required fields.");
        return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
        alert("Please select today or a future date.");
        return;
    }

    const formattedDate = selectedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const formattedTime = new Date(
        `2000-01-01T${time}`
    ).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    const whatsappMessage = `
Hello ÉLORA Luxury Salon!

I would like to book an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred Stylist: ${stylist}
Date: ${formattedDate}
Time: ${formattedTime}
Additional Message: ${message || "None"}

Please confirm my appointment.

Thank you!
`;

    const whatsappURL =
        `https://wa.me/${salonWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");
});

// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    ".service-card, .team-card, .price-card, .testimonial-card, .about-content, .about-image, .gallery-grid img"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}
