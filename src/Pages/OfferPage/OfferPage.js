import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import { useHistory } from "react-router-dom";

import LoginPage from "../LoginAndSignUpPage/LoginPage";
import CarouselPicture from "../../Components/CarouselPicture";
import { toast } from "react-toastify";

const OfferPage = ({ authToken, handleLogin }) => {
  const history = useHistory();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (authToken) {
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}offer-auth/${id}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}offer/${id}`
        );
      }
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, authToken]);
  const handleFavOfferClick = async (offer) => {
    if (authToken) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}offer/favorite`,
          data,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const newData = { ...data };
        newData.favorite = !data.favorite;

        setData(newData);
        toast.info(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warning("Connectez-vous ajouté un favori");
    }
  };

  const handlePayclick = () => {
    if (authToken) {
      history.push("/paymentPage", {
        name: data.product_name,
        product_picture: data.product_image.url,
        price: data.product_price,
        username: data.owner.account.username,
        userpicture: data.owner.account.avatar.url,
        description: data.product_description,
      });
    } else {
      toast.warning("Connectez-vous pour acheter un produit");
      setShowLogin(true);
    }
  };
  const handleCloseclick = () => {
    setShowLogin(false);
  };
  return (
    <>
      {isLoading === true ? (
        <Loading></Loading>
      ) : (
        <div className="OfferPage">
          <main>
            <CarouselPicture
              picture={data.product_image.url}
              pictures={data.product_picture}
              favorite={data.favorite}
              iconOnClick={handleFavOfferClick}
            />

            <div className="Offer-page-detail">
              <div>
                <div>{data.product_price} €</div>

                <div>
                  <p>MARQUE</p>
                  {data.product_details[0].MARQUE}
                </div>
                <div>
                  <p>TAILLE</p>
                  {data.product_details[1].TAILLE}
                </div>
                <div>
                  <p>ETAT</p>
                  {data.product_details[2].ETAT}
                </div>
                <div>
                  <p>COULEUR</p>
                  {data.product_details[3].COULEUR}
                </div>
                <div>
                  <p>EMPLACEMENT</p>
                  {data.product_details[4].EMPLACEMENT}
                </div>
                <div>
                  <p>MODES DE PAIEMENT</p> <b>CARTE DE PAIMENT,PAYPAL</b>
                </div>
              </div>
              <div>
                <b>{data.product_name}</b>
                <p>{data.product_description}</p>
                <div>
                  <img
                    src={data.owner.account.avatar.url}
                    alt={data.owner.account.username}
                  />
                  <span>{data.owner.account.username}</span>
                </div>
                <button onClick={handlePayclick}>Acheter</button>
              </div>
            </div>
          </main>
          {showLogin === false ? (
            ""
          ) : (
            <div className="Unauthorized">
              <LoginPage color="red" handleLogin={handleLogin}></LoginPage>
              <button onClick={handleCloseclick}>Fermer</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OfferPage;
