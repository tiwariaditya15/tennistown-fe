import { LOGOUT } from "../../constants/auth";
import { RESETCART } from "../../constants/cart";
import { RESETWISHLISTS } from "../../constants/wishslists";
import { useAuthContext } from "../../context/AuthenticationProvider";
import { useStateContext } from "../../context/StateProvider";

export function Accounts() {
  const { logout } = useAuthContext();
  const { dispatch } = useStateContext();
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
          onClick={() => {
            // authDispatch({ type: LOGOUT });
            logout();
            dispatch({ type: RESETCART });
            dispatch({ type: RESETWISHLISTS });
          }}
        >
          Log Out
        </button>
      </section>
    </section>
  );
}
