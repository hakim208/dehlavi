// NewsDetailsPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../../components/loading";
import { useNewsStore } from "../../../entities/items/model/newsStore";

const NewsDetailsPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { newsById, fetchNewsById, loading } = useNewsStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [localizedData, setLocalizedData] = useState({});

  // Бор кардани маълумот
  useEffect(() => {
    fetchNewsById(id);
  }, [id]);

  // Тағир додани забон
  useEffect(() => {
    if (newsById) {
      const lang = localStorage.getItem("app_lang") || "ru";

      const getLocalizedText = (field) => {
        if (!newsById[field]) return '';

        if (typeof newsById[field] === 'object') {
          return newsById[field][lang] || newsById[field].ru || '';
        }

        return newsById[field];
      };

      setLocalizedData({
        title: getLocalizedText('title'),
        short: getLocalizedText('short'),
        fullText: getLocalizedText('fullText'),
      });
    }
  }, [newsById, i18n.resolvedLanguage]);

  if (loading || !newsById || !localizedData.title) {
    return <LoadingComponent/>;
  }

  // Ҳангоми ки img як сатр бошад ва массив набошад
  const images = Array.isArray(newsById.img)
    ? newsById.img
    : [newsById.img];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl md:mt-[40px] mx-auto px-4 py-8 md:py-12"
    >
      {/* Back Button */}
      <motion.a
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        href="/news"
        className="inline-flex items-center gap-2 text-[#c8a461] hover:text-[#a88441] mb-6 text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 rotate-180">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
        </svg>
        {t('newss.backToNews')}
      </motion.a>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl text-[#c8a461] md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
      >
        {localizedData.title}
      </motion.h1>

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8 h-64 md:h-[520px] overflow-hidden rounded-lg md:rounded-xl"
      >
        <img
          src={images[selectedImage]}
          alt={`${localizedData.title} - тасвир ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8  overflow-x-auto pb-2"
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-30 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-[#c8a461] scale-105'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                alt={`Тасвир ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose max-w-none mb-8"
      >
        <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
          {localizedData.fullText}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose max-w-none mb-8"
      >
        <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
          {localizedData.short}
        </p>
      </motion.div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 text-gray-600 text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
        </svg>
        <span>{newsById.date}</span>
      </motion.div>
    </motion.div>
  );
};

export default NewsDetailsPage;
