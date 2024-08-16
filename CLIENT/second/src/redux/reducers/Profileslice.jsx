import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";


const initialState={
    profileData:[],
    status:'idle'
}


export const postData=createAsyncThunk('profile/post',async(item)=>{
    console.log(item);
    const datas=await axios.post(`https://foodiehub-ujkn.onrender.com/api/foodlogin/update`,item)

    const result=await datas.data.data
    console.log(result);
    return(result)
})

export const Profileslice=createSlice({
    name:'myProfile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postData.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(postData.fulfilled,(state,action)=>{
            state.status='idle'
            state.profileData=action.payload    
            console.log(action.payload);
        })
        .addCase(postData.rejected,(state,action)=>{
            state.status='error'
        })
    }
})

export default Profileslice.reducer
