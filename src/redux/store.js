// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import logger from 'redux-logger'
// import storage from 'redux-persist/lib/storage'

import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from './phoneBook/phoneBookReducer'


// const persistConfig = {
//   key: 'item',
//   version: 1,
//   storage,
// }
// Як працює міddlewar 
// const myLogger = store => next =>action=> {
//   // console.log(`Mylogger => `, action)
//   // console.log(`next =>`, next)
//   console.log(`prevState =>`, store.getState().contacts.item)
//   next(action)
//   // console.log(`logger =>`,logger)
//   console.log(`nextState =>`, store.getState().contacts.item)
// }
// const contactsPersistedReducer = persistReducer(persistConfig, phoneBookReducer)
// console.log(`logger =>`,logger)

const store = configureStore ({
  reducer: {
    contacts: phoneBookReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      // {
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      // }
    ),
      // .concat(logger),
  devTools:process.env.NODE_ENV !== "production"
})

// export const persistor = persistStore(store)


export default store
