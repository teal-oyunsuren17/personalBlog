import axios from "axios";
import { useEffect, useState } from "react";

export function useBlog(page, size, query, categoryId) {
  const [list, setList] = useState([]);
  const [count, setCount] = useState();

  function loadBlog() {
    axios
      .get(
        `http://localhost:8000/blog?q=${query}&page=${page}&size=${size}&categoryId=${categoryId}`
      )
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { list, count } = data;
          setList(list);
          setCount(count);
        } else {
          alert(`Aldaa garlaa ${status}`);
        }
      });
  }

  useEffect(() => {
    loadBlog();
  }, [page, query, categoryId]);

  return {
    list,
    count,
  };
}
