"use client";

import React from "react";
import { BsHouseFill, BsBellFill, BsSearch, BsBookmark } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { PiNotebook } from "react-icons/pi";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton ";

export default function Sidebar() {
  const items = [
    {
      label: "Home",
      href: "",
      icon: BsHouseFill,
    },
    {
      label: "Explore",
      href: "/",
      icon: BsSearch,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: SlEnvolope,
    },
    {
      label: "Lists",
      href: "/lists",
      icon: PiNotebook,
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: BsBookmark,
    },
    {
      label: "Profile",
      href: "/users/132",
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {items.map((item) => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
          ))}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
