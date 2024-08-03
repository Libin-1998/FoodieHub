import {configureStore} from '@reduxjs/toolkit'
import foodReducer from './reducers/Foodslice'
import loginReducer from './reducers/Loginslice'
import profileReducer from './reducers/Profileslice'


export const store=configureStore({
    reducer:{
        foods:foodReducer,
        login:loginReducer,
        myProfile:profileReducer,
    },
})