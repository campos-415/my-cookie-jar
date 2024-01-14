import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basket/basketSlice";
import modalReducer from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
