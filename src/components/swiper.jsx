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
      imgLogo: "/img/img22.png", // Расми логотипи сохтаамон (прозрачный)
      image: "/img/img1.jpg",
    },
    {
      id: 2,
      title: t('swiper.slide2.title') || "НОВЫЙ ПРОЕКТ",
      subtitle: t('swiper.slide2.subtitle') || "В СЕРДЦЕ ГОРОДА",
      image: "/img/img2.jpg",
    },
    {
      id: 3,
      title: t('swiper.slide3.title') || "ПРЕМИУМ КОМФОРТ",
      subtitle: t('swiper.slide3.subtitle') || "ДЛЯ ВАШЕЙ СЕМЬИ",
      image: "/img/img3.jpg"
    }
  ];

  return (
    <div className="w-[90%] md:w-[85%] mt-20 md:mt-[40px] h-auto max-w-[1500px] mx-auto py-6 md:py-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 3500 }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        className="relative rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 text-white bg-transparent items-center gap-6">

              {/* LEFT TEXT / LOGO */}
              <motion.div
                variants={textAnim}
                initial="hidden"
                animate="show"
                key={`text-${slide.id}`}
                className="p-6 md:p-10 flex flex-col justify-center order-2 md:order-1"
              >
                {/* ИСЛОҲОТ: Танҳо вақте логотип нишон дода мешавад, ки он дар массив мавҷуд бошад */}
                {slide.imgLogo && (
                  <img
                    src={slide.imgLogo}
                    className="max-w-[250px] md:max-w-[320px] w-full h-auto mb-6 object-contain"
                    alt="Logo"
                  />
                )}

                {/* ИСЛОҲОТ: Танҳо вақте сарлавҳа нишон дода мешавад, ки он мавҷуд бошад */}
                {(slide.title || slide.subtitle) && (
                  <h1 className="text-[#c8a461] dark:text-[#d7b56a] text-2xl md:text-4xl font-semibold mb-4 md:mb-6 leading-tight md:leading-snug">
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

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: #c8a461 !important;
          opacity: 1;
          transform: scale(1.2);
        }
        .swiper-pagination {
          bottom: 10px !important;
        }

        @media (min-width: 768px) {
          .swiper-pagination {
            bottom: 20px !important;
          }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Wwiper;
