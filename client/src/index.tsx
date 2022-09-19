import React from "react"
import ReactDOM from "react-dom/client"

import App from "./pages/App/App"

import "./index.css"

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import documentsSlice from "./toolkit/slices/documentsSlice"

const store = configureStore({
  reducer: documentsSlice
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)