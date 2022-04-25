import React, { memo, ReactNode, useEffect, useState } from 'react';
import DashboardImage from '@app/assets/images/dashboard.png';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAppSelector } from '@app/redux/store';

interface NavbarProps {
  children: ReactNode;
}
const Navbar = memo(({ children }: NavbarProps) => {
  const user = useAppSelector(state => state.auth.user);
  const [isShowSettingUser, setIsShowSettingUser] = useState(false);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.parentElement?.classList.contains('icon-user')) {
      return;
    }
    setIsShowSettingUser(false);
  };
  return (
    <div>
      <nav className="flex flex-col pl-3 fixed min-h-[100vh] max-h-[100vh] w-[6.5rem] bg-dark-second pt-6 text-primary text-[26px]">
        <NavLink to="/home" className="mb-7 flex-center">
          <img src={DashboardImage} alt="" />
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">home</span>
          </div>
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">bookmark_added</span>
          </div>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">settings</span>
          </div>
        </NavLink>
        <div className="absolute bottom-8 left-[50%] translate-x-[-50%] icon-user">
          {user && user.avatar_url ? (
            <div
              className="w-[3.2rem] h-[3.2rem] object-cover rounded-full cursor-pointer icon-user"
              onClick={() => setIsShowSettingUser(!isShowSettingUser)}
            >
              <img
                src={user.avatar_url}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <span
              className="material-icons-outlined text-4xl cursor-pointer"
              onClick={() => setIsShowSettingUser(!isShowSettingUser)}
            >
              account_circle
            </span>
          )}
        </div>
        {isShowSettingUser && (
          <div className="absolute bottom-8 left-[110%] text-lg">
            <ul className="bg-dark-second rounded-xl px-5 py-3">
              <li className="flex items-center mb-3 hover:text-white cursor-pointer">
                <span className="material-icons-outlined mr-2">
                  manage_accounts
                </span>
                <span className="whitespace-nowrap">Setting user</span>
              </li>
              <li className="flex items-center hover:text-white cursor-pointer">
                <span className="material-icons-outlined mr-2">logout</span>
                <span>Logout</span>
              </li>
            </ul>
            <div className={styles.triangle}></div>
          </div>
        )}
      </nav>
      <div className="ml-[6.5rem]">{children}</div>
    </div>
  );
});

export default React.memo(Navbar);
