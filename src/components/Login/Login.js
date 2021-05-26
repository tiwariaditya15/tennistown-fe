import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthenticationProvider";
import "./style.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const { loginWithUsernamePassword } = useAuthContext();

  const login = () => {
    if (loginCredentials.username.length && loginCredentials.password.length) {
      const status = loginWithUsernamePassword(
        loginCredentials.username,
        loginCredentials.password
      );
      // complete the logic if API call in loginWithUsernamePassword fails because of wrong creds
    } else {
      // setError if username/password is empty
    }
  };

  return (
    <section className="section-login flex-column">
      <input
        type="text"
        onChange={(e) => {
          setLoginCredentials({
            ...loginCredentials,
            username: e.target.value,
          });
        }}
        placeholder="Username"
        className="form-input outlined"
      />
      <input
        type="password"
        onChange={(e) => {
          setLoginCredentials({
            ...loginCredentials,
            password: e.target.value,
          });
        }}
        placeholder="Password"
        className="form-input outlined"
      />
      {error && <p className="error"> {error} </p>}
      <input
        type="button"
        value="Log In"
        className="btn btn-login"
        onClick={login}
      />
      <section className="section-signin">
        Don't have an account?
        <NavLink to="/signup">&nbsp;Sign Up</NavLink>
      </section>
    </section>
  );
}
