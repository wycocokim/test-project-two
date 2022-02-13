import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import pokemonReducer from "../features/pokemonSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// export default configureStore({
//   reducer: {
//     user: userReducer,
//     pokemon: pokemonReducer,
//   },
// });

const reducers = combineReducers({
  user: userReducer,
  pokemon: pokemonReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
