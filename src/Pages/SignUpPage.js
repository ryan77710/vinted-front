import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const SignUpPage = (props) => {
  let history = useHistory();
  const { handleLogin } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [picture, setPicture] = useState(null);
  let [fileHide, setFileHide] = useState(true);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleNumberChange = (event) => {
    const value = event.target.value;
    setNumber(value);
  };
  const handlePictureChange = (event) => {
    console.log(event.target.files);
    const value = event.target.files[0];
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        email: email,
        username: name,
        password: password,
        phone: number,
      };
      console.log(data);
      const response = await axios.post("http://localhost:3100/user/signup", {
        email: email,
        password: password,
        username: name,
        phone: number,
      });
      console.log(response);
      const token = response.data.token;
      const user = response.data.account.username;
      handleLogin(token, user);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const showPicture = () => {
    let calc = (fileHide = !fileHide);
    setFileHide(calc);
  };
  return (
    <div className="SignUpPage">
      <form onSubmit={handleSubmit}>
        <h2>S'inscrire</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="number"
          placeholder="numero de telephone"
          value={number}
          onChange={handleNumberChange}
        ></input>
        {fileHide ? (
          <div onClick={showPicture} className="file">
            <b>choisissez une image de profile</b>
          </div>
        ) : (
          <div className="file">
            <input
              type="file"
              accept="image/*"
              placeholder="photo de profil"
              onClick={showPicture}
            />
          </div>
        )}

        <div className="chek">
          <input type="checkbox" name="check" />
          <label>S'insrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button type="submit">S'inscrire</button>
        <span onClick={() => history.push("/user/login")}>
          Tu as déjà un compte ? Connecte-toi !
        </span>
      </form>
    </div>
  );
};

export default SignUpPage;
