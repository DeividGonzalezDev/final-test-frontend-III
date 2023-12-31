import { useContext } from "react";
import { HiMenu, HiMoon, HiSun } from "react-icons/hi";

import { NavLink } from "react-router-dom";
import GlobalContext from "../contexts/global.context";

const Header = () => {
  const {isDarkMode, toggleDarkMode} = useContext(GlobalContext) ?? {isDarkMode: false, toggleDarkMode: () => {}};
  const toogleTheme = () => {
    toggleDarkMode(!isDarkMode);
  };
  return (
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <NavLink to="/" className="flex items-center">
                <img src='/dental-clinic-logo.png' className="mr-3 h-6 sm:h-9" alt="Deivid's Clinc Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Deivid's Clinic</span>
            </NavLink>
            <div className="flex items-center lg:order-2">
              <button onClick={() => {toogleTheme();}}>{!isDarkMode ? <HiMoon className="w-6 h-6 text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors" /> : <HiSun className="w-6 h-6 text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors" />}</button>
                <NavLink to="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</NavLink>
                <NavLink to="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</NavLink>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <HiMenu className="w-6 h-6" />
                </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <NavLink to="/" className={({isActive}) => `block py-2 pr-4 pl-3  rounded bg-primary-700 lg:bg-transparent ${isActive ? 'text-primary-700' : 'text-gray-700'} lg:p-0 ${isActive ? 'dark:text-white' : 'dark:text-gray-400'}`} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({isActive}) => `block py-2 pr-4 pl-3 ${isActive ? 'text-primary-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive ? 'dark:text-white' : 'dark:text-gray-400'} lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favs" className={({isActive}) => `block py-2 pr-4 pl-3 ${isActive ? 'text-primary-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive ? 'dark:text-white' : 'dark:text-gray-400'} lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>Favorites</NavLink>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
</header>
  );
};

Header.propTypes = {};

export default Header;