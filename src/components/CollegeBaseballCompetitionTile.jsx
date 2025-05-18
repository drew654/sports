const CollegeBaseballCompetitionTile = ({ competition }) => {
  return (
    <div className="flex items-center p-4 border rounded shadow select-none min-w-0">
      <div className="flex-1 min-w-0">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center justify-between ">
            <h2 className="text-lg font-bold truncate min-w-0 select-none">
              {competition.competitors[i].team.displayName}
            </h2>
            <h2 className="font-mono font-bold select-none px-4">
              {competition.competitors[i].score}
            </h2>
          </div>
        ))}
      </div>
      {competition.status.type.name === "STATUS_FINAL" && (
        <h2 className="border-l p-4 text-center select-none">
          {competition.status.type.description}
        </h2>
      )}
    </div>
  );
};

export default CollegeBaseballCompetitionTile;
