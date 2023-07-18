"use client";

import { createContext, ReactNode, Context } from "react";
import {CoffeeStore} from "@/models/CoffeeStore";

interface CoffeeState {
  latLng: string;
  coffeeStores: CoffeeStore[];
}

const initialState: CoffeeState = { latLng: "", coffeeStores: [] };
export const CoffeeContext: Context<{ state: CoffeeState }> = createContext({state: initialState});

export default function CoffeeProvider({ children }: { children: ReactNode }) {
  return <CoffeeContext.Provider value={{state: initialState}}>{children}</CoffeeContext.Provider>
}
