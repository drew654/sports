import { useEffect, useState } from "react";
import { getDateToFetch } from "../utilities";

const SportTile = ({ router, name, sport, league: leagueParam }) => {
  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${leagueParam}/scoreboard`;
  const [date, setDate] = useState("");

  useEffect(() => {
    const init = async () => {
      const dateToFetch = await getDateToFetch(sport, leagueParam);
      setDate(dateToFetch);
    };
    init();
  }, [apiUrl]);

  return (
    <div
      key={name}
      className="p-4 border rounded-lg mb-4 cursor-pointer"
      onClick={() => {
        if (date === "") {
          return;
        }
        router.push(`/scoreboard/${sport}/${leagueParam}?date=${date}`);
      }}
    >
      <h1 className="text-2xl font-bold">{name}</h1>
    </div>
  );
};

export default SportTile;
