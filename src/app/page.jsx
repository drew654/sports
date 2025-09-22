"use client";
import { useRouter } from "next/navigation";
import SportTile from "../components/SportTile";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

const Sports = () => {
  const router = useRouter();
  const sports = [
    { name: "NCAA Baseball", sport: "baseball", league: "college-baseball" },
    { name: "Major League Baseball", sport: "baseball", league: "mlb" },
  ];

  return (
    <div className="select-none">
      <div className="flex items-center justify-between pt-4 px-4">
        <div className="text-2xl font-bold">Sports</div>
        <Cog6ToothIcon
          className="w-6 h-6"
          onClick={() => {
            router.push("/settings");
          }}
        />
      </div>
      <div className="p-4">
        {sports.map((sport) => (
          <SportTile key={sport.league} router={router} {...sport} />
        ))}
      </div>
    </div>
  );
};

export default Sports;
