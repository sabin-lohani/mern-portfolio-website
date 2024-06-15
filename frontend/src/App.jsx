import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/routes/AdminRoute";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/user/Home";
import ManagePosts from "./pages/admin/ManagePosts";
import ManagePolls from "./pages/admin/ManagePolls";
import SinglePoll from "./pages/user/SinglePoll";
import Feed from "./pages/user/Feed";
import SinglePost from "./pages/user/SinglePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="/polls/:id" element={<SinglePoll />} />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Route>
      <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
        <Route index element={<ManagePosts />} />
        <Route path="polls" element={<ManagePolls />} />
      </Route>
    </Routes>
  );
}

export default App;
