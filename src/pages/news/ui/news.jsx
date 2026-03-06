// NewsPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingComponent } from "../../../components/loading";
import { useNewsStore } from "../../../entities/items/model/newsStore";

const NewsPage = () => {
  const { t, i18n } = useTranslation();
  const { news, fetchNews, loading } = useNewsStore();
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length > 0 && !selectedNews) {
      setSelectedNews(news[0]);
    }
  }, [news.length]);

  if (loading) {
    return <LoadingComponent/>;
  }

  const handleSelectNews = (item) => {
    setSelectedNews(item);
    setSelectedImage(0);
  };

  const getImages = (item) => {
    return Array.isArray(item.img) ? item.img : [item.img];
  };

  // Функсия барои гирифтани матн бо забон
  const getText = (item, field) => {
    const currentLanguage = localStorage.getItem("app_lang") || i18n.language || "ru";

    if (!item || !item[field]) return '';

    if (typeof item[field] === 'object') {
      return item[field][currentLanguage] || item[field].ru || '';
    }

    return item[field];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mt-[30px] mx-auto px-4 py-8 md:py-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl text-[#c8a461] md:text-3xl font-bold mb-4 md:mb-0"
        >
          {t('newss.title')}
        </motion.h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 60% - Хабарҳои муфассал */}
        <div className="lg:w-[60%]">
          {selectedNews ? (
            <motion.div
              key={selectedNews.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Main Image */}
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={getImages(selectedNews)[selectedImage]}
                  alt={getText(selectedNews, 'title')}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
                  {selectedNews.date}
                </div>
              </div>

              {/* Image Thumbnails */}
              {getImages(selectedNews).length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {getImages(selectedNews).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-[#c8a461]'
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
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{getText(selectedNews, 'title')}</h2>
                <p className="text-gray-700 text-base md:text-lg mb-6">
                  {getText(selectedNews, 'fullText') || getText(selectedNews, 'short')}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={`/news/${selectedNews.id}`}
                    className="px-6 py-2 bg-[#c8a461] text-white rounded-lg hover:bg-[#a88441] transition-colors font-medium"
                  >
                    {t('newss.readFull')}
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-12 text-center">
              <p className="text-gray-500">{t('newss.selectNews')}</p>
            </div>
          )}
        </div>

        {/* 35% - Рӯйхати хабарҳо */}
        <div className="lg:w-[35%]">
          <div className="sticky top-8">
            <h3 className="text-xl text-[#c8a461] font-semibold mb-6 pb-3 border-b border-gray-200">
              {t('newss.allNews')}
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {news.map((item, index) => {
                const itemImage = Array.isArray(item.img) ? item.img[0] : item.img;
                const itemTitle = getText(item, 'title');
                const itemShort = getText(item, 'short');

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectNews(item)}
                    className={`cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                      selectedNews?.id === item.id
                        ? 'bg-[#c8a461]/10 border-l-4 border-[#c8a461]'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={itemImage}
                          alt={itemTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm md:text-base line-clamp-2">{itemTitle}</h4>
                        <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                        <p className="text-gray-600 text-xs mt-2 line-clamp-2">{itemShort}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsPage;
