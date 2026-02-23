const BaseballGameHeader = ({ competition }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center">
      <img
        src={competition.competitors[0].team.logo}
        alt={competition.competitors[0].team.displayName}
        className="w-12 h-12 mr-2"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">
          {competition.competitors[0].score}
        </h1>
        <h2 className="text-xs font-bold">
          {competition.competitors[0].team.abbreviation}
        </h2>
      </div>
    </div>
    <div className="flex flex-col items-center">
      {competition.notes.length > 0 && <h2>{competition.notes[0].headline}</h2>}
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
            competition.situation.lastPlay?.type?.type !== "end-inning" && (
              <h2 className="text-xs font-bold">{competition.outsText}</h2>
            )}
        </>
      )}
    </div>
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">
          {competition.competitors[1].score}
        </h1>
        <h2 className="text-xs font-bold">
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
);

export default BaseballGameHeader;
