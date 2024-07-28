import { RouterProvider } from "react-router-dom";

import { router } from "./router";
function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/create" element={<Create />} />
        <Route path="/blog/edit" element={<Edit />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
