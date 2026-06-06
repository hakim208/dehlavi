
import AboutCompanyComponent from "../../components/AboutCompanyComponent";
import ConsultationSection from "../../components/ConsultationSection";
import { ItemsList } from "../../components/ItemsList";
import OurProjects from "../../components/OurProjects";
import Swiper from "../../components/swiper";
import { HomeNews } from "../news/ui/HomeNews";

const Home = () => {
  return (
    <div >
      <div className="w-full bg-[#4e3627] py-5">
      <Swiper />
      </div>
      <AboutCompanyComponent />
      <OurProjects/>
      <div className="mt-[90px] md:mt-[100px]">
        <ItemsList />
      </div>
      <ConsultationSection />
      <HomeNews/>
      </div >

  );
};

export default Home;
