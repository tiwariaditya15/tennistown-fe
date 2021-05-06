import { NavLink } from "react-router-dom";
import "./style.css";
export default function Login({}) {
  return (
    <section className="section-login flex-column">
      <input
        type="text"
        onChange={() => {}}
        placeholder="Username"
        className="form-input outlined"
      />
      <input
        type="password"
        onChange={() => {}}
        placeholder="Password"
        className="form-input outlined"
      />
      <input type="button" value="Log In" className="btn btn-login" />
      <section className="section-signin">
        Don't have an account?
        <NavLink to="/signup">&nbsp;&nbsp;Sign Up</NavLink>
      </section>
    </section>
  );
}
