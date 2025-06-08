"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../utilities";
import BaseballCompetitionTile from "../components/BaseballCompetitionTile";
import DateSelector from "../components/DateSelector";
import { formatDateToYYYYMMDD } from "../utilities";
import { getSortedCompetitionsByStatus } from "../utilities";

const BaseballScoreboard = ({ slug, id }) => {
  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/${slug}/scoreboard`;
  const [competitions, setCompetitions] = useState([]);
  const [league, setLeague] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchEvents = async (urlDate) => {
    const dateParam = urlDate ? `?dates=${urlDate}` : "";
    const apiURLWithDate = `${apiUrl}${dateParam}`;
    const data = await fetchData(apiURLWithDate);
    const sortedCompetitions = getSortedCompetitionsByStatus(
      data["events"] || []
    );
    setCompetitions(sortedCompetitions);
    setLeague(data["leagues"].find((league) => league.id === id));
  };

  useEffect(() => {
    const today = formatDateToYYYYMMDD(new Date());
    fetchEvents(today);
  }, []);

  return (
    <div className="p-4">
      {league && (
        <>
          <h1 className="text-2xl font-bold mb-4 select-none">{league.name}</h1>
          <DateSelector
            league={league}
            selectedDate={selectedDate}
            setSelectedDate={(date) => {
              setSelectedDate(date);
              fetchEvents(formatDateToYYYYMMDD(date));
            }}
          />
        </>
      )}
      <div className="grid grid-cols-1 gap-4">
        {competitions.map((competition) => (
          <BaseballCompetitionTile
            key={competition.id}
            slug={slug}
            date={formatDateToYYYYMMDD(selectedDate)}
            competition={competition}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseballScoreboard;
