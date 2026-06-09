// ============================
// RADHE RADHE PREMIUM SCRIPT
// ============================

const LIMIT = 10000;

// ============================
// LOCAL STORAGE DATA
// ============================

let data = JSON.parse(
    localStorage.getItem("radheData")
) || {

    currentCount: 0,
    lifetimeCount: 0,
    records: {}

};

// ============================
// DATE HELPERS
// ============================

function getTodayKey() {

    return new Date().toLocaleDateString(
        'en-IN',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    );

}

function getCurrentMonth() {

    return new Date().toLocaleDateString(
        'en-IN',
        {
            month: 'long',
            year: 'numeric'
        }
    );

}

// ============================
// ADVANCED DATE & TIME
// ============================

function updateDateTime() {

    const now = new Date();

    const time =
        now.toLocaleTimeString(
            'en-IN',
            {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        );

    const date =
        now.toLocaleDateString(
            'en-IN',
            {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
        );

    document.getElementById(
        "dateTime"
    ).innerHTML = `
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

    localStorage.setItem(
        "radheData",
        JSON.stringify(data)
    );

}

// ============================
// SOUND
// ============================

function playSound() {

    const sound = document.getElementById("clickSound");

    if (!sound) return;

    // Sirf pehli baar play hoga
    if (sound.paused) {
        sound.play().catch(error => {
            console.log(error);
        });
    }

}

// ============================
// ADD JAP
// ============================

function addJap() {

    if (data.currentCount >= LIMIT) {

        alert(
            "🎉 10000 Jap Complete!"
        );

        return;

    }

    data.currentCount++;

    data.lifetimeCount++;

    const today =
        getTodayKey();

    if (!data.records[today]) {

        data.records[today] = 0;

    }

    data.records[today]++;

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

    if (confirm(
        "Current Counter Reset Karna Hai?"
    )) {

        data.currentCount = 0;

        saveData();

        updateUI();

    }

}

// ============================
// UPDATE UI
// ============================

function updateUI() {

    document.getElementById(
        "counterDisplay"
    ).innerText =
        data.currentCount;

    document.getElementById(
        "currentCount"
    ).innerText =
        data.currentCount;

    document.getElementById(
        "lifetimeCount"
    ).innerText =
        data.lifetimeCount;

    // TODAY

    const today =
        getTodayKey();

    const todayCount =
        data.records[today] || 0;

    document.getElementById(
        "todayCount"
    ).innerText =
        todayCount;

    // MONTH

    let monthlyTotal = 0;

    const month =
        getCurrentMonth();

    Object.keys(data.records)
        .forEach(key => {

            if (key.includes(month)) {

                monthlyTotal +=
                    data.records[key];

            }

        });

    document.getElementById(
        "monthlyCount"
    ).innerText =
        monthlyTotal;

    // PROGRESS

    const percent =
        ((data.currentCount / LIMIT)
            * 100)
            .toFixed(1);

    document.getElementById(
        "progressFill"
    ).style.width =
        percent + "%";

    document.getElementById(
        "progressPercent"
    ).innerText =
        percent + "%";

    // RECORDS

    renderRecords();

    // CHART

    updateChart();

}

// ============================
// RECORD LIST
// ============================

function renderRecords() {

    const container =
        document.getElementById(
            "recordList"
        );

    let html = "";

    const keys =
        Object.keys(data.records)
            .reverse();

    keys.forEach(date => {

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

        html =
            '<div class="record">No Records Found</div>';

    }

    container.innerHTML =
        html;

}

// ============================
// SEARCH FILTER
// ============================

function filterRecords() {

    const value =
        document.getElementById(
            "searchInput"
        )
            .value
            .toLowerCase();

    document
        .querySelectorAll(".record")
        .forEach(record => {

            record.style.display =
                record.innerText
                    .toLowerCase()
                    .includes(value)
                    ? "block"
                    : "none";

        });

}

// ============================
// WHATSAPP SHARE
// ============================

function shareWhatsApp() {

    const text =
        `🌸 Radhe Radhe 🌸

Current Jap : ${data.currentCount}

Today's Jap :
${data.records[getTodayKey()] || 0}

Monthly Jap :
${document.getElementById("monthlyCount").innerText}

Lifetime Jap :
${data.lifetimeCount}

Jai Shri Radhe ❤️`;

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(text),
        "_blank"
    );

}

// ============================
// PDF EXPORT
// ============================

function exportPDF() {

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();

    // HEADER
    pdf.setFillColor(255, 153, 51);
    pdf.rect(0, 0, pageWidth, 30, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);

    pdf.text(
        "NAME JAP REPORT",
        pageWidth / 2,
        18,
        { align: "center" }
    );

    // REPORT DATE
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);

    pdf.text(
        `Generated On: ${new Date().toLocaleString()}`,
        15,
        40
    );

    // SUMMARY BOX
    pdf.setDrawColor(255, 153, 51);
    pdf.roundedRect(
        15,
        50,
        180,
        35,
        3,
        3
    );

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");

    pdf.text(
        "Summary",
        20,
        60
    );

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    pdf.text(
        `Current Counter : ${data.currentCount}`,
        20,
        70
    );

    pdf.text(
        `Lifetime Count : ${data.lifetimeCount}`,
        20,
        78
    );

    // RECORDS TITLE
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");

    pdf.text(
        "Daily Records",
        15,
        105
    );

    // TABLE HEADER
    let y = 120;

    pdf.setFillColor(240, 240, 240);
    pdf.rect(15, y - 7, 180, 10, "F");

    pdf.text("Date", 20, y);
    pdf.text("Count", 140, y);

    y += 10;

    pdf.setFont("helvetica", "normal");

    Object.entries(data.records).forEach(
        ([date, count]) => {

            if (y > 270) {

                pdf.addPage();

                y = 20;

                pdf.setFont(
                    "helvetica",
                    "bold"
                );

                pdf.text(
                    "Daily Records (Continued)",
                    15,
                    y
                );

                y += 15;

                pdf.setFont(
                    "helvetica",
                    "normal"
                );
            }

            pdf.line(
                15,
                y - 5,
                195,
                y - 5
            );

            pdf.text(
                date,
                20,
                y
            );

            pdf.text(
                String(count),
                140,
                y
            );

            y += 10;
        }
    );

    // FOOTER
    const totalPages =
        pdf.internal.getNumberOfPages();

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {
        pdf.setPage(i);

        pdf.setFontSize(10);

        pdf.text(
            `Created by AdityaUnfiltered153`,
            pageWidth / 2,
            290,
            { align: "center" }
        );

        pdf.text(
            `Page ${i} of ${totalPages}`,
            190,
            290,
            { align: "right" }
        );
    }

    pdf.save(
        `Name Jap Report-${new Date().toISOString().slice(0,10)}.pdf`
    );
}

// ============================
// ACHIEVEMENTS
// ============================

function unlockBadge(
    id,
    message
) {

    const badge =
        document.getElementById(id);

    if (
        badge &&
        !badge.classList.contains(
            "unlocked"
        )
    ) {

        badge.classList.remove(
            "locked"
        );

        badge.classList.add(
            "unlocked"
        );

        showAchievement(
            message
        );

    }

}

function checkAchievements() {

    const total =
        data.lifetimeCount;

    if (total >= 108) {

        unlockBadge(
            "badge108",
            "🌸 108 Jap Complete"
        );

    }

    if (total >= 1008) {

        unlockBadge(
            "badge1008",
            "🙏 1008 Jap Complete"
        );

    }

    if (total >= 5000) {

        unlockBadge(
            "badge5000",
            "🕉️ 5000 Jap Complete"
        );

    }

    if (total >= 10000) {

        unlockBadge(
            "badge10000",
            "👑 10000 Jap Complete"
        );

    }

}

function showAchievement(
    text
) {

    const popup =
        document.getElementById(
            "achievementPopup"
        );

    document.getElementById(
        "achievementText"
    ).innerText =
        text;

    popup.style.display =
        "block";

    setTimeout(() => {

        popup.style.display =
            "none";

    }, 3000);

}

// ============================
// CONFETTI
// ============================

function celebrate() {

    if (typeof confetti !==
        "undefined") {

        confetti({

            particleCount: 300,

            spread: 180,

            origin: { y: 0.6 }

        });

    }

}

// ============================
// CHART JS
// ============================

let chart;

function updateChart() {

    const canvas =
        document.getElementById(
            "monthlyChart"
        );

    if (!canvas) return;

    const labels =
        Object.keys(data.records);

    const values =
        Object.values(data.records);

    if (chart) {

        chart.destroy();

    }

    chart = new Chart(
        canvas,
        {

            type: 'bar',

            data: {

                labels: labels,

                datasets: [{

                    label: 'Daily Jap',

                    data: values,

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: true

                    }

                }

            }

        }

    );

}

// ============================
// FLOATING HINDI TEXT
// ============================

function createFloatingText() {

    const bg =
        document.getElementById(
            "floating-bg"
        );

    if (!bg) return;

    const names = [

        "राधे राधे",
        "जय श्री राधे",
        "राधे कृष्ण",
        "श्री राधे",
        "राधे रानी"

    ];

    for (let i = 0; i < 50; i++) {

        const span =
            document.createElement(
                "div"
            );

        span.className =
            "floating-text";

        span.innerText =
            names[
            Math.floor(
                Math.random() *
                names.length
            )
            ];

        span.style.left =
            Math.random() * 100 + "%";

        span.style.fontSize =
            (16 +
                Math.random() * 20)
            + "px";

        span.style.animationDuration =
            (10 +
                Math.random() * 20)
            + "s";

        span.style.animationDelay =
            Math.random() * 10
            + "s";

        bg.appendChild(span);

    }

}

// ============================
// INIT
// ============================

createFloatingText();

updateUI();

checkAchievements();