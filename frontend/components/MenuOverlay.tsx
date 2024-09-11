import React from "react";
import NavLink from "./NavLink";
import Logout from "./Logout";


type Link = {
    path: string;
    title: string;
  };
  
type Menu = {
    links: Link[];
  };

const MenuOverlay = ({ links }: Menu) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
      <Logout/>
    </ul>
  );
};

export default MenuOverlay;