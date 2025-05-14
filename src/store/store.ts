import { configureStore } from '@reduxjs/toolkit'
import { todolistApi } from '../entities/todolist/model/api'
export const store = configureStore({
  reducer: {
  [todolistApi.reducerPath]: todolistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( 
      todolistApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
