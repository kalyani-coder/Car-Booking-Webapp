import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { DropdownIcon } from "./NavLink";

// Component to render nested navigation items
const DropdownMenu = ({
  subNavigation,
  isSideNavbarOpen,
  setIsSideNavbarOpen,
  setOpenDropdown,
}) => {
  return (
    <div
      className={`transition-all duration-1000 pl-4 ${
        !isSideNavbarOpen && "hidden"
      }`}
    >
      {subNavigation.map((subNav, index) => (
        <Link
          to={subNav.link}
          key={index}
          className={
            "group flex items-center my-1 duration-300 text-base gap-7 font-medium p-2 rounded-md text-white hover:bg-white hover:text-[#040430]"
          }
          onClick={() => {
            setIsSideNavbarOpen(false);
            setOpenDropdown(null);
          }}
        >
          <div className="justify-start duration-300 p-0 m-0">
            {subNav.icon}
          </div>
          <h2
            className={`whitespace-pre duration-300 ${
              !isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {subNav.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export const SideNavbar = ({
  navigation,
  isSideNavbarOpen,
  toggleSideNavbar,
  setIsSideNavbarOpen,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        className={`bg-[#000D27] h-[100%] ${isSideNavbarOpen ? "w-80" : "w-16"}
       duration-700 px-4 z-[1000] overflow-y-scroll hide-scrollbar`}
        style={{ position: "fixed" }}
      >
        <div className="pt-2 flex justify-start gap-7">
          <div className="text-white">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={toggleSideNavbar}
            />
          </div>
          <div
            className={`whitespace-pre duration-300 ${
              !isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          ></div>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {navigation.map((nav, i) => (
            <div key={i}>
              {Array.isArray(nav) ? (
                <div>
                  <div
                    className="group flex items-center duration-300 text-base gap-7 font-medium p-2 rounded-md text-white hover:bg-white hover:text-[#040430] cursor-pointer"
                    onClick={() => handleDropdownClick(i)}
                  >
                    <div className="justify-start duration-700 p-0 m-0">
                      <span>{nav[0].icon}</span>
                    </div>
                    <div
                      className={`flex w-full justify-between whitespace-pre duration-300 ${
                        !isSideNavbarOpen &&
                        "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      <div className="">{nav[0].name}</div>
                      <div className="justify-end">{DropdownIcon}</div>
                    </div>
                  </div>
                  <div
                    className={`transition-all duration-1000 ${
                      openDropdown === i
                        ? "max-h-screen"
                        : "max-h-0 overflow-hidden"
                    }`}
                  >
                    {openDropdown === i && (
                      <DropdownMenu
                        subNavigation={nav.slice(1)}
                        isSideNavbarOpen={isSideNavbarOpen}
                        setIsSideNavbarOpen={setIsSideNavbarOpen}
                        setOpenDropdown={setOpenDropdown}
                      />
                    )}
                  </div>
                </div>
              ) : nav.name === "Logout" ? (
                <button
                  key={i}
                  className="group w-[100%] flex items-center duration-300 text-base gap-7 font-medium p-2 rounded-md bg-red-500 text-white mb-3"
                  onClick={handleLogout}
                >
                  <div className="justify-start duration-300 p-0 m-0">
                    {nav.icon}
                  </div>
                  <h2
                    className={`whitespace-pre justify-center duration-300 ${
                      !isSideNavbarOpen &&
                      "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {nav.name}
                  </h2>
                </button>
              ) : (
                <Link
                  to={nav.link}
                  key={i}
                  className="group flex items-center duration-300 text-base gap-7 font-medium p-2 rounded-md text-white hover:bg-white hover:text-[#040430]"
                  onClick={() => setIsSideNavbarOpen(false)}
                >
                  <div className="justify-start duration-300 p-0 m-0">
                    {nav.icon}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !isSideNavbarOpen &&
                      "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {nav.name}
                  </h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Add this CSS to your global stylesheet or a CSS module
const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
`;

export default SideNavbar;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
