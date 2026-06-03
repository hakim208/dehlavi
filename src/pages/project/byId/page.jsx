"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const ById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch('/db.json');
        const data = await response.json();

        const found = data.projects.find(p => p.id === parseInt(id));
        setProject(found);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-xl font-bold">Yuklanmoqda...</div>;
  if (!project) return <div className="h-screen flex items-center justify-center text-xl">Loyiha topilmadi.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-[50px] py-12">
      {/* Orqaga qaytish tugmasi */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate(-1)}
        className="flex items-center text-[#573D2D] font-medium mb-8 hover:gap-2 transition-all duration-300"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {t('back')}
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Chap taraf: Rasm */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group h-[400px] md:h-[550px] overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            src={project.img}
            alt={t(project.description)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>

        {/* O'ng taraf: Ma'lumotlar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#573D2D] mb-4">
            {t(`project${project.id}Name`)}
          </h1>

          <div className="flex items-center text-gray-500 mb-6">
            <svg className="w-5 h-5 mr-2 text-[#573D2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-lg">{t(project.address)}</span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {t(project.description)}
          </p>

          {/* Statistika Bloklari */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#573D2D]">{project.floors}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">{t('floors')}</div>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="text-3xl font-bold text-[#573D2D]">{project.apartments}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">{t('apartments')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#573D2D]">{project.area}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">m²</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ById;
