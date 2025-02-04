import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=5`);
  return res.data;
};

const MyComponent = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => pages.length + 1, 
  });

  return (
    <div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.map((post) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </div>
      ))}

      {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
    </div>
  );
};

export default MyComponent;
