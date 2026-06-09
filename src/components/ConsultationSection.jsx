"use client";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useInView } from "react-intersection-observer";

const ConsultationSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+992"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullPhone = `${formData.countryCode} ${formData.phone}`;

      await axios.post(`https://api.telegram.org/bot7983063572:AAFfFDthgSRC_1mq6CksDtaCJYySkoYmX-I/sendMessage`, {
        chat_id: "8390299668",
        text: `📞 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ:\n\n👤 Имя: ${formData.name}\n📱 Телефон: ${fullPhone}\n🌍 Код страны: ${formData.countryCode}\n\n⏰ Время: ${new Date().toLocaleString()}`
      });

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", countryCode: "+992" });

      // Сброс успешного сообщения через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.4 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#8B5A2B", // Darker brown on hover
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <section
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #F5F1ED 0%, #E8E1D9 100%)`,
        borderTop: '8px solid #573D2D',
      }}
    >
      {/* Тасвири замина - вақте ки имконият дорад, идома диҳед */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(https://res.cloudinary.com/dtvuzg801/image/upload/v1780681626/img1_bujsh2.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%)',
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#573D2D] mb-4">
            {t('getConsultation') || "КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА"}
          </h2>
          <p className="text-xl text-[#573D2D]/80">
            {t('consultationSubtitle') || "Оставьте заявку и мы свяжемся с вами в ближайшее время"}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-8 bg-gradient-to-r from-[#4A7C59]/10 to-[#4A7C59]/5 text-[#4A7C59] rounded-xl"
            >
              <div className="w-16 h-16 bg-[#4A7C59] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-xl font-semibold mb-2">Спасибо!</div>
              <div className="text-gray-600">Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.</div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-[#573D2D] mb-3">
                  {t('yourName') || "Ваше имя"}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#573D2D]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#573D2D] focus:border-transparent transition-colors placeholder-gray-500"
                    placeholder={t('namePlaceholder') || "Введите ваше имя"}
                  />
                </div>
              </motion.div>

              {/* Phone Field with Country Select */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-[#573D2D] mb-3">
                  {t('phone') || "Телефон"}
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Country Code Select */}
                  <div className="relative flex-1 sm:w-48">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#573D2D]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#573D2D] focus:border-transparent appearance-none bg-white"
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#573D2D]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div className="relative flex-1">
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#573D2D] focus:border-transparent transition-colors placeholder-gray-500"
                      placeholder="93 000 00 00"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#573D2D] to-[#8B5A2B] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('sending') || "Отправка..."}
                    </>
                  ) : (
                    <>
                      {t('send') || "Отправить заявку"}
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>

              {/* Privacy Policy */}
              <motion.p
                variants={itemVariants}
                className="text-xs text-gray-500 text-center mt-6"
              >
                {t('privacyPolicy') || "Нажимая кнопку «Отправить», вы подтверждаете свое согласие на обработку персональных данных"}
              </motion.p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationSection;
