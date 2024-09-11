import React from "react";

type ProfileData = {
  email: string
}

const Footer = ({email}: ProfileData) => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-8 flex justify-center">
        <span></span>
        <p className="text-slate-600 ">Contact: {email}</p>
      </div>
    </footer>
  );
};

export default Footer;