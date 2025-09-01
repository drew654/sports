export const fetchData = async (url) => {
  if (url.startsWith("http://")) {
    url = url.replace("http://", "https://");
  }

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

export const getSortedCompetitionsByStatus = (events) => {
  const statusOrder = {
    STATUS_RAIN_DELAY: 0,
    STATUS_IN_PROGRESS: 1,
    STATUS_FINAL: 2,
    STATUS_SCHEDULED: 3,
  };

  const allCompetitions = events.flatMap((event) => event.competitions);

  return allCompetitions.sort((a, b) => {
    const statusA = statusOrder[a.status.type.name] ?? 99;
    const statusB = statusOrder[b.status.type.name] ?? 99;
    return statusA - statusB;
  });
};

export const getAllDatesInRange = (start, end) => {
  const dates = [];
  let current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const lastArrayElement = (array) => {
  return array[array.length - 1];
};

export const decimalToWinningTeamPercentage = (decimal, fractionDigits = 0) => {
  if (decimal === 0 || decimal === 1) return "100%";
  if (decimal < 0.5) decimal = 1 - decimal;
  return (decimal * 100).toFixed(fractionDigits) + "%";
};
