import { ReactNode, createContext,  useReducer, useState } from "react";
import FavoritesService from "../utils/FavoritesService";
import { Dentist } from "../types/api-types";

const GlobalContext = createContext<GlobalContextProviderValue | null>(null);
enum GlobalActionType {
  TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE",
}

type GlobalContextProviderProps = {
  children: ReactNode;
};

type GlobalState = {
  isDarkMode: boolean;
};

type GlobalAction = { type: GlobalActionType.TOGGLE_DARK_MODE; payload: boolean };

/**
 * A reducer function that handles global state updates.
 *
 * @param {GlobalState} state - The current global state.
 * @param {GlobalAction} action - The action to be performed on the global state.
 * @return {GlobalState} The updated global state.
 */
const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case GlobalActionType.TOGGLE_DARK_MODE:
      localStorage.setItem("isDarkMode", action.payload.toString());
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};

interface GlobalContextProviderValue {
  isDarkMode: boolean;
  toggleDarkMode: (active: boolean) => void;
  favoritesService: FavoritesService;
  favoriteDentists: Dentist[];
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const storedIsDarkMode = JSON.parse(localStorage.getItem("isDarkMode") ?? "false");
  const [favoriteDentists, setFavoriteDentists] = useState<Dentist[]>([]);
  const [state, dispatch] = useReducer(globalReducer, {
    isDarkMode: storedIsDarkMode,
  });
  const favoritesService = new FavoritesService((newDentist) => {
    setFavoriteDentists(newDentist);
  });

  /**
   * Toggles the dark mode.
   *
   * @param {boolean} active - Indicates whether the dark mode should be active or not.
   */
  const toggleDarkMode = (active: boolean) => {
    dispatch({ type: GlobalActionType.TOGGLE_DARK_MODE, payload: active });
  };


  const globalValue: GlobalContextProviderValue = {
      isDarkMode: state.isDarkMode,
      toggleDarkMode,
      favoritesService,
      favoriteDentists
    };



  return (
    <GlobalContext.Provider value={globalValue}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
