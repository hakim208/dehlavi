import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const OurProjects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/db.json');
      const data = await response.json();

      const recentProjects = data.projects.slice(0, 3);

      setProjects(recentProjects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleViewProjects = () => {
    navigate('/projects');
  };

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 mt-[50px] py-12'>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#573D2D] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 mt-[50px] py-12'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-center mb-12'>
        <div>
          <h2 className='text-4xl md:text-5xl font-bold text-[#573D2D] mb-2'>
            {t('projectsTitle')}
          </h2>
          <p className='text-lg text-gray-600'>
            {t('projectsSubtitle')}
          </p>
        </div>
        <motion.button
          onClick={handleViewProjects}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex items-center gap-3 px-6 py-3 bg-[#573D2D] text-white hover:bg-[#8B5A2B] rounded-lg transition-all duration-300 font-medium mt-4 md:mt-0'
        >
          {t('viewAll')}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project, index) => (
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
                  {t(`project${project.id}Name`)}
                </h3>

                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {t(`project${project.id}Description`)}
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
                  <span>{t(`project${project.id}Address`)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurProjects;
