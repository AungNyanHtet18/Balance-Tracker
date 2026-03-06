import { Link, Outlet, useNavigate } from "react-router";
import NavItem from "../../ui/nav-item";
import { authStore } from "../../model/store/auth-result.store";
import logoImage from "../../assets/logo.png"
import Footer from "../../ui/footer";

export default function LandingLayout() {
    
     return (
       <>
        <Navigation/>
        <main className="container-fluid mt-3">
            <Outlet />
        </main>
        <Footer/>
       </>
     )
}



function Navigation() {
   const auth = authStore(state => state.auth)
   const setAuth = authStore(state => state.setAuth)
    const navigate = useNavigate()

    const signOut = () => {
        setAuth(undefined)
        navigate('/signin')
    }

    return (
        <nav className="navbar navbar-expand shadow-sm bg-white sticky-top">
            <div className="container-fluid">
                <Link to="#" className="navbar-brand">
                    <div className="d-flex align-items-center">
                       <img src={logoImage} alt="Logo" width={30} height={30} />
                         <h5 className="fw-bold mb-0">Apex Balance</h5>
                    </div>
                </Link>

                <ul className="navbar-nav">
                    <NavItem path="/home" title="Home" icon={<i className="bi bi-house-door"></i>}  />
                    <NavItem path="/about" title="About" icon={<i className="bi bi-info-circle"></i>}  />
                    <NavItem path="/contact" title="Contact" icon={<i className="bi bi-chat-dots"></i>} />
                    {
                        auth ?     
                        <>
                            <NavItem path="/member/balance" title="Balances" icon={<i className="bi-pie-chart"></i>} />
                            <NavItem path="/member/entry/debit" title="Debit" icon={<i className="bi-bag-dash"></i>} />
                            <NavItem path="/member/entry/credit" title="Credit" icon={<i className="bi-bag-plus"></i>} />
                            <NavItem path="/member/ledger" title="Ledgers" icon={<i className="bi-tags"></i>} />
                            <li className="nav-item">
                            </li>
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle fw-bold" data-bs-toggle="dropdown" >
                                    <i className="bi-person"></i> {auth?.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link to="/member" className="dropdown-item">
                                            <i className="bi-house"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/member/subscription" className="dropdown-item">
                                            <i className="bi-shield"></i> Subscriptions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/member/update/info" className="dropdown-item">
                                            <i className="bi bi-person"></i> User Info
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a href="#" onClick={e => {
                                            e.preventDefault()
                                            signOut()
                                        }} className="dropdown-item">
                                            <i className="bi-lock"></i> Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </li>  
                        </> 
                        : 
                        <NavItem path="/signup" title="Sign Up" icon={<i className="bi bi-person-plus"></i>} />
                    }
                </ul>
            </div>
        </nav>
    )
}