import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = (props) => {
  let history = useHistory();
  const { handleLogin } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [picture, setPicture] = useState(false);
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
    setPicture(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && name && password && number && picture) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", name);
        formData.append("password", password);
        formData.append("phone", number);
        formData.append("pictureup", picture);

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}user/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const token = response.data.token;
        const user = response.data.account.username;
        handleLogin(token, user);
        history.push("/");
        toast.success("Compte créer");
      } else {
        toast.error("Champ vide ou incorrect");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const showPicture = () => {
    setFileHide(false);
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
          <div className="file flip-in-ver-right">
            <input
              type="file"
              placeholder="photo de profil"
              onClick={showPicture}
              onChange={handlePictureChange}
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
