import { useEffect, useState } from "react";
import { MdiArrowLeft, MdiArrowRight } from "../icones/index";

export function ImageSlider({ images, cardImg }) {
  const [imageIndex, setImageIndex] = useState(0);

  const changeImageIndex = () => {
    images.length - 1 === imageIndex
      ? setImageIndex(0)
      : setImageIndex((imageIndex) => imageIndex + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [imageIndex]);
  return (
    <section className="banner">
      <span className="arrows" onClick={() => changeImageIndex()}>
        <MdiArrowLeft width="2rem" height="2rem" />
      </span>
      <img src={images[imageIndex]} className={"card-img"} alt="" />
      <span className="arrows" onClick={() => changeImageIndex()}>
        <MdiArrowRight width="2rem" height="2rem" />
      </span>
    </section>
  );
}
