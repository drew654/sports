import { useEffect, useState } from "react";
import { fetchData, formatDateToYYYYMMDD } from "../utilities";

const SportTile = ({ router, name, sport, league: leagueParam }) => {
  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${leagueParam}/scoreboard`;
  const [date, setDate] = useState("");

  const getLastCompetitionDate = async () => {
    const data = await fetchData(apiUrl);
    const calendar = data.leagues.find(
      (league) => league.slug === leagueParam
    ).calendar;
    const lastDate = calendar[calendar.length - 1];
    return new Date(lastDate);
  };

  const getDateToFetch = async () => {
    const today = new Date();
    const lastCompetitionDate = await getLastCompetitionDate();
    return today > lastCompetitionDate
      ? formatDateToYYYYMMDD(lastCompetitionDate)
      : formatDateToYYYYMMDD(today);
  };

  useEffect(() => {
    const init = async () => {
      const dateToFetch = await getDateToFetch();
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
      <h1 className="text-2xl font-bold select-none">{name}</h1>
    </div>
  );
};

export default SportTile;
