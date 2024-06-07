import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* footer */}
    </>
  );
}
