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
import OwnerAddHotel from "./components/owner/pages/OwnerAddHotel.jsx";
import OwnerAddRoom from "./components/owner/pages/OwnerAddRoom.jsx";
import OwnerRoomAndPrice from "./components/owner/pages/OwnerRoomAndPrice.jsx";
import { Provider } from "react-redux";
import UserLayout from "./user/common/UserLayout.jsx";

import store from "./store/store.js";
import OwnerAuthLayout from "./Layout/OwnerAuthLayout.jsx";

// import OwnerAddHotel from "./components/owner/pages/OwnerAddHotel.jsx";
// import OwnerAddRoom from "./components/owner/pages/OwnerAddRoom.jsx";
// import OwnerRoomAndPrice from "./components/owner/pages/OwnerRoomAndPrice.jsx";

import { Slide, ToastContainer } from "react-toastify";
import AuthLayout from "./Layout/AuthLayout.jsx";
import AdminLayout from "./components/admin/common/AdminLayout.jsx";
import AdminHomePage from "./components/admin/pages/AdminHomePage.jsx";
import AdminDashboard from "./components/admin/pages/AdminDashboard.jsx";
import HotelOwnerRequest from "./components/admin/pages/HotelOwnerRequest.jsx";
import ManageHotelOwner from "./components/admin/pages/ManageHotelOwner.jsx";
import AdminHotels from "./components/admin/pages/AdminHotels.jsx";

import RoomCompare from "./user/pages/RoomCompare.jsx";
import OwnerEditRoom from "./components/owner/pages/OwnerEditRoom.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: (
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
      // {
      //   path: "dashboard",
      //   element: <OwnerDashboard />,
      // },
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
      {
        path: "edit-room/:roomId",
        element: <OwnerEditRoom />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <OwnerAuthLayout authentication={true}>
        <UserLayout />
      </OwnerAuthLayout>
    ),
    children: [
      {
        index: true,
        element: <OwnerHomePage />,
      },
      {
        path: "compare",
        element: <RoomCompare />,
      },  
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "owner-request",
        element: <HotelOwnerRequest />,
      },
      {
        path: "manage-owners",
        element: <ManageHotelOwner />,
      },
      {
        path: "hotels",
        element: <AdminHotels />,
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
