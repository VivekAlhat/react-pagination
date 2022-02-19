import axios from "axios";

export const fetchPosts = (pageNum = 1) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=3&_page=${pageNum}`
  );
};
