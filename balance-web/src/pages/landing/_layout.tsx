import { Link, Outlet } from "react-router";
import NavItem from "../../ui/nav-item";

export default function LandingLayout() {
     return (
       <>
        <Navigation/>
        <main className="container-fluid mt-3">
            <Outlet />
        </main>
       </>
     )
}



function Navigation() {

    return (
        <nav className="navbar bg-light navbar-expand shadow-sm">
            <div className="container-fluid">
                <Link to="#" className="navbar-brand">
                    <i className="bi-bar-chart"></i> My Balance
                </Link>

                <ul className="navbar-nav">
                    <NavItem path="/home" title="Home" icon={<i className="bi bi-house-door"></i>} />
                    <NavItem path="/about" title="About" icon={<i className="bi bi-info-circle"></i>} />
                    <NavItem path="/contact" title="Contact" icon={<i className="bi bi-chat-dots"></i>} />
                    <NavItem path="/signup" title="Sign Up" icon={<i className="bi bi-person-plus"></i>} />
                </ul>
            </div>
        </nav>
    )
}