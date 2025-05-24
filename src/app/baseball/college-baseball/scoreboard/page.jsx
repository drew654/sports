"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utilities";
import CollegeBaseballCompetitionTile from "../../../../components/CollegeBaseballCompetitionTile";
import DateSelector from "../../../../components/DateSelector";
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 select-none">NCAA Baseball</h1>
      {league && (
        <DateSelector
          league={league}
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
            fetchEvents(formatDateToYYYYMMDD(date));
          }}
        />
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
