"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../utilities";
import BaseballScoringSummary from "../../../../../components/BaseballScoringSummary";

const BaseballCompetitionPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { league, date, competitionId } = unwrappedParams;

  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/${league}/scoreboard?dates=${date}`;
  const [competition, setCompetition] = useState(null);

  const fetchEvents = async () => {
    const data = await fetchData(apiUrl);
    setCompetition(
      data.events.find((event) => event.id === competitionId)["competitions"][0]
    );
  };

  useEffect(() => {
    fetchEvents();
  }, [league, date, competitionId]);

  return (
    competition && (
      <div className="p-4">
        <h2 className="p-2">Scoring Summary</h2>
        <BaseballScoringSummary competition={competition} />
      </div>
    )
  );
};

export default BaseballCompetitionPage;
