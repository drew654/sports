export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return {};
  }
};

export const getDayAbbreviation = (date) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const d = date instanceof Date ? date : new Date(date);
  return days[d.getDay()];
};

export const formatDateToMonthDay = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = months[d.getMonth()];
  const day = d.getDate();
  return `${month} ${day}`;
};

export const formatDateToYYYYMMDD = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export const sortEventCompetitionsByStatus = (events) => {
  return events.map((event) => {
    event.competitions.sort((a, b) => {
      const statusA = a.status.type.name;
      const statusB = b.status.type.name;

      if (statusA === "STATUS_FINAL" && statusB !== "STATUS_FINAL") {
        return 1;
      } else if (statusB === "STATUS_FINAL" && statusA !== "STATUS_FINAL") {
        return -1;
      } else {
        return 0;
      }
    });
    return event;
  });
};
