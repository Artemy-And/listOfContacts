import {applyMiddleware, combineReducers, createStore} from 'redux';

import {tableReducer} from "./table-reducer";



const reducers = combineReducers({
    table: tableReducer,
})


export const store = createStore(reducers)
export type RootStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;

// type AppDispatchType  = typeof store.dispatch
// export const useAppDispatch = ()=> useDispatch<AppDispatchType>()


