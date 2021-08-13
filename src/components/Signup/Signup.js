import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthenticationProvider";
import "./style.css";

export function Signup() {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState({});
  const { signUpWithUserData, authDispatch } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const signUpHandler = async () => {
    if (
      userData.fullname.length &&
      userData.username.length &&
      userData.email.length &&
      userData.password.length
    ) {
      try {
        const response = await signUpWithUserData(userData);

        if (response.data.status === 400) {
          setError(error);
          setServerError();
        }
      } catch (error) {
        console.log({ error });
        if (!error.status) {
          setError("Either server or your internet is down.");
        }
      }
    } else {
      setError(true);
    }
  };

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
        onClick={() => signUpHandler()}
        className="btn btn-login"
      />
      {error !== "" && <p className="error">{error}</p>}
      <section className="section-signin">
        Have an account?
        <NavLink to="/login">&nbsp;Log In</NavLink>
      </section>
    </section>
  );
}
