import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useThemeStore } from '../../shared/lib/zustandStore';

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

export default function Header({footerRef}) {
  const { theme, setTheme, lang, setLang } = useThemeStore();
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    localStorage.setItem("app_lang", lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Header - Desktop */}
      <header className={`w-full bg-[#4e3627] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'} hidden lg:block`}>
        {/* Top Bar */}
        <div className="bg-[#573D2D]/95 backdrop-blur-sm border-b border-[#8B5A2B]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Left Side - Navigation Links */}
              <div className="flex items-center space-x-6 text-sm">
                <a href="/">
                  <img
                    src="/markers/logo.png"
                    alt="logo"
                    className="w-[80px] h-[80px]"
                  />
                </a>
                <a href="/projects" className="text-[#F5F1ED] hover:text-white transition-colors font-medium hover:underline underline-offset-4">
                  {t('projects') || 'Проекты'}
                </a>
                <a href="/aboutCompany" className="text-[#F5F1ED] hover:text-white transition-colors font-medium hover:underline underline-offset-4">
                  {t('company') || 'Компания'}
                </a>
                <a href="/news" className="text-[#F5F1ED] hover:text-white transition-colors font-medium hover:underline underline-offset-4">
                  {t('news') || 'Новости'}
                </a>
                <a ref={footerRef} onClick={() => scrollToSection(footerRef)} href="#footer" className="text-[#F5F1ED] hover:text-white transition-colors font-medium hover:underline underline-offset-4">
                  {t('contacts') || 'Контакты'}
                </a>
                <div className="flex gap-3 items-center">
  {/* Facebook - Brown Theme */}
  <IconLink
    href="https://facebook.com"
    label="Facebook"
    className="bg-gradient-to-br from-[#573D2D] to-[#8B5A2B] hover:from-[#8B5A2B] hover:to-[#573D2D] hover:shadow-[0_0_20px_rgba(87,61,45,0.4)] group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.2c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H19l-.5 3h-2.3v7A10 10 0 0 0 22 12z"/>
    </svg>
  </IconLink>

  {/* Instagram - Brown Theme */}
  <IconLink
    href="https://instagram.com"
    label="Instagram"
    className="bg-gradient-to-br from-[#573D2D] via-[#8B5A2B] to-[#D4A017] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="white" strokeWidth="1.5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="white"/>
    </svg>
  </IconLink>

  {/* Telegram - Brown Theme */}
  <IconLink
    href="https://t.me"
    label="Telegram"
    className="bg-gradient-to-br from-[#573D2D] to-[#8B5A2B] hover:from-[#8B5A2B] hover:to-[#573D2D] hover:shadow-[0_0_20px_rgba(139,90,43,0.4)] group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
      <path d="M21.8 4.6L3.7 10.6c-.6.2-.6.8 0 1 .6.3 1.5.5 2.2.6l1.6 4.9c.2.6.8.6 1.2.2l2.5-2 3.7 2.4c1.2.5 2.1.2 2.5-.9L23 7.1c.3-1.1-.6-1.9-1.2-2.5zM8.1 13.6l-.9-2.9 11-4.9-10.1 7.8z"/>
    </svg>
  </IconLink>

  {/* YouTube - Brown Theme */}
  <IconLink
    href="https://youtube.com"
    label="YouTube"
    className="bg-gradient-to-br from-[#573D2D] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#573D2D] hover:shadow-[0_0_20px_rgba(185,28,28,0.4)] group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
      <path d="M23.5 6.2c-.2-1-1-1.8-2-2-1.8-.3-9.5-.3-9.5-.3s-7.7 0-9.5.3c-1 .2-1.8 1-2 2C.2 8 0 11.9 0 11.9s0 3.9.5 5.7c.2 1 1 1.8 2 2 1.8.3 9.5.3 9.5.3s7.7 0 9.5-.3c1-.2 1.8-1 2-2 .5-1.9.5-5.7.5-5.7s0-3.9-.5-5.7zM9.8 15.1V8.8l6.2 3.1-6.2 3.2z"/>
    </svg>
  </IconLink>

  {/* WhatsApp - Additional */}
  <IconLink
    href="https://wa.me"
    label="WhatsApp"
    className="bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-1.188-.595-2.327-1.51-3.298-2.615-.587-.695-.983-1.487-1.102-1.787-.119-.298-.011-.46.089-.609.089-.149.298-.372.446-.521.149-.149.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.67-1.611-.917-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.491-8.411"/>
    </svg>
  </IconLink>
</div>
              </div>

              {/* Right Side - Phone and Social Media */}
              <div className="flex items-center space-x-4">
                {/* Divider */}
                <div className="w-px h-6 bg-[#8B5A2B]"></div>

                {/* Phone Number */}
                <div className="flex items-center space-x-2">
                  <a href="tel:+998781228822">
                    <span className="text-white font-semibold text-sm hover:text-[#D4A017] transition-colors">
                      +998 78 122 88 22
                    </span>
                  </a>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-[#8B5A2B]"></div>

                {/* Language Selector */}
                <select
                  value={lang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-[#573D2D]/80 text-white border border-[#8B5A2B] rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] backdrop-blur-sm"
                >
                  <option value="ru" className="bg-white text-gray-900">🇷🇺 Ру</option>
                  <option value="en" className="bg-white text-gray-900">🇺🇸 EN</option>
                  <option value="tj" className="bg-white text-gray-900">🇹🇯 TJ</option>
                </select>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative p-2 w-14 h-8 flex items-center justify-center bg-[#573D2D]/80 backdrop-blur-sm border border-[#8B5A2B] rounded-full shadow-inner transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                >
                  {/* Sun Icon */}
                  <div className={`absolute left-1 transform transition-all duration-300 ${theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <div className="w-5 h-5 bg-[#D4A017] rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-1 h-1 bg-yellow-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* Moon Icon */}
                  <div className={`absolute right-1 transform transition-all duration-300 ${theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <div className="w-5 h-5 bg-[#8B5A2B] rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#2C1A12] rounded-full"></div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                    {theme === "light" ? "Перейти в темный режим" : "Перейти в светлый режим"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className={`w-full bg-[#573D2D] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-1'} lg:hidden`}>
        <div className="bg-[#573D2D] border-b border-[#8B5A2B]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              {/* Logo and Menu Button */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2 hover:bg-[#8B5A2B]/30 rounded transition-colors"
                >
                  <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                </button>
                <a href="/">
                  <img
                    src="/markers/logo.png"
                    alt="logo"
                    className="w-12 h-12 object-contain"
                  />
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <a href="tel:+998781228822">
                  <span className="text-white font-semibold text-sm hover:text-[#D4A017] transition-colors">
                    +998 78 122 88 22
                  </span>
                </a>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative p-1 w-10 h-6 flex items-center justify-center bg-[#573D2D] border border-[#8B5A2B] rounded-full"
                >
                  <div className={`absolute left-1 transform transition-all duration-300 ${theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <div className="w-4 h-4 bg-[#D4A017] rounded-full"></div>
                  </div>
                  <div className={`absolute right-1 transform transition-all duration-300 ${theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <div className="w-4 h-4 bg-[#8B5A2B] rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#573D2D] border-t border-[#8B5A2B] shadow-lg animate-slideDown">
              <div className="container mx-auto px-4 py-4">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-3 mb-4">
                  <a href="/projects" className="text-[#F5F1ED] hover:text-white transition-colors font-medium py-2 px-3 hover:bg-[#8B5A2B]/30 rounded-lg">
                    {t('projects') || 'Проекты'}
                  </a>
                  <a href="/aboutCompany" className="text-[#F5F1ED] hover:text-white transition-colors font-medium py-2 px-3 hover:bg-[#8B5A2B]/30 rounded-lg">
                    {t('company') || 'Компания'}
                  </a>
                  <a href="/news" className="text-[#F5F1ED] hover:text-white transition-colors font-medium py-2 px-3 hover:bg-[#8B5A2B]/30 rounded-lg">
                    {t('news') || 'Новости'}
                  </a>
                  <a href="/appeal" className="text-[#F5F1ED] hover:text-white transition-colors font-medium py-2 px-3 hover:bg-[#8B5A2B]/30 rounded-lg">
                    {t('appeal') || 'Обращение'}
                  </a>
                  <a href="/contacts" className="text-[#F5F1ED] hover:text-white transition-colors font-medium py-2 px-3 hover:bg-[#8B5A2B]/30 rounded-lg">
                    {t('contacts') || 'Контакты'}
                  </a>
                </div>

                {/* Social Media */}
                <div className="flex justify-center space-x-6 py-4 border-t border-[#8B5A2B]">
                  <a href="https://facebook.com" className="text-[#F5F1ED] hover:text-white transform hover:scale-110 transition-all">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </a>
                  <a href="https://instagram.com" className="text-[#F5F1ED] hover:text-white transform hover:scale-110 transition-all">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a href="https://t.me" className="text-[#F5F1ED] hover:text-white transform hover:scale-110 transition-all">
                    <i className="fab fa-telegram text-lg"></i>
                  </a>
                  <a href="https://youtube.com" className="text-[#F5F1ED] hover:text-white transform hover:scale-110 transition-all">
                    <i className="fab fa-youtube text-lg"></i>
                  </a>
                </div>

                {/* Language Selector */}
                <div className="flex justify-center py-3 border-t border-[#8B5A2B]">
                  <select
                    value={lang}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-[#573D2D]/80 text-white border border-[#8B5A2B] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] w-full max-w-xs"
                  >
                    <option value="ru" className="bg-white text-gray-900">🇷🇺 Русский</option>
                    <option value="en" className="bg-white text-gray-900">🇺🇸 English</option>
                    <option value="tj" className="bg-white text-gray-900">🇹🇯 Тоҷикӣ</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#573D2D] border-t border-[#8B5A2B] z-40 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <a
            href="/"
            className={`flex flex-col items-center space-y-1 px-2 py-1 transition-all duration-200 ${
              activeTab === 'home' ? 'text-[#D4A017]' : 'text-[#F5F1ED] hover:text-white'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <i className={`fas fa-home text-lg ${activeTab === 'home' ? 'scale-110' : ''}`}></i>
            <span className="text-xs font-medium">{t('home') || 'Главная'}</span>
          </a>

          {/* Search */}
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center space-y-1 px-2 py-1 transition-all duration-200 ${
              activeTab === 'search' ? 'text-[#D4A017]' : 'text-[#F5F1ED] hover:text-white'
            }`}
          >
            <i className={`fas fa-search text-lg ${activeTab === 'search' ? 'scale-110' : ''}`}></i>
            <span className="text-xs font-medium">{t('search') || 'Поиск'}</span>
          </button>

          {/* Projects */}
          <a
            href="/projects"
            className={`flex flex-col items-center space-y-1 px-2 py-1 transition-all duration-200 ${
              activeTab === 'projects' ? 'text-[#D4A017]' : 'text-[#F5F1ED] hover:text-white'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            <i className={`fas fa-building text-lg ${activeTab === 'projects' ? 'scale-110' : ''}`}></i>
            <span className="text-xs font-medium">{t('projects') || 'Проекты'}</span>
          </a>

          {/* Favorites */}
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center space-y-1 px-2 py-1 transition-all duration-200 ${
              activeTab === 'favorites' ? 'text-[#D4A017]' : 'text-[#F5F1ED] hover:text-white'
            }`}
          >
            <i className={`fas fa-heart text-lg ${activeTab === 'favorites' ? 'scale-110' : ''}`}></i>
            <span className="text-xs font-medium">{t('favorites') || 'Избранное'}</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-1 px-2 py-1 transition-all duration-200 ${
              activeTab === 'profile' ? 'text-[#D4A017]' : 'text-[#F5F1ED] hover:text-white'
            }`}
          >
            <i className={`fas fa-user text-lg ${activeTab === 'profile' ? 'scale-110' : ''}`}></i>
            <span className="text-xs font-medium">{t('profile') || 'Профиль'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
