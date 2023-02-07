import axios from "axios";
import { useEffect, useState } from "react";

export function CategoryItem({ c, load }) {
  const [category, setCategory] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:8000/category/${c.id}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setCategory(data);
        setNewTitle(data.title);
      } else {
        alert("Error");
      }
    });
  }, []);

  function editBtn() {
    setEditing(true);
  }

  function deleteBtn() {
    if (window.confirm(`delete? ${c.title}`)) {
      axios.delete(`http://localhost:8000/category/${c.id}`).then((res) => {
        load();
      });
    }
  }

  function cancelBtn() {
    setEditing(false);
  }

  function saveBtn() {
    axios
      .put(`http://localhost:8000/category/${c.id}`, { title: newTitle })
      .then((res) => {
        load();
      });
    setEditing(false);
    setNewTitle("");
  }
  return (
    <>
      <div key={c.id}>
        <div className="d-flex justify-content-between ">
          {!editing ? (
            <>
              <h2>{c.title}</h2>
              <div>
                <button onClick={editBtn}>edit</button>
                <button onClick={deleteBtn}>delete</button>
              </div>
            </>
          ) : (
            <>
              <input
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              />
              <div>
                <button onClick={cancelBtn}>cancel</button>
                <button onClick={saveBtn}>save</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
