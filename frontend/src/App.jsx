import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="feed" element={<Feed />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
