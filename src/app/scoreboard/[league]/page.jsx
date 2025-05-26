"use client";
import React from "react";
import BaseballScoreboard from "../../../components/BaseballScoreboard";

const ScoreBoard = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { league } = unwrappedParams;

  switch (league) {
    case "mlb":
      return <BaseballScoreboard slug="mlb" id="10" />;
    case "college-baseball":
      return <BaseballScoreboard slug="college-baseball" id="14" />;
    default:
      return <div>Unknown league: {league}</div>;
  }
};

export default ScoreBoard;
