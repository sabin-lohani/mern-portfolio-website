import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/routes/AdminRoute";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/user/Home";
import ManagePosts from "./pages/admin/ManagePosts";
import ManagePolls from "./pages/admin/ManagePolls";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
        <Route index element={<ManagePosts />} />
        <Route path="polls" element={<ManagePolls />} />
      </Route>
    </Routes>
  );
}

export default App;
