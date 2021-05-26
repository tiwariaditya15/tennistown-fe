import { NavLink } from "react-router-dom";
import { images } from "../../images/index";
import balls from "../../images/balls.jpg";
import racquet from "../../images/racquet.jpg";
import accessories from "../../images/accessories.jpg";
import "./style.css";
import { useEffect, useState } from "react";

export default function Home({}) {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    console.log("Mounted.");
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [imageIndex]);
  return (
    <section>
      <section className="banner">
        <img src={images[imageIndex]} alt="" />
      </section>
      <section className="categories">
        <NavLink to="products">
          <section className="category">
            <img src={racquet} alt="Racquet" />
            <span className="img-text">RACQUETS</span>
          </section>
        </NavLink>
        <NavLink to="products">
          <section className="category">
            <img src={balls} alt="Balls" />
            <span className="img-text">BALLS</span>
          </section>
        </NavLink>
        <NavLink to="products">
          <section className="category">
            <img src={accessories} alt="Accessories" />
            <span className="img-text">ACCESSORIES</span>
          </section>
        </NavLink>
      </section>
    </section>
  );
}
