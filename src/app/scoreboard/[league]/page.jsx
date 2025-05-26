"use client";
import React from "react";
import CollegeBaseballScoreboard from "../../../components/CollegeBaseballScoreboard";
import MLBScoreboard from "../../../components/MLBScoreboard";

const ScoreBoard = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { league } = unwrappedParams;

  switch (league) {
    case "mlb":
      return <MLBScoreboard />;
    case "college-baseball":
      return <CollegeBaseballScoreboard />;
    default:
      return <div>Unknown league: {league}</div>;
  }
};

export default ScoreBoard;
