"use client";
import { useRouter } from "next/navigation";
import SportTile from "../components/SportTile";

const Sports = () => {
  const router = useRouter();
  const sports = [
    { name: "NCAA Baseball", sport: "baseball", league: "college-baseball" },
    { name: "Major League Baseball", sport: "baseball", league: "mlb" },
  ];

  return (
    <div className="p-4 select-none">
      {sports.map((sport) => (
        <SportTile key={sport.league} router={router} {...sport} />
      ))}
    </div>
  );
};

export default Sports;
