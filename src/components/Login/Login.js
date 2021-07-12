import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthenticationProvider";
import "./style.css";

export function Login() {
  const [error, setError] = useState("");
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const { loginWithUsernamePassword } = useAuthContext();

  const login = async () => {
    if (loginCredentials.username.length && loginCredentials.password.length) {
      setError("");
      const status = await loginWithUsernamePassword(
        loginCredentials.username,
        loginCredentials.password
      );

      if (status === 401) {
        setError("Wrong Username/password.");
      }

      if (status === undefined) {
        setError("");
      }
    } else {
      if (!loginCredentials.username.length) {
        if (!loginCredentials.password.length) {
          return setError("Username and Password are required.");
        }
        setError("Username is required.");
      }

      if (!loginCredentials.password.length) {
        if (!loginCredentials.username.length) {
          return setError("Username and Password are required.");
        }
        setError("Password is required.");
      }
    }
  };

  return (
    <>
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
        <input
          type="button"
          value="Log In"
          className="btn btn-login"
          onClick={login}
        />
        {error !== "" && <p className="error"> {error} </p>}
      </section>
      <section className="section-signin">
        Don't have an account?
        <NavLink to="/signup">&nbsp;Sign Up</NavLink>
      </section>
    </>
  );
}
