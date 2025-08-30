import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const BaseballScoringSummary = ({ competition, plays }) => {
  return (
    <div className="pt-8">
      <h1 className="text-xl font-bold">Scoring Summary</h1>
      <table className="w-full">
        <thead>
          <tr>
            {[...Array(4)].map((_, index) => (
              <th key={index}></th>
            ))}
            <th>{competition.competitors[0].team.abbreviation}</th>
            <th>{competition.competitors[1].team.abbreviation}</th>
          </tr>
        </thead>
        <tbody>
          {plays.map((play, index) => (
            <tr key={index} className="border-t border-b">
              <td className="p-2 h-10 w-10">
                <img
                  src={
                    competition.competitors[play.period.type === "Top" ? 0 : 1]
                      .team.logo
                  }
                  alt={
                    competition.competitors[play.period.type === "Top" ? 0 : 1]
                      .team.displayName
                  }
                  className="w-5 h-5"
                />
              </td>
              <td className="p-2">
                {play.period.type === "Top" ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </td>
              <td className="p-2">{play.period.displayValue.split(" ")[0]}</td>
              <td className="p-2">{play.text}</td>
              <td className="p-2">{play.awayScore}</td>
              <td className="p-2">{play.homeScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseballScoringSummary;
