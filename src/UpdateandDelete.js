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

// Update data using Axios (PUT request)
const updatePost = async (updatedItem) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedItem.id}`, updatedItem);
  return response.data;
};

// Delete data using Axios (DELETE request)
const deletePost = async (id) => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.data;
};

const UpdateandDelete = () => {
  const queryClient = useQueryClient();

  // Fetch posts using React Query's useQuery (GET) with object-based arguments
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Mutation for adding a new post using useMutation (POST)
  const addPostMutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error adding data:', error);
    },
  });

  // Mutation for updating a post using useMutation (PUT)
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error updating data:', error);
    },
  });

  // Mutation for deleting a post using useMutation (DELETE)
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error deleting data:', error);
    },
  });

  // Triggering the mutation to add a post
  const handleAddItem = () => {
    addPostMutation.mutate({ title: 'New Post', body: 'This is the body of the new post' });
  };

  // Triggering the mutation to update a post
  const handleUpdateItem = (id) => {
    updatePostMutation.mutate({ id, title: 'Updated Post', body: 'This is the updated body' });
  };

  // Triggering the mutation to delete a post
  const handleDeleteItem = (id) => {
    deletePostMutation.mutate(id);
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
            <button onClick={() => handleUpdateItem(post.id)}>Update</button>
            <button onClick={() => handleDeleteItem(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddItem}>Add New Post</button>

      {/* Mutation states */}
      {addPostMutation.isLoading && <p>Adding new post...</p>}
      {addPostMutation.isError && <p>Error occurred: {addPostMutation.error.message}</p>}
      {addPostMutation.isSuccess && <p>New post added successfully!</p>}

      {updatePostMutation.isLoading && <p>Updating post...</p>}
      {updatePostMutation.isError && <p>Error occurred: {updatePostMutation.error.message}</p>}
      {updatePostMutation.isSuccess && <p>Post updated successfully!</p>}

      {deletePostMutation.isLoading && <p>Deleting post...</p>}
      {deletePostMutation.isError && <p>Error occurred: {deletePostMutation.error.message}</p>}
      {deletePostMutation.isSuccess && <p>Post deleted successfully!</p>}
    </div>
  );
};

export default UpdateandDelete;
