import React, { memo, ReactNode } from "react";
import DashboardImage from "@app/assets/images/dashboard.png";
import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
interface NavbarProps {
  children: ReactNode;
}
const Navbar = memo(({ children }: NavbarProps) => {
  return (
    <div>
      <nav className="flex flex-col pl-3 fixed min-h-[100vh] max-h-[100vh] w-[6.5rem] bg-dark-second pt-6 text-primary text-[26px] overflow-hidden">
        <NavLink to="/home" className="mb-7 flex-center">
          <img src={DashboardImage} alt="" />
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">home</span>
          </div>
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">bookmark_added</span>
          </div>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">settings</span>
          </div>
        </NavLink>
      </nav>
      <div className="ml-[6.5rem]">{children}</div>
    </div>
  );
});

export default React.memo(Navbar);
