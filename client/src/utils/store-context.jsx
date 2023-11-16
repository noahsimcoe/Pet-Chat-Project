import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducer'

const StoreContext = createContext();

const INITIAL_STATE = {
    theme: {
        dark: false
    },
    user: {
        profile: {}
    }
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
};

const useStoreContext = (key = null) => {
    const [state, dispatch] = useContext(StoreContext);

    /* Return the whole state if no key is provided */
    if (!key) return [state, dispatch];

    /* Return only the sub-state under the provided key */
    return [
        state[key] ? state[key] : {},
        dispatch
    ];
};

export { StoreProvider, useStoreContext };