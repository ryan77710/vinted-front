import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IsLoading from "../../Components/Loading";
import HomeOfferItem from "../../Components/HomeOfferItem";

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
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/offer/delete`,
      { id },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
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
          </div>
        </div>
      )}
    </div>
  );
};
export default Offers;
