export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#071122]">
      <div className="relative">
        {/* Логои асосӣ - калонтар */}
        <img
          src="https://res.cloudinary.com/dtvuzg801/image/upload/v1780684018/logo_bnmyvg.png"
          alt="loading"
          className="w-32 h-32 md:w-40 md:h-40 animate-pulse"
        />

        {/* Хонаи соҳта аз чап */}
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Хонаи соҳта аз рост */}
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-1 bg-gradient-to-l from-blue-400 to-blue-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2 + 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Ҳалқаи атрофи лого */}
        <div className="absolute inset-0 -m-4 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-full animate-spin-slow"></div>
      </div>

      <p className="mt-8 text-gray-600 dark:text-gray-300 text-lg font-semibold animate-pulse">
        Дар ҳоли кор...
      </p>
    </div>
  )
}
