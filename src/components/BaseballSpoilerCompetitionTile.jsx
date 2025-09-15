const BaseballSpoilerCompetitionTile = ({ competition }) => {
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
    <div className="border rounded shadow p-2">
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
        {(competition.status.type.name === "STATUS_IN_PROGRESS" ||
          competition.status.type.name === "STATUS_RAIN_DELAY") && (
          <div className="border-l p-2 pl-4 min-w-[110px]">
            <h2 className="font-bold text-red-600">
              {competition.status.type.shortDetail.split(" ")[1]}
            </h2>
          </div>
        )}
        {competition.status.type.name === "STATUS_FINAL" && (
          <div className="border-l p-2 pl-4 min-w-[110px]">
            <h2 className="font-bold">{competition.status.type.description}</h2>
          </div>
        )}
        {competition.status.type.name === "STATUS_SCHEDULED" && (
          <div className="border-l p-2 pl-4 min-w-[110px]">
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

export default BaseballSpoilerCompetitionTile;
