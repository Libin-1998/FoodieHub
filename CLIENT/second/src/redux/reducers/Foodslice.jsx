import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    fooddata:[],
    status:'idle',
}

const token=sessionStorage.getItem('token')



export const getfoodData=createAsyncThunk('foodData/get',async()=>{
    const data=await axios.get('http://localhost:6060/api/food/foodview',{
        headers:{Authorization:`Bearer ${token}`},
    })
    const result =data.data.data
    console.log(result);
    return(result)
   
})

export const Foodslice=createSlice({
    name:'foods',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getfoodData.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(getfoodData.fulfilled,(state,action)=>{
            state.status='idle'
            state.fooddata=action.payload
            console.log(action.payload);
        })
        .addCase(getfoodData.rejected,(state,action)=>{
            state.status='error'
        })
    }
})
export default Foodslice.reducer