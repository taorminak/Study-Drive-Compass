const date = new Date();
const DAYS_IN_WEEK = 7;
const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const calendarSection = document.querySelector("#calendar");
const calendar = document.createElement("div");
calendar.classList.add("calendar");
calendarSection.appendChild(calendar);

//навигация

const calendarNav = document.createElement("div");
calendarNav.className = "calendar__nav";

const monthsNav = document.createElement("div");
monthsNav.className = "calendar__nav-months";

const decrementMonthButton = document.createElement("button");
decrementMonthButton.className = "calendar__nav-button";
decrementMonthButton.textContent = "\u003C";

const monthSpan = document.createElement("span");
monthSpan.id = "monthSpan";

const incrementMonthButton = document.createElement("button");
incrementMonthButton.className = "calendar__nav-button";
incrementMonthButton.textContent = "\u003E";

monthsNav.appendChild(decrementMonthButton);
monthsNav.appendChild(monthSpan);
monthsNav.appendChild(incrementMonthButton);

const yearsNav = document.createElement("div");
yearsNav.className = "calendar__nav-years";

const decrementYearButton = document.createElement("button");
decrementYearButton.className = "calendar__nav-button";
decrementYearButton.textContent = "\u003C";

const incrementYearButton = document.createElement("button");
incrementYearButton.className = "calendar__nav-button";
incrementYearButton.textContent = "\u003E";

const yearSpan = document.createElement("span");
yearSpan.id = "yearSpan";

yearsNav.appendChild(decrementYearButton);
yearsNav.appendChild(yearSpan);
yearsNav.appendChild(incrementYearButton);

calendarNav.appendChild(monthsNav);
calendarNav.appendChild(yearsNav);

calendar.appendChild(calendarNav);

function changeMonth(offset) {
  date.setMonth(date.getMonth() + offset);
  updateCalendar();
}

function changeYear(offset) {
  date.setFullYear(date.getFullYear() + offset);
  updateCalendar();
}

function updateCalendar() {
  monthSpan.textContent = date.toLocaleString("ru-RU", { month: "short" });
  yearSpan.textContent = date.getFullYear();
}

decrementMonthButton.addEventListener("click", function () {
  changeMonth(-1);
  updateCalendarDays();
});

incrementMonthButton.addEventListener("click", function () {
  changeMonth(1);
  updateCalendarDays();
});

decrementYearButton.addEventListener("click", function () {
  changeYear(-1);
  updateCalendarDays();
});

incrementYearButton.addEventListener("click", function () {
  changeYear(1);
  updateCalendarDays();
});

updateCalendarDays();
updateCalendar();

//дни календаря

function getFirstWeekday(month, year) {
  const firstDayOfMonth = new Date(year, month, 1);
  
  const firstWeekDay = (firstDayOfMonth.getDay() + 6) % 7;
 
  return firstWeekDay;
}

function calculateDaysInMonth(month, year) {
  const daysOfMonth = [];
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const firstWeekDay = getFirstWeekday(month, year);

  for (let day = 1; day <= lastDayOfMonth; day++) {
    daysOfMonth.push(new Date(year, month, day));
  }

  for (let i = 0; i < firstWeekDay; i++) {
    daysOfMonth.unshift("");
  }
  return daysOfMonth;
}

function getDayClass(index, part) {
  const isWeekend = index % DAYS_IN_WEEK === 5 || index % DAYS_IN_WEEK === 6;

  if (isWeekend) {
    return part === "daysInMonth" ? `item-weekend` : `item-weekend-weekday`;
  }
}

function updateCalendarDays() {
  const existingContainer = calendar.querySelector(".calendar__container-days");
  if (existingContainer) {
    existingContainer.remove();
  }

  const container = document.createElement("div");
  container.classList.add("calendar__container-days");
  calendar.appendChild(container);

  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "container__item-day item-weekday";
    dayElement.textContent = day;
    container.appendChild(dayElement);
  });

  const daysInMonth = calculateDaysInMonth(date.getMonth(), date.getFullYear());

  daysInMonth.forEach((day, index) => {
    const dayContainer = document.createElement("div");
    dayContainer.className = "container__item-day calendar__item-container";

    const dayElement = document.createElement("div");
    dayElement.className = getDayClass(index, "daysInMonth");

    const calendarItem = document.createElement("calendar-item");
    if (day) {
      calendarItem.setAttribute("date", day);
    }

    const dateSpan = document.createElement("span");
    dateSpan.className = "calendar__item-date";
    if (day) {
      dateSpan.textContent = day.getDate();
    } else {
      dateSpan.textContent = "";
    }

    dayElement.appendChild(calendarItem);
    dayContainer.appendChild(dateSpan);
    dayContainer.appendChild(dayElement);

    if (day) {
      const eventButton = document.createElement("button");
      eventButton.className = "calendar__item-button";
      eventButton.textContent = "\u002B";
      dayContainer.appendChild(eventButton);

      if (isCurrentDate(day)) {
        dateSpan.classList.add("calendar__current-date");
      }
    }
  
    
      
     
    

    container.appendChild(dayContainer);
  });
}

function isCurrentDate(day) {
  const currentDate = removeTimeFromDate(new Date());
  const itemDate = removeTimeFromDate(day);
  return areDatesEqual(currentDate, itemDate);
}

function removeTimeFromDate(date) {
  const dateWithoutTime = new Date(date);

  dateWithoutTime.setHours(0, 0, 0, 0);

  return dateWithoutTime;
}

function areDatesEqual(date1, date2) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return false; 
  }
  return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
}