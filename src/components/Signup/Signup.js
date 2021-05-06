import { NavLink } from "react-router-dom";
import "./style.css";
export default function Signup({}) {
  return (
    <section className="section-login flex-column">
      <input
        type="text"
        onChange={() => {}}
        placeholder="Full Name"
        className="form-input outlined"
      />
      <input
        type="text"
        onChange={() => {}}
        placeholder="Username"
        className="form-input outlined"
      />
      <input
        type="text"
        onChange={() => {}}
        placeholder="Email"
        className="form-input outlined"
      />
      <input
        type="password"
        onChange={() => {}}
        placeholder="Password"
        className="form-input outlined"
      />
      <input type="button" value="Sign Up" className="btn btn-login" />
      <section className="section-signin">
        Have an account?
        <NavLink to="/login">&nbsp;Log In</NavLink>
      </section>
    </section>
  );
}
