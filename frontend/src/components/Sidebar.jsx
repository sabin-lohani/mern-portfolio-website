import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import siteSetting from "@/data/SiteSettings.json";

const SidebarContext = createContext();
export default function Sidebar({ children }) {
  const user = {
    image:
      "https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-6/214654543_4025450307570457_1943036515532569101_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NTf-EEv7mZ4Q7kNvgENlvl2&_nc_ht=scontent.fktm7-1.fna&oh=00_AYBHqqpw4iugc_oEyR-6i-ccT2kJ16ExBfM-HYcgeqDs0w&oe=6669ECF7",
    name: "Demo User",
    email: "demoemail@xyz.com",
  };
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col shadow-sm border-r">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link to="/">
            <h1
              className={`text-xl font-semibold text-blue-700 text-nowrap overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              {siteSetting.user_name}
            </h1>
          </Link>
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <img
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user.name}</h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, link }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className="relative">
      <NavLink
        end
        to={link}
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 font-medium rounded-md gap-1 transition-colors group ${
            isActive
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-700"
              : "hover:bg-blue-50 text-gray-600"
          }`
        }
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-700 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </NavLink>
    </li>
  );
}
