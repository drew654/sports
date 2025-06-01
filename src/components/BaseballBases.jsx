const BaseballBases = ({ situation }) => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <rect
        x="20"
        y="8"
        width="8"
        height="8"
        transform="rotate(45 24 12)"
        fill={situation.onSecond ? "#588ae3" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
      <rect
        x="32"
        y="20"
        width="8"
        height="8"
        transform="rotate(45 36 24)"
        fill={situation.onFirst ? "#588ae3" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
      <rect
        x="8"
        y="20"
        width="8"
        height="8"
        transform="rotate(45 12 24)"
        fill={situation.onThird ? "#588ae3" : "#fff"}
        stroke="#bbb"
        strokeWidth="1"
      />
    </svg>
  );
};

export default BaseballBases;
