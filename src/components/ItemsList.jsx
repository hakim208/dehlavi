import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
// Агар ApartmentCard ва ApartmentModal дар дигар файлҳо бошанд, ин ду хатро аз коммент гиред:
import ApartmentCard from "./ApartmentCard";
import ApartmentModal from "./ApartmentModal";

const flatsData = [
  {
      id: 1,
      floor: 1,
      img: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681346/1honaga_cu50sy.png"
  },
  {
      id: 2,
      floor: 2,
      img: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681482/2honaga_otkqcr.png"
  },
  {
      id: 3,
      floor: 3,
      img: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681506/3honaga_drfjy9.png"
  },
  {
      id: 4,
      floor: 4,
      img: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681535/4honaga_n1k1zv.png"
  },
  {
      id: 5,
      floor: 5,
      img: "https://res.cloudinary.com/dtvuzg801/image/upload/v1780681564/5honaga_hpznw7.png"
  }
];

// 2. КОМПОНЕНТИ АСОСӢ
export const ItemsList = () => {
  const { t } = useTranslation();

  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ҳисоб кардани ошёнаҳои мавҷуда аз объект
  const availableFloors = useMemo(() => {
    const floors = flatsData.map(f => f.floor);
    return [...new Set(floors)].sort((a, b) => a - b);
  }, []);

  // Филтр кардани маълумот вобаста ба ошёнаи интихобшуда
  const filteredList = useMemo(() => {
    return flatsData.filter(flat => {
      return selectedFloor ? flat.floor === selectedFloor : true;
    });
  }, [selectedFloor]);

  const clearFilters = () => {
    setSelectedFloor(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2  md:p-4 sm:p-6">
     <div className="bg-white dark:bg-gray-800 rounded-2xl mb-[15px] md:mb-[40px]  p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
  <h2 className="text-[#573D2D] dark:text-[#D4A017] text-lg md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
    {t('chooseYourPerfectApartment') || 'КВАРТИРАИ ИДЕАЛИИ ХУДРО ИНТИХОБ КУНЕД'}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
    <div>
      <label className="block text-gray-400 text-[10px] md:text-xs uppercase tracking-wider font-bold mb-2">
        {t('apartment') || 'ОШЁНА'}:
      </label>
      <div className="flex gap-1.5 flex-wrap">
        {availableFloors.map((floor) => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(selectedFloor === floor ? null : floor)}
            className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl text-sm md:text-base font-bold transition-all border-2 flex items-center justify-center
              ${selectedFloor === floor
                ? 'bg-[#573D2D] text-white border-[#573D2D] shadow-md scale-105 md:scale-110'
                : 'bg-white text-gray-600 border-gray-100 hover:border-[#D4A017]'}`}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Статистика ва Тозакунӣ */}
  <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
    <p className="text-xs text-gray-500 italic">
      {t('foundOptions') || 'Натиҷаҳо:'} <span className="text-[#573D2D] font-bold">{filteredList.length}</span>
    </p>
    {selectedFloor && (
      <button onClick={clearFilters} className="text-[10px] font-bold text-red-400 hover:underline">
        {t('clearFilters') || 'Тоза кардани филтрҳо'}
      </button>
    )}
  </div>
</div>

      {/* Grid-и хонаҳо */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredList.map(flat => (
          <ApartmentCard
            key={flat.id}
            apartment={flat}
            onLearnMore={(apt) => {
              setSelectedApartment(apt);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      <ApartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apartment={selectedApartment}
      />
    </div>
  );
};
