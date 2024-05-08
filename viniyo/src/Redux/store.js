import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";
export default configureStore({
   reducer:{ user:UserReducer }
})