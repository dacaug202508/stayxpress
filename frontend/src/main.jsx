import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  Router,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Layout from "./components/reusable/Layout.jsx";
import Registration from "./components/pages/Registration.jsx";
import OwnerLayout from "./components/owner/common/OwnerLayout.jsx";
import OwnerHomePage from "./components/owner/OwnerHomePage.jsx";
import OwnerDashboard from "./components/owner/pages/OwnerDashboard.jsx";
import OwnerAddHotel from "./components/owner/pages/OwnerAddHotel.jsx";
import OwnerAddRoom from "./components/owner/pages/OwnerAddRoom.jsx";
import OwnerRoomAndPrice from "./components/owner/pages/OwnerRoomAndPrice.jsx";
import OwnerEditRoom from "./components/owner/pages/OwnerEditRoom.jsx";
import OwnerHotelInfo from "./components/owner/pages/OwnerHotelInfo.jsx";
import OwnerUpdateHotel from "./components/owner/pages/OwnerUpdateHotel.jsx";
import OwnerBooking from "./components/owner/pages/OwnerBooking.jsx";

import { Provider } from "react-redux";
import UserLayout from "./components/user/common/UserLayout.jsx";

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

import RoomCompare from "./components/user/pages/RoomCompare.jsx";
import UserProfile from "./components/user/pages/UserProfile.jsx";
import SearchPage from "./components/user/pages/Search.jsx";
import HomePage from "./components/user/pages/Home.jsx";
import BookingDetails from "./components/user/pages/BookingDetails.jsx";
import RoomsPage from "./components/user/pages/Rooms.jsx";
import HotelDetails from "./components/user/pages/HotelDetails.jsx";
import RoomDetails from "./components/user/pages/RoomDetails.jsx";
import PublicOnlyLayout from "./Layout/PublicOnlyLayout.jsx";
import AuthRequiredLayout from "./Layout/AuthRequiredLayout.jsx";
import RoleBasedLayout from "./Layout/RoleBasedLayout.jsx";
import PaymentPage from "./components/user/pages/PaymentPage.jsx";
import UserBookings from "./components/user/pages/UserBooking.jsx";
import CancelledBookings from "./components/owner/pages/CancelledBookings.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <App /> }, // home page
    ],
  },

  {
    element: <PublicOnlyLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Registration /> },
    ],
  },

  {
    element: <AuthRequiredLayout />,
    children: [
      // 👤 USER / CUSTOMER
      {
        path: "/user",
        element: <RoleBasedLayout allowedRoles={["ROLE_CUSTOMER"]} />,
        children: [
          {
            element: <UserLayout />,
            children: [
              { index: true, element: <HomePage /> },
              { path: "profile", element: <UserProfile /> },
              { path: "compare", element: <RoomCompare /> },
              { path: "search", element: <SearchPage /> },
              { path: "booking", element: <UserBookings/> },
              { path: "bookings/:bookingId", element: <BookingDetails /> },
              { path: "hotels/:hotelId", element: <HotelDetails /> },
              { path: "hotels/:hotelId/rooms", element: <RoomsPage /> },
              { path: "rooms/:roomId", element: <RoomDetails /> },
                { path: "payment/:bookingId", element: <PaymentPage />},
            ],
          },
        ],
      },

      // 👑 OWNER
      {
        path: "/owner",
        element: <RoleBasedLayout allowedRoles={["ROLE_OWNER"]} />,
        children: [
          {
            element: <OwnerLayout />,
            children: [
              { index: true, element: <OwnerHomePage /> },
              { path: "dashboard", element: <OwnerDashboard /> },
              { path: "add-hotel", element: <OwnerAddHotel /> },
              { path: "update-hotel/:id", element: <OwnerUpdateHotel /> },
              { path: "add-room", element: <OwnerAddRoom /> },
              { path: "rooms-pricing", element: <OwnerRoomAndPrice /> },
              { path: "edit-room/:roomId", element: <OwnerEditRoom /> },
              { path: "upload-info", element: <OwnerHotelInfo /> },
              { path: "view-bookings", element: <OwnerBooking /> },
              { path: "cancelled", element: <CancelledBookings /> },
            ],
          },
        ],
      },

      // 🛡 ADMIN
      {
        path: "/admin",
        element: <RoleBasedLayout allowedRoles={["ROLE_ADMIN"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminHomePage /> },
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "owner-request", element: <HotelOwnerRequest /> },
              { path: "manage-owners", element: <ManageHotelOwner /> },
              { path: "hotels", element: <AdminHotels /> },
            ],
          },
        ],
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
