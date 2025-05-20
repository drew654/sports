export async function fetchData(url) {
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
}

export function getDayAbbreviation(date) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const d = date instanceof Date ? date : new Date(date);
  return days[d.getDay()];
}

export function formatDateToMonthDay(date) {
  const d = date instanceof Date ? date : new Date(date);
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const month = months[d.getMonth()];
  const day = d.getDate();
  return `${month} ${day}`;
}

export function formatDateToYYYYMMDD(date) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}
