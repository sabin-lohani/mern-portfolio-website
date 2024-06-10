import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

import ManagePolls from "./pages/admin/ManagePolls";
import AdminLayout from "./layouts/AdminLayout";
import ManagePosts from "./pages/admin/ManagePosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="feed" element={<Feed />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<ManagePosts />}></Route>
        <Route path="voting" element={<ManagePolls />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
