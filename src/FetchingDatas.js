import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
function FetchingDatas() {

const fechData=async ()=>{
    const res= await axios.get("https://jsonplaceholder.typicode.com/posts")

    return res.data;
}

const{data,error,isLoading}=useQuery({

    queryKey:["PostData"],
    queryFn:fechData
})

if(isLoading){
    return <p>loading.....</p>
}
if(error){
    return <p>error:{error.message}</p>
}

  return (
    <div>

<h2>Fetched Data:</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.body}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default FetchingDatas