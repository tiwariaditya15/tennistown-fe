import loader from "../icones/circle.svg";
import "./styles.css";
export function Loader({ classNames }) {
  console.log({ classNames });
  return (
    <span>
      <img
        src={loader}
        alt="Loading..."
        className={"loader-mini " + classNames}
      />
    </span>
  );
}
