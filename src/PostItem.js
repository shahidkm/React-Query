import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const postData = async (newItem) => {
  // Send a POST request using Axios
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newItem);
  return response.data;
};

const PostItem = () => {
  const queryClient = useQueryClient();

  // Setting up the mutation with useMutation
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      // After a successful mutation, invalidate the 'posts' query so it refetches
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      // Handle any errors that occur during the mutation
      console.error('Error adding data: ', error);
    },
  });

  // Triggering the mutation when button is clicked
  const handleAddItem = () => {
    mutation.mutate({ title: 'New Post', body: 'This is the body of the new post' });
  };

  return (
    <div>
      <button onClick={handleAddItem}>
        Add New Post
      </button>
      {mutation.isLoading && <p>Adding new post...</p>}
      {mutation.isError && <p>Error occurred: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>New post added successfully!</p>}
    </div>
  );
};

export default PostItem;
