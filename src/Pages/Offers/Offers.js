import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IsLoading from "../../Components/Loading";
import HomeOfferItem from "../../Components/HomeOfferItem";
import { toast } from "react-toastify";

const Offers = ({ authToken }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}offer/my-offers`,
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

  const handleDeleteOfferClick = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}offer/delete`,
        { id },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const tab = [...data];
      tab.map((offer, index) => {
        if (offer._id === id) {
          tab.splice(index, 1);
        }
        return "";
      });
      setData(tab);
      toast.info("Produit suprimmé");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="Offers">
          <div className="container-offer">
            {data.map((offer) => {
              return (
                <HomeOfferItem
                  key={offer._id}
                  offer={offer}
                  onClick={() => history.push(`/offer/${offer._id}`)}
                >
                  <b>
                    <FontAwesomeIcon
                      title="Modifié l'annonce"
                      className="update-button"
                      icon="edit"
                      onClick={() => history.push(`/offer/update/${offer._id}`)}
                    />
                    <FontAwesomeIcon
                      title="Suprimé l'annonce"
                      className="delete-button"
                      icon="trash-alt"
                      onClick={() => handleDeleteOfferClick(offer._id)}
                    />
                  </b>
                </HomeOfferItem>
              );
            })}
            {data.length === 0 ? (
              <div className="noOffer">
                <p>Aucune annonce posté</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Offers;
