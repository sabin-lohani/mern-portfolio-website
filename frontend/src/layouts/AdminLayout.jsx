import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import { IoNewspaper } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import Sidebar, { SidebarItem } from "@/components/common/Sidebar";

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
            link="/admin/polls"
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
