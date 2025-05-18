"use client";
import React, { useEffect } from "react";
import { fetchData } from "../../../../utilities";
import CollegeBaseballCompetitionTile from "../../../../components/CollegeBaseballCompetitionTile";

const CollegeBaseballScoreboard = () => {
  const apiURL =
    "https://site.api.espn.com/apis/site/v2/sports/baseball/college-baseball/scoreboard";

  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchData(apiURL);
      setEvents(data["events"] || []);
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">College Baseball</h1>
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
