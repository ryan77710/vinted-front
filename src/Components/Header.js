import vintedLogo from "../assets/img/vinted-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import debounce from "debounce";

const Header = (props) => {
  const {
    authToken,
    handleLogOut,
    handleTitle,
    title,
    handleOrdreChange,
    ordre,
    handleValueMaxChange,
    handleValueMinChange,
    valueMin,
    valueMax,
  } = props;
  let history = useHistory();
  return (
    <header className="vibrate-1">
      <img onClick={() => history.push("/")} src={vintedLogo} alt="vinted" />
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
            {ordre ? (
              <button onClick={handleOrdreChange}>
                <span>trier par ordre croissant </span>
                <FontAwesomeIcon icon="chart-line" />
              </button>
            ) : (
              <button onClick={handleOrdreChange}>
                <span>trier par ordre décroissant </span>
                <FontAwesomeIcon icon="sort-numeric-down" />
              </button>
            )}
          </div>
          <div>
            <label>prix minimum : </label>
            <input
              type="number"
              value={valueMin}
              onChange={handleValueMinChange}
            />
            €<label>prix maximum : </label>
            <input
              type="number"
              value={valueMax}
              onChange={handleValueMaxChange}
            />
            €
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
