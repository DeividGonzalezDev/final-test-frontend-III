import { useContext } from 'react';
import Card from '../components/Card';
import FetchContext from '../contexts/fetchsContext';

const Home = () => {
  const {dentistsData} = useContext(FetchContext) ?? {dentistsData: []};
  return (
    <main className='flex gap-5 bg-white dark:bg-gray-900 h-full p-10 flex-wrap justify-center min-h-screen'>
      {dentistsData.map((dentist) => (
        <Card key={dentist.id} dentist={dentist}/>
      ))}
    </main>
  );
};

export default Home;