import { useReducer, useRef, useEffect } from 'react';

const useReducerWithMiddleware = (reducer, initialState, middleware) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchRef = useRef(dispatch);

    useEffect(() => {
        middleware(dispatchRef.current);
    }, [middleware]);

    return [state, dispatch];
};

export default useReducerWithMiddleware;
