import vintedLogo from "../../assets/img/vinted-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import RangeSlider from "./RangeSlider";
import Switch from "@material-ui/core/Switch";

const Header = (props) => {
  const {
    authToken,
    handleLogOut,
    handleTitle,
    title,
    toggleOrder,
    setToggleOrder,
    priceValue,
    setPriceValue,
  } = props;

  let history = useHistory();
  return (
    <header className="vibrate-1">
      <img
        onClick={() => {
          history.push("/");
          history.go();
        }}
        src={vintedLogo}
        alt="vinted"
      />
      <div>
        <div className="search">
          <FontAwesomeIcon icon="search" />
          <input
            type="text"
            placeholder="Recherche des articles"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="option">
          <div>
            {toggleOrder ? (
              <p>Trier par ordre croissant</p>
            ) : (
              <p>Trier par ordre décroissant</p>
            )}
            <Switch
              checked={toggleOrder}
              onClick={() => setToggleOrder(!toggleOrder)}
            />
          </div>
          <div>
            <p>
              Prix min : {priceValue[0]} €
              <br />
              Prix max : {priceValue[1]} €
            </p>
            <RangeSlider
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          </div>
        </div>
      </div>

      {authToken ? (
        <button className="log-out-color" onClick={handleLogOut}>
          Se déconnecter
        </button>
      ) : (
        <>
          <button onClick={() => history.push("/user/signup")}>
            S'inscrire
          </button>
          <button onClick={() => history.push("/user/login")}>
            Se connecter
          </button>
        </>
      )}

      <button onClick={() => history.push("/offer/publish")}>
        Vends tes articles
      </button>
      <div className="scale-out-hor-right"></div>
    </header>
  );
};

export default Header;
