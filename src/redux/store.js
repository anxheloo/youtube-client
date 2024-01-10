import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

//1.For Redux-persist we install in terminal : > npm i redux-persist
//2. We import these below
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  video: videoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Without Redux-Persists
// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//     video: videoSlice.reducer,
//   },
// });

//With Redux-persist used
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//We export persistor, because we are now using Redux-persists.
//We go to index.js file and add code.
export let persistor = persistStore(store);

// export default persistor
export default store;
