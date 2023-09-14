import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import FetchContext from '../contexts/fetchsContext';
import { Dentist } from '../types/api-types';

const DentistInfo = () => {
  const [dentist, setDentist] = useState<Dentist>();
  const {getDataOfSpecificDentist} = useContext(FetchContext) ?? {getDataOfSpecificDentist: () => {}};
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      
      getDataOfSpecificDentist(Number(id))?.then((dentist) => {
        setDentist(dentist);
      }).catch((error) => {
        navigate('/error', {state: {status: error.status, statusText: error.statusText}});
      });
  }, []);
  
  

  return (
    <main className='flex bg-white dark:bg-gray-900 h-full min-h-screen p-10 flex-wrap justify-center items-center'>
      {dentist && <Card dentist={dentist} extended={true}/>}
    </main>
  );
};

export default DentistInfo;