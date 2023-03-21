import { useEffect, useState } from "react";
import axios from "axios";

export function BlogSelector({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/category").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setCategories(data);
      } else {
        alert("Error");
      }
    });
  }, []);

  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value={""}>...</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
