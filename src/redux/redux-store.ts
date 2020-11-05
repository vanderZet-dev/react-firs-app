import { friendReducer } from './friend-reducer';
import { messageReducer } from './message-reducer';
import { profileReducer } from './profile-reducer';
import { usersReducer } from './users-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { initialReducer } from './initial-reducer';

let rootReducers = combineReducers({
    profileModuleData: profileReducer,
    messagesModuleData: messageReducer,
    friends: friendReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    initial: initialReducer
});

type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>;

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;