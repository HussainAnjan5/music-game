import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import ChooseUs from "@/components/ChooseUs";
import Testomonials from "@/components/Testomonials";
import Webinars from "@/components/Webinars";
import Instructors from "@/components/Instructors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
<div className="min-h-screen text-white bg-black/[0.96] antialiased bg-grid-white/[0.02]">
<Hero/>
<Featured/>
<ChooseUs/>
<Testomonials/>
<Webinars/>
<Instructors/>
<Footer/>
</div>

 );
}
