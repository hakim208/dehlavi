import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const textAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const Wwiper = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      imgLogo: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681888/img22_c0ijzh.png",
      image: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681626/img1_bujsh2.jpg",
    },
    {
      id: 2,
      title: t('swiper.slide2.title') || "НОВЫЙ ПРОЕКТ",
      subtitle: t('swiper.slide2.subtitle') || "В СЕРДЦЕ ГОРОДА",
      image: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681657/img2_fzikis.jpg",
    },
    {
      id: 3,
      title: t('swiper.slide3.title') || "ПРЕМИУМ КОМФОРТ",
      subtitle: t('swiper.slide3.subtitle') || "ДЛЯ ВАШЕЙ СЕМЬИ",
      image: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681687/img3_gvz6wr.jpg"
    }
  ];

  return (
    <div className="w-[90%] md:w-[85%] mt-0 md:mt-[40px] max-w-[1500px] mx-auto py-1 md:py-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 3500 }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        /* ИСЛОҲОТ: Класси 'mySwiper' илова шуд, то стилҳои CSS-и шумо кор кунанд */
        className="mySwiper relative rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid grid-cols-2 w-full p-0 m-0 text-white bg-transparent items-center">

              {/* LEFT TEXT / LOGO */}
              <motion.div
                variants={textAnim}
                initial="hidden"
                animate="show"
                key={`text-${slide.id}`}
                className="p-3 md:p-10 flex flex-col justify-center order-2 md:order-1"
              >
                {slide.imgLogo && (
                  <img
                    src={slide.imgLogo}
                    className="max-w-[120px] md:max-w-[320px] w-full h-auto mb-2 md:mb-6 object-contain"
                    alt="Logo"
                  />
                )}

                {(slide.title || slide.subtitle) && (
                  <h1 className="text-[#c8a461] text-[10px] dark:text-[#d7b56a] md:text-4xl font-semibold mb-1 md:mb-6 leading-tight md:leading-snug">
                    {slide.title} {slide.subtitle && <><br /> {slide.subtitle}</>}
                  </h1>
                )}
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                variants={imageAnim}
                initial="hidden"
                animate="show"
                key={`img-${slide.id}`}
                className="order-1 md:order-2 w-full h-auto"
              >
                <img
                  src={slide.image}
                  className="w-full h-auto object-cover rounded-2xl"
                  alt={slide.title || "Slide Image"}
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Wwiper;
