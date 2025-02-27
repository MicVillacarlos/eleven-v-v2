"use client";

import { useEffect, useState } from "react";
import { useWindowSize } from "../../../utils/hooks/hooks";
import { DashboardIcon } from "../../svg/DashboardIcon";
import { HamburgerIcon } from "../../svg/HamburgerIcon";
import { LodgersIcon } from "../../svg/LodgersIcon";
import { SettingsIcon } from "../../svg/SettingsIcon";
import ElevenVLogo from "next/image";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const windowWidth: number = useWindowSize();
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (windowWidth > 639) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [windowWidth]);

  const toggleOpenSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };

  const SideBarOptions = [
    {
      key: 1,
      label: "Dashboard",
      href: "dashboard",
      icon: <DashboardIcon />,
    },
    {
      key: 2,
      label: "Lodgers",
      href: "lodgers",
      icon: <LodgersIcon />,
    },
    {
      key: 3,
      label: "Bills",
      href: "bills",
      icon: <DashboardIcon />,
    },
    {
      key: 4,
      label: "Settings",
      href: "settings",
      icon: <SettingsIcon />,
    },
    {
      key: 5,
      label: "Logout",
      href: "Logout",
      icon: <DashboardIcon />,
    },
  ];

  return (
    <div>
      {/* ----------SIDE BAR CLOSE (to refactor)-------- */}
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleOpenSidebar}
      >
        <HamburgerIcon />
      </button>
      {/* ----------SIDE BAR OPEN-------- */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <a className="flex items-center ps-2.5 mb-5">
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              ELEVEN V
            </span> */}
            <img src="/elevenv-logo.svg" alt="Eleven V Logo" />
          </a>
          <ul className="space-y-2 font-semibold">
            {SideBarOptions.map((item, index) => (
              <React.Fragment key={item.key}>
                {" "}
                {/* ✅ Add a unique key here */}
                <li>
                  <a
                    href={item.href}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </a>
                </li>
                {/* ✅ Insert a line break (hr) after "Bills" */}
                {item.label === "Bills" && (
                  <hr className="my-2 border-gray-300 dark:border-gray-600" />
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-10">
          <div className="mb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
