import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BlogSelector } from "./blogSelector";
import axios from "axios";

export function BlogAdd() {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");

  function submit() {
    setTitle("");
    setText("");
    setPicture("");
    setCategoryId("");
    axios
      .post("http://localhost:8000/blog", {
        title,
        picture,
        categoryId,
        text,
      })
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert("Success");
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
        <input
          placeholder="zurgaa oruul"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
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
