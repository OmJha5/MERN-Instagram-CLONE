import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : "post",
    initialState : {
        allPosts : [],
        selectedPost : [],
    },
    reducers : {
        // actions
        setAllPosts : (state , action) => {
            state.allPosts = action.payload;
        },

        setSelectedPost : (state , action) => {
            state.selectedPost = action.payload;
        }
    }
});

export const {setAllPosts , setSelectedPost} = postSlice.actions;
export default postSlice.reducer;