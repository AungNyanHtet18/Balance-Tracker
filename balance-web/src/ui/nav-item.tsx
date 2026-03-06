import type React from "react";
import { NavLink } from "react-router";

export default function NavItem({icon, title, path} : {icon?: React.ReactNode, title: string, path: string}) {
    return (
        <li className="nav-item">
            <NavLink to={path} className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-1 fw-semibold  ${isActive ? "active" : ""}`}>
                {icon}
                <span className="nav-text">{title}</span>
            </NavLink>
        </li>
    )
}