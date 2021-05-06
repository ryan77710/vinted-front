import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
// import axios from "axios";
const Donation = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [donation, setDonation] = useState(0);
  const handleDonationChange = (event) => setDonation(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="Donation">
      <form onSubmit={() => alert("submit")}>
        <h2>Faire un don !</h2>
        <input type="number" value={donation} onChange={handleDonationChange} />
        <span>
          Faire un don de <b>{donation} </b> €
        </span>
        <div>
          <CardElement />
        </div>

        <button type="submit">Validez</button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          aliquid velit ad doloremque. Quasi blanditiis amet accusantium autem
          vero veniam similique adipisci, doloribus laudantium quas nulla,
          repellat architecto id ea.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sapiente aliquid velit ad doloremque. Quasi
          blanditiis amet accusantium autem vero veniam similique adipisci,
          doloribus laudantium quas nulla, repellat architecto id ea.Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Sapiente aliquid velit ad
          doloremque. Quasi blanditiis amet accusantium autem vero veniam
          similique adipisci, doloribus laudantium quas nulla, repellat
          architecto id ea.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sapiente aliquid velit ad doloremque. Quasi blanditiis amet
          accusantium autem vero veniam similique adipisci, doloribus laudantium
          quas nulla, repellat architecto id ea.
        </p>
      </form>
    </div>
  );
};
export default Donation;
