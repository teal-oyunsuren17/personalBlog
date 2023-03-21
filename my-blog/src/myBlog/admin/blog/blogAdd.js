import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BlogSelector } from "./blogSelector";
import axios from "axios";

export function BlogAdd() {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(event) {
    setUploading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    if (imageFile) {
      await fetch("http://localhost:8000/upload-image", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data);
          setUploading(false);
        });
    } else {
      setUploading(false);
      setPicture(null);
    }
  }

  function submit() {
    setTitle("");
    setText("");
    setCategoryId("");
    setPicture(null);
    axios
      .post("http://localhost:8000/blog", {
        title,
        categoryId,
        text,
        picture,
      })
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert("Success");
          window.location.reload();
        }
      });
  }

  return (
    <div>
      <BlogSelector value={categoryId} onChange={(val) => setCategoryId(val)} />

      <div>
        <input
          placeholder="medeenii garchig"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <input type="file" name="image" onChange={handleFile} />
        <div>
          {uploading && <div className="spinner-border" role="status"></div>}
          {picture && <img src={picture.path} alt="" width="100px" />}
        </div>
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(data);
        }}
      />

      <button onClick={submit}>submit</button>
    </div>
  );
}
