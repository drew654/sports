const CollegeBaseballCompetitionTile = ({ competition }) => {
  return (
    <div className="p-4 border rounded shadow">
      <div className="flex items-center">
        <div className="pr-4">
          <div className="flex justify-between items-center w-50">
            <h2
              className="text-lg font-bold truncate max-w-[150px]"
              title={competition.competitors[0].team.displayName}
            >
              {competition.competitors[0].team.displayName}
            </h2>
            <h2 className="font-mono">{competition.competitors[0].score}</h2>
          </div>
          <div className="flex justify-between items-center w-50">
            <h2
              className="text-lg font-bold truncate max-w-[150px]"
              title={competition.competitors[1].team.displayName}
            >
              {competition.competitors[1].team.displayName}
            </h2>
            <h2 className="font-mono">{competition.competitors[1].score}</h2>
          </div>
        </div>
        <div className="border-l p-4">
          {competition.status.type.name === "STATUS_FINAL" && (
            <h2>{competition.status.type.description}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeBaseballCompetitionTile;
