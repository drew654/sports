"use client";
import React, { useEffect } from "react";
import {
  fetchData,
  formatDateToMonthDay,
  getDayAbbreviation,
} from "../../../../utilities";
import CollegeBaseballCompetitionTile from "../../../../components/CollegeBaseballCompetitionTile";

const CollegeBaseballScoreboard = () => {
  const apiURL =
    "https://site.api.espn.com/apis/site/v2/sports/baseball/college-baseball/scoreboard";

  const [events, setEvents] = React.useState([]);
  const [league, setLeague] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchData(apiURL);
      setEvents(data["events"] || []);
      setLeague(
        data["leagues"].find((league) => league.name === "NCAA Baseball")
      );
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 select-none">NCAA Baseball</h1>
      {league && (
        <div className="flex mb-4 overflow-x-auto max-w-full no-scrollbar">
          {league.calendar.map((day) => (
            <div
              key={day}
              className={` ${
                new Date(day).toDateString() === selectedDate.toDateString()
                  ? "bg-white text-black"
                  : ""
              } flex-shrink-0 p-2 text-center`}
              onClick={() => setSelectedDate(new Date(day))}
            >
              <h2 className="text-center select-none">
                {getDayAbbreviation(day)}
              </h2>
              <h2 className="text-center select-none">
                {formatDateToMonthDay(day)}
              </h2>
            </div>
          ))}
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
