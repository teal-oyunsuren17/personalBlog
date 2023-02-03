import { useState } from "react";
import { AdminHeader } from "../adminHeader";
import { BlogAdd } from "./blogAdd";
import axios from "axios";

export function Blog() {
  const [categories, setCategories] = useState([]);
  function loadCategories() {
    axios.get("http://localhost:8000/category").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setCategories(data);
      } else {
        alert("Error");
      }
    });
  }
  return (
    <div>
      <AdminHeader />
      <BlogAdd load={loadCategories} categories={categories} />
    </div>
  );
}
