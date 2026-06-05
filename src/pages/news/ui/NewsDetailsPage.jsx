import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../../components/loading";
import { useNewsStore } from "../../../entities/items/model/newsStore";
import { Helmet } from "react-helmet-async";

const NewsDetailsPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { newsById, fetchNewsById, loading } = useNewsStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [localizedData, setLocalizedData] = useState({});

  useEffect(() => {
    fetchNewsById(id);
  }, [id]);

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

  const images = Array.isArray(newsById.img) ? newsById.img : [newsById.img];
  const activeMedia = images[selectedImage];
  const isVideo = activeMedia?.endsWith(".mp4");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl md:mt-[40px] mx-auto px-4 py-8 md:py-12">
      <Helmet>
        {/* 1. Сарлавҳа ва тавсифи асосӣ барои Google */}
        <title>{localizedData.title} | ЖК Дехлави</title>
        <meta name="description" content={localizedData.short} />

        {/* 2. Open Graph (Барои зебо баромадани линк дар Telegram, WhatsApp, Facebook) */}
        <meta property="og:title" content={`${localizedData.title} | ЖК Дехлави`} />
        <meta property="og:description" content={localizedData.short} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />

        {/* Агар хабар расм дошта бошад, онро нишон медиҳад */}
        {images && images.length > 0 && (
          <meta property="og:image" content={images[0]} />
        )}

        {/* 3. Twitter Card (Барои шабакаҳои иҷтимоӣ) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${localizedData.title} | ЖК Дехлави`} />
        <meta name="twitter:description" content={localizedData.short} />
        {images && images.length > 0 && (
          <meta name="twitter:image" content={images[0]} />
        )}
      </Helmet>

      <motion.a initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} href="/news" className="inline-flex items-center gap-2 text-[#c8a461] hover:text-[#a88441] mb-6 text-sm md:text-base">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 rotate-180">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
        </svg>
        {t('newss.backToNews')}
      </motion.a>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl text-[#c8a461] md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
        {localizedData.title}
      </motion.h1>

      {/* ⬇️ Блоки асосии медиа (Видео ё Расм) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 md:mb-8 overflow-hidden rounded-lg md:rounded-xl flex justify-center bg-gray-50/50 ${
          isVideo ? 'py-4' : 'h-64 md:h-[520px]'
        }`}
      >
        {isVideo ? (
          <video
            // ИЛОВАИ НАВ: Автоматӣ видеоро хурд ва сабук мекунад
            src={activeMedia.replace('/upload/', '/upload/q_auto,f_auto/')}
            controls
            preload="metadata" // ИЛОВАИ НАВ: Интернетро сарфа мекунад
            controlsList="nodownload noremoteplayback"
            className="w-[90%] max-w-[350px] md:max-w-[450px] h-[500px] md:h-[700px] object-cover rounded-2xl shadow-xl"
          />
        ) : (
          <img
            src={activeMedia}
            alt={localizedData.title}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {images.length > 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {images.map((img, index) => {
            const isThumbVideo = img?.endsWith(".mp4");
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-32 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-[#c8a461] scale-105' : 'border-transparent hover:border-gray-300'
                }`}
              >
                {isThumbVideo ? (
                  <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white text-xs">
                    <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    VIDEO
                  </div>
                ) : (
                  <img src={img} alt={`Тасвир ${index + 1}`} className="w-full h-full object-cover" />
                )}
              </button>
            );
          })}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose max-w-none mb-4">
        <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line font-semibold">
          {localizedData.short}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
          {localizedData.fullText}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default NewsDetailsPage;
