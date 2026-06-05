import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NewsCard = ({ item }) => {
  const { t, i18n } = useTranslation();

  const currentLanguage = localStorage.getItem("app_lang") || i18n.language || "ru";

  const itemTitle = typeof item.title === "object" ? item.title[currentLanguage] || item.title.ru : item.title;
  const itemShort = typeof item.short === "object" ? item.short[currentLanguage] || item.short.ru : item.short;
  const displayImage = Array.isArray(item.img) ? item.img[0] : item.img;

  const isVideo = displayImage?.endsWith(".mp4");

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link
        to={`/news/${item.id}`}
        className="block overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
          {/* ⬇️ Шарт барои видео */}
          {isVideo ? (
            <video src={displayImage} autoPlay loop muted playsInline className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          ) : (
            <img src={displayImage} alt={itemTitle} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          )}
          <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {item.date}
          </div>
        </div>

        <div className="p-4 md:p-5 bg-white">
          <h2 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">{itemTitle}</h2>
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">{itemShort}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-gray-500">{t('newss.readMore')}</span>
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#c8a461] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3 md:w-4 md:h-4">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H8.25a.75.75 0 010-1.5h5.69l-1.72-1.72a.75.75 0 011.06-1.06l3 3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
