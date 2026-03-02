import type React from "react";
import { Link, NavLink } from "react-router";

export default function NavItem({icon, title, path} : {icon?: React.ReactNode, title: string, path: string}) {
    return (
        <li className="nav-item">
            <NavLink to={path} className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-1  ${isActive ? "active border-bottom border-3 nav-border-color" : ""}`}>
                {icon}<span>{title}</span>
            </NavLink>
        </li>
    )
}