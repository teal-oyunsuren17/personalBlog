import { CategoryModal } from "./categoryModal";
import React, { useEffect, useState } from "react";
import { CategoryItem } from "./categoryItem";
import axios from "axios";

export function CategoryAdd() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

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

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div
        style={{ width: "900px", margin: "10px auto" }}
        className="d-flex justify-content-between"
      >
        <h1>Angilal Nemeh</h1>
        <CategoryModal
          title={title}
          setTitle={setTitle}
          load={loadCategories}
        />
      </div>

      <div style={{ width: "900px", margin: "auto" }}>
        {categories.map((c) => (
          <CategoryItem key={c.id} c={c} load={loadCategories} />
        ))}
      </div>
    </>
  );
}
