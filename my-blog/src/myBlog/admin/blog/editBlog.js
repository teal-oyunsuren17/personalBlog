import { useNavigate, useParams } from "react-router-dom";
import { BlogSelector } from "./blogSelector";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export function EditBlog() {
  const { id } = useParams();
  const [oneBlog, setOneBlog] = useState();
  const navigate = useNavigate();
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newPicture, setNewPicture] = useState("");

  function load() {
    axios.get(`http://localhost:8000/blog/${id}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setOneBlog(data);
        setNewTitle(data.title);
        setNewCategoryId(data.categoryId);
        setNewText(data.text);
        setNewPicture(data.picture);
      } else {
        alert("Error");
      }
    });
  }

  useEffect(() => {
    load();
  }, []);
  if (!oneBlog) return <div>Loading...</div>;

  function cancelBtn() {
    navigate("/admin/blogs");
  }

  function saveBtn() {
    axios
      .put(`http://localhost:8000/blog/${id}`, {
        title: newTitle,
        categoryId: newCategoryId,
        text: newText,
        picture: newPicture,
      })
      .then((res) => {
        load();
      });
    navigate("/admin/blogs");
  }

  return (
    <div>
      <BlogSelector
        value={newCategoryId}
        onChange={(val) => setNewCategoryId(val)}
      />

      <div>
        <textarea
          placeholder="medeenii garchig"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="zurgaa oruul"
          value={newPicture}
          onChange={(e) => setNewPicture(e.target.value)}
        />
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={newText}
        onChange={(e) => setNewText(e.target.value)}
      />

      <button onClick={cancelBtn}>cancel</button>
      <button onClick={saveBtn}>save</button>
    </div>
  );
}
