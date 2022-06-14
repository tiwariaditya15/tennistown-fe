import { useEffect, useState } from "react";

export function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let timer;
    if (hovered) {
      timer = setTimeout(() => {
        if (index === images.length - 1) {
          setIndex(0);
        } else {
          setIndex((index) => index + 1);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [hovered, images, index]);
  return (
    <img
      className="card-img"
      src={images[index]}
      alt="img-missing"
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      style={hovered ? { cursor: "pointer" } : {}}
    />
  );
}
