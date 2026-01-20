import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Layout from "./components/reusable/Layout.jsx";
import Registration from "./components/pages/Registration.jsx";
import OwnerLayout from "./components/owner/common/OwnerLayout.jsx";
import OwnerHomePage from "./components/owner/OwnerHomePage.jsx";
import OwnerDashboard from "./components/owner/pages/OwnerDashboard.jsx";
import { Provider } from "react-redux";

import store from "./store/store.js";
import OwnerAuthLayout from "./Layout/OwnerAuthLayout.jsx";
let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/owner",
    element: (
      <OwnerAuthLayout authentication={true}>
        <OwnerLayout />
      </OwnerAuthLayout>
    ),
    children: [
      {
        index: true,
        element: <OwnerHomePage />,
      },
      {
        path: "dashboard",
        element: <OwnerDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
