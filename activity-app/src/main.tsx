import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import { StoreContext, store } from "./app/stores/store.ts";
import { RouterProvider } from "react-router";
import { router } from "./app/router/routes.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router}></RouterProvider>
    </StoreContext.Provider>
  </React.StrictMode>
);
