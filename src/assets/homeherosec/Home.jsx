import Navbar from "./Navbar";
import Hero from "./Hero";
import SearchForm from "../SearchCarForm/Searchform";
import Collections from "../OurCollection/Collections";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonials from "../Testimonials/Testimonials";
import HarborClub from "../HarborClub/HarborClub";
import FavoritesList from "../FavoritesList/FavoritesList";
import Footer from "../Footer/Footer";
import useFavorites from "../../hooks/useFavorites";
import "./Home.css";

/**
 * Home
 * ----
 * Top-level homepage containing structured modular components.
 */
export default function Home() {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <SearchForm />
            <WhyChooseUs />
            <Collections favorites={favorites} onFavoriteToggle={toggleFavorite} />
            <FavoritesList favorites={favorites} onFavoriteToggle={toggleFavorite} />
            <HowItWorks />
            <Testimonials />
            <HarborClub />
            <Footer />
        </div>
    );
}