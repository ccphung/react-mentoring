import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BookingsContextProvider from "../store/booking-context";

export default function Root() {
  return (
    <BookingsContextProvider>
      <Header />
      <Outlet />
    </BookingsContextProvider>
  );
}
