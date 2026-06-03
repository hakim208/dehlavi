import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
// Агар ApartmentCard ва ApartmentModal дар дигар файлҳо бошанд, ин ду хатро аз коммент гиред:
import ApartmentCard from "./ApartmentCard";
import ApartmentModal from "./ApartmentModal";

const flatsData = [
  {
      id: 1,
      floor: 1,
      img: "/img/1honaga.png"
  },
  {
      id: 2,
      floor: 2,
      img: "/img/2honaga.png"
  },
  {
      id: 3,
      floor: 3,
      img: "/img/3honaga.png"
  },
  {
      id: 4,
      floor: 4,
      img: "/img/4honaga.png"
  },
  {
      id: 5,
      floor: 5,
      img: "/img/5honaga.png"
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-[#573D2D] dark:text-[#D4A017] text-sm md:text-3xl font-bold mb-6 flex items-center gap-2">
           {t('chooseYourPerfectApartment') || 'КВАРТИРАИ ИДЕАЛИИ ХУДРО ИНТИХОБ КУНЕД'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">
              {t('apartment') || 'ОШЁНА'}:
            </label>
            <div className="flex gap-2 flex-wrap">
              {availableFloors.map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(selectedFloor === floor ? null : floor)}
                  className={`w-11 h-11 rounded-xl font-bold transition-all border-2 flex items-center justify-center
                    ${selectedFloor === floor
                      ? 'bg-[#573D2D] text-white border-[#573D2D] shadow-md scale-110'
                      : 'bg-white text-gray-600 border-gray-100 hover:border-[#D4A017]'}`}
                >
                  {floor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Статистика ва Тозакунӣ */}
        <div className="mt-8 pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-500 italic">
            {t('foundOptions') || 'Натиҷаҳо:'} <span className="text-[#573D2D] font-bold">{filteredList.length}</span>
          </p>
          {selectedFloor && (
            <button onClick={clearFilters} className="text-xs font-bold text-red-400 hover:underline">
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
