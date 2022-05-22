import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthenticationProvider";
import "./style.css";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const {
    authState: { logged },
  } = useAuthContext();

  const { loginWithUsernamePassword } = useAuthContext();

  const setTestCredentials = () =>
    setLoginCredentials({
      ...loginCredentials,
      username: "tiwariadi",
      password: "tiwariadi",
    });

  const login = async () => {
    if (loginCredentials.username.length && loginCredentials.password.length) {
      setError("");
      setLoading(true);
      const status = await loginWithUsernamePassword(
        loginCredentials.username,
        loginCredentials.password
      );

      if (status === 404) {
        setError("Wrong Username!");
      }

      if (status === 401) {
        setError("Wrong Password!");
      }

      if (status === undefined) {
        setError(status);
      }
      setLoading(false);
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

  if (logged) return <Navigate to="/" />;
  return (
    <>
      <section className="section-login flex-column">
        <input
          type="text"
          value={loginCredentials.username}
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
          value={loginCredentials.password}
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
          type="submit"
          value={!loading ? "Log In" : "Loggin in..."}
          className="btn btn-login"
          onClick={() => (!loading ? login() : null)}
        />
        <input
          type="submit"
          value="Fill Login Creds"
          className="btn btn-login"
          onClick={setTestCredentials}
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
