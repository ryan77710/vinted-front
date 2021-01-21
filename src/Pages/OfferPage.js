import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";

const OfferPage = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3100/offer/${id}`);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return (
    <>
      {isLoading === true ? (
        <Loading></Loading>
      ) : (
        <div className="OfferPage">
          <main>
            <div>
              <img src={data.product_image.url} alt={data.produc_name} />
            </div>
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
                <button>Acheter</button>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default OfferPage;
