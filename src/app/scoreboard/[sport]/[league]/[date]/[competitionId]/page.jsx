"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../utilities";
import BaseballScoringSummary from "../../../../../../components/BaseballScoringSummary";
import BaseballBases from "../../../../../../components/BaseballBases";
import BaseballBalls from "../../../../../../components/BaseballBalls";
import BaseballStrikes from "../../../../../../components/BaseballStrikes";
import NumberLineGraph from "../../../../../../components/NumberLineGraph";
import {
  decimalToWinningTeamPercentage,
  lastArrayElement,
} from "../../../../../../utilities";

const BaseballCompetitionPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { league, date, competitionId } = unwrappedParams;
  const [competition, setCompetition] = useState(null);
  const [awayWinProbabilities, setAwayWinProbabilities] = useState(null);

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

    if (
      competition.status.type.name === "STATUS_IN_PROGRESS" ||
      competition.status.type.name === "STATUS_FINAL"
    ) {
      const probabilitiesApiUrl = `https://sports.core.api.espn.com/v2/sports/baseball/leagues/${league}/events/${competitionId}/competitions/${competitionId}/probabilities?limit=300`;
      const probabilitiesData = await fetchData(probabilitiesApiUrl);
      setAwayWinProbabilities(
        probabilitiesData.items.map((item) => item.awayWinPercentage)
      );
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [league, date, competitionId]);

  return (
    competition && (
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
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
              <>
                <h2 className="text-xs font-bold">
                  {competition.status.type.shortDetail}
                </h2>
                {competition.situation &&
                  competition.situation.lastPlay.type.type !== "end-inning" && (
                    <h2 className="text-xs font-bold">
                      {competition.outsText}
                    </h2>
                  )}
              </>
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
          <BaseballScoringSummary competition={competition} />
        )}
        {competition.status.type.name === "STATUS_IN_PROGRESS" &&
          (competition.situation.dueUp ? (
            <div className="mt-4 flex">
              <div className="flex-1">
                <h3 className="font-bold">
                  DUE UP ({competition.situation.dueUp[0].batOrder})
                </h3>
                <h4 className="text-sm">
                  {competition.situation.dueUp[0].athlete.shortName}
                </h4>
              </div>
              <div className="flex-1">
                <h3 className="font-bold">
                  DUE UP ({competition.situation.dueUp[1].batOrder})
                </h3>
                <h4 className="text-sm">
                  {competition.situation.dueUp[1].athlete.shortName}
                </h4>
              </div>
              <div className="flex-1">
                <h3 className="font-bold">
                  DUE UP ({competition.situation.dueUp[2].batOrder})
                </h3>
                <h4 className="text-sm">
                  {competition.situation.dueUp[2].athlete.shortName}
                </h4>
              </div>
            </div>
          ) : (
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
                <div className="flex items-center">
                  <h4 className="pr-2">B</h4>
                  <BaseballBalls count={competition.situation.balls} />
                </div>
                <div className="flex items-center">
                  <h4 className="pr-2">S</h4>
                  <BaseballStrikes count={competition.situation.strikes} />
                </div>
              </div>
              <BaseballBases situation={competition.situation} />
            </div>
          ))}
        {awayWinProbabilities && (
          <div className="pt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Win Probability</h1>
              <div className="flex items-center">
                <img
                  src={
                    competition.competitors[
                      lastArrayElement(awayWinProbabilities) >= 0.5 ? 0 : 1
                    ].team.logo
                  }
                  alt={
                    competition.competitors[
                      lastArrayElement(awayWinProbabilities) >= 0.5 ? 0 : 1
                    ].team.displayName
                  }
                  className="w-12 h-12 mr-2"
                />
                <h1 className="text-3xl font-bold">
                  {decimalToWinningTeamPercentage(
                    lastArrayElement(awayWinProbabilities),
                    1
                  )}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={competition.competitors[0].team.logo}
                alt={competition.competitors[0].team.displayName}
                className="w-6 h-6 mr-2"
              />
              <h2 className="py-2 text-lg">
                {competition.competitors[0].team.name}
              </h2>
            </div>
            <NumberLineGraph numbers={awayWinProbabilities} />
            <div className="flex items-center space-x-4">
              <img
                src={competition.competitors[1].team.logo}
                alt={competition.competitors[1].team.displayName}
                className="w-6 h-6 mr-2"
              />
              <h2 className="py-2 text-lg">
                {competition.competitors[1].team.name}
              </h2>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default BaseballCompetitionPage;
