import { RouteObject, createBrowserRouter } from "react-router";
import App from "../layout/App";
import ActivityDashboard from "../feature/activities/dashboard/ActivityDashboard";
import ActivityForm from "../feature/activities/form/ActivityForm";
import ActivityDetails from "../feature/activities/details/ActivityDetails";
import HomePage from "../feature/home/HomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm key={"create"} /> },
      { path: "manage/:id", element: <ActivityForm key={"manage"} /> },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
  },
});
