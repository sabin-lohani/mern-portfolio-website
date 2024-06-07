import settings from "@/data/SiteSettings.json";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoLogOut, IoHome, IoNewspaper } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import Modal from "react-modal";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

export default function Header() {
  const [siteSetting, setSiteSetting] = useState(settings);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const links = [
    { name: "Home", icon: <IoHome />, href: "/" },
    { name: "Feed", icon: <IoNewspaper />, href: "/feed" },
  ];
  return (
    <header className="shadow-sm py-3 px-3 md:px-10">
      <div className="flex justify-between">
        <Link to="/">
          <h1 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
            <img
              src={siteSetting.user_profile_image}
              alt={siteSetting.user_name}
              className="h-10 w-10 object-cover"
            />
            {siteSetting.user_name}
          </h1>
        </Link>

        {/* Mobile Devices */}
        <div className="md:hidden flex items-center gap-3">
          <button
            role="button"
            onClick={() => {}}
            className="text-red-500 hover:underline text-3xl"
          >
            <IoLogOut />
          </button>
          <button
            role="button"
            className="text-gray-800 flex items-center gap-1 p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={() => setShowLoginModal(true)}
          >
            <FaUser />
            Login
          </button>
        </div>

        {/* PC */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              className="text-gray-500 hover:text-gray-800"
            >
              <div className="flex items-center gap-1">
                {link.icon}
                {link.name}
              </div>
            </NavLink>
          ))}
          {/* <button
            onClick={() => {}}
            className="text-red-500 text-3xl"
          >
            <IoLogOut />
          </button> */}
          {/* Like posts, comment on posts, participate in polls, and more. */}
          <button
            role="button"
            className="text-gray-800 flex items-center gap-1 p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={() => setShowLoginModal(true)}
          >
            <FaUser />
            Login
          </button>
        </div>
      </div>
      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        closeTimeoutMS={100}
        ariaHideApp={false}
        className="max-w-sm w-[90%] p-3 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
      >
        <div className="flex justify-end">
          <button>
            <HiOutlineXMark
              className="text-xl"
              onClick={() => setShowLoginModal(false)}
            />
          </button>
        </div>
        <h2 className="text-center text-2xl font-semibold">Login</h2>
        <p className="text-center text-xs font-light mt-2 mb-5">
          Like posts, comment on posts, and participate in polls
        </p>
        {/* <LoginSocialFacebook appId="" onReject={() => {}} onResolve={() => {}}>
          <FacebookLoginButton
            style={{
              fontSize: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </LoginSocialFacebook> */}

        <LoginSocialGoogle>
          <GoogleLoginButton
            style={{
              fontSize: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </LoginSocialGoogle>
      </Modal>
    </header>
  );
}
