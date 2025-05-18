const CollegeBaseballCompetitionTile = ({ competition }) => {
  return (
    <div className="p-4 border rounded shadow select-none flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold truncate select-none">
          {competition.competitors[0].team.displayName}
        </h2>
        <h2 className="text-lg font-bold truncate select-none">
          {competition.competitors[1].team.displayName}
        </h2>
      </div>
      <div>
        <div className="flex items-center">
          <div className="px-4">
            <h2 className="font-mono font-bold select-none">
              {competition.competitors[0].score}
            </h2>
            <h2 className="font-mono font-bold select-none">
              {competition.competitors[1].score}
            </h2>
          </div>
          {competition.status.type.name === "STATUS_FINAL" && (
            <h2 className="border-l p-4 select-none">
              {competition.status.type.description}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeBaseballCompetitionTile;
