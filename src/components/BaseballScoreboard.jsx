"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../utilities";
import BaseballCompetitionTile from "../components/BaseballCompetitionTile";
import DateSelector from "../components/DateSelector";
import { formatDateToYYYYMMDD } from "../utilities";
import { getSortedCompetitionsByStatus } from "../utilities";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const BaseballScoreboard = ({ slug, id }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/${slug}/scoreboard`;
  const [competitions, setCompetitions] = useState([]);
  const [league, setLeague] = useState(null);

  const getLastCompetitionDate = async () => {
    const data = await fetchData(apiUrl);
    const calendar = data.leagues.find((league) => league.id === id).calendar;
    const lastDate = calendar[calendar.length - 1];
    return new Date(lastDate);
  };

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
    setLeague(data["leagues"].find((league) => league.id === id));
  };

  useEffect(() => {
    const init = async () => {
      const today = new Date();
      const lastCompetitionDate = await getLastCompetitionDate();
      const dateToFetch =
        today > lastCompetitionDate ? lastCompetitionDate : today;

      fetchEvents(formatDateToYYYYMMDD(dateToFetch));
    };
    init();
  }, []);

  return (
    <div className="p-4">
      {league && (
        <>
          <h1 className="text-2xl font-bold mb-4 select-none">{league.name}</h1>
          <DateSelector
            league={league}
            selectedDate={date || formatDateToYYYYMMDD(new Date())}
            setSelectedDate={(date) => {
              router.push(`?date=${formatDateToYYYYMMDD(date)}`);
              fetchEvents(formatDateToYYYYMMDD(date));
            }}
          />
        </>
      )}
      <div className="grid grid-cols-1 gap-4">
        {competitions.map((competition) => (
          <BaseballCompetitionTile
            key={competition.id}
            slug={slug}
            date={date || formatDateToYYYYMMDD(new Date())}
            competition={competition}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseballScoreboard;
