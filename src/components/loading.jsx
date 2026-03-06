// LoadingComponent.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LoadingComponent = ({ text = "loading" }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Animated Logo/Icon */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="relative mb-8"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-[#c8a461] border-r-[#c8a461]/30 animate-spin"></div>

        {/* Center circle */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#c8a461] to-[#D9B45E] flex items-center justify-center shadow-lg">
          {/* Building/Company icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10 md:w-12 md:h-12">
            <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
            <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
            <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
          </svg>
        </div>
      </motion.div>

      {/* Loading text with dots animation */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
          {t(text)}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              times: [0, 0.5, 1]
            }}
            className="inline-block w-4 text-[#c8a461]"
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              times: [0.3, 0.8, 1]
            }}
            className="inline-block w-4 text-[#c8a461]"
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              times: [0.6, 1, 1]
            }}
            className="inline-block w-4 text-[#c8a461]"
          >
            .
          </motion.span>
        </h3>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4 mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-[#c8a461]/20 via-[#c8a461] to-[#D9B45E]/20"
          />
        </div>

        {/* Additional message */}
        <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-md mx-auto px-4">
          {t('loadingMessage') || "Идда карда истодаед, лутфан сабр кунед..."}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="w-2 h-2 rounded-full bg-[#c8a461]"
          />
        ))}
      </div>
    </motion.div>
  );
};

// SkeletonLoader.jsx (for content loading)
export const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 md:mb-0 animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Image skeleton */}
            <div className="h-48 md:h-56 lg:h-64 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="p-4 md:p-5">
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MinimalLoader.jsx (Simple version)
export const MinimalLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="w-12 h-12 border-4 border-[#c8a461]/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-[#c8a461] border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
      </motion.div>
      <p className="mt-4 text-gray-600 text-sm">{t('loading')}</p>
    </div>
  );
};
