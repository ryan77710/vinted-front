import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DropZone from "../../Components/DropZone";
import ShowPictures from "../../Components/ShowPictures";
import { toast } from "react-toastify";
import { SpinnerRoundFilled } from "spinners-react";

const PublishPage = ({ authToken }) => {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFile] = useState();
  const [waitResponse, setWaitResponse] = useState(false);

  const [showPictures, setShowPictures] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleBrandChange = (event) => setBrand(event.target.value);
  const handleConditionChange = (event) => setCondition(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleFileChange = (file) => setFile(file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      title &&
      description &&
      size &&
      city &&
      brand &&
      condition &&
      color &&
      price &&
      files
    ) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`picture${i}`, files[i]);
      }
      formData.append("title", title);
      formData.append("description", description);
      formData.append("size", size);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("condition", condition);
      formData.append("color", color);
      formData.append("price", price);

      try {
        setWaitResponse(true);
        await axios.post(
          `${process.env.REACT_APP_API_URL}offer/publish`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + authToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        history.push("/offer/my-offers");
        toast.info("Produit publié");
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
          toast.error("echec un probleme a été detecter");
        }
      } finally {
        setWaitResponse(false);
      }
    } else {
      toast.error("Remplisser tous les champs");
    }
  };
  return (
    <>
      {authToken ? (
        <div className="PublishPage">
          <h2>Vends ton article</h2>
          <form onSubmit={handleSubmit}>
            <div>
              {Array.isArray(files) && files.length > 1 ? (
                <span
                  onClick={() => setShowPictures(!showPictures)}
                  className="multiple-files-icon"
                >
                  <FontAwesomeIcon color="grey" icon="images" />
                  <span>Voir les autres photos</span>
                </span>
              ) : (
                ""
              )}
              {showPictures ? (
                <ShowPictures files={files} />
              ) : (
                <DropZone handleFileChange={handleFileChange} files={files} />
              )}
            </div>
            <div>
              <label>
                <p>Titre</p>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="ex : jolie manteau de l'akatsuki "
                />
              </label>
              <label>
                <p>Décris ton article</p>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="un peu d'inpiration !!"
                ></textarea>
              </label>
              <label>
                <p>Taille</p>
                <input
                  type="text"
                  value={size}
                  onChange={handleSizeChange}
                  placeholder="ex : taille S"
                />
              </label>
            </div>
            <div>
              <label>
                <p>Ville</p>
                <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="ex : Konoha"
                />
              </label>
              <label>
                <p>Marque</p>
                <input
                  type="text"
                  value={brand}
                  onChange={handleBrandChange}
                  placeholder="ex : écrivez la marque"
                />
              </label>
              <label>
                <p>État</p>
                <input
                  type="text"
                  value={condition}
                  onChange={handleConditionChange}
                  placeholder="ex : très bonne état"
                />
              </label>
            </div>
            <div>
              <label>
                <p>Couleur</p>
                <input
                  type="text"
                  value={color}
                  onChange={handleColorChange}
                  placeholder="ex : noir et rouge"
                />
              </label>
              <label>
                <p>Prix</p>
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="0.00€"
                />
              </label>
            </div>
            {waitResponse ? (
              <SpinnerRoundFilled
                size={64}
                thickness={107}
                speed={100}
                color="#ff006a"
              />
            ) : (
              <button type="submit">Ajouter</button>
            )}
          </form>
        </div>
      ) : (
        <div className="publish-error-message">
          <p>"Vous dever être connecter pour vendre des produits "</p>
        </div>
      )}
    </>
  );
};

export default PublishPage;
