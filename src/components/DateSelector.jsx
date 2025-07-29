import React, { useEffect } from "react";
import {
  formatDateToMonthDay,
  getDayAbbreviation,
  getAllDatesInRange,
  formatDateToYYYYMMDD,
} from "../utilities";

const DateSelector = ({ league, selectedDate, setSelectedDate }) => {
  const startDate = new Date(league.calendarStartDate);
  const endDate = new Date(league.calendarEndDate);

  const calendar = league.calendarIsWhitelist
    ? league.calendar
    : getAllDatesInRange(startDate, endDate).filter(
        (date) =>
          !league.calendar.some(
            (excluded) =>
              new Date(excluded).toDateString() === date.toDateString()
          )
      );

  const calendarRef = React.useRef(null);
  const selectedDayRef = React.useRef(null);

  useEffect(() => {
    if (calendarRef.current && selectedDayRef.current) {
      const container = calendarRef.current;
      const selected = selectedDayRef.current;
      const scrollLeft =
        selected.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        selected.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [league, selectedDate]);

  return (
    <div
      className="flex mb-4 overflow-x-auto max-w-full no-scrollbar"
      ref={calendarRef}
    >
      {calendar.map((day) => {
        const isSelected = formatDateToYYYYMMDD(new Date(day)) === selectedDate;
        return (
          <div
            key={day}
            ref={isSelected ? selectedDayRef : null}
            className={`${
              isSelected ? "bg-foreground text-background" : ""
            } flex-shrink-0 p-2 text-center`}
            onClick={() => {
              setSelectedDate(new Date(day));
            }}
          >
            <h2 className="text-center select-none">
              {getDayAbbreviation(day)}
            </h2>
            <h2 className="text-center select-none">
              {formatDateToMonthDay(day)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
