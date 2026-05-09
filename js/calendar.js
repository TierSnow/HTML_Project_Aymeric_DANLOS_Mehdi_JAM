const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("month-year");

let currentDate = new Date();

function renderCalendar(date) {
    calendarEl.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    // Week headers
    const daysRow = document.createElement("div");
    daysRow.classList.add("calendar-row");

    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day => {
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell", "header");
        cell.textContent = day;
        daysRow.appendChild(cell);
    });

    calendarEl.appendChild(daysRow);

    let row = document.createElement("div");
    row.classList.add("calendar-row");

    // empty cells before month starts
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("calendar-cell");
        row.appendChild(empty);
    }

    // days
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell");
        cell.textContent = day;

        // highlight today
        const today = new Date();
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }

        row.appendChild(cell);

        if ((startDay + day) % 7 === 0) {
            calendarEl.appendChild(row);
            row = document.createElement("div");
            row.classList.add("calendar-row");
        }
    }

    calendarEl.appendChild(row);
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);