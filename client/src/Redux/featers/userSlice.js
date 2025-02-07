import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:{
        _id:'',
        role:"",
        Name:"",
        username:"",
        profilePicture:"",
    },
    isLoggedIn:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.user = action.payload
        },
        logOut:(state,action) => {
            state.isLoggedIn = false;
            state.user = {name:"",role:"",username:""}
        }
    }
})

export const { login, logOut} = userSlice.actions
export default userSlice.reducer