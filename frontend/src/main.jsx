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
<<<<<<< HEAD:frontend/src/main.jsx
import OwnerAddHotel from "./components/owner/pages/OwnerAddHotel.jsx";
import OwnerAddRoom from "./components/owner/pages/OwnerAddRoom.jsx";
import OwnerRoomAndPrice from "./components/owner/pages/OwnerRoomAndPrice.jsx";
=======

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./Layout/AuthLayout.jsx";

>>>>>>> 57f9c1fbe5ab628c49dc66aad7035fbb7cd68edd:frontend/stayxpress/src/main.jsx
let router = createBrowserRouter([
  {
    path: "/",
    element:( 
      <AuthLayout authentication={false}>
        <Layout />
      </AuthLayout>


    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/login",
        element: (
          
            <Login />

        ),
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
      {
        path: "add-hotel",
        element: <OwnerAddHotel />,
      },
      {
        path: "add-room",
        element: <OwnerAddRoom />,
      },
      {
        path: "rooms-pricing",
        element: <OwnerRoomAndPrice />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
