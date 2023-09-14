import { AiOutlineHeart, AiOutlineMail, AiOutlinePhone, AiFillHeart } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import {TbWorldWww } from "react-icons/tb";
import { Dentist } from '../types/api-types';
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import GlobalContext from "../contexts/global.context";
import FavoritesService from "../utils/FavoritesService";

type CardProps = {
  dentist: Dentist
  extended?: boolean
}
const Card: React.FC<CardProps> = ({dentist, extended}) => {

  const {favoritesService} = useContext(GlobalContext) ?? {favoritesService: new FavoritesService(() => {})};
  const [isFavorite, setIsFavorite] = useState(favoritesService.isFavorite(dentist));

  
  const handleAddAndRemoveFavoriteDentistToLocalStorage = (dentist: Dentist) => {
    favoritesService.addOrRemoveFavoriteDentist(dentist);
    setIsFavorite(!isFavorite);
  };

  return (
    
<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        <button onClick={() => handleAddAndRemoveFavoriteDentistToLocalStorage(dentist)} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
          {isFavorite ? <AiFillHeart className="text-primary-500 w-5 h-5"/> :<AiOutlineHeart className="w-5 h-5"/> }
        </button>
        
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://raw.githubusercontent.com/Frontend-III/fe3-final/main/public/images/doctor.jpg" alt="Dentist Photo"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{dentist.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">@{dentist.username}</span>
        {extended && (<div className="mt-5 px-4 flex items-center justify-between w-full ">
          <span className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-300 max-w-[174px] overflow-hidden hover:underline cursor-pointer"><AiOutlineMail className="h-5 min-w-[14px]"/> {dentist.email}</span>
          <span className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-300 max-w-[174px] overflow-hidden hover:underline cursor-pointer"><AiOutlinePhone /> {dentist.phone}</span>
        </div>
        )}
        {extended && (<div className="mt-8 px-4 flex items-center justify-center w-full">
          <span className="flex gap-1 text-sm text-gray-500 dark:text-gray-400"><IoLocationSharp /> {dentist.address.city}, {dentist.address.street}</span>
        </div>
        )}
        <div className="flex mt-4 space-x-3 md:mt-6">
            {!extended &&<Link to={`/dentist/${dentist.id}`} state={dentist} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" > See More</Link>}
            {extended && <a href={`https://${dentist.website}`} className="inline-flex items-center px-4 py-2 text-sm f`nt-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-full"><TbWorldWww className="w-5 h-5"/></a>}
            <Link to="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</Link>
        </div>
    </div>
</div>

  );
};

export default Card;