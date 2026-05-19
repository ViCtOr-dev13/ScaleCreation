import Templates from "@/components/global/Templates";
import Content from "@/components/home/Content";
import Hero from "@/components/home/Hero";
import Plans from "@/components/home/Plans";
import HomeVideo from "@/components/home/video";
import Demo from "@/videos/demo.mp4";

const Home = () => {

  return (
    <div className="space-y-20 mb-4 mt-20 h-full">
      {/* Première vidéo */}
      <Hero/>
      <Content/>
      <Plans/>
      <div className="mx-10 lg:mx-20"><Templates/></div>
    </div>

  );
};

export default Home;
