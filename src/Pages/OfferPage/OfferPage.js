import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import { useHistory } from "react-router-dom";

import LoginPage from "../LoginAndSignUpPage/LoginPage";
import CarouselPicture from "../../Components/CarouselPicture";

const OfferPage = ({ authToken, handleLogin }) => {
  const history = useHistory();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3100/offer/${id}`);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
      console.log(id);
      alert("Connectez-vous pour acheter un produit");
      setShowLogin(true);
    }
  };
  const handleCloseclick = () => {
    setShowLogin(false);
    console.log(showLogin);
  };
  return (
    <>
      {isLoading === true ? (
        <Loading></Loading>
      ) : (
        <div className="OfferPage">
          <main>
            {/* <div>
              <img src={data.product_image.url} alt={data.product_name} />
              {data.product_picture.map((pic, index) => {
                return (
                  <img
                    src={data.product_picture[index].url}
                    alt={data.produc_name}
                  />
                );
              })}
            </div> */}
            {/* <div> */}
            <CarouselPicture
              picture={data.product_image.url}
              pictures={data.product_picture}
            />
            {/* </div> */}

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
              <LoginPage handleLogin={handleLogin}></LoginPage>
              <button onClick={handleCloseclick}>Fermer</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OfferPage;
