import { Facebook, Instagram, MessageCircle, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import CustomMap from "../../components/YandexMapCustom";


const IconLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      inline-flex items-center justify-center w-8 h-8 rounded-full
      bg-[#8B5A2B]/20 text-[#573D2D] dark:text-[#F5F1ED]
      transform transition duration-300
      hover:scale-110 hover:shadow-lg
      hover:bg-gradient-to-br hover:from-[#573D2D] hover:via-[#8B5A2B] hover:to-[#D4A017]
      hover:text-white
    "
  >
    {children}
  </a>
);


export default function Footer() {
  const {t}=useTranslation()
  return (
    <footer  className="bg-[#573D2D] text-white pt-16 pb-10 relative">

      {/* TOP PART — LEFT TEXT + MAP */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT COLUMN */}
        <div>
          <h2 className="text-3xl font-bold text-[#D9B45E] mb-8">
            {t(`salesDepartment`)}
          </h2>

          <div className="space-y-6 text-[14px] leading-relaxed">
            <div>
              <p>ЖК Деҳлавӣ — простор вашей мечты.</p>
            </div>

            <div className="flex items-center gap-2">
              <p>👉 Пишите в What’sApp или звоните по номеру </p>
              <a href="tel:+998781228822">
                    <span className="text-white font-semibold text-sm hover:text-[#D4A017] transition-colors">
                    +992 077000666
                    </span>
                  </a>
            </div>

            <div>
              <p>📍 г. Душанбе, ул. Малика Собирова 55 </p>
              <p className="text-gray-300">(ориентир Hilton, Isra)</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
  {/* MAP */}
  <div className="w-full h-[260px] md:h-[300px] rounded-xl overflow-hidden shadow-xl">
    <CustomMap />
  </div>

  {/* BUTTON */}
  <a
    href="https://maps.app.goo.gl/k3rDo1Qm9WMfcBFL6?g_st=atm"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-yellow-400 hover:bg-yellow-300 transition-all text-center py-3 rounded-xl font-semibold shadow-lg block"
  >
    Открыть маршрут
  </a>
</div>
      </div>

      {/* BOTTOM ROW — PHONE + SOCIAL + WORK TIME */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">

        {/* PHONE */}
        <div>
          <h3 className="text-xl font-semibold text-[#D9B45E]">Телефон</h3>
            <a href="tel:+998781228822" className="mt-[10px]">
                    <span className="text-white font-semibold text-sm hover:text-[#D4A017] transition-colors">
                    +992 077000666
                    </span>
                  </a>
        </div>
<div>
  <h3 className="text-xl font-semibold text-[#D9B45E]">Мы в соц. сетях</h3>
             <div className="flex gap-4  mt-[10px] items-center">
 {/* Facebook - Brown Theme */}
 <IconLink
     href="https://www.facebook.com/profile.php?id=61584472747712"
     label="Facebook"
     className="bg-gradient-to-br from-[#573D2D] to-[#8B5A2B] hover:from-[#8B5A2B] hover:to-[#573D2D] hover:shadow-[0_0_20px_rgba(87,61,45,0.4)] group"
   >
     <Facebook size={18} className="group-hover:scale-110 transition-transform text-white" />
   </IconLink>

   {/* Instagram - Brown Theme */}
   <IconLink
     href="https://instagram.com/dehlavi_dushanbe"
     label="Instagram"
     className="bg-gradient-to-br from-[#573D2D] via-[#8B5A2B] to-[#D4A017] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] group"
   >
     <Instagram size={18} className="group-hover:scale-110 transition-transform text-white" />
   </IconLink>

   {/* Telegram - Brown Theme */}
   <IconLink
     href="https://t.me/JkDehlavi"
     label="Telegram"
     className="bg-gradient-to-br from-[#573D2D] to-[#8B5A2B] hover:from-[#8B5A2B] hover:to-[#573D2D] hover:shadow-[0_0_20px_rgba(139,90,43,0.4)] group"
   >
     <Send size={18} className="group-hover:scale-110 transition-transform text-white" />
   </IconLink>

   {/* WhatsApp - Additional */}
   <IconLink
     href="https://wa.me/992077000666"
     label="WhatsApp"
     className="bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] group"
   >
     <MessageCircle size={18} className="group-hover:scale-110 transition-transform text-white" />
   </IconLink>
 </div>
</div>


        {/* WORK TIME */}
        <div>
          <h3 className="text-xl font-semibold text-[#D9B45E] mb-3">
            График работы
          </h3>

          <p className="text-gray-300">Отделы продаж: Пн-пт 09:00 – 18:00</p>
          <p className="text-gray-300">Вс 10:00 – 17:00</p>

          <p className="text-gray-300 mt-3">
            Офис: Пн-Сб 09:00 – 18:00
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-400 mt-8 text-sm">
        © 2025 ЖК ДЕҲЛАВИ. Все права защищены.
      </div>
    </footer>
  );
}
