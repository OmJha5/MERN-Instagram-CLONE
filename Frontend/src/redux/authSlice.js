import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        allSuggestedUsers : [],
    },
    reducers : {
        // actions
        setAuthUser : (state , action) => {
            state.user = action.payload;
        },

        setAllSuggestedUsers : (state , action) => {
            state.allSuggestedUsers = action.payload
        }
    }
});

export const {setAuthUser , setAllSuggestedUsers} = authSlice.actions;
export default authSlice.reducer;