import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

const ApartmentCard = ({ apartment, onLearnMore }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      layout
      onClick={() => onLearnMore(apartment)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
    >
      {/* Қисми Сурат */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <motion.img
          src={apartment.img}
          alt={`Apartment ${apartment.floor}`}
          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Теги миқдори ҳуҷраҳо */}
        <div className="absolute top-3 left-3 bg-[#573D2D] text-white px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5 z-10">
          <Home className="w-3.5 h-3.5 text-[#D4A017]" />
          <span className="font-bold text-xs">
            {apartment.floor || 0} {t('rooms') || 'ҳуҷра'}
          </span>
        </div>
      </div>

      {/* Қисми Маълумот */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold bg-[#D4A017]/10 text-[#573D2D] dark:text-[#D4A017] px-2 py-1 rounded">
            {apartment.floor} {t('rooms') || 'ҳуҷра'}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            {/* Агар хоҳед, ки дар ин ҷо нарх ё чизи дигар бошад, метавонед илова кунед */}
          </div>
          <button
            className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full group-hover:bg-[#573D2D] group-hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ApartmentCard;
