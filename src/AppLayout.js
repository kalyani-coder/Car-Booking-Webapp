import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./Components/SideBarCardBooking/SideBarCardBooking";
import { navigation } from "./Components/SideBarCardBooking/NavLink";

const AppLayout = () => {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(true);

  const toggleSideNavbar = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen);
  };

  const contentMargin = isSideNavbarOpen
    ? "lg:ml-[22.5rem] md:ml-20"
    : "lg:ml-16 16";

  return (
    <>
      <SideNavbar
        navigation={navigation}
        isSideNavbarOpen={isSideNavbarOpen}
        toggleSideNavbar={toggleSideNavbar}
        setIsSideNavbarOpen={setIsSideNavbarOpen}
      />
      <div
        className={`flex-1 overflow-x-hidden ms-14 ${contentMargin} duration-700`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
