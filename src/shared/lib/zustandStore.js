// shared/lib/zustandStore.js
import create from 'zustand'
import { persist } from 'zustand/middleware'

// Сохранение предыдущих значений
const initialLang = typeof window !== 'undefined' ? localStorage.getItem("app_lang") || "tj" : "tj";
const initialTheme = typeof window !== 'undefined' ? localStorage.getItem("app_theme") || "light" : "light";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: initialTheme,
      lang: initialLang,

      setTheme: (theme) => {
        // Проверка корректности темы
        const validThemes = ['light', 'dark', 'auto'];
        const newTheme = validThemes.includes(theme) ? theme : 'light';

        set({ theme: newTheme });

        // Применяем тему к документу
        if (typeof window !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(newTheme);
        }
      },

      setLang: (lang) => {
        const validLangs = ['tj', 'ru', 'en'];
        const newLang = validLangs.includes(lang) ? lang : 'tj';

        set({ lang: newLang });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      // Функция для автоопределения темы
      detectSystemTheme: () => {
        if (typeof window !== 'undefined' && window.matchMedia) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          return prefersDark ? 'dark' : 'light';
        }
        return 'light';
      },

      // Установка автотемы
      setAutoTheme: () => {
        const systemTheme = get().detectSystemTheme();
        set({ theme: 'auto', systemTheme });

        if (typeof window !== 'undefined') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handler = (e) => {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            set({ systemTheme: newSystemTheme });
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(newSystemTheme);
          };

          mediaQuery.addEventListener('change', handler);

          // Сохраняем обработчик для очистки
          if (typeof window !== 'undefined') {
            window._themeMediaQueryHandler = handler;
          }
        }
      },

      // Получение текущей активной темы (для auto)
      getActiveTheme: () => {
        const { theme, systemTheme } = get();
        if (theme === 'auto') {
          return systemTheme || 'light';
        }
        return theme;
      }
    }),
    {
      name: 'theme-storage', // unique name
      getStorage: () => localStorage,
      onRehydrateStorage: () => (state) => {
        // После загрузки из localStorage
        if (state && typeof window !== 'undefined') {
          // Применяем тему
          const activeTheme = state.theme === 'auto'
            ? (state.systemTheme || 'light')
            : state.theme;

          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(activeTheme);
        }
      }
    }
  )
);

// Хук для использования темы в компонентах
export const useTheme = () => {
  const store = useThemeStore();

  return {
    theme: store.getActiveTheme(),
    themeMode: store.theme, // 'light', 'dark' или 'auto'
    lang: store.lang,
    setTheme: store.setTheme,
    setLang: store.setLang,
    toggleTheme: store.toggleTheme,
    setAutoTheme: store.setAutoTheme,
    isDark: store.getActiveTheme() === 'dark',
    isLight: store.getActiveTheme() === 'light'
  };
};
