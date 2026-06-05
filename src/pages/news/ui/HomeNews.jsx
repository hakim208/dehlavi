import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../../../components/loading";
import { useNewsStore } from "../../../entities/items/model/newsStore";

export const HomeNews = () => {
  const { t, i18n } = useTranslation();
  const { news, fetchNews, loading } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading || news.length === 0) {
    return <LoadingComponent />;
  }

  const homeNews = news.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl text-[#c8a461] md:text-3xl font-bold mb-4 md:mb-0"
        >
          {t('newss.title')}
        </motion.h2>
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="/news"
          className="flex items-center gap-2 text-[#c8a461] hover:text-[#a88441] transition-colors text-sm md:text-base"
        >
          {t('newss.allNews')}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
          </svg>
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {homeNews.map((item, index) => {
          const currentLanguage = localStorage.getItem("app_lang") || i18n.language || "ru";

          const itemTitle = typeof item.title === "object" ? item.title[currentLanguage] || item.title.ru : item.title;
          const itemShort = typeof item.short === "object" ? item.short[currentLanguage] || item.short.ru : item.short;
          const displayImage = Array.isArray(item.img) ? item.img[0] : item.img;

          // Текшириши формат
          const isVideo = displayImage?.endsWith(".mp4");

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl dark:bg-black dark:text-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative md:h-[400px] h-48 overflow-hidden">
                {/* ⬇️ Ислоҳи ҳушманд барои подкасти видео */}
                {isVideo ? (
                  <video
                    src={displayImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={displayImage}
                    alt={itemTitle}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {item.date}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{itemTitle}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{itemShort}</p>
                <Link to={`/news/${item.id}`} >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#c8a461] font-medium">
                      {t('newss.readMore')}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#c8a461] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H8.25a.75.75 0 010-1.5h5.69l-1.72-1.72a.75.75 0 011.06-1.06l3 3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
