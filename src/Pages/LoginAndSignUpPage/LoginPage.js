import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = (props) => {
  const history = useHistory();
  const { handleLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/login`,
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      const user = response.data.account.username;
      handleLogin(token, user);

      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  return (
    <div className={` LoginPage `}>
      <form onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Se connecter</button>
        <span onClick={() => history.push("/user/signup")}>
          Pas encore de compte ? Inscris-toi !
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
