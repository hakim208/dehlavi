import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutCompanyComponent = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "21", label: t('aboutCompony.yearsOnMarket') || "год на рынке" },
    { number: "14", label: t('aboutCompony.successfulProjects') || "успешных проектов" },
    { number: "6", label: t('aboutCompony.brandAwards') || 'наград "Бренд года"' },
    { number: "3000+", label: t('aboutCompony.happyFamilies') || "счастливых семей" },
    { number: "700000M²+", label: t('aboutCompony.projectArea') || "площадь проектов" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5
      }
    }
  };

  return (
    <section className="md:mt-[60px] border-t-8 border-[#573D2D] mt-[30px] relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D9B45E]">
                {t('aboutCompony.title') || "О компании"}
              </h2>
              <p className="text-xl md:text-2xl font-light mb-6 text-gray-200">
                {t('aboutCompony.subtitle') || "Один из ведущих и опытных девелоперов"}
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                {t('aboutCompony.description') || "Murad Buildings, команда профессионалов, ставшая единой семьей, сплоченная единством мысли и духа во имя создания уникальных объектов недвижимости, призванная приносить счастье, радость и комфорт людям!"}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm border border-white border-opacity-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.8, type: "spring" }}
                    className="text-3xl md:text-xl font-bold text-[#D9B45E] mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/markers/img2.jpg"
                alt="Modern building"
                className="w-full h-[600px] object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Floating Elements */}

            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-[#D9B45E] rounded-full opacity-20"
            ></motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.7, type: "spring" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#09163a] rounded-full opacity-30"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanyComponent;
