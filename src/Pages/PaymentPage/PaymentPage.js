import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const PaymentPage = ({ authToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { name, price, product_picture, userpicture, username, description } =
    location.state || {};
  const [succeeded, setSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: username,
    });

    if (!stripeResponse.token) {
      setErrorMessage(stripeResponse.error.message);
    } else {
      const stripeToken = stripeResponse.token.id;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}payment`,
          {
            stripeToken,
            description: description,
            price: price,
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log(response);
        if ((response.data.status = "succeeded")) {
          setSucceeded(true);
        } else {
          alert("une erreur c'est produite réesseryé ");
        }
      } catch (error) {
        alert("une erreur c'est produite réesseryé ");
      }
    }
  };

  let total = Number(price) + 1.2;

  return (
    <>
      {!succeeded ? (
        <div className="PaymentPage">
          <div>
            <img
              src={product_picture}
              alt={name}
              className="kenburns-top-left"
              title="nous nous excusons pour la qualité de certaines images "
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="résumé">
              <span className="résumé-img">
                Résumé de la commande de :
                <img src={userpicture} alt={username} />
                {username}
              </span>
              <div>
                <p>Commande</p>
                <span>{price.toFixed(2)} €</span>
              </div>
              <div>
                <p>Frais protection acheteurs</p>
                <span>0,40 €</span>
              </div>
              <div>
                <p>Frais de port</p>
                <span>0,80 €</span>
              </div>
            </div>
            <div className="total">
              <div>
                <p>Total</p>
                <span>{total.toFixed(2)} €</span>
              </div>
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <b>{name}</b>.
                <br />
                Vous allez payer <b>{total.toFixed(2)} €</b> (frais de
                protection et frais de port inclus).
              </p>
            </div>
            <CardElement className="payment-card" />
            {errorMessage && <b className="error-message">{errorMessage}</b>}
            <button type="submit">Pay</button>
          </form>
        </div>
      ) : (
        <div className="PaymentPage pay-accept">
          <div className="bounce-in-top">
            <span>
              Félicitation {username} le payment de {price} € a été éfectué 😎
            </span>
            <button onClick={() => history.push("/")}>
              Cliquez ici pour revenir a la page principale
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
