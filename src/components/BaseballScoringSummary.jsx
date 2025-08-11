const BaseballScoringSummary = ({ competition }) => {
  return (
    <div className="overflow-x-auto border rounded no-scrollbar">
      <table className="w-full border-separate border-spacing-0 text-sm sm:text-base select-none">
        <tbody>
          <tr>
            <th className="sticky left-0 bg-background border-r border-b px-2 py-1 z-10"></th>
            {competition.competitors[0].linescores.map((inning) => (
              <th
                key={inning.period}
                className="border-r border-b px-2 py-1 text-center"
              >
                {inning.period}
              </th>
            ))}
            <th className="border-r border-b px-2 py-1 text-center">R</th>
            <th className="border-r border-b px-2 py-1 text-center">H</th>
            <th className="border-b px-2 py-1 text-center">E</th>
          </tr>
          {competition.competitors.map((competitor, index) => (
            <tr key={index}>
              <td className="sticky left-0 bg-background border-r border-b px-2 py-1 text-center z-10">
                {competitor.team.abbreviation}
              </td>
              {competitor.linescores.map((inning) => (
                <td
                  key={inning.period}
                  className="border-r border-b px-2 py-1 text-center"
                >
                  {inning.value}
                </td>
              ))}
              <td className="border-r border-b px-2 py-1 text-center font-bold">
                {competitor.score}
              </td>
              <td className="border-r border-b px-2 py-1 text-center font-bold">
                {
                  competitor.statistics.find((stat) => stat.name === "hits")
                    ?.displayValue
                }
              </td>
              <td className="border-b px-2 py-1 text-center font-bold">
                {
                  competitor.statistics.find((stat) => stat.name === "errors")
                    ?.displayValue
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseballScoringSummary;
