"use client";

import {createContext, ReactNode, Context, useReducer, Dispatch} from "react";
import {CoffeeStore} from "@/models/CoffeeStore";

interface CoffeeState {
  latLng: string;
  coffeeStores: CoffeeStore[];
}

export enum ACTION_TYPES {
  SET_LAT_LNG = "SET_LAT_LNG",
  SET_COFFEE_STORES = "SET_COFFEE_STORES"
}

interface SetLatLng {
  type: typeof ACTION_TYPES.SET_LAT_LNG;
  payload: string;
}

interface SetCoffeeStores {
  type: typeof ACTION_TYPES.SET_COFFEE_STORES;
  payload: CoffeeStore[];
}

type CoffeeAction = SetLatLng | SetCoffeeStores;

const storeReducer = (state: CoffeeState, action: CoffeeAction) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LNG:
      return {...state, latLng: action.payload};
    case ACTION_TYPES.SET_COFFEE_STORES:
      return {...state, coffeeStores: action.payload};
    default: return state;
  }
}

const initialState: CoffeeState = { latLng: "", coffeeStores: [] };
type CoffeeContextType = { state: CoffeeState, dispatch: Dispatch<CoffeeAction> };
export const CoffeeContext: Context<CoffeeContextType> = createContext({
  state: initialState,
  dispatch: (() => {}) as Dispatch<CoffeeAction>
});

export default function CoffeeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return <CoffeeContext.Provider value={{state, dispatch}}>{children}</CoffeeContext.Provider>
}
