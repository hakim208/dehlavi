import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Phone, Send, User, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const ApartmentModal = ({ isOpen, onClose, apartment }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+992"
  });

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", countryCode: "+992" });
    }
  }, [isOpen, apartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullPhone = `${formData.countryCode} ${formData.phone}`;
      const message = `🏠 НОВАЯ ЗАЯВКА НА КВАРТИРУ:\n\n` +
                      `🏢 Этаж: ${apartment?.floor || "---"}\n\n` +
                      `👤 Имя: ${formData.name}\n` +
                      `📱 Телефон: ${fullPhone}\n` +
                      `⏰ Время: ${new Date().toLocaleString()}`;

      await axios.post(`https://api.telegram.org/bot8225601828:AAHATMxK8myZTsnbiqAg9hjld_bVrUk7Knc/sendMessage`, {
        chat_id: "6153606408",
        text: message
      });

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      console.error("Error:", error);
      alert("Хатогӣ ҳангоми фиристодан. Пурра будани интернетро санҷед.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !apartment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-[100]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          /* ИСЛОҲОТ: overflow-y-auto илова шуд, то дар мобилӣ скролл шавад */
          className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[92vh] md:max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Қисми чап (Расм ва Инфо) */}
          <div className="w-full md:w-1/2 p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-center">
            <div className="relative mb-4 md:mb-6">
              {/* ИСЛОҲОТ: Расми хурдтар дар мобилӣ (h-40) ва калон дар десктоп (md:h-64) */}
              <img
                src={apartment.img}
                alt="Apartment"
                className="w-full h-40 md:h-64 object-contain bg-white rounded-2xl shadow-inner"
              />
              <button
                onClick={onClose}
                className="absolute top-2 right-2 md:hidden bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-2 shadow-md"
              >
                <X className="w-4 h-4 text-gray-900 dark:text-white" />
              </button>
            </div>

            <div className="w-full">
              <InfoCard icon={<Home size={18}/>} label={t('rooms') || "Ҳуҷраҳо"} value={apartment.floor} />
            </div>
          </div>

          {/* Қисми рост (Форма) */}
          {/* ИСЛОҲОТ: Кам кардани паддинг дар мобилӣ p-5 */}
          <div className="w-full md:w-1/2 p-5 md:p-8 relative flex flex-col justify-center">
            <button
              onClick={onClose}
              className="hidden md:block absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Send size={32} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Ташаккур!</h3>
                <p className="text-sm text-gray-500">Дархости шумо қабул шуд. Менеҷер бо шумо тамос мегирад.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-[#573D2D] dark:text-[#D4A017] mb-1">
                  {t('applicationForm') || "Дархост барои харид"}
                </h2>
                <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">
                  {t('subtitle') || "Лутфан маълумоти худро ворид кунед."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-1">Номи шумо</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      <input
                        required
                        type="text"
                        placeholder="Масалан: Алиев Ислом"
                        className="w-full pl-9 pr-4 py-2.5 md:py-3 text-sm bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#573D2D] transition"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-1">Рақами телефон</label>
                    <div className="flex gap-2">
                      <select
                        className="bg-gray-100 dark:bg-gray-800 rounded-xl px-1.5 text-xs md:text-sm focus:ring-2 w-[38%] md:w-[40%] focus:ring-[#573D2D] border-none"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                      >
                        <option value="+992">🇹🇯 +992</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+998">🇺🇿 +998</option>
                        <option value="+996">🇰🇬 +996</option>
                        <option value="+770">🇰🇿 +770</option>
                        <option value="+993">🇹🇲 +993</option>
                        <option value="+90">🇹🇷 +90</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+1">🇺🇸 +1</option>
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        <input
                          required
                          type="number"
                          placeholder="93 500 00 00"
                          className="w-full pl-9 pr-4 py-2.5 md:py-3 text-sm bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#573D2D] transition"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#573D2D] hover:bg-[#3d2b20] text-white py-3 md:py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm md:text-base mt-2"
                  >
                    {isSubmitting ? "Фиристода истодаем..." : t('submitApplication') || "Фиристодани дархост"}
                    {!isSubmitting && <Send size={16} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InfoCard = ({ icon, label, value, color = "text-gray-800" }) => (
  <div className="bg-white dark:bg-gray-700 p-2.5 md:p-3 rounded-xl shadow-sm flex flex-col items-center text-center">
    <div className="text-[#D4A017] mb-1">{icon}</div>
    <span className="text-[9px] md:text-[10px] uppercase text-gray-400 font-bold">{label}</span>
    <span className={`text-xs md:text-sm font-bold ${color} dark:text-white`}>{value}</span>
  </div>
);

export default ApartmentModal;
