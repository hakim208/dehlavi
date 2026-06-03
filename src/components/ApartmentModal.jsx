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

      // Ирсол ба Telegram Bot
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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="md:w-1/2 p-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="relative mb-6">
              <img
                src={apartment.img}
                alt="Apartment"
                className="w-full h-64 object-contain bg-white rounded-2xl shadow-inner"
              />
              <button
                onClick={onClose}
                className="absolute -top-2 -right-2 md:hidden bg-white rounded-full p-2 shadow-lg"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            <div className="w-[100%]">
              <InfoCard icon={<Home size={20}/>} label={t('rooms') || "Ҳуҷраҳо"} value={apartment.floor} />
            </div>
          </div>

          <div className="md:w-1/2 p-8 relative">
            <button
              onClick={onClose}
              className="hidden md:block absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Ташаккур!</h3>
                <p className="text-gray-500">Дархости шумо қабул шуд. Менеҷер бо шумо тамос мегирад.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#573D2D] dark:text-[#D4A017] mb-2">
                  {t('applicationForm') || "Дархост барои харид"}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {t('subtitle') || "Лутфан маълумоти худро ворид кунед ва мо ба зудӣ бо шумо тамос хоҳем гирифт."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-1">Номи шумо</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="Масалан: Алиев Ислом"
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#573D2D] transition"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-1">Рақами телефон</label>
                    <div className="flex gap-2">
                      <select
                        className="bg-gray-100 dark:bg-gray-800 rounded-xl px-2 text-sm focus:ring-2 w-[40%] focus:ring-[#573D2D]"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                      >
                        <option value="+992">🇹🇯 +992 (Таджикистан)</option>
                        <option value="+7">🇷🇺 +7 (Россия)</option>
                        <option value="+998">🇺🇿 +998 (Узбекистан)</option>
                        <option value="+996">🇰🇬 +996 (Кыргызстан)</option>
                        <option value="+770">🇰🇿 +770 (Казахстан)</option>
                        <option value="+993">🇹🇲 +993 (Туркменистан)</option>
                        <option value="+90">🇹🇷 +90 (Турция)</option>
                        <option value="+86">🇨🇳 +86 (Китай)</option>
                        <option value="+1">🇺🇸 +1 (США)</option>
                        <option value="+1">🇨🇦 +1 (Канада)</option>
                        <option value="+44">🇬🇧 +44 (Великобритания)</option>
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          required
                          type="number"
                          placeholder="93 500 00 00"
                          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#573D2D] transition"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#573D2D] hover:bg-[#3d2b20] text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Фиристода истодаем..." : t('submitApplication') || "Фиристодани дархост"}
                    {!isSubmitting && <Send size={18} />}
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

// Хурд-компонент барои параметрҳо
const InfoCard = ({ icon, label, value, color = "text-gray-800" }) => (
  <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm flex flex-col items-center text-center">
    <div className="text-[#D4A017] mb-1">{icon}</div>
    <span className="text-[10px] uppercase text-gray-400 font-bold">{label}</span>
    <span className={`text-sm font-bold ${color} dark:text-white`}>{value}</span>
  </div>
);

export default ApartmentModal;
