import React, { createContext } from "react";

const Context = createContext({});

type ContextType = { children: React.ReactNode }
export default function AppContext({ children }: ContextType) {
    const store = {
        a: "hello"
    }
    return (
        <Context.Provider value={store}>{
            children
        }</Context.Provider>
    )
}
