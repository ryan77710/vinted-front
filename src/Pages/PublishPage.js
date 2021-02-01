import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const PublishPage = ({ authToken, redirect, setRedirect }) => {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState({});

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleBrandChange = (event) => setBrand(event.target.value);
  const handleConditionChange = (event) => setCondition(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("price", price);
    console.log({
      formData,
    });
    try {
      console.log(authToken);
      const response = await axios.post(
        "http://localhost:3100/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
        setRedirect(true);
        history.push("/user/login");
      } else {
        alert("echec un probleme a été detecter");
      }
    }
  };
  return (
    <div className="PublishPage">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
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
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="0.00€"
            />
          </label>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default PublishPage;
