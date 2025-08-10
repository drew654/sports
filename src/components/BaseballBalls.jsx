const BaseballBalls = ({ count }) => {
  return (
    <svg width="64" height="16" viewBox="0 0 64 16">
      <circle
        cx="8"
        cy="8"
        r="6"
        fill={count >= 1 ? "#009a44" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
      <circle
        cx="24"
        cy="8"
        r="6"
        fill={count >= 2 ? "#009a44" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
      <circle
        cx="40"
        cy="8"
        r="6"
        fill={count >= 3 ? "#009a44" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
      <circle
        cx="56"
        cy="8"
        r="6"
        fill={count >= 3 ? "#009a44" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
    </svg>
  );
};

export default BaseballBalls;
