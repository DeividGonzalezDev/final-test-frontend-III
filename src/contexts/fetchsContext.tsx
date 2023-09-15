import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Dentist } from "../types/api-types";

enum FetchActionType {
  SET_DENTISTS_DATA = "SET_DENTISTS_DATA",
  SET_LOADING = "SET_LOADING",
}

const FetchContext = createContext<FetchContextProviderValue | null>(null);

type FetchContextProviderProps = {
  children: ReactNode;
};

type FetchState = {
  dentistsData: Dentist[] | [];
  loading: boolean;
};

type FetchAction =
  | { type: FetchActionType.SET_DENTISTS_DATA; payload: Dentist[] }
  | { type: FetchActionType.SET_LOADING; payload: boolean };

const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case "SET_DENTISTS_DATA":
      return { ...state, dentistsData: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface FetchContextProviderValue {
  dentistsData: Dentist[] | [];
  getDataOfSpecificDentist: (id: number) => Promise<Dentist | undefined>;
  loading: boolean;
}

export const FetchContextProvider = ({
  children,
}: FetchContextProviderProps) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    dentistsData: [],
    loading: false,
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: FetchActionType.SET_LOADING, payload: true });
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result: Dentist[] = await response.json();
          dispatch({
            type: FetchActionType.SET_DENTISTS_DATA,
            payload: result,
          });
        }
      } catch (err) {
        console.error(err);
      }
      dispatch({ type: FetchActionType.SET_LOADING, payload: false });
    }

    fetchData();
  }, []);

  const getDataOfSpecificDentist = async (
    id: number
  ): Promise<Dentist | undefined> => {
    dispatch({ type: FetchActionType.SET_LOADING, payload: true });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 404) {
        
        throw new Response("Not found", { status: 404, statusText: "Not found" });
      } else if (response.status === 403) {
        throw new Response("Server Error", { status: 403, statusText: "Forbidden" });
      } else if (!response.ok) {
        throw new Response("Something went wrong", { status: 500, statusText: "Something went wrong" });
      }

      const result: Dentist = await response.json();
      dispatch({ type: FetchActionType.SET_LOADING, payload: false });
      return result;
    } catch (err) {
      if(err instanceof Response) throw err;
      else{
        throw new Response("Server Error", { status: 500, statusText: "Something went wrong" });
      }
      //throw new ErrorEvent(err as string);
    }
  };

  const fetchValue: FetchContextProviderValue = useMemo(
    () => ({
      dentistsData: state.dentistsData,
      getDataOfSpecificDentist,
      loading: state.loading,
    }),
    [state.dentistsData, state.loading]
  );

  return (
    <FetchContext.Provider value={fetchValue}>{children}</FetchContext.Provider>
  );
};

export default FetchContext;

