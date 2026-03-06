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
      title: t('swiper.slide1.title') || "TABIAT RESIDENCE",
      subtitle: t('swiper.slide1.subtitle') || "ЖИТЬ В ГАРМОНИИ С ПРИРОДОЙ",
      description: t('swiper.slide1.description') || "СТАРТ ПРОДАЖ",
      image: "/markers/img1.jpg",
    },
    {
      id: 2,
      title: t('swiper.slide2.title') || "НОВЫЙ ПРОЕКТ",
      subtitle: t('swiper.slide2.subtitle') || "В СЕРДЦЕ ГОРОДА",
      description: t('swiper.slide2.description') || "ПРЕДПРОДАЖИ ОТКРЫТЫ",
      image: "/markers/img2.jpg",
    },
    {
      id: 3,
      title: t('swiper.slide3.title') || "ПРЕМИУМ КОМФОРТ",
      subtitle: t('swiper.slide3.subtitle') || "ДЛЯ ВАШЕЙ СЕМЬИ",
      description: t('swiper.slide3.description') || "ЭКСКЛЮЗИВНЫЕ ПЛАНИРОВКИ",
      image: "/markers/img3.jpg"
    }
  ];

  return (
    <div className="w-[90%] md:w-[85%] mt-20 md:mt-[40px] h-[50vh] md:h-[40vh] max-w-[1500px] mx-auto py-6 md:py-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 3500 }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        className="relative rounded-2xl md:rounded-none"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`grid grid-cols-1 md:grid-cols-2 text-white bg-gradient-to-br ${slide.bgGradient} rounded-2xl md:rounded-none min-h-[400px] md:min-h-0`}>

              {/* LEFT TEXT */}
              <motion.div
                variants={textAnim}
                initial="hidden"
                animate="show"
                key={`text-${slide.id}`}
                className="p-6 md:p-10 flex flex-col justify-center order-2 md:order-1"
              >
                <h1 className="text-[#c8a461] dark:text-[#d7b56a] text-2xl md:text-4xl font-semibold mb-4 md:mb-6 leading-tight md:leading-snug">
                  {slide.title} <br /> {slide.subtitle}
                </h1>

                <p className="text-lg md:text-xl mb-4 md:mb-6 dark:text-gray-300">
                  {slide.description}
                </p>

              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                variants={imageAnim}
                initial="hidden"
                animate="show"
                key={`img-${slide.id}`}
                className="order-1 md:order-2"
              >
                <img
                  src={slide.image}
                  className="w-full h-[200px] md:h-[400px] object-cover rounded-t-2xl md:rounded-none"
                  alt={slide.title}
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
