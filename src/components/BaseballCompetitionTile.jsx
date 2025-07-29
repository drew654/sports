import BaseballBases from "./BaseballBases";
import { useRouter } from "next/navigation";

const BaseballCompetitionTile = ({ slug, date, competition }) => {
  const router = useRouter();
  const renderBroadcast = (broadcast) => {
    if (!broadcast) return null;
    return broadcast.split("/").map((part, idx) => (
      <span key={idx}>
        {part.trim()}
        {idx < broadcast.split("/").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="border rounded shadow p-2 select-none">
      <div className="flex items-center min-w-0">
        <div className="flex-1 min-w-0 pl-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`flex items-center justify-between ${
                competition.competitors[i].winner ||
                competition.status.type.name !== "STATUS_FINAL"
                  ? ""
                  : "opacity-50"
              }`}
              onClick={() => {
                router.push(`/scoreboard/${slug}/${date}/${competition.id}`);
              }}
            >
              <div className="flex items-center">
                <img
                  src={competition.competitors[i].team.logo}
                  alt={competition.competitors[i].team.displayName}
                  className="w-4 h-4 mr-2"
                />
                <h2 className="font-bold truncate min-w-0">
                  {competition.competitors[i].team.displayName}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-end">
          {[0, 1].map((i) => (
            <h2 className="font-mono font-bold px-4" key={i}>
              {competition.competitors[i].score}
            </h2>
          ))}
        </div>
        {(competition.status.type.name === "STATUS_IN_PROGRESS" ||
          competition.status.type.name === "STATUS_RAIN_DELAY") && (
          <div className="border-l p-2 pl-4 min-w-[150px] flex justify-between">
            <div>
              <h2 className="text-xs font-bold text-red-600">
                {competition.status.type.shortDetail}
              </h2>
              <h2 className="text-xs opacity-50">{competition.outsText}</h2>
              <h2 className="text-xs opacity-50">
                {renderBroadcast(competition.broadcast)}
              </h2>
            </div>
            <BaseballBases situation={competition.situation} />
          </div>
        )}
        {competition.status.type.name === "STATUS_FINAL" && (
          <div className="border-l p-2 pl-4 min-w-[150px]">
            <h2 className="font-bold">{competition.status.type.description}</h2>
          </div>
        )}
        {competition.status.type.name === "STATUS_SCHEDULED" && (
          <div className="border-l p-2 pl-4 min-w-[150px]">
            <h2 className="text-xs font-bold opacity-50">
              {new Date(competition.date).toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
              })}
            </h2>
            <h2 className="text-xs opacity-50">
              {renderBroadcast(competition.broadcast)}
            </h2>
          </div>
        )}
      </div>
      {competition?.notes[0]?.headline && (
        <h3 className="pt-2 pl-2 text-xs">{competition.notes[0].headline}</h3>
      )}
    </div>
  );
};

export default BaseballCompetitionTile;
