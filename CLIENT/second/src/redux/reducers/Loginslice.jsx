import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token=sessionStorage.getItem('token')

const initialState={
    logindata:[],
    status:'idle'
}

export const postData=createAsyncThunk('logs/post',async(list)=>{
    const data=await axios.post('https://foodiehub-r5ze.onrender.com/api/foodlogin/login',JSON.stringify(list),{
        headers:{Authorization:`Bearer ${token}`},

    })

    const result=data.data.data
    console.log(result);
    return(result)

})


export const Loginslice=createSlice({
    name:'login',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postData.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(postData.fulfilled,(state,action)=>{
            state.status='idle'
            state.logindata=action.payload
            console.log(action.payload);
        })
        .addCase(postData.rejected,(state,action)=>{
            state.status='error'
        })
    }
})

export default Loginslice.reducer