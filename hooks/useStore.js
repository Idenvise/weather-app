import { useContext } from "react";
import RootStore from "../store/RootStore";
import { createContext } from "react";

const store = RootStore.create();
export const StoreContext = createContext(store)

export default function useStore() {
    return useContext(StoreContext);
}