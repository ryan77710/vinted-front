import { useState } from "react";
const ShowPicture = ({ files }) => {
  const [pictureModal, setPictureModal] = useState(false);
  return (
    <div className="caroussel-picture">
      {files.map((file, index) => {
        return (
          <img
            className="caroussel-pic-img"
            key={index}
            onClick={() => {
              setPictureModal(URL.createObjectURL(file));
              console.log(pictureModal);
            }}
            src={URL.createObjectURL(file)}
            alt="clothes"
          />
        );
      })}
      {pictureModal ? (
        <img
          className="picture-modal"
          onClick={() => setPictureModal(false)}
          src={pictureModal}
          alt="clothes"
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default ShowPicture;
