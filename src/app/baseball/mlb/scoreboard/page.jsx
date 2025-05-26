"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utilities";
import CollegeBaseballCompetitionTile from "../../../../components/CollegeBaseballCompetitionTile";
import DateSelector from "../../../../components/DateSelector";
import { formatDateToYYYYMMDD } from "../../../../utilities";
import { getSortedCompetitionsByStatus } from "../../../../utilities";

const MLBScoreboard = () => {
  const apiURL =
    "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard";

  const [competitions, setCompetitions] = useState([]);
  const [league, setLeague] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchEvents = async (urlDate) => {
    const dateParam = urlDate ? `?dates=${urlDate}` : "";
    const apiURLWithDate = `${apiURL}${dateParam}`;
    const data = await fetchData(apiURLWithDate);
    const sortedCompetitions = getSortedCompetitionsByStatus(
      data["events"] || []
    );
    setCompetitions(sortedCompetitions);
    setLeague(
      data["leagues"].find((league) => league.name === "Major League Baseball")
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 select-none">
        Major League Baseball
      </h1>
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
        {competitions.map((competition) => (
          <CollegeBaseballCompetitionTile
            key={competition.id}
            competition={competition}
          />
        ))}
      </div>
    </div>
  );
};

export default MLBScoreboard;
