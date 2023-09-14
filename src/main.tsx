import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import { GlobalContextProvider } from "./contexts/global.context.tsx";
import Contact from "./routes/Contact.tsx";
import Favorites from "./routes/Favorites.tsx";
import DentistInfo from "./routes/DentistInfo.tsx";
import { FetchContextProvider } from "./contexts/fetchsContext.tsx";
import RouteBoundary from "./routes/RouteBoundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteBoundary/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
        
      },
      {
        path: "/favs",
        element: <Favorites />,
      },
      {
        path: "/dentist/:id",
        element: <DentistInfo/>,
        errorElement: <RouteBoundary/>
      },
      {
        path: "/error",
        element: <RouteBoundary/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <FetchContextProvider>
        <RouterProvider router={router} />
      </FetchContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
