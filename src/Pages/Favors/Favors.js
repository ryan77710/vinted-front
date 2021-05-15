import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import IsLoading from "../../Components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const Favors = ({ authToken }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/profile`,
        null,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setData(response.data.user);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);

  const handleDeleteFavClick = async (idToDelete) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}offer/delete-favorite`,
        { idToDelete },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const newData = { ...data };
      const tab = [...data.favoritesOffer];
      tab.forEach((offer) => {
        if (offer._id === idToDelete) {
          offer.favorite = false;
        }
      });
      newData.favoritesOffer = tab;
      setData(newData);
      toast.info(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="Favors">
          {data.favoritesOffer.map((offer) => {
            if (offer.favorite) {
              return (
                <div key={offer._id} className="offer">
                  <img
                    src={offer.product_image.url}
                    onClick={() => history.push(`/offer/${offer._id}`)}
                    alt="offer"
                  />
                  <p>{offer.product_price} € </p>
                  <p>{offer.product_name}</p>
                  <FontAwesomeIcon
                    onClick={() => handleDeleteFavClick(offer._id)}
                    className="star-icon"
                    icon="star"
                    color="#ff006a"
                    title="Suprimé des favoris"
                  />
                </div>
              );
            } else return "";
          })}
          {data.favoritesOffer.length === 0 ? (
            <p>Aucune annonce en favoris</p>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
export default Favors;
