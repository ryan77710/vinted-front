import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
const Drawer = (props) => {
  let history = useHistory();
  const { showDrawer, setShowDrawer, handleLogOut } = props;

  return (
    <div
      onMouseLeave={() => setShowDrawer(false)}
      className={`Drawer ${showDrawer ? "Drawer-active" : `Drawer-exit`}`}
    >
      <ul>
        <li
          onClick={() => {
            history.push("/");
            history.go();
          }}
        >
          <FontAwesomeIcon className="iconLi" icon="home" />
          <span>Accueil</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/offer/my-offers")}>
          <FontAwesomeIcon className="iconLi" icon="spinner" spin />
          <span> Mes annonces</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/user/profile")}>
          <FontAwesomeIcon className="iconLi" icon="user" />
          <span>Mon profile</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/offer/favors")}>
          <FontAwesomeIcon className="iconLi" icon="heartbeat" />
          <span>Favoris</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/user/messages")}>
          <FontAwesomeIcon className="iconLi" icon="comment-dots" />
          <span> Messages</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/about")}>
          <FontAwesomeIcon className="iconLi" icon="exclamation-circle" />
          <span>À Propos</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/support")}>
          <FontAwesomeIcon className="iconLi" icon="hand-holding-medical" />
          <span>Support</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li>
          <FontAwesomeIcon className="iconLi" icon="adjust" />
          <span>Thème</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/contact")}>
          <FontAwesomeIcon className="iconLi" icon="envelope" />
          <span>Contact</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={() => history.push("/payment/donation")}>
          <FontAwesomeIcon className="iconLi" icon="donate" />
          <span>Faire un don </span>
          <div className="iconHide"></div>
          <b></b>
        </li>
        <li onClick={handleLogOut}>
          <FontAwesomeIcon className="iconLi" icon="power-off" />
          <span>Se déconnecter</span>
          <div className="iconHide"></div>
          <b></b>
        </li>
      </ul>
    </div>
  );
};
export default Drawer;
