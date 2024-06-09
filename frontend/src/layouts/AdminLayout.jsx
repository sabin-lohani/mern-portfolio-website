import Sidebar, { SidebarItem } from "@/components/Sidebar";
import Header from "@/components/common/Header";
import { NavLink, Outlet } from "react-router-dom";
import { IoNewspaper } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";

export default function AdminLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<IoNewspaper size={20} />}
            text="Manage Posts"
            link="/admin"
          />
          <SidebarItem
            icon={<BiPoll size={20} />}
            text="Manage Polls"
            link="/admin/voting"
          />
        </Sidebar>
        <div className="flex-1">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
