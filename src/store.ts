import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.ts";

const projectStore = configureStore({
    reducer: {
        cart: cartSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof projectStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof projectStore.dispatch

export default projectStore