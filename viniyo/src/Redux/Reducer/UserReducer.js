import {createSlice} from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"userInfo",
    initialState:{
        isAuthenticated: false,
        user_data:{
            phonenumber:"",
            name:"",
            email:"",
            password:""
        }
    },
    reducers:{
        loginUser:(state,action)=>{
            state.isAuthenticated = true;

            state.user_data=action.payload
        },
        logoutUser:(state,action)=>{
            state.isAuthenticated = false;

            state.user_data={phonenumber:"",name:"",email:"",password:""}
        }      
    }
})

export const {loginUser,logoutUser}=userSlice.actions;

export default userSlice.reducer;