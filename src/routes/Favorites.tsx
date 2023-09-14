//import { Dentist } from '../types/api-types';
import Card from '../components/Card';
import { useContext } from 'react';
import GlobalContext from '../contexts/global.context';

const Favorites = () => {
  const {favoriteDentists} = useContext(GlobalContext) ?? {favoriteDentists: []};
  return (
    <main className='flex gap-5 bg-white dark:bg-gray-900 h-full min-h-screen p-10 flex-wrap justify-center items-center'>
      {favoriteDentists.length < 1 && (
        <h1 className='text-2xl text-gray-500'>No favorite dentists</h1>
      )}
      {favoriteDentists.map((dentist) => (
        <Card key={dentist.id} dentist={dentist}/>
      ))}
      
    </main>
  );
};

export default Favorites;