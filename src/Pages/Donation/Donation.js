import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Donation = ({ authToken }) => {
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [donation, setDonation] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDonationChange = (event) => setDonation(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement);
    if (!stripeResponse.token) {
      setErrorMessage(stripeResponse.error.message);
      toast.error(stripeResponse.error.message);
    } else {
      const stripeToken = stripeResponse.token.id;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}payment/donation`,
          {
            stripeToken,
            price: donation,
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        if ((response.data.status = "succeeded")) {
          setSucceeded(true);
          toast.success("Merci pour votre don :) ");
        } else {
          toast.error("une erreur c'est produite réesseryé ");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="Donation">
      {!succeeded ? (
        <form onSubmit={handleSubmit}>
          <h2>Faire un don !</h2>
          <input
            type="number"
            value={donation}
            onChange={handleDonationChange}
          />
          <span>
            Faire un don de <b>{donation} </b> €
          </span>
          <div>
            <CardElement />
            <p className="error-message">{errorMessage}</p>
          </div>

          <button type="submit">Validez</button>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            aliquid velit ad doloremque. Quasi blanditiis amet accusantium autem
            vero veniam similique adipisci, doloribus laudantium quas nulla,
            repellat architecto id ea.Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sapiente aliquid velit ad doloremque. Quasi
            blanditiis amet accusantium autem vero veniam similique adipisci,
            doloribus laudantium quas nulla, repellat architecto id ea.Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquid
            velit ad doloremque. Quasi blanditiis amet accusantium autem vero
            veniam similique adipisci, doloribus laudantium quas nulla, repellat
            architecto id ea.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sapiente aliquid velit ad doloremque. Quasi blanditiis amet
            accusantium autem vero veniam similique adipisci, doloribus
            laudantium quas nulla, repellat architecto id ea.
          </p>
        </form>
      ) : (
        <div className="donation-succeeded">
          <p>Merci pour votre don 😇 !</p>
          <button onClick={() => history.push("/")}>Accueil</button>
        </div>
      )}
    </div>
  );
};
export default Donation;
