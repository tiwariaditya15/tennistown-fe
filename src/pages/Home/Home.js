import { NavLink } from "react-router-dom";
import { images, brands } from "../../images/index";
import { ImageSlider } from "../../components/Atoms";
import balls from "../../images/balls.jpg";
import racquet from "../../images/racquet.jpg";
import accessories from "../../images/accessories.jpg";
import { MdiTwitter, MdiGithub } from "../../components/icones";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function Home() {
  const navigate = useNavigate();
  return (
    <section>
      <ImageSlider images={images} />
      <section className="categories">
        <NavLink to="products?category=racquet">
          <section className="category">
            <img src={racquet} alt="Racquet" />
            <span className="img-text">RACQUETS</span>
          </section>
        </NavLink>
        <NavLink to="products?category=balls">
          <section className="category">
            <img src={balls} alt="Balls" />
            <span className="img-text">BALLS</span>
          </section>
        </NavLink>
        <NavLink to="products?category=accessories">
          <section className="category">
            <img src={accessories} alt="Accessories" />
            <span className="img-text">ACCESSORIES</span>
          </section>
        </NavLink>
      </section>
      <section className="brands">
        {brands.map((brand, idx) => (
          <section
            onClick={() => navigate(`/products?brand=${brand["name"]}`)}
            style={{ cursor: "pointer", textAlign: "center" }}
            key={idx}
          >
            <img src={brand["brand"]} alt="brands" className="brand" />
          </section>
        ))}
      </section>
      <section className="footer">
        <section className="footer-brand">TennisTown&#169;2021</section>
        <section className="footer-socials">
          <span>
            <MdiGithub width="1.5rem" height="1.5rem" />
          </span>
          <span>
            <MdiTwitter width="1.5rem" height="1.5rem" />
          </span>
        </section>
      </section>
    </section>
  );
}
