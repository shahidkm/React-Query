import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Fetch data with Axios (GET request)
const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

// Post data using Axios (POST request)
const postData = async (newItem) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newItem);
  return response.data;
};

const RetriveandAdd = () => {
  const queryClient = useQueryClient();

  // Fetch posts using React Query's useQuery (GET)
  const { data, isLoading, isError } = useQuery(['posts'], fetchPosts);

  // Mutation for adding a new post using useMutation (POST)
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      // After a successful mutation, invalidate the query to refetch the posts
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      console.error('Error adding data:', error);
    },
  });

  // Triggering the mutation on button click
  const handleAddItem = () => {
    mutation.mutate({ title: 'New Post', body: 'This is the body of the new post' });
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error fetching posts.</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <button onClick={handleAddItem}>
        Add New Post
      </button>

      {/* Mutation states */}
      {mutation.isLoading && <p>Adding new post...</p>}
      {mutation.isError && <p>Error occurred: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>New post added successfully!</p>}
    </div>
  );
};

export default RetriveandAdd;
