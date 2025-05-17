const CollegeBaseballCompetitionTile = ({ competition }) => {
  return (
    <div className="p-4 border rounded shadow">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="text-left pr-4">
              <h2 className="text-lg font-bold">
                {competition.competitors[0].team.displayName}
              </h2>
            </td>
            <td className="text-right w-12 align-middle">
              <p className="font-mono">{competition.competitors[0].score}</p>
            </td>
          </tr>
          <tr>
            <td className="text-left pr-4">
              <h2 className="text-lg font-bold">
                {competition.competitors[1].team.displayName}
              </h2>
            </td>
            <td className="text-right w-12 align-middle">
              <p className="font-mono">{competition.competitors[1].score}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CollegeBaseballCompetitionTile;
