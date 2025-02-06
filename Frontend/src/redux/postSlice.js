import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : "post",
    initialState : {
        allPosts : []
    },
    reducers : {
        // actions
        setAllPosts : (state , action) => {
            state.allPosts = action.payload;
        }
    }
});

export const {setAllPosts} = postSlice.actions;
export default postSlice.reducer;