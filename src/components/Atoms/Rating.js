import { IcBaselineStar, IcBaselineStarBorder } from "../icones";
export function Rating({ rating }) {
  const random = Math.floor(Math.random() * 5);
  let ratings = [],
    i = 1,
    j = random + 1;
  while (i <= random) {
    ratings.push(<IcBaselineStar />);
    i++;
  }
  while (j <= 5) {
    ratings.push(<IcBaselineStarBorder />);
    j++;
  }
  return (
    <>
      <span class="card-text rating">{ratings}</span>
    </>
  );
}
