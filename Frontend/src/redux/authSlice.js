import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        allSuggestedUsers : [],
        userProfile : null
    },
    reducers : {
        // actions
        setAuthUser : (state , action) => {
            state.user = action.payload;
        },

        setAllSuggestedUsers : (state , action) => {
            state.allSuggestedUsers = action.payload
        },

        setUserProfile : (state , action) => {
            state.userProfile = action.payload;
        }
    }
});

export const {setAuthUser , setAllSuggestedUsers , setUserProfile} = authSlice.actions;
export default authSlice.reducer;