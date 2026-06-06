"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsStore } from "../../../entities/items/model/newsStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { projects, fetchProjects, loading } = useNewsStore();

  useEffect(() => {
    if (!projects.length) {
      fetchProjects();
    }
  }, [projects.length, fetchProjects]);

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#573D2D]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        {t("projectNotFound") || "Лоиҳа ёфт нашуд"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:mt-[50px] py-12">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate(-1)}
        className="flex items-center text-[#573D2D] font-medium mb-8 hover:gap-2 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>

        {t("back")}
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  className="
    relative
    h-[400px]
    md:h-[550px]
    overflow-hidden
    rounded-3xl
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    border
    border-white/20
  "
>
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    loop
    className="w-full h-full"
  >
    {project.img?.map((image, index) => (
      <SwiperSlide key={index}>
        <img
          src={image}
          alt={`${t(`project${project.id}Name`)}-${index + 1}`}
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>

  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
</motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#573D2D] mb-4">
            {t(`project${project.id}Name`)}
          </h1>

          <div className="flex items-center text-gray-500 mb-6">
            <svg
              className="w-5 h-5 mr-2 text-[#573D2D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>

            <span className="text-lg">
              {t(`project${project.id}Address`) || project.address}
            </span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {t(`project${project.id}Description`) || project.description}
          </p>

          {/* <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#573D2D]">
                {project.floors}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                {t("floors")}
              </div>
            </div>

            <div className="text-center border-x border-gray-100">
              <div className="text-3xl font-bold text-[#573D2D]">
                {project.apartments}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                {t("apartments")}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-[#573D2D]">
                {project.area}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                м²
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default ById;
