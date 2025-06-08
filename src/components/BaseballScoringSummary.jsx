const BaseballScoringSummary = ({ competition }) => {
  return (
    <table className="w-full border">
      <tbody>
        <tr>
          <th></th>
          {[...Array(9)].map((_, inning) => (
            <th key={inning} className="border px-2 py-1 text-center">
              {inning + 1}
            </th>
          ))}
          <th className="border px-2 py-1 text-center">R</th>
          <th className="border px-2 py-1 text-center">H</th>
          <th className="border px-2 py-1 text-center">E</th>
        </tr>
        {competition.competitors.map((competitor, index) => (
          <tr key={index}>
            <td className="border px-2 py-1 text-center">
              {competitor.team.abbreviation}
            </td>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((inning) => (
              <td key={inning} className="border px-2 py-1 text-center">
                {competitor.linescores[inning]
                  ? competitor.linescores[inning].value
                  : "-"}
              </td>
            ))}
            <td className="border px-2 py-1 text-center font-bold">
              {competitor.score}
            </td>
            <td className="border px-2 py-1 text-center font-bold">
              {
                competitor.statistics.find((stat) => stat.name === "hits")
                  ?.displayValue
              }
            </td>
            <td className="border px-2 py-1 text-center font-bold">
              {
                competitor.statistics.find((stat) => stat.name === "errors")
                  ?.displayValue
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BaseballScoringSummary;
