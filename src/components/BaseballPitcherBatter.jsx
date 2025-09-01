
import BaseballBases from "./BaseballBases";
import BaseballBalls from "./BaseballBalls";
import BaseballStrikes from "./BaseballStrikes";

const BaseballPitcherBatter = ({ competition }) =>
  competition.status.type.name === "STATUS_IN_PROGRESS" &&
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
  ));

export default BaseballPitcherBatter;
