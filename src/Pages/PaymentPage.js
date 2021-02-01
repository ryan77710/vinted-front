import { useLocation } from "react-router-dom";
const PaymentPage = () => {
  const location = useLocation();
  const {
    name,
    price,
    product_picture,
    userpicture,
    username,
  } = location.state;
  let total = Number(price) + 1.2;
  return (
    <div className="PaymentPage">
      <div>
        <img
          src={product_picture}
          alt={name}
          className="kenburns-top-left"
          title="nous nous excusons pour la qualité de certaines images "
        />
      </div>

      <form>
        <div className="résumé">
          <span className="résumé-img">
            Résumé de la commande de :
            <img src={userpicture} alt={username} />
            {username}
          </span>
          <div>
            <p>Commande</p>
            <span>{price} €</span>
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
            <span>{total} €</span>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir <b>{name}</b>.
            <br />
            Vous allez payer <b>{total} €</b> (frais de protection et frais de
            port inclus).
          </p>
        </div>
        <button>Pay</button>
      </form>
    </div>
  );
};

export default PaymentPage;
