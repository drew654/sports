import { fetchData } from "../utilities";
import React, { useEffect, useState } from "react";

const BaseballSeriesTile = ({ apiUrl, index }) => {
  const [seriesGameTile, setSeriesGameTile] = useState(null);
  const [team0, setTeam0] = useState(null);
  const [team1, setTeam1] = useState(null);
  const [status, setStatus] = useState(null);
  const [score0, setScore0] = useState(null);
  const [score1, setScore1] = useState(null);

  const fetchEvents = async () => {
    const data = await fetchData(apiUrl);
    setSeriesGameTile(data);
    const team0Data = await fetchData(
      data.competitions[0].competitors[0].team.$ref
    );
    setTeam0(team0Data);
    const team1Data = await fetchData(
      data.competitions[0].competitors[1].team.$ref
    );
    setTeam1(team1Data);
    const statusData = await fetchData(data.competitions[0].status.$ref);
    setStatus(statusData);
    const score0Data = await fetchData(
      data.competitions[0].competitors[0].score.$ref
    );
    setScore0(score0Data);
    const score1Data = await fetchData(
      data.competitions[0].competitors[1].score.$ref
    );
    setScore1(score1Data);
  };

  useEffect(() => {
    fetchEvents();
  }, [apiUrl]);

  return (
    team0 &&
    team1 &&
    status &&
    score0 &&
    score1 && (
      <div className="border-t shadow p-2">
        <div className="flex items-center min-w-0">
          <div className="flex-1 min-w-0 pl-2">
            {[team0, team1].map((team, index) => (
              <div
                key={team.id}
                className={`flex items-center justify-between
                  ${
                    seriesGameTile.competitions[0].competitors[index].winner ||
                    status.type.name !== "STATUS_FINAL"
                      ? ""
                      : "opacity-50"
                  }
                `}
              >
                <div className="flex items-center">
                  <img
                    src={team.logos[0].href}
                    alt={team.name}
                    className="w-4 h-4 mr-2"
                  />
                  <h2 className="font-bold truncate min-w-0">{team.name}</h2>
                </div>
              </div>
            ))}
          </div>
          {status.type.name === "STATUS_FINAL" && (
            <div className="flex flex-col items-center justify-end">
              {[score0, score1].map((score, index) => (
                <h2
                  className={`font-mono font-bold px-4
                ${
                  seriesGameTile.competitions[0].competitors[index].winner ||
                  status.type.name !== "STATUS_FINAL"
                    ? ""
                    : "opacity-50"
                }
                `}
                  key={index}
                >
                  {score.displayValue}
                </h2>
              ))}
            </div>
          )}
          <div className="border-l p-2 pl-4 min-w-[100px]">
            <h2 className="text-xs opacity-50">Game {index + 1}</h2>
            {(status.type.name === "STATUS_SCHEDULED" ||
              status.type.name === "STATUS_FINAL") && (
              <h2 className="text-xs font-bold opacity-75">
                {new Date(
                  seriesGameTile.competitions[0].date
                ).toLocaleDateString([], {
                  month: "numeric",
                  day: "numeric",
                })}
              </h2>
            )}
            {(status.type.name === "STATUS_FINAL" ||
              status.type.name === "STATUS_IN_PROGRESS") && (
              <h2
                className={`text-xs font-bold
                ${
                  status.type.name === "STATUS_IN_PROGRESS"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {status.type.description}
              </h2>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default BaseballSeriesTile;
