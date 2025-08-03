"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../utilities";
import BaseballScoringSummary from "../../../../../components/BaseballScoringSummary";
import BaseballBases from "../../../../../components/BaseballBases";

const BaseballCompetitionPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { league, date, competitionId } = unwrappedParams;

  const [competition, setCompetition] = useState(null);

  const fetchEvents = async () => {
    const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/${league}/scoreboard?dates=${date}`;
    const data = await fetchData(apiUrl);
    const competition = data.events
      .find((event) => event.id === competitionId)
      .competitions.find((comp) => comp.id === competitionId);
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
          <div className="flex flex-col items-center">
            {competition.notes.length > 0 && (
              <h2>{competition.notes[0].headline}</h2>
            )}
            <h2>{competition.broadcast}</h2>
            {competition.status.type.name === "STATUS_RAIN_DELAY" ? (
              <h2 className="text-xs font-bold text-red-600">
                {competition.status.type.shortDetail}
              </h2>
            ) : (
              <h2 className="text-xs font-bold">
                {competition.status.type.shortDetail}
              </h2>
            )}
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
        {competition.competitors[0].linescores && (
          <>
            <h2 className="p-2 select-none">Scoring Summary</h2>
            <BaseballScoringSummary competition={competition} />
          </>
        )}
        {competition.status.type.name === "STATUS_IN_PROGRESS" && (
          <div className="mt-4 flex">
            <div className="flex-1">
              <h3 className="font-bold">PITCHER</h3>
              <h4 className="text-sm">
                {competition.situation.pitcher.athlete.shortName}
              </h4>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">BATTER</h3>
              <h4 className="text-sm">
                {competition.situation.batter.athlete.shortName}
              </h4>
            </div>
            <div className="flex-1">
              <h4>B: {competition.situation.balls}</h4>
              <h4>S: {competition.situation.strikes}</h4>
            </div>
            <BaseballBases situation={competition.situation} />
          </div>
        )}
      </div>
    )
  );
};

export default BaseballCompetitionPage;
