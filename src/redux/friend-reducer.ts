import { AppStateType } from './redux-store';

type Friend = {
    id: number,
    name: string,
    avatar: string
}

type InitialState = {
    friends: Array<Friend>,
    count: number;
}

let initialState: InitialState = {
    friends: [
        { id: 1, name: 'Fima', avatar: 'data:image/jpeg;base64,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' },
        { id: 2, name: 'Lima', avatar: 'data:image/png;base64,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' },
        { id: 3, name: 'Bima', avatar: 'data:image/jpeg;base64,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' }
    ],
    count: 3
}

export const friendsSelectors = {
    getFriends: (state: AppStateType): Array<Friend> => {
        console.log(state.friends);
        return state.friends.friends;
    },
    getCount: (state: AppStateType): number => {        
        return state.friends.count;
    },
}


export const friendReducer = (state: InitialState = initialState, action: any) => {

    switch(action.type) {
        case INCREMENT_COUNT:
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state;
    }    
}

const INCREMENT_COUNT = 'INCREMENT_COUNT';

const incrementCount = () => ({type: INCREMENT_COUNT});

const incrementCountThunk = () => {

    return (dispatch: any) => {

        dispatch(incrementCount);
    }
}

export const friendsThunks = {
    incrementCountThunk
}