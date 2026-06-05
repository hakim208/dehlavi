import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useNewsStore } from '../../entities/items/model/newsStore'; // ⬅️ Импорт ислоҳ шуд

const Project = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Аз Zustand стор маълумотҳоро мегирем
  const { projects, fetchProjects, loading } = useNewsStore();
  console.log(projects);


  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Дар аввал як бор маълумотро аз сервер мекашем
  useEffect(() => {
    fetchProjects();
  }, []);

  // Вақте ки projects аз сервер меояд, онро ба filteredProjects мегузорем
  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects);
    }
  }, [projects]);

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 mt-[50px] py-12'>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#573D2D] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading') || "Боргузорӣ..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 mt-[50px] py-12'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-center mb-12'>
        <div>
          <h1 className='text-4xl md:text-5xl font-bold text-[#573D2D] mb-2'>
            {t('projectsTitle')}
          </h1>
          <p className='text-lg text-gray-600'>
            {t('projectsSubtitle')}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={() => handleProjectClick(project.id)}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-56">
              <motion.img
                src={project.img}
                alt={project.description}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#573D2D] transition-colors duration-300">
                  {t(`project${project.id}Name`) || project.name}
                </h3>

                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {t(`project${project.id}Description`) || project.description}
                  </p>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#573D2D]">{project.floors}</div>
                  <div className="text-xs text-gray-500 mt-1">{t('floors')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#573D2D]">{project.apartments}</div>
                  <div className="text-xs text-gray-500 mt-1">{t('apartments')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#573D2D]">{project.area}</div>
                  <div className="text-xs text-gray-500 mt-1">м²</div>
                </div>
              </div>

              {/* Address */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-[#573D2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t(`project${project.id}Address`) || project.address}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('noProjectsFound')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('tryOtherFilter')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Project;
