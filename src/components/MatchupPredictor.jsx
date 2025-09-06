import MatchupPredictorChart from "./MatchupPredictorChart";

const MatchupPredictor = ({ competition, gameProjection }) => {
  return (
    competition.status.type.name === "STATUS_SCHEDULED" && (
      <div className="mt-4">
        <h2 className="text-xl font-bold pb-4">Matchup Predictor</h2>
        <MatchupPredictorChart
          teamA={{
            name: competition.competitors[1].team.name,
            probability: Number(gameProjection.toFixed(1)),
            color: `#${competition.competitors[1].team.color}`,
            logo: competition.competitors[1].team.logo,
          }}
          teamB={{
            name: competition.competitors[0].team.name,
            probability: Number((100 - gameProjection).toFixed(1)),
            color: `#${competition.competitors[0].team.color}`,
            logo: competition.competitors[0].team.logo,
          }}
        />
      </div>
    )
  );
};

export default MatchupPredictor;
