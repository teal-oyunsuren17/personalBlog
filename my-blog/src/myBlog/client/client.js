import { ClientBlog } from "./clientBlog";
import { ClientFooter } from "./clientFooter";
import { ClientHeader } from "./clientHeader";
import { Route, Routes } from "react-router-dom";
import { BlogOfCategory } from "./blogOfCategory";
import { SingleBlog } from "./singleBlog";
import Map from "./map";

export function Client() {
  return (
    <>
      <ClientHeader />
      <Routes>
        <Route path={"/blog/:id"} element={<SingleBlog />} />
        <Route
          path={"/blog/category/:categoryId"}
          element={<BlogOfCategory />}
        />
        <Route path={"/*"} element={<ClientBlog />} />
        <Route path={"/map"} element={<Map />} />
      </Routes>
      <ClientFooter />
    </>
  );
}
