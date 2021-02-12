import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const LoginPage = (props) => {
  const history = useHistory();
  const { handleLogin, redirect, setRedirect, red } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ email, password });
    try {
      const response = await axios.post("http://localhost:3100/user/login", {
        email: email,
        password: password,
      });
      console.log(response);
      const token = response.data.token;
      const user = response.data.account.username;
      handleLogin(token, user);
      if (redirect) {
        history.push("/offer/publish");
        setRedirect(false);
      } else {
        history.push(red);
      }
    } catch (error) {
      console.log(error.message);
      alert("mission fail sniff || retry to connect");
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
