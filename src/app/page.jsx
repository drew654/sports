"use client";

const Sports = () => {
  const sports = [
    { name: "NCAA Baseball", path: "scoreboard/college-baseball" },
    { name: "Major League Baseball", path: "scoreboard/mlb" },
  ];

  return (
    <div className="p-4">
      {sports.map((sport) => (
        <div
          key={sport.name}
          className="p-4 border rounded-lg mb-4 cursor-pointer"
          onClick={() => (window.location.href = sport.path)}
        >
          <h1 className="text-2xl font-bold select-none">{sport.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Sports;
