"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/ui";
import { Button } from "@shadcn/ui";
import { useThemeStore } from "../shared/lib/zustandStore";
import i18n from "../shared/lib/i18n";
import { useTranslation } from "react-i18next";

export default function SettingsPopover() {
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language || "en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">⚙️ {t("settings")}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-4 space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span>{t("dark_mode")}</span>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="toggle toggle-primary"
          />
        </div>

        {/* Language Selector */}
        <div className="flex flex-col gap-2">
          <span>{t("language")}</span>
          <div className="flex gap-2">
            {["en", "ru", "tj"].map((lng) => (
              <Button
                key={lng}
                size="sm"
                variant={language === lng ? "default" : "outline"}
                onClick={() => changeLanguage(lng)}
              >
                {lng.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
