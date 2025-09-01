"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../utilities";
import BaseballLineScore from "../../../../../../components/BaseballLineScore";
import BaseballWinProbability from "../../../../../../components/BaseballWinProbability";
import BaseballScoringSummary from "../../../../../../components/BaseballScoringSummary";
import BaseballPitcherBatter from "../../../../../../components/BaseballPitcherBatter";
import BaseballGameHeader from "../../../../../../components/BaseballGameHeader";

const BaseballCompetitionPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { league, date, competitionId } = unwrappedParams;
  const [competition, setCompetition] = useState(null);
  const [awayWinProbabilities, setAwayWinProbabilities] = useState(null);
  const [plays, setPlays] = useState(null);

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
      league === "mlb" &&
      (competition.status.type.name === "STATUS_IN_PROGRESS" ||
        competition.status.type.name === "STATUS_FINAL")
    ) {
      const probabilitiesApiUrl = `https://sports.core.api.espn.com/v2/sports/baseball/leagues/${league}/events/${competitionId}/competitions/${competitionId}/probabilities?limit=300`;
      const probabilitiesData = await fetchData(probabilitiesApiUrl);
      if (!probabilitiesData.items) return;
      setAwayWinProbabilities(
        probabilitiesData.items.map((item) => item.awayWinPercentage)
      );
    }

    const playsApiUrl = `https://sports.core.api.espn.com/v2/sports/baseball/leagues/${league}/events/${competitionId}/competitions/${competitionId}/plays?limit=1000`;
    const playsData = await fetchData(playsApiUrl);
    setPlays(playsData.items.filter((play) => play.scoringPlay === true));
  };

  useEffect(() => {
    fetchEvents();
  }, [league, date, competitionId]);

  return (
    competition && (
      <div className="p-4 select-none">
        <BaseballGameHeader competition={competition} />
        {competition.competitors[0].linescores && (
          <BaseballLineScore competition={competition} />
        )}
        <BaseballPitcherBatter competition={competition} />
        {awayWinProbabilities && (
          <BaseballWinProbability
            competition={competition}
            awayWinProbabilities={awayWinProbabilities}
          />
        )}
        {plays?.length > 0 && (
          <BaseballScoringSummary competition={competition} plays={plays} />
        )}
      </div>
    )
  );
};

export default BaseballCompetitionPage;
