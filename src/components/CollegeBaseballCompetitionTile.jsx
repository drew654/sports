const CollegeBaseballCompetitionTile = ({ competition }) => {
  return (
    <div className="border rounded shadow p-2">
      <div className="flex items-center select-none min-w-0">
        <div className="flex-1 min-w-0 pl-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center justify-between ">
              <div className="flex items-center">
                <img
                  src={competition.competitors[i].team.logo}
                  alt={competition.competitors[i].team.displayName}
                  className="w-4 h-4 mr-2"
                />
                <h2 className="text-base font-bold truncate min-w-0 select-none">
                  {competition.competitors[i].team.displayName}
                </h2>
              </div>
              <h2 className="font-mono font-bold select-none px-4 text-base">
                {competition.competitors[i].score}
              </h2>
            </div>
          ))}
        </div>
        {competition.status.type.name === "STATUS_FINAL" && (
          <h2 className="border-l p-2 text-center select-none text-base">
            {competition.status.type.description}
          </h2>
        )}
      </div>
      <h3 className="pt-2 pl-2 text-xs select-none">
        {competition.notes[0].headline}
      </h3>
    </div>
  );
};

export default CollegeBaseballCompetitionTile;
