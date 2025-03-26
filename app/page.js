'use client'

import { useState } from "react";
import AddPostForm from "./component/addpostform";
import { usePosts } from "./context/PostsContext";
import Link from "next/link";

const Page = () => {
  const { posts, setPosts } = usePosts(); // Post Context
  const [addPostInfo, setAddPostInfo] = useState({
    title: '',
    content: '',
    image: null
  });
  
  const addPost = e => {
    e.preventDefault(); // Prevent refresh of form submission
    setPosts(prev => [
      ...prev,
      {
        title: addPostInfo.title,
        content: addPostInfo.content,
        image: addPostInfo.image,
      }
    ]);

    // Reset addPostInfo
    setAddPostInfo({ title: '', content: '', image: null }) 
  }

  const setAddPostTitle = e => setAddPostInfo(prev => ({...prev, title: e.target.value}))
  const setAddPostContent = e => setAddPostInfo(prev => ({...prev, content: e.target.value}))
  const handleAddPostImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddPostInfo(prev => {
          return (
            {
              ...prev,
              image: reader.result
            }
          )
        })
      };
      reader.readAsDataURL(file);
    }
  };
  const popPost = () => setPosts(prev => prev.slice(0, prev.length - 1));

  return (
    <>
      <AddPostForm
        info={addPostInfo}
        posts={posts}
        setTitle={setAddPostTitle}
        setContent={setAddPostContent}
        handleImage={handleAddPostImage}
        handleSubmit={addPost}
        handleDelete={popPost}
      />
      {posts.map((item, idx) => {
        return (
          <div key={idx} style={{ border: '2px solid black', margin: '3px', width: '500px' }}>
            <div>{item.title}</div>
            <div>{item.content}</div>
            { item.image && <img src={item.image} alt="image preview" style={{ width: '200px', height: 'auto' }} />}
            <Link href={`/${idx}`}>modify</Link>
          </div>
        )
      })}
    </>
  );
}


export default Page;