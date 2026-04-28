import { Navigate, Route, Routes } from "react-router-dom";
import AboutCompany from "../../pages/aboutCompany/aboutCompany";
import Home from "../../pages/home/Home";
import NewsPage from "../../pages/news/ui/news";
import NewsDetailsPage from "../../pages/news/ui/NewsDetailsPage";
import ProjectsById from "../../pages/project/byId/page.jsx";
import Projects from "../../pages/project/project";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectsById />} />
      <Route path="/aboutCompany" element={<AboutCompany />} />

      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetailsPage />} />
    </Routes>
  );
}
