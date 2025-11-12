import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const RootLayouts = () => {
    return (
        <div>

            <Navbar />


            <main className="max-w-7xl mx-auto">
                <Outlet />
            </main>


            <Footer />
        </div>
    );
};

export default RootLayouts;
