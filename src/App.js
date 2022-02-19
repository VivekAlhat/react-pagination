import { useState } from "react";
import { useQuery } from "react-query";
import { fetchPosts } from "./lib/functions";

function App() {
  const [pageNum, setPageNum] = useState(1);

  const handlePrevClick = () => {
    setPageNum(pageNum - 1);
  };

  const handleNextClick = () => {
    setPageNum(pageNum + 1);
  };

  const { isLoading, isError, error, isFetching, data } = useQuery(
    ["posts", pageNum],
    () => fetchPosts(pageNum),
    {
      keepPreviousData: true,
    }
  );

  if (isError) {
    return <div>{error}</div>;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      <div>Current Page : {pageNum}</div>
      <>
        {data?.data.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </>
      <div className="controls">
        <button disabled={pageNum === 1} onClick={handlePrevClick}>
          Previous Page
        </button>
        {Array.from(Array(10).keys()).map((_, i) => (
          <div key={i} className="page" onClick={() => setPageNum(i + 1)}>
            {i + 1}
          </div>
        ))}
        <button disabled={pageNum === 10} onClick={handleNextClick}>
          Next Page
        </button>
      </div>
      {isFetching ? <div>Fetching new data ...</div> : null}
    </div>
  );
}

export default App;
