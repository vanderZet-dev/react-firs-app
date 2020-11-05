import { getAuthInfo } from './auth-reducer';

const INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS";

export type InitialStateType = {
    isInitialized: boolean
}

let initialState: InitialStateType = {
    isInitialized: false
}

export function initialReducer(state = initialState, action: any): InitialStateType {
    switch (action.type) {
        case INITIALIZE_SUCCESS: {
            return {
                ...state,
                isInitialized: true                
            }
        }
        default:
            return state;
    }
}

type InitializeSuccessActionType = {
    type: typeof INITIALIZE_SUCCESS
}

const initializeSuccess = (): InitializeSuccessActionType => ({ type: INITIALIZE_SUCCESS });

export const initialize = () => {

    return (dispatch: any) => {

        let promise = dispatch(getAuthInfo());

        Promise.all([promise])
            .then(() => {
                dispatch(initializeSuccess());
            });
    }
}