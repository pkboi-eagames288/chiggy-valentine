/* =========================
   ELEMENTS
========================= */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const yesHint = document.getElementById("yesHint");
const cat = document.getElementById("cat");
const message = document.getElementById("message");
const question = document.getElementById("question");
const music = document.getElementById("bgMusic");
const yayImage = document.getElementById("yayImage");

const dayWish = document.getElementById("dayWish");
const valentineWeek = document.getElementById("valentineWeek");
const tomorrowNote = document.getElementById("tomorrowNote");

/* =========================
   IST DATE (SAFE)
========================= */
function getISTDate() {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
}

/* =========================
   VALENTINE DAYS
========================= */
const valentineDays = [
    { date: "02-07", name: "Rose Day", emoji: "🌹" },
    { date: "02-08", name: "Propose Day", emoji: "💌" },
    { date: "02-09", name: "Chocolate Day", emoji: "🍫" },
    { date: "02-10", name: "Teddy Day", emoji: "🧸" },
    { date: "02-11", name: "Promise Day", emoji: "🤝" },
    { date: "02-12", name: "Hug Day", emoji: "🤗" },
    { date: "02-13", name: "Kiss Day", emoji: "😘" },
    { date: "02-14", name: "Valentine’s Day", emoji: "❤️" }
];

/* =========================
   UPDATE DAY CONTENT
========================= */
function updateDayContent() {
    const today = getISTDate();

    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const todayName = dayNames[today.getDay()];
    const todayDate = today.toDateString();

    dayWish.innerHTML =
        `Happy ${todayName}!, Veda 💖<br><small>${todayDate} (IST)</small>`;

    // MM-DD
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayKey = `${mm}-${dd}`;

    let todayValentine = null;

    valentineWeek.innerHTML = valentineDays.map(d => {
        if (d.date === todayKey) {
            todayValentine = d;
            return `<div class="today">${d.emoji} ${d.name} — TODAY</div>`;
        }
        return `<div>${d.emoji} ${d.name}</div>`;
    }).join("");

    if (todayValentine) {
        message.innerText = `Happy ${todayValentine.name}, Chiggy 💕`;
    } else {
        message.innerText = "";
    }

    tomorrowNote.innerText =
        "If you open this website tomorrow, you’ll get the next day’s wish 💕";
}

// Run once on load
updateDayContent();

/* =========================
   MIDNIGHT AUTO-SWITCH (IST)
========================= */
function scheduleMidnightUpdate() {
    const now = getISTDate();

    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    const msUntilMidnight = nextMidnight - now;

    setTimeout(() => {
        updateDayContent();
        scheduleMidnightUpdate(); // schedule next day
    }, msUntilMidnight);
}

scheduleMidnightUpdate();

/* =========================
   NO BUTTON — FOREVER DODGE
========================= */
function moveNo() {
    const x = Math.random() * 240 - 120;
    const y = Math.random() * 100 - 50;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    cat.innerText = "😔";
    cat.classList.add("sad");
    setTimeout(() => cat.classList.remove("sad"), 600);

    yesBtn.style.transform = "translateY(-6px)";
    yesHint.style.opacity = 1;

    setTimeout(() => {
        yesBtn.style.transform = "translateY(0)";
        yesHint.style.opacity = 0;
    }, 600);
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("mousemove", moveNo);
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNo();
});

document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 90) {
        moveNo();
    }
});

/* =========================
   YES BUTTON
========================= */
yesBtn.addEventListener("click", () => {
    cat.innerText = "🥰";
    cat.classList.add("wiggle", "heartbeat");

    question.innerText = "YAY!!! 💖";
    message.innerText = "Best decision ever, Chiggy 💕";

    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    revealImage();
    startMusic();
});

/* =========================
   IMAGE REVEAL
========================= */
function revealImage() {
    yayImage.style.display = "block";
    setTimeout(() => {
        yayImage.classList.add("reveal");
    }, 100);
}

/* =========================
   BACKGROUND MUSIC (FADE-IN)
========================= */
function startMusic() {
    setTimeout(() => {
        music.volume = 0;
        music.play();

        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.05;
                music.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 200);
    }, 1200);
}
