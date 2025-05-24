"use client";
import React, { useEffect, useState } from "react";
import {
  fetchData,
  formatDateToMonthDay,
  getDayAbbreviation,
} from "../../../../utilities";
import CollegeBaseballCompetitionTile from "../../../../components/CollegeBaseballCompetitionTile";
import { formatDateToYYYYMMDD } from "../../../../utilities";

const CollegeBaseballScoreboard = () => {
  const apiURL =
    "https://site.api.espn.com/apis/site/v2/sports/baseball/college-baseball/scoreboard";

  const [events, setEvents] = useState([]);
  const [league, setLeague] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchEvents = async (urlDate) => {
    const dateParam = urlDate ? `?dates=${urlDate}` : "";
    const apiURLWithDate = `${apiURL}${dateParam}`;
    const data = await fetchData(apiURLWithDate);
    setEvents(data["events"] || []);
    setLeague(
      data["leagues"].find((league) => league.name === "NCAA Baseball")
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 select-none">NCAA Baseball</h1>
      {league && (
        <div
          className="flex mb-4 overflow-x-auto max-w-full no-scrollbar"
          ref={calendarRef}
        >
          {league.calendar.map((day) => {
            const isSelected =
              new Date(day).toDateString() === selectedDate.toDateString();
            return (
              <div
                key={day}
                ref={isSelected ? selectedDayRef : null}
                className={`${
                  isSelected ? "bg-white text-black" : ""
                } flex-shrink-0 p-2 text-center`}
                onClick={() => {
                  setSelectedDate(new Date(day));
                  fetchEvents(formatDateToYYYYMMDD(day));
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
      )}
      <div className="grid grid-cols-1 gap-4">
        {events.map((event, index) => (
          <CollegeBaseballCompetitionTile
            key={index}
            competition={event.competitions[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default CollegeBaseballScoreboard;
