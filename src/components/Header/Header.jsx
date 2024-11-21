import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  const [sideMenuActive, setSideMenuActive] = React.useState(false)
  const { favorites } = useSelector(state => state.characters)

  const headerItems = [
    {
      children: 'Home',
      to: '/'
    },
    {
      children: 'Characters',
      to: 'characters/?page=1'
    },
    {
      children: 'Films',
      to: 'films'
    },
    {
      children: 'Species',
      to: 'species/?page=1'
    },
    {
      children: 'Search',
      to: 'search'
    }
  ]

  return (
    <header>

      <div
        className={`${styles.menuBtn} ${sideMenuActive ? styles.menuActive : ""}`}
        onClick={() => setSideMenuActive(!sideMenuActive)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`${styles.wrapper} ${!sideMenuActive ? styles.active : ""}`}>
        <Link
          className={styles.link}
          to="/">
          <img
            className={styles.logo}
            onClick={() => setSideMenuActive(!sideMenuActive)}
            src="https://cdn-icons-png.flaticon.com/512/15475/15475029.png" alt="header-logo" />
        </Link>
        <ul className={styles.items}>
          {headerItems.map((item, i) =>
            <li className={styles.item} key={i}>
              <NavLink
                onClick={() => setSideMenuActive(!sideMenuActive)}
                to={item.to}
                className={({ isActive }) => isActive ? `${styles.itemActive}` : ""}>
                {item.children}
              </NavLink>
            </li>
          )}
        </ul>
        <Link
          className={styles.link}
          to="favorites">
          <span className={styles.countOfFavorites}>{favorites.length}</span>
          <img
            className={styles.favorites}
            onClick={() => setSideMenuActive(!sideMenuActive)}
            src="https://cdn-icons-png.flaticon.com/512/9513/9513598.png " alt="favorites-logo" />
        </Link>
      </nav>
    </header >
  );
};

export default Header;