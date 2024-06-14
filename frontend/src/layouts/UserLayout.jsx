import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";
export default function UserLayout() {
  return (
    <>
      <Header fixed={true} />
      <Outlet />
      <Footer />
    </>
  );
}
