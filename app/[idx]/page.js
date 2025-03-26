'use client'

import { use } from "react";
import { usePosts } from "../context/PostsContext";
import { useRouter } from "next/navigation";

const PostEdit = ({ params }) => {
  const { idx } = use(params); // Extract idx by use API
  const postIdx = parseInt(idx);
  const { posts, setPosts } = usePosts(); // Posts Context
  const post = posts.find((_, idx) => idx === postIdx); // Identify Post
  const router = useRouter(); // Handle redirection

  const commitModify = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const changePostTitle = (e, postIdx) => {
    setPosts(prev => prev.map((item, idx) => ({
      ...item,
      title: idx === postIdx ? e.target.value : item.title
    })));
  };

  const changePostContent = (e, postIdx) => {
    setPosts(prev => prev.map((item, idx) => ({
      ...item,
      content: idx === postIdx ? e.target.value : item.content
    })));
  };

  const handlePostImage = (e, postIdx) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosts(prev => prev.map((item, idx) => ({
          ...item,
          image: idx === postIdx ? reader.result : item.image
        })));
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePost = postIdx => {
    // setTimeout(() => setPosts(prev => prev.filter((_, idx) => idx !== postIdx)), 1000);
    setPosts(prev => prev.filter((_, idx) => idx !== postIdx));
    router.push('/');
  }

  if (!post) {
    return <p>Redirecting...</p>;
  }

  return (
    <form onSubmit={e => commitModify(e)}>
      <label>
        Title:
        <input
          type="text"
          value={post.title}
          onChange={e => changePostTitle(e, postIdx)}
          />
      </label>
      <label>
        Content:
        <input
          type="text"
          value={post.content}
          onChange={e => changePostContent(e, postIdx)}
        />
      </label>
      {post.image && (
        <div>
          <div>Image Preview</div>
          <img src={post.image} alt="image preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
      <input type="file" onChange={e => handlePostImage(e, postIdx)} accept="image/*"/>
      <button type="submit">submit</button>
      <button type="delete" onClick={() => deletePost(postIdx)}>delete</button>
    </form>
  )
}

export default PostEdit;