import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const activeLink = ({ isActive }) => clsx(css.link, isActive && css.isActive);

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li>
          <NavLink to="/" className={activeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={activeLink}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
