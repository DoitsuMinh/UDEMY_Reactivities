import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        children: [
          { path: "activities", element: <ActivityDashboard /> },
          { path: "activities/:id", element: <ActivityDetailPage /> },
          { path: "createActivity", element: <ActivityForm key="create" /> },
          { path: "manage/:id", element: <ActivityForm /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
