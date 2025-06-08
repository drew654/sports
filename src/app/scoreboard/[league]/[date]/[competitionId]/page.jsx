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
    const competition = data.events.find((event) => event.id === competitionId)[
      "competitions"
    ][0];
    competition.competitors.sort((a, b) => {
      if (a.homeAway === b.homeAway) return 0;
      return a.homeAway === "home" ? 1 : -1;
    });
    setCompetition(competition);
  };

  useEffect(() => {
    fetchEvents();
  }, [league, date, competitionId]);

  return (
    competition && (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={competition.competitors[0].team.logo}
              alt={competition.competitors[0].team.displayName}
              className="w-12 h-12 mr-2"
            />
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold select-none">
                {competition.competitors[0].score}
              </h1>
              <h2 className="text-xs font-bold select-none">
                {competition.competitors[0].team.abbreviation}
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold select-none">
                {competition.competitors[1].score}
              </h1>
              <h2 className="text-xs font-bold select-none">
                {competition.competitors[1].team.abbreviation}
              </h2>
            </div>
            <img
              src={competition.competitors[1].team.logo}
              alt={competition.competitors[1].team.displayName}
              className="w-12 h-12 ml-2"
            />
          </div>
        </div>
        <h2 className="p-2">Scoring Summary</h2>
        <BaseballScoringSummary competition={competition} />
      </div>
    )
  );
};

export default BaseballCompetitionPage;
