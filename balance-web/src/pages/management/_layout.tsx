import { Link, matchPath, NavLink, Outlet, useLocation, useNavigate } from "react-router"
import { authStore } from "../../model/store/auth-result.store"
import ManagementPlanProvider from "../../model/provider/management-plan-provider"
import ClientErrorMessage from "../../ui/client-error-message"
import { useEffect, useState } from "react"
import { getYears } from "../../model/client/management/dashboard-client"
import { BusinessYearContext } from "../../model/provider/business-years-context"
import logoImage from "../../assets/logo.png"

const fullWidthRoutes: string[] = ['/admin/master/payment/edit',
                                   '/admin/master/payment/:id',
                                   '/admin/master/plan/edit',
                                   '/admin/master/plan/:id',
                                   '/admin/subscriptions/:id'];

export default function AdminLayout() {

    const  location = useLocation();
    const fullWidthPage = fullWidthRoutes.some(route => 
        matchPath(route, location.pathname));

    return (
        <>
            <Navigation />

            <main className={fullWidthPage ? '' : 'container-fluid mt-3'}>
                <ManagementPlanProvider>
                    <BusinessYearContextProvider>
                        <Outlet />
                    </BusinessYearContextProvider>
                </ManagementPlanProvider>
            </main>

            <ClientErrorMessage anonymous={false} />
        </>
    )
}

function BusinessYearContextProvider({children} : {children : React.ReactNode}) {

    const [years, setYears] = useState<number[]>([])

    useEffect(() => {
        async function load() {
            const response = await getYears()
            setYears(response || [])
        }
        load()
    }, [])

    return (
        <BusinessYearContext.Provider value={{years: years, setYears : setYears}}>
            {children}
        </BusinessYearContext.Provider>
    )
}

function Navigation() {

    const navigate = useNavigate()
    const {setAuth} = authStore()

    function signOut() {
        setAuth(undefined)
        navigate('/signin')
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/admin'>
                    <div className="d-flex align-items-center">
                       <img src={logoImage} alt="Logo" width={30} height={30} />
                         <h5 className="fw-bold mb-0">Apex Admin Balance</h5>
                    </div>
                </Link>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/admin/subscriptions" className={({ isActive }) =>
                            `nav-link d-flex align-items-start gap-1 fw-semibold  ${isActive ? "active" : ""}`}>
                            <i className="bi-cart-plus"></i><span className="nav-text">Subscriptions</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/contact" className={({ isActive }) =>
                            `nav-link d-flex align-items-start gap-1 fw-semibold  ${isActive ? "active" : ""}`}>
                            <i className="bi bi-chat-dots"></i><span className="nav-text">Contact</span> 
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/members" className={({ isActive }) =>
                            `nav-link d-flex align-items-start gap-1 fw-semibold  ${isActive ? "active" : ""}`}>
                            <i className="bi-people"></i> <span className="nav-text">Members</span>
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown dropdownhover">
                        <a href="#" className="nav-link dropdown-toggle fw-semibold " >
                            <i className="bi-database"></i> Master Data
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <NavLink to="/admin/master/plan" className="dropdown-item">
                                    <i className="bi-bookmark-heart"></i> Subscription Plan
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/master/payment" className="dropdown-item">
                                    <i className="bi-credit-card"></i> Payment Method
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a onClick={e => {
                            e.preventDefault()
                            signOut()
                        }} className="nav-link fw-semibold ">
                            <i className="bi-lock"></i> Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}