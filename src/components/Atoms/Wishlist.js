import { MdiCardsHeartRed, MdiHeartOutline } from "../icones";
import { UPDATING_WISHLISTS } from "../../constants/interactions";
import { useStateContext } from "../../context/StateProvider";
import { useInteractions } from "../../context/InteractionProvider";
import { toggleWishlist } from "../../actions/wishslists";
import { Loader } from "../Atoms/Loader";

export default function Wishlist({ item }) {
  const { state, dispatch } = useStateContext();

  const { status, updatingProduct, interactionDispatcher } = useInteractions();

  return (
    <>
      {state.wishlists.some((wish) => wish.product._id === item._id) ? (
        status === UPDATING_WISHLISTS && updatingProduct === item._id ? (
          <Loader classNames="card-header-btn" />
        ) : (
          <span
            onClick={() => {
              toggleWishlist(item._id, dispatch, interactionDispatcher);
            }}
            className="card-header-btn"
          >
            <MdiCardsHeartRed />
          </span>
        )
      ) : status === UPDATING_WISHLISTS && updatingProduct === item._id ? (
        <Loader classNames="card-header-btn" />
      ) : (
        <>
          <span
            onClick={() => {
              toggleWishlist(item._id, dispatch, interactionDispatcher);
            }}
            className="card-header-btn"
          >
            <MdiHeartOutline />
          </span>
        </>
      )}
    </>
  );
}
