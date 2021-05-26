import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthenticationProvider";

export default function Signup({}) {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const { authDispatch } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const signUp = () => {
    if (
      userData.fullname.length &&
      userData.username.length &&
      userData.email.length &&
      userData.password.length
    ) {
      axios
        .post("http://localhost:5000/accounts/emailsignup", { ...userData })
        .then((res) => {
          if (res.data.status === 201) {
            authDispatch({ type: "SIGNUP", payload: { success: true } });
            navigate(`/`);
            setError(false);
          }
        })
        .catch((error) => console.log(error));
      setError();
    } else {
      setError(true);
    }
  };

  console.log({ userData });
  return (
    <section className="section-login flex-column">
      <input
        type="text"
        onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
        placeholder="Full Name"
        className="form-input outlined"
      />
      {error && userData.fullname.length === 0 ? (
        <p className="error">Full Name can't be empty.</p>
      ) : null}
      <input
        type="text"
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        placeholder="Username"
        className="form-input outlined"
      />
      {error && userData.username.length === 0 ? (
        <p className="error">Username can't be empty.</p>
      ) : null}
      <input
        type="text"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        placeholder="Email"
        className="form-input outlined"
      />
      {error && userData.email.length === 0 ? (
        <p className="error">Email can't be empty.</p>
      ) : null}
      <input
        type="password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="Password"
        className="form-input outlined"
      />
      {error && userData.password.length === 0 ? (
        <p className="error">Password can't be empty.</p>
      ) : null}
      <input
        type="button"
        value="Sign Up"
        onClick={() => signUp()}
        className="btn btn-login"
      />
      <section className="section-signin">
        Have an account?
        <NavLink to="/login">&nbsp;Log In</NavLink>
      </section>
      {error}
    </section>
  );
}
