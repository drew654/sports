"use client";
import React, { useEffect, useState } from "react";
import { fetchData, getDateToFetch } from "../../../../utilities";
import BaseballCompetitionTile from "../../../../components/BaseballCompetitionTile";
import BaseballSpoilerCompetitionTile from "../../../../components/BaseballSpoilerCompetitionTile";
import DateSelector from "../../../../components/DateSelector";
import { formatDateToYYYYMMDD } from "../../../../utilities";
import { getSortedCompetitionsByStatus } from "../../../../utilities";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

const BaseballScoreboardPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const unwrappedParams = React.use(params);
  const leagueParam = unwrappedParams.league;
  const sport = unwrappedParams.sport;
  const [competitions, setCompetitions] = useState([]);
  const [league, setLeague] = useState(null);
  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/${leagueParam}/scoreboard`;
  const [dateToFetch, setDateToFetch] = useState(null);
  const [spoilerMode, setSpoilerMode] = useState(false);

  useEffect(() => {
    const storedSpoilerMode = localStorage.getItem("spoilerMode");
    setSpoilerMode(storedSpoilerMode === "true");
  }, []);

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
    setDateToFetch(await getDateToFetch(sport, leagueParam));
  };

  useEffect(() => {
    fetchEvents(date);
  }, []);

  return (
    <div className="select-none">
      {league && (
        <div className="sticky top-0 bg-background z-20">
          <div className="flex items-center justify-between px-4">
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                router.replace(`?date=${dateToFetch}`);
                fetchEvents(dateToFetch);
              }}
            >
              <img
                src={league.logos[0].href}
                alt={league.logos[0].alt}
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold">{league.name}</h1>
            </div>
            <Cog6ToothIcon
              className="w-6 h-6"
              onClick={() => {
                router.push("/settings");
              }}
            />
          </div>
          <div>
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
        {competitions.map((competition) =>
          spoilerMode ? (
            <BaseballSpoilerCompetitionTile
              key={competition.id}
              slug={`baseball/${leagueParam}`}
              date={date}
              competition={competition}
            />
          ) : (
            <BaseballCompetitionTile
              key={competition.id}
              competition={competition}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BaseballScoreboardPage;
