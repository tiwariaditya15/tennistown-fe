import { IcBaselineStar, IcBaselineStarBorder } from "../icones";
export function Rating({ rating }) {
  const random = Math.floor(Math.random() * 5);
  let ratings = [],
    i = 1,
    j = random + 1;
  while (i <= random) {
    ratings.push(<IcBaselineStar key={i} />);
    i++;
  }
  while (j <= 5) {
    ratings.push(<IcBaselineStarBorder key={j} />);
    j++;
  }
  return (
    <>
      <span className="card-text rating">{ratings}</span>
    </>
  );
}
