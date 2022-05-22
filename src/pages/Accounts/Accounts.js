import { LOGOUT } from "../../constants/auth";
import { useAuthContext } from "../../context/AuthenticationProvider";

export function Accounts() {
  const { authDispatch } = useAuthContext();
  return (
    <section style={{ width: "100%" }}>
      <section
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        Coming Soon!
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: "1rem",
        }}
      >
        <button
          style={{
            padding: "0.4rem",
            backgroundColor: "var(--gray-600)",
            color: "white",
            border: "none",
            borderRadius: "0.2rem",
            cursor: "pointer",
          }}
          onClick={() => authDispatch({ type: LOGOUT })}
        >
          Log Out
        </button>
      </section>
    </section>
  );
}
