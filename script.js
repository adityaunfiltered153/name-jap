// ============================
// RADHE RADHE PREMIUM SCRIPT
// ============================

const LIMIT = 10000000;

// ============================
// LOCAL STORAGE DATA
// ============================

let data = JSON.parse(localStorage.getItem("radheData")) || {
  currentCount: 0,
  lifetimeCount: 0,
  records: {},

  goal: 10000000,

  streak: 0,

  bestStreak: 0,

  lastJapDate: "",
};

// ============================
// DATE HELPERS
// ============================

function getTodayKey() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getCurrentMonth() {
  return new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

// ============================
// ADVANCED DATE & TIME
// ============================

function updateDateTime() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.getElementById("dateTime").innerHTML = `
🕉️ ${date}
<br>
⏰ ${time}
`;
}

setInterval(updateDateTime, 1000);

updateDateTime();

// ============================
// AUTO FOOTER YEAR
// ============================

document.getElementById("footerYear").innerHTML = `
  ❤️ Name Jap Counter © ${new Date().getFullYear()}
  <br>
  <small>
    ✨ Created by
    <a href="https://yourwebsite.com"
       target="_blank"
       style="color:#ff6b35;text-decoration:none;font-weight:bold;">
       @adityaunfiltered153
    </a>
  </small>
`;

// ============================
// SAVE DATA
// ============================

function saveData() {
  localStorage.setItem("radheData", JSON.stringify(data));
}

// ============================
// SOUND
// ============================

function playSound() {
  const sound = document.getElementById("clickSound");

  if (!sound) return;

  // Sirf pehli baar play hoga
  if (sound.paused) {
    sound.play().catch((error) => {
      console.log(error);
    });
  }
}

// ============================
// ADD JAP
// ============================

function addJap() {
  if (data.currentCount >= LIMIT) {
    alert("🎉 10000 Jap Complete!");

    return;
  }

  data.currentCount++;

  data.lifetimeCount++;

  const today = getTodayKey();

  if (!data.records[today]) {
    data.records[today] = 0;
  }

  data.records[today]++;

  updateStreak();

  animateCounter();

  saveData();

  playSound();

  updateUI();

  checkAchievements();

  if (data.currentCount === LIMIT) {
    celebrate();
  }
}

// ============================
// RESET COUNTER
// ============================

function resetCounter() {
  if (confirm("Current Counter Reset Karna Hai?")) {
    data.currentCount = 0;

    saveData();

    updateUI();
  }
}

// ============================
// UPDATE UI
// ============================

function updateUI() {
  document.getElementById("counterDisplay").innerText = data.currentCount;

  document.getElementById("currentCount").innerText = data.currentCount;

  document.getElementById("lifetimeCount").innerText = data.lifetimeCount;

  updateMala();

  updateStreakUI();

  // TODAY

  const today = getTodayKey();

  const todayCount = data.records[today] || 0;

  document.getElementById("todayCount").innerText = todayCount;

  // MONTH

  let monthlyTotal = 0;

  const month = getCurrentMonth();

  Object.keys(data.records).forEach((key) => {
    if (key.includes(month)) {
      monthlyTotal += data.records[key];
    }
  });

  document.getElementById("monthlyCount").innerText = monthlyTotal;

  // PROGRESS

  const target = data.goal || LIMIT;

  const percent = ((data.currentCount / target) * 100).toFixed(1);

  document.getElementById("progressFill").style.width = percent + "%";

  document.getElementById("progressPercent").innerText = percent + "%";

  const goalText = document.querySelector(".goal-text");

  if (goalText) {
    goalText.innerText = `Target : ${target.toLocaleString()} Jap`;
  }

  // RECORDS

  renderRecords();

  // CHART

  updateChart();

  // CALENDAR

  renderCalendar();
}

// ============================
// RECORD LIST
// ============================

function renderRecords() {
  const container = document.getElementById("recordList");

  let html = "";

  const keys = Object.keys(data.records).reverse();

  keys.forEach((date) => {
    html += `
<div class="record">

📅 ${date}
<br>

🙏 Jap Count :
<b>${data.records[date]}</b>

</div>
`;
  });

  if (html === "") {
    html = '<div class="record">No Records Found</div>';
  }

  container.innerHTML = html;
}

// ============================
// SEARCH FILTER
// ============================

function filterRecords() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  document.querySelectorAll(".record").forEach((record) => {
    record.style.display = record.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
}

// ============================
// WHATSAPP SHARE
// ============================

// ============================
// PREMIUM WHATSAPP SHARE
// ============================

function shareWhatsApp() {
  const todayCount = data.records[getTodayKey()] || 0;

  let monthlyTotal = 0;

  const month = getCurrentMonth();

  Object.keys(data.records).forEach((key) => {
    if (key.includes(month)) {
      monthlyTotal += data.records[key];
    }
  });

  const goal = data.goal || 10000;

  const progress = ((todayCount / goal) * 100).toFixed(1);

  const totalMala = Math.floor(data.lifetimeCount / 108);

  const streak = data.streak || 0;

  const bestStreak = data.bestStreak || 0;

  const text = `🌸🙏 RADHE RADHE 🙏🌸

📿 Name Jap Report

🔢 Current Counter : ${data.currentCount}

📅 Today's Jap : ${todayCount}

📈 Monthly Jap : ${monthlyTotal}

🏆 Lifetime Jap : ${data.lifetimeCount}

🎯 Daily Goal : ${goal}

⚡ Goal Progress : ${progress}%

📿 Total Mala : ${totalMala}

🔥 Current Streak : ${streak} Days

👑 Best Streak : ${bestStreak} Days

🏅 Achievement Status

${data.lifetimeCount >= 108 ? "✅ 108 Badge" : "❌ 108 Badge"}

${data.lifetimeCount >= 1008 ? "✅ 1008 Badge" : "❌ 1008 Badge"}

${data.lifetimeCount >= 5000 ? "✅ 5000 Badge" : "❌ 5000 Badge"}

${data.lifetimeCount >= 10000 ? "✅ 10000 Badge" : "❌ 10000 Badge"}

🕉️ Jai Shri Radhe ❤️

📅 ${new Date().toLocaleDateString("en-IN")}
⏰ ${new Date().toLocaleTimeString("en-IN")}
`;

  window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
}

// ============================
// PDF EXPORT
// ============================

// ============================
// PREMIUM PDF EXPORT
// ============================

function exportPDF() {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  const pageWidth = pdf.internal.pageSize.getWidth();

  // ==========================
  // DATA
  // ==========================

  const todayCount = data.records[getTodayKey()] || 0;

  let monthlyTotal = 0;

  const month = getCurrentMonth();

  Object.keys(data.records).forEach((key) => {
    if (key.includes(month)) {
      monthlyTotal += data.records[key];
    }
  });

  const goal = data.goal || 10000;

  const progress = ((todayCount / goal) * 100).toFixed(1);

  const totalMala = Math.floor(data.lifetimeCount / 108);

  const streak = data.streak || 0;

  const bestStreak = data.bestStreak || 0;

  // ==========================
  // HEADER
  // ==========================

  pdf.setFillColor(255, 153, 51);

  pdf.rect(0, 0, pageWidth, 30, "F");

  pdf.setTextColor(255, 255, 255);

  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(20);

  pdf.text("NAME JAP PREMIUM REPORT", pageWidth / 2, 18, { align: "center" });

  // ==========================
  // DATE
  // ==========================

  pdf.setTextColor(0, 0, 0);

  pdf.setFontSize(11);

  pdf.text(`Generated On : ${new Date().toLocaleString()}`, 15, 40);

  // ==========================
  // SUMMARY
  // ==========================

  pdf.setDrawColor(255, 153, 51);

  pdf.roundedRect(15, 50, 180, 90, 3, 3);

  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(14);

  pdf.text("Premium Summary", 20, 60);

  pdf.setFont("helvetica", "normal");

  pdf.setFontSize(11);

  pdf.text(`Current Counter : ${data.currentCount}`, 20, 72);

  pdf.text(`Today's Jap : ${todayCount}`, 20, 82);

  pdf.text(`Monthly Jap : ${monthlyTotal}`, 20, 92);

  pdf.text(`Lifetime Jap : ${data.lifetimeCount}`, 20, 102);

  pdf.text(`Daily Goal : ${goal}`, 110, 72);

  pdf.text(`Goal Progress : ${progress}%`, 110, 82);

  pdf.text(`Total Mala : ${totalMala}`, 110, 92);

  pdf.text(`Current Streak : ${streak} Days`, 110, 102);

  pdf.text(`Best Streak : ${bestStreak} Days`, 110, 112);

  // ==========================
  // ACHIEVEMENTS
  // ==========================

  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(13);

  pdf.text("Achievement Status", 15, 155);

  pdf.setFont("helvetica", "normal");

  pdf.text(
    data.lifetimeCount >= 108 ? "YES - 108 Badge" : "NO - 108 Badge",
    20,
    165,
  );

  pdf.text(
    data.lifetimeCount >= 1008 ? "YES - 1008 Badge" : "NO - 1008 Badge",
    80,
    165,
  );

  pdf.text(
    data.lifetimeCount >= 5000 ? "YES - 5000 Badge" : "NO - 5000 Badge",
    140,
    165,
  );

  pdf.text(
    data.lifetimeCount >= 10000 ? "YES - 10000 Badge" : "NO - 10000 Badge",
    20,
    175,
  );

  // ==========================
  // RECORDS TITLE
  // ==========================

  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(15);

  pdf.text("Daily Jap Records", 15, 190);

  // ==========================
  // TABLE
  // ==========================

  let y = 205;

  pdf.setFillColor(240, 240, 240);

  pdf.rect(15, y - 7, 180, 10, "F");

  pdf.text("Date", 20, y);

  pdf.text("Count", 150, y);

  y += 10;

  pdf.setFont("helvetica", "normal");

  Object.entries(data.records)
    .reverse()
    .forEach(([date, count]) => {
      if (y > 270) {
        pdf.addPage();

        y = 20;

        pdf.setFont("helvetica", "bold");

        pdf.text("Daily Jap Records (Continued)", 15, y);

        y += 15;

        pdf.setFont("helvetica", "normal");
      }

      pdf.line(15, y - 5, 195, y - 5);

      pdf.text(date, 20, y);

      pdf.text(String(count), 150, y);

      y += 10;
    });

  // ==========================
  // FOOTER
  // ==========================

  const totalPages = pdf.internal.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);

    pdf.setFontSize(10);

    pdf.text("Radhe Radhe Name Jap Counter", pageWidth / 2, 285, {
      align: "center",
    });

    pdf.text("Created By AdityaUnfiltered153", pageWidth / 2, 290, {
      align: "center",
    });

    pdf.text(`Page ${i} of ${totalPages}`, 195, 290, { align: "right" });
  }

  // ==========================
  // SAVE
  // ==========================

  pdf.save(
    `Name-Jap-Premium-Report-${new Date().toISOString().slice(0, 10)}.pdf`,
  );
}

// ============================
// ACHIEVEMENTS
// ============================

function unlockBadge(id, message) {
  const badge = document.getElementById(id);

  if (badge && !badge.classList.contains("unlocked")) {
    badge.classList.remove("locked");

    badge.classList.add("unlocked");

    showAchievement(message);
  }
}

function checkAchievements() {
  const total = data.lifetimeCount;

  if (total >= 108) {
    unlockBadge("badge108", "🌸 108 Jap Complete");
  }

  if (total >= 1008) {
    unlockBadge("badge1008", "🙏 1008 Jap Complete");
  }

  if (total >= 5000) {
    unlockBadge("badge5000", "🕉️ 5000 Jap Complete");
  }

  if (total >= 10000) {
    unlockBadge("badge10000", "👑 10000 Jap Complete");
  }
  if (total >= 50000) {
    unlockBadge("badge25000", "🏅 50000 Jap Complete");
  }

  if (total >= 100000) {
    unlockBadge("badge50000", "💎 100000 Jap Complete");
  }

  if (total >= 10000000) {
    unlockBadge("badge100000", "👑 10000000 Jap Complete");
  }
}

function showAchievement(text) {
  const popup = document.getElementById("achievementPopup");

  document.getElementById("achievementText").innerText = text;

  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// ============================
// CONFETTI
// ============================

function celebrate() {
  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 300,

      spread: 180,

      origin: { y: 0.6 },
    });
  }
}

// ============================
// CHART JS
// ============================

// ============================
// PREMIUM ANALYTICS CHART 2026
// ============================

let chart;
let currentRange = 30;
let currentChartType = "bar";

function changeRange(days) {
  currentRange = days;

  document.querySelectorAll(".chart-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const buttons = document.querySelectorAll(".chart-btn");

  if (days === 7 && buttons[0]) buttons[0].classList.add("active");
  if (days === 30 && buttons[1]) buttons[1].classList.add("active");
  if (days === 90 && buttons[2]) buttons[2].classList.add("active");

  updateChart();
}

function toggleChartType() {
  currentChartType =
    currentChartType === "bar"
      ? "line"
      : "bar";

  updateChart();
}

function updateChart() {

  const canvas =
    document.getElementById("monthlyChart");

  if (!canvas) return;

  // Records Data

  const entries =
    Object.entries(data.records || {});

  if (entries.length === 0) {

    if (chart) {
      chart.destroy();
    }

    return;
  }

  // Last N Days

  const recent =
    entries.slice(-currentRange);

 const labels =
  recent.map(([date]) => {

    const parts = date.split(" ");

    return `${parts[1]} ${parts[2]} ${parts[3]}`;

  });

  const values =
    recent.map(([_, count]) => count);

  // Analytics

  const total =
    values.reduce(
      (a, b) => a + b,
      0
    );

  const bestDay =
    values.length
      ? Math.max(...values)
      : 0;

  const first =
    values[0] || 0;

  const last =
    values[values.length - 1] || 0;

  let growth = 0;

  if (first > 0) {
    growth =
      (
        ((last - first) / first) *
        100
      ).toFixed(1);
  }

  // Mini Cards

  const bestDayEl =
    document.getElementById(
      "bestDayCount"
    );

  const growthEl =
    document.getElementById(
      "growthRate"
    );

  const totalEl =
    document.getElementById(
      "chartTotal"
    );

  const totalDaysEl =
    document.getElementById(
      "totalDays"
    );

  if (bestDayEl)
    bestDayEl.innerText = bestDay;

  if (growthEl)
    growthEl.innerText =
      growth + "%";

  if (totalEl)
    totalEl.innerText =
      total.toLocaleString();

  if (totalDaysEl)
    totalDaysEl.innerText =
      values.length;

  // Destroy old chart

  if (chart) {
    chart.destroy();
  }

  const ctx =
    canvas.getContext("2d");

  // Premium Gradient

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      400
    );

  gradient.addColorStop(
    0,
    "rgba(255,215,0,.95)"
  );

  gradient.addColorStop(
    0.5,
    "rgba(255,153,51,.85)"
  );

  gradient.addColorStop(
    1,
    "rgba(255,105,180,.25)"
  );

  chart = new Chart(ctx, {

    type: currentChartType,

    data: {

      labels,

      datasets: [
        {
          label: "Daily Jap",

          data: values,

          backgroundColor:
            gradient,

          borderColor:
            "#FFD700",

          borderWidth: 3,

          borderRadius: 12,

          fill: true,

          tension: 0.45,

          pointRadius: 5,

          pointHoverRadius: 8,

          pointBackgroundColor:
            "#FFD700",

          pointBorderColor:
            "#fff",
        },
      ],
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      animation: {
        duration: 1200,
      },

      interaction: {
        intersect: false,
        mode: "index",
      },

      plugins: {

        legend: {
          display: false,
        },

        tooltip: {

          backgroundColor:
            "rgba(0,0,0,.85)",

          titleColor:
            "#FFD700",

          bodyColor:
            "#fff",

          padding: 12,

          cornerRadius: 12,

          displayColors: false,

          callbacks: {
            label: function (
              context
            ) {
              return (
                "🙏 Jap : " +
                context.raw
              );
            },
          },
        },
      },

      scales: {

        x: {

          grid: {
            display: false,
          },

          ticks: {
            color:
              "#ffffff",
            maxRotation: 0,
          },
        },

        y: {

          beginAtZero: true,

          grid: {
            color:
              "rgba(255,255,255,.08)",
          },

          ticks: {
            color:
              "#ffffff",
          },
        },
      },
    },
  });
}

// ============================
// AUTO LOAD CHART
// ============================

document.addEventListener(
  "DOMContentLoaded",
  () => {
    updateChart();
  }
);

// ============================
// FLOATING HINDI TEXT
// ============================

function createFloatingText() {
  const bg = document.getElementById("floating-bg");

  if (!bg) return;

  const names = [
    "राधे राधे",
    "राधे राधे",
    "राधे राधे",
    "राधे राधे",
    "राधे राधे",
  ];

  for (let i = 0; i < 50; i++) {
    const span = document.createElement("div");

    span.className = "floating-text";

    span.innerText = names[Math.floor(Math.random() * names.length)];

    span.style.left = Math.random() * 100 + "%";

    span.style.fontSize = 16 + Math.random() * 20 + "px";

    span.style.animationDuration = 10 + Math.random() * 20 + "s";

    span.style.animationDelay = Math.random() * 10 + "s";

    bg.appendChild(span);
  }
}

// ============================
// INIT
// ============================

createFloatingText();

updateUI();

checkAchievements();

// ============================
// TOTAL MALA
// ============================

function updateMala() {
  const el = document.getElementById("malaCount");

  if (!el) return;

  el.innerText = Math.floor(data.lifetimeCount / 108);
}

// ============================
// STREAK SYSTEM
// ============================

function updateStreak() {
  const today = new Date().toISOString().split("T")[0];

  if (data.lastJapDate === today) {
    return;
  }

  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  const yDate = yesterday.toISOString().split("T")[0];

  if (data.lastJapDate === yDate) {
    data.streak++;
  } else {
    data.streak = 1;
  }

  data.lastJapDate = today;

  if (data.streak > data.bestStreak) {
    data.bestStreak = data.streak;
  }
}

// ============================
// UPDATE STREAK UI
// ============================

function updateStreakUI() {
  const current = document.getElementById("currentStreak");

  const best = document.getElementById("bestStreak");

  if (current) {
    current.innerText = data.streak + " Days";
  }

  if (best) {
    best.innerText = "Best : " + data.bestStreak + " Days";
  }
}

// ============================
// CUSTOM GOAL
// ============================

function saveGoal() {
  const input = document.getElementById("goalInput");

  if (!input) return;

  const goal = parseInt(input.value);

  if (!goal || goal <= 0) {
    alert("Valid Goal Enter Karo");

    return;
  }

  data.goal = goal;

  saveData();

  updateUI();
}

// ============================
// COUNTER ANIMATION
// ============================

function animateCounter() {
  const counter = document.getElementById("counterDisplay");

  if (!counter) return;

  counter.classList.add("counter-pop");

  setTimeout(() => {
    counter.classList.remove("counter-pop");
  }, 250);
}

// ============================
// CALENDAR
// ============================

// ============================
// AUTO MONTH CALENDAR
// ============================

// ============================
// PREMIUM AUTO CALENDAR
// ============================

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");

  const title = document.getElementById("calendarTitle");

  if (!grid) return;

  grid.innerHTML = "";

  const today = new Date();

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",

    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (title) {
    title.innerText = `${monthNames[currentMonth]} ${currentYear}`;
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  dayNames.forEach((day) => {
    const div = document.createElement("div");

    div.className = "calendar-day-name";

    div.innerText = day;

    grid.appendChild(div);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Empty boxes before month start

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");

    grid.appendChild(empty);
  }

  // Dates

  for (let day = 1; day <= totalDays; day++) {
    const box = document.createElement("div");

    box.className = "calendar-date";

    const dateObj = new Date(currentYear, currentMonth, day);

    const recordKey = dateObj.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const count = data.records[recordKey] || 0;

    // Check past date

    const todayOnly = new Date();

    todayOnly.setHours(0, 0, 0, 0);

    const checkDate = new Date(currentYear, currentMonth, day);

    checkDate.setHours(0, 0, 0, 0);

    const isPast = checkDate < todayOnly;

    // Jap done

    if (count > 0) {
      box.classList.add("calendar-active");
    }

    // Missed Day
    else if (isPast) {
      box.classList.add("calendar-missed");
    }

    const isToday = day === today.getDate();

    box.innerHTML = `

        <div>

            ${isToday ? "🔥" : ""}

            ${day}

        </div>

        <div
        class="calendar-count">

            ${count > 0 ? "🙏 " + count : isPast ? "❌" : ""}

        </div>

        `;

    grid.appendChild(box);
  }
}

// ============================
// VOICE JAP
// ============================

// ============================
// CONTINUOUS VOICE JAP
// ============================


// ============================
// CONTINUOUS VOICE JAP
// ============================

let voiceRecognition;
let voiceRunning = false;

function startVoiceCounter() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("❌ Voice Recognition Supported Nahi Hai");
    return;
  }

  const btn = document.querySelector(
    'button[onclick="startVoiceCounter()"]'
  );

  // STOP VOICE
  if (voiceRunning) {
    voiceRunning = false;

    if (voiceRecognition) {
      voiceRecognition.stop();
    }

    if (btn) {
      btn.innerHTML = "🎤 Voice Jap";
    }

    alert("🛑 Voice Jap Stopped");

    return;
  }

  // START VOICE
  voiceRecognition = new SpeechRecognition();

  voiceRecognition.lang = "hi-IN";

  voiceRecognition.continuous = true;

  voiceRecognition.interimResults = false;

  voiceRunning = true;

  if (btn) {
    btn.innerHTML = "🛑 Stop Voice";
  }

  alert("🎤 Voice Jap Started\n\n'राधे' bolte rahiye");

  voiceRecognition.start();

  voiceRecognition.onresult = (event) => {
    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      const text = event.results[i][0].transcript
        .toLowerCase()
        .trim();

      console.log("Detected:", text);

      // Radhe Detection
      if (
        text.includes("राधे") ||
        text.includes("राधे राधे") ||
        text.includes("radhe") ||
        text.includes("radhey") ||
        text.includes("radha") ||
        text.includes("राधा")
      ) {
        addJap();

        console.log("🙏 Jap Added");
      }
    }
  };

  // Auto Restart
  voiceRecognition.onend = () => {
    if (voiceRunning) {
      try {
        voiceRecognition.start();
      } catch (e) {
        console.log(e);
      }
    }
  };

  voiceRecognition.onerror = (event) => {
    console.log("Voice Error:", event.error);

    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed"
    ) {
      alert(
        "🎤 Microphone Permission Allow Karo"
      );

      voiceRunning = false;

      if (btn) {
        btn.innerHTML = "🎤 Voice Jap";
      }
    }
  };
}

// ============================
// BACKUP
// ============================

function backupData() {
  const dataStr = JSON.stringify(data, null, 2);

  const blob = new Blob([dataStr], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "RadheBackup.json";

  a.click();
}

// ============================
// RESTORE
// ============================

function restoreData(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      data = JSON.parse(e.target.result);

      saveData();

      updateUI();

      alert("✅ Backup Restored");
    } catch {
      alert("❌ Invalid Backup");
    }
  };

  reader.readAsText(file);
}

// ============================
// SHARE REPORT IMAGE
// ============================

async function shareReportImage() {
  const todayCount = data.records[getTodayKey()] || 0;

  let monthlyTotal = 0;

  const month = getCurrentMonth();

  Object.keys(data.records).forEach((key) => {
    if (key.includes(month)) {
      monthlyTotal += data.records[key];
    }
  });

  const totalMala = Math.floor(data.lifetimeCount / 108);

  const card = document.createElement("div");

  card.style.width = "800px";

  card.style.padding = "40px";

  card.style.background = "linear-gradient(135deg,#FF9933,#FFD700)";

  card.style.color = "#000";

  card.style.borderRadius = "25px";

  card.style.fontFamily = "Poppins";

  card.style.position = "fixed";

  card.style.left = "-9999px";

  card.innerHTML = `

      <div style="
      text-align:center;
      margin-bottom:25px;
      ">

      <h1>
      🌸 RADHE RADHE 🌸
      </h1>

      <h2>
      Name Jap Report
      </h2>

      </div>

      <hr>

      <p>
      📿 Current Counter :
      <b>${data.currentCount}</b>
      </p>

      <p>
      📅 Today's Jap :
      <b>${todayCount}</b>
      </p>

      <p>
      📈 Monthly Jap :
      <b>${monthlyTotal}</b>
      </p>

      <p>
      🏆 Lifetime Jap :
      <b>${data.lifetimeCount}</b>
      </p>

      <p>
      📿 Total Mala :
      <b>${totalMala}</b>
      </p>

      <p>
      🔥 Current Streak :
      <b>${data.streak}</b>
      Days
      </p>

      <p>
      👑 Best Streak :
      <b>${data.bestStreak}</b>
      Days
      </p>

      <br>

      <div style="
      text-align:center;
      margin-top:30px;
      ">

      ❤️ Jai Shri Radhe ❤️

      <br><br>

      ${new Date().toLocaleString()}

      </div>

    `;

  document.body.appendChild(card);

  const canvas = await html2canvas(card, {
    scale: 2,
  });

  document.body.removeChild(card);

  canvas.toBlob(
    async (blob) => {
      const file = new File(
        [blob],

        "NameJapReport.png",

        {
          type: "image/png",
        },
      );

      if (
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        try {
          await navigator.share({
            title: "Name Jap Report",

            text: "Radhe Radhe 🙏",

            files: [file],
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "NameJapReport.png";

        link.click();
      }
    },

    "image/png",
  );
}
