const HomeOfferItem = (props) => {
  const { offer } = props;
  // console.log(offer);
  return (
    <div
      to={`/offer/${offer._id}`}
      className="homeOfferItem slide-in-elliptic-top-fwd "
      style={{ animationDelay: props.time }}
    >
      <div>
        <img
          src={offer.owner.account.avatar.url}
          alt={offer.owner.account.username}
        />
        <span>{offer.owner.account.username}</span>
      </div>
      <img onClick={props.onClick} src={offer.product_image.url} alt="ok" />
      <div>
        <strong> {offer.product_price} €</strong>
        <p>{offer.product_details[1].TAILLE}</p>
        <p>{offer.product_details[0].MARQUE}</p>
      </div>
    </div>
  );
};

export default HomeOfferItem;
