const CollegeBaseballCompetitionTile = ({ competition }) => {
  return (
    <div className="p-4 border rounded shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold truncate">
            {competition.competitors[0].team.displayName}
          </h2>
          <h2 className="text-lg font-bold truncate">
            {competition.competitors[1].team.displayName}
          </h2>
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <div>
              <h2 className="font-mono font-bold">
                {competition.competitors[0].score}
              </h2>
              <h2 className="font-mono font-bold">
                {competition.competitors[1].score}
              </h2>
            </div>
            <div className="mx-2" />
            {competition.status.type.name === "STATUS_FINAL" && (
              <h2 className="border-l p-4">
                {competition.status.type.description}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeBaseballCompetitionTile;
