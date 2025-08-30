import NumberLineGraph from "./NumberLineGraph";
import { decimalToWinningTeamPercentage, lastArrayElement } from "../utilities";

const BaseballWinProbability = ({ competition, awayWinProbabilities }) => {
  return (
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
        <h2 className="py-2 text-lg">{competition.competitors[0].team.name}</h2>
      </div>
      <NumberLineGraph numbers={awayWinProbabilities} />
      <div className="flex items-center space-x-4">
        <img
          src={competition.competitors[1].team.logo}
          alt={competition.competitors[1].team.displayName}
          className="w-6 h-6 mr-2"
        />
        <h2 className="py-2 text-lg">{competition.competitors[1].team.name}</h2>
      </div>
    </div>
  );
};

export default BaseballWinProbability;
