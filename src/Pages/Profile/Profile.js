import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { SpinnerRoundFilled } from "spinners-react";

import IsLoading from "../../Components/Loading";

const Profile = ({ authToken }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [waitResponse, setWaitResponse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/profile`,
        null,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSetPictureClick = (event) => {
    setPicture(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setWaitResponse(true);
      const formData = new FormData();
      if (picture) {
        formData.append(`picture`, picture);
      }
      if (description) {
        formData.append("description", description);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          "Content-Type": "multipart/form-data",
        }
      );
      toast.info(response.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWaitResponse(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="Profile">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div>
              <em>
                {picture ? (
                  <img src={URL.createObjectURL(picture)} alt="user" />
                ) : (
                  <img src={data.user.account.avatar.url} alt="user" />
                )}

                <label title="changé de photo de profile" htmlFor="picture">
                  {waitResponse ? (
                    <SpinnerRoundFilled
                      size={64}
                      thickness={107}
                      speed={100}
                      color="#ff006a"
                    />
                  ) : (
                    <FontAwesomeIcon icon="images" />
                  )}

                  <input
                    id="picture"
                    name="picture"
                    onChange={(event) => handleSetPictureClick(event)}
                    type="file"
                    hidden
                  />
                </label>
              </em>

              <p>
                <span>
                  Utilisateur : <b> {data.user.account.username} </b>
                </span>
              </p>
            </div>
            <div>
              <em>Solde: 10 000 000 000 €</em>
              <textarea
                value={description}
                placeholder={data.user.account.description}
                onChange={handleDescriptionChange}
              ></textarea>
              <span>
                Adresse mail : <b>{data.user.email}</b>
              </span>
              <span>
                Numéro de téléphone : <b>{data.user.account.phone}</b>
              </span>
              <div className="mail-password-button">
                <button onClick={() => alert("indisponible pour le moment")}>
                  Changé d'adresse mail
                </button>
                <button onClick={() => alert("indisponible pour le moment")}>
                  Changé de numéro de telephone
                </button>
                <button onClick={() => alert("indisponible pour le moment")}>
                  Changé de mot de passe
                </button>
              </div>
              {waitResponse ? (
                <SpinnerRoundFilled
                  size={64}
                  thickness={107}
                  speed={100}
                  color="#ff006a"
                />
              ) : (
                <button type="submit"> Sauvegardé</button>
              )}
            </div>
          </form>
          <h2>Mes annonces</h2>
          <div className="carousel">
            {data.myoffers.map((offer) => {
              return (
                <div className="carousel-item1" key={offer._id}>
                  <img
                    src={offer.product_image.url}
                    alt="offer"
                    onClick={() => history.push("/offer/my-offers")}
                  />
                  <p>{offer.product_name}</p>
                  <p> {offer.product_price} € </p>
                </div>
              );
            })}
            {data.myoffers.length === 0 ? (
              <span className="empty-container">Aucune annonce posté ...</span>
            ) : (
              ""
            )}
          </div>
          <h2>Mes favoris</h2>
          <div className="carousel">
            {data.user.favoritesOffer.map((offer) => {
              return (
                <div className="carousel-item1" key={offer._id}>
                  <img
                    src={offer.product_image.url}
                    alt="offer"
                    onClick={() => history.push("/offer/favors")}
                  />
                  <p>{offer.product_name}</p>
                  <p> {offer.product_price} € </p>
                </div>
              );
            })}
            {data.user.favoritesOffer.length === 0 ? (
              <span className="empty-container">
                Aucune annonce en favori ...
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
