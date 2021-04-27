import { useState } from "react";
// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Thumbs,
  Controller,
  EffectCube,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/effect-cube/effect-cube.scss";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// install Swiper modules
SwiperCore.use([
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  Controller,
  Thumbs,
  A11y,
  EffectCube,
]);

const CarouselPicture = ({ pictures, picture }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const [controlledSwiper, setControlledSwiper] = useState(null);
  const slides = pictures.map((picture, index) => (
    <SwiperSlide key={index}>
      <img src={picture.url} alt="ok" />
    </SwiperSlide>
  ));

  const thumbs = pictures.map((picture, index) => (
    <SwiperSlide key={index}>
      <img src={picture.url} alt="ok" />
    </SwiperSlide>
  ));
  return (
    <div>
      <Swiper
        effect="cube"
        id="picture"
        // autoplay
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img src={picture} alt="ok" />
        </SwiperSlide>
        {slides}
      </Swiper>
      <Swiper
        id="thumbs"
        spaceBetween={5}
        slidesPerView={3}
        onSwiper={setThumbsSwiper}
      >
        {thumbs}
      </Swiper>
      <div id="logo">
        <FontAwesomeIcon icon="heartbeat" title="Ajouter au favories" />{" "}
      </div>
    </div>
  );
};
export default CarouselPicture;
