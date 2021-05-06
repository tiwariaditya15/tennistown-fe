import { MdiClose } from "../icones/index";
import "./style.css";
export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <section
      className={isOpen ? "sidebar active" : "sidebar"}
      onClick={() => setIsOpen(false)}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <span onClick={() => setIsOpen(false)}>
          <MdiClose />
        </span>
      </section>
      <section className="menu-side">
        <section className="routes">Home</section>
        <section className="routes">Login</section>
        <section className="routes">About</section>
      </section>
    </section>
  );
}
