import CustomMap from "../../components/YandexMapCustom";

export default function Footer({ref}) {
  return (
    <footer ref={ref} id="footer" className="bg-[#573D2D] md:mt-[50px] mt-[20px] text-white pt-16 pb-10 relative">

      {/* TOP PART — LEFT TEXT + MAP */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT COLUMN */}
        <div>
          <h2 className="text-3xl font-bold text-[#D9B45E] mb-8">
            ОТДЕЛЫ ПРОДАЖ
          </h2>

          <div className="space-y-6 text-[14px] leading-relaxed">
            <div>
              <p>г. Ташкент, ул. Ойбека 38а, БЦ Авалон</p>
              <p className="text-gray-300">(Центральный офис продаж)</p>
            </div>

            <div>
              <p>г.Ташкент, Учтепинский р-н, пр. Юсуфа Саккаки, 3А</p>
              <p className="text-gray-300">(Офис продаж ЖК SOY BO’YI)</p>
            </div>

            <div>
              <p>г.Ташкент, Шайхантахурский р-н, улица Батыра Закирова, 1А/1</p>
              <p className="text-gray-300">(Офис продаж NEST ONE)</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — MAP */}
        <div className="w-full h-[260px] md:h-[300px] rounded-xl overflow-hidden shadow-xl">
          <CustomMap />
        </div>
      </div>

      {/* BOTTOM ROW — PHONE + SOCIAL + WORK TIME */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">

        {/* PHONE */}
        <div>
          <h3 className="text-xl font-semibold text-[#D9B45E]">Телефон</h3>
          <p className="mt-3 text-sm">+998 78 122 88 22</p>
        </div>

        {/* SOCIAL */}
       {/* SOCIAL */}
<div>
  <h3 className="text-xl font-semibold text-[#D9B45E]">Мы в соц. сетях</h3>
  <div className="flex items-center gap-6 mt-4">
    {/* Facebook */}
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b5998] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white">
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.2c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H19l-.5 3h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    </a>

    {/* Instagram */}
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="stroke-current text-white">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="currentColor" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    </a>

    {/* Telegram */}
    <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white">
        <path d="M21.8 4.6L3.7 10.6c-.6.2-.6.8 0 1 .6.3 1.5.5 2.2.6l1.6 4.9c.2.6.8.6 1.2.2l2.5-2 3.7 2.4c1.2.5 2.1.2 2.5-.9L23 7.1c.3-1.1-.6-1.9-1.2-2.5zM8.1 13.6l-.9-2.9 11-4.9-10.1 7.8z"/>
      </svg>
    </a>

    {/* YouTube */}
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white">
        <path d="M23.5 6.2c-.2-1-1-1.8-2-2-1.8-.3-9.5-.3-9.5-.3s-7.7 0-9.5.3c-1 .2-1.8 1-2 2C.2 8 0 11.9 0 11.9s0 3.9.5 5.7c.2 1 1 1.8 2 2 1.8.3 9.5.3 9.5.3s7.7 0 9.5-.3c1-.2 1.8-1 2-2 .5-1.9.5-5.7.5-5.7s0-3.9-.5-5.7zM9.8 15.1V8.8l6.2 3.1-6.2 3.2z"/>
      </svg>
    </a>
  </div>
</div>


        {/* WORK TIME */}
        <div>
          <h3 className="text-xl font-semibold text-[#D9B45E] mb-3">
            График работы
          </h3>

          <p className="text-gray-300">Отделы продаж: Пн-пт 09:00 – 19:00</p>
          <p className="text-gray-300">Вс 10:00 – 19:00</p>

          <p className="text-gray-300 mt-3">
            Офис: Пн-пт 09:00 – 19:00
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
