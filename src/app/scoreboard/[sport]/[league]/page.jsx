"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utilities";
import BaseballCompetitionTile from "../../../../components/BaseballCompetitionTile";
import DateSelector from "../../../../components/DateSelector";
import { formatDateToYYYYMMDD } from "../../../../utilities";
import { getSortedCompetitionsByStatus } from "../../../../utilities";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const BaseballScoreboardPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const unwrappedParams = React.use(params);
  const leagueParam = unwrappedParams.league;
  const [competitions, setCompetitions] = useState([]);
  const [league, setLeague] = useState(null);
  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/${leagueParam}/scoreboard`;

  const fetchEvents = async (urlDate) => {
    const dateParam = urlDate ? `?dates=${urlDate}` : "";
    const apiURLWithDate = `${apiUrl}${dateParam}`;
    const data = await fetchData(apiURLWithDate);
    const sortedCompetitions = getSortedCompetitionsByStatus(
      data["events"] || []
    );
    const sortedCompetitionsWithSortedCompetitors = sortedCompetitions.map(
      (competition) => {
        competition.competitors.sort((a, b) => {
          if (a.homeAway === b.homeAway) return 0;
          return a.homeAway === "home" ? 1 : -1;
        });
        return competition;
      }
    );
    setCompetitions(sortedCompetitionsWithSortedCompetitors);
    setLeague(data["leagues"].find((league) => league.slug === leagueParam));
  };

  useEffect(() => {
    fetchEvents(date);
  }, []);

  return (
    <div className="select-none">
      {league && (
        <div className="sticky top-0 bg-background z-20">
          <h1 className="text-2xl font-bold p-4">{league.name}</h1>
          <div className="">
            <DateSelector
              league={league}
              selectedDate={date}
              setSelectedDate={(date) => {
                const formattedDate = formatDateToYYYYMMDD(date);
                router.replace(`?date=${formattedDate}`);
                fetchEvents(formattedDate);
              }}
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {competitions.map((competition) => (
          <BaseballCompetitionTile
            key={competition.id}
            slug={`baseball/${leagueParam}`}
            date={date}
            competition={competition}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseballScoreboardPage;
