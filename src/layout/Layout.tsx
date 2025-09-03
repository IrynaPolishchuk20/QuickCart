import './Layout.scss'
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


export default function Layout() {
    return(
        <div className="layout">
            <Header/>
                <main className=" layout-content">
                    <Outlet/>
                </main>
            <Footer/>
        </div>
    )
}