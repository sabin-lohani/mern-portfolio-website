import { useAuth } from "@/contexts/AuthContext";
import siteSetting from "@/data/SiteSettings.json";
import { Link, NavLink } from "react-router-dom";
import { IoHome, IoNewspaper } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import LoginDialogButton from "./LoginDialogButton";

export default function Header({ fixed }) {
  const { user, googleLogin, logout } = useAuth();
  const links = [
    // { name: "Home", icon: <IoHome />, href: "/" },
    // { name: "Feed", icon: <IoNewspaper />, href: "/feed" },
  ];
  if (user?.isAdmin)
    links.push({ name: "Admin", icon: <FaUserTie />, href: "/admin" });

  return (
    <header
      className={`shadow-sm bg-white py-3 px-3 md:px-10 ${
        fixed && "w-[100vw] fixed z-20"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Nav Brand */}
        <Link to="/">
          <h1 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
            <img
              src={siteSetting.user_profile_image}
              alt={siteSetting.user_name}
              className="hidden md:block h-10 w-10 object-cover"
            />
            {siteSetting.user_name}
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-7 md:gap-5">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              className="text-gray-500 hover:text-gray-800"
            >
              <div className="flex items-center gap-1 text-2xl md:text-base">
                {link.icon}
                <span className="hidden md:block">{link.name}</span>
              </div>
            </NavLink>
          ))}

          {/* Login Button */}
          <LoginDialogButton />
        </div>
      </div>
    </header>
  );
}
