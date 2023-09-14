import { Outlet,  } from "react-router-dom";
import Header from "./components/Header";
import { useContext } from "react";
import GlobalContext from "./contexts/global.context";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {isDarkMode} = useContext(GlobalContext) ?? {isDarkMode: false};
  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex flex-col justify-between min-h-screen`}>
        <Header />
        <Outlet />
      <h1>This is footer</h1>
    </div>
  );
}

export default App;
