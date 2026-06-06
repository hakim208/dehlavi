"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../shared/lib/zustandStore";

const IconLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      inline-flex items-center justify-center
      w-9 h-9 rounded-full
      bg-[#8B5A2B]/20
      text-white
      transition-all duration-300
      hover:scale-110
      hover:bg-[#D4A017]
    "
  >
    {children}
  </a>
);

export default function Header({ footerRef }) {
  const location = useLocation();

  const { t, i18n } = useTranslation();

  const { theme, setTheme, lang, setLang } =
    useThemeStore();

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const navItems = [
    {
      id: "home",
      path: "/",
      icon: "fa-home",
      label: t("home"),
    },
    {
      id: "company",
      path: "/aboutCompany",
      icon: "fa-users",
      label: t("company"),
    },
    {
      id: "projects",
      path: "/projects",
      icon: "fa-building",
      label: t("projects"),
    },
    {
      id: "news",
      path: "/news",
      icon: "fa-newspaper",
      label: t("news"),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const toggleTheme = () => {
    setTheme(
      theme === "light" ? "dark" : "light"
    );
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    localStorage.setItem("app_lang", lng);
  };

  const scrollToFooter = () => {
    footerRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* DESKTOP */}
      <header
        className={`
          hidden lg:block
          fixed top-0 left-0 right-0 z-50
          bg-[#573D2D]/95 backdrop-blur-xl
          border-b border-[#8B5A2B]
          transition-all duration-300
          ${isScrolled ? "py-2" : "py-4"}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-6">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dtvuzg801/image/upload/v1780684045/logo3d_nd8ga5.png"
                  alt="logo"
                  className="w-14 h-14 object-contain"
                />
              </Link>

              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path;

                return (
                  <Link
  key={item.id}
  to={item.path}
  className={`
    transition-all font-medium px-3 py-2
    hover:text-[#D4A017]
    hover:border hover:border-[#D4A017]
    hover:rounded-xl

    ${isActive
      ? "text-[#D4A017] border border-[#D4A017] rounded-xl"
      : "text-white border border-transparent"
    }
  `}
>
  {item.label}
</Link>
                );
              })}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <IconLink
                  href="https://instagram.com/dehlavi_dushanbe"
                  label="instagram"
                >
                  <Instagram size={18} />
                </IconLink>

                <IconLink
                  href="https://t.me/JkDehlavi"
                  label="telegram"
                >
                  <Send size={18} />
                </IconLink>

                <IconLink
                  href="https://wa.me/992077000666"
                  label="whatsapp"
                >
                  <MessageCircle size={18} />
                </IconLink>

                <IconLink
                  href="https://facebook.com"
                  label="facebook"
                >
                  <Facebook size={18} />
                </IconLink>
              </div>

              <a
                href="tel:+992077000666"
                className="text-white font-semibold"
              >
                +992 077000666
              </a>

              <select
                value={lang}
                onChange={(e) =>
                  changeLanguage(e.target.value)
                }
                className="
                  bg-[#6d4b38]
                  text-white
                  px-3 py-2
                  rounded-lg
                  outline-none
                "
              >
                <option value="ru">🇷🇺 RU</option>
                <option value="en">🇺🇸 EN</option>
                <option value="tj">🇹🇯 TJ</option>
              </select>

              <button
                onClick={toggleTheme}
                className="
                  w-12 h-12 rounded-full
                  bg-[#6d4b38]
                  flex items-center justify-center
                  text-white
                "
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden sm:blok flex items-center justify-between px-4 py-3 bg-[#6d4b38]">
  {/* Left Side */}
  <div className="flex items-center gap-3">
    <Link to="/">
      <img
        src="https://res.cloudinary.com/dtvuzg801/image/upload/v1780684045/logo3d_nd8ga5.png"
        alt="logo"
        className="w-10 h-10 object-contain"
      />
    </Link>

    <a
      href="tel:+992077000666"
      className="flex items-center gap-2 text-white text-sm font-medium"
    >
      <i className="fas fa-phone-alt text-xs"></i>
      <span>+992 077 000 666</span>
    </a>
  </div>

  {/* Right Side */}
  <button
    onClick={toggleTheme}
    className="text-white text-xl"
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>
</div>

      {/* MOBILE BOTTOM NAV */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="
          lg:hidden
          fixed bottom-0 left-0 right-0 z-50
          bg-[#573D2D]
          backdrop-blur-xl
          border-t border-[#8B5A2B]
        "
      >
        <div className="grid grid-cols-5 h-[75px]">

          {navItems.slice(0, 2).map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className="
                  flex flex-col
                  items-center
                  justify-center
                "
              >
                <i
                  className={`fas ${item.icon} ${
                    isActive
                      ? "text-[#D4A017]"
                      : "text-white"
                  }`}
                />

                <span className="text-[11px] text-white mt-1">
                  {item.label}
                </span>
              </Link>
            );
          })}

          <Link
            to="/"
            className="
              flex items-center justify-center
              -mt-8
            "
          >
            <div
              className="
                w-16 h-16 rounded-full
                bg-[#D4A017]
                flex items-center justify-center
                border-4 border-[#573D2D]
              "
            >
              <img
                src="https://res.cloudinary.com/dtvuzg801/image/upload/v1780684045/logo3d_nd8ga5.png"
                alt="logo"
                className="w-10 h-10"
              />
            </div>
          </Link>

          {navItems.slice(2).map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className="
                  flex flex-col
                  items-center
                  justify-center
                "
              >
                <i
                  className={`fas ${item.icon} ${
                    isActive
                      ? "text-[#D4A017]"
                      : "text-white"
                  }`}
                />

                <span className="text-[11px] text-white mt-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
