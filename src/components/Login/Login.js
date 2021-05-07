import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthenticationProvider";
import "./style.css";

export default function Login({}) {
  const { authDispatch } = useAuthContext();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const login = () => {
    if (loginCredentials.username.length && loginCredentials.password.length) {
      axios
        .post("http://localhost:5000/accounts/login", {
          username: loginCredentials.username,
          password: loginCredentials.password,
        })
        .then((res) => {
          if (res.data.status === 200) {
            authDispatch({ type: "LOGIN", payload: { success: true } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
