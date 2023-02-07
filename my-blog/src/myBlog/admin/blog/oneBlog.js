import axios from "axios";
import { useNavigate } from "react-router-dom";

export function OneBlog({ blog, load }) {
  const navigate = useNavigate();

  function editBlog(id) {
    navigate(`/edit/${id}`);
  }

  function deleteBlog(id) {
    if (window.confirm("ustgah uu?")) {
      axios.delete(`http://localhost:8000/blog/${id}`).then((res) => load());
    }
  }
  return (
    <div>
      <div className={"d-flex flex-row gap-5"}>
        <p>{blog.id}</p>
        <p>{blog.title}</p>
        <div>
          <button onClick={() => editBlog(blog.id)}>edit</button>
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        </div>
      </div>
    </div>
  );
}

// {!editing ? (
//   <>
//     <button onClick={editBlog}>edit</button>
//     <button onClick={() => deleteBlog(blog.id)}>delete</button>
//   </>
// ) : (
//   <>
//     <button onClick={cancelBlog}>cancel</button>
//     <button onClick={() => saveBlog(blog.id)}>save</button>
//   </>
// )}
