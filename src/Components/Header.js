import vintedLogo from "../assets/img/vinted-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  console.log(history);
  return (
    <header>
      <img onClick={() => history.push("/")} src={vintedLogo} alt="vinted" />
      <div>
        <FontAwesomeIcon icon="search" />
        <input type="text" placeholder="Recherche des articles" />
      </div>
      <button onClick={() => history.push("/user/signup")}>S'inscrire</button>
      <button onClick={() => history.push("/user/login")}>Se connecter</button>
      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
