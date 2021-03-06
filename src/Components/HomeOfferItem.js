const HomeOfferItem = (props) => {
  const { offer, className } = props;
  return (
    <div
      className={`homeOfferItem ${className} `}
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
        {props.children}
      </div>
    </div>
  );
};

export default HomeOfferItem;
