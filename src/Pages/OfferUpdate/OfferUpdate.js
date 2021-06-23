import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { SpinnerRoundFilled } from "spinners-react";

import IsLoading from "../../Components/Loading";

const OfferUpdate = ({ authToken }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tooglePicture, setTooglePicture] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [waitResponse, setWaitResponse] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleBrandChange = (event) => setBrand(event.target.value);
  const handleConditionChange = (event) => setCondition(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}offer/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken, id]);

  const handlePictureChange = (event, type) => {
    const picture = event.target.files[0];
    if (type === "first-picture") {
      ChangeProductProfilePicture(picture);
    } else if (type === "add-picture") {
      handleAddPictureClick(picture);
    }
  };
  const handleDeletePictureClick = async (assetId, publicId) => {
    try {
      const offerId = id;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}offer/picture-delete`,
        { assetId, publicId, offerId },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const tab = [...data.product_picture];
      tab.map((picture, index) => {
        if (picture.asset_id === assetId) {
          tab.splice(index, 1);
        }
        return "";
      });
      const newData = { ...data };
      newData.product_picture = tab;
      setData(newData);
      toast.info(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ChangeProductProfilePicture = async (picture) => {
    try {
      setWaitResponse(true);
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("offerId", id);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}offer/picture-profile-change`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      toast.info("Image principale du produit mise à jour ! ");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWaitResponse(false);
    }
  };
  const handleAddPictureClick = async (picture) => {
    try {
      setWaitResponse(true);
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("offerId", id);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}offer/picture-add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      toast.info("Image ajoutée ! ");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWaitResponse(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (price) {
    }
    try {
      setWaitResponse(true);
      let priceStatus;
      let regex = new RegExp("^[0-9]*$");
      const sendData = {
        title: title || data.product_name,
        description: description || data.product_description,
        size: size || data.product_details[1].TAILLE,
        city: city || data.product_details[4].EMPLACEMENT,
        brand: brand || data.product_details[0].MARQUE,
        condition: condition || data.product_details[2].ETAT,
        color: color || data.product_details[3].COULEUR,
        id: data._id,
      };

      if (regex.test(price) === true && price) {
        sendData.price = price;
        priceStatus = "number";
      } else if (price && regex.test(price) === false) {
        priceStatus = "NaN";
      } else if (!price) {
        sendData.price = data.product_price;
        priceStatus = "dontExiste";
      }

      if (priceStatus === "number" || priceStatus === "dontExiste") {
        await axios.post(
          `${process.env.REACT_APP_API_URL}offer/update`,
          sendData,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        toast.info("Produit modifié");
      } else if (priceStatus === "NaN") {
        toast.warning("Le prix doit etre un nombre");
      } else {
        toast.warning("Oups grosse erreur veillez nous contacter");
      }
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
        <div className="OfferUpdate">
          <div className="container">
            <h2>
              {`${data.product_picture.length} photos`}
              {tooglePicture ? (
                <FontAwesomeIcon
                  className="chevron-down"
                  icon="chevron-up"
                  onClick={() => setTooglePicture(!tooglePicture)}
                />
              ) : (
                <FontAwesomeIcon
                  className="chevron-down"
                  icon="chevron-down"
                  onClick={() => setTooglePicture(!tooglePicture)}
                />
              )}
            </h2>
            {tooglePicture ? (
              <div>
                <div className="product-image">
                  <img src={data.product_image.url} alt="product" />
                  <label htmlFor="picture">
                    {waitResponse ? (
                      <SpinnerRoundFilled
                        size={64}
                        thickness={107}
                        speed={100}
                        color="#ff006a"
                      />
                    ) : (
                      <p>changer l'image principale du produit</p>
                    )}
                    <input
                      hidden
                      onChange={(event) =>
                        handlePictureChange(event, "first-picture")
                      }
                      id="picture"
                      type="file"
                    />
                  </label>
                </div>
                <div className="picture-container">
                  {data.product_picture.map((picture, index) => {
                    if (index === 0) {
                      return null;
                    }
                    return (
                      <div key={picture.asset_id}>
                        <img src={picture.url} alt="product" />
                        <FontAwesomeIcon
                          className="icon-delete"
                          icon="times-circle"
                          title="suprimé l'image"
                          onClick={() =>
                            handleDeletePictureClick(
                              picture.asset_id,
                              picture.public_id
                            )
                          }
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="picture-add">
                  <label htmlFor="picture-add">
                    {waitResponse ? (
                      <SpinnerRoundFilled
                        size={64}
                        thickness={107}
                        speed={100}
                        color="#ff006a"
                      />
                    ) : (
                      "Ajouter une photo"
                    )}
                    <input
                      id="picture-add"
                      onChange={(event) =>
                        handlePictureChange(event, "add-picture")
                      }
                      type="file"
                      hidden
                    />
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Titre</p>
              <input
                onChange={handleTitleChange}
                value={title}
                placeholder={data.product_name}
                type="text"
              />
            </label>
            <label>
              <p>Description</p>
              <textarea
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                placeholder={data.product_description}
              />
            </label>
            <label>
              <p>Taille</p>
              <input
                type="text"
                value={size}
                onChange={handleSizeChange}
                placeholder={data.product_details[1].TAILLE}
              />
            </label>
            <label>
              <p>Ville</p>
              <input
                value={city}
                type="text"
                onChange={handleCityChange}
                placeholder={data.product_details[4].EMPLACEMENT}
              />
            </label>
            <label>
              <p>Marque</p>
              <input
                value={brand}
                type="text"
                onChange={handleBrandChange}
                placeholder={data.product_details[0].MARQUE}
              />
            </label>
            <label>
              <p>État</p>
              <input
                value={condition}
                type="text"
                placeholder={data.product_details[2].ETAT}
                onChange={handleConditionChange}
              />
            </label>
            <label>
              <p>Couleur</p>
              <input
                value={color}
                type="text"
                onChange={handleColorChange}
                placeholder={data.product_details[3].COULEUR}
              />
            </label>
            <label>
              <p>Prix</p>
              <input
                type="text"
                value={price}
                placeholder={`${data.product_price} €`}
                onChange={handlePriceChange}
              />
            </label>
            {waitResponse ? (
              <SpinnerRoundFilled
                size={64}
                thickness={107}
                speed={100}
                color="#ff006a"
              />
            ) : (
              <button type="submit">Sauvegarder</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
export default OfferUpdate;
