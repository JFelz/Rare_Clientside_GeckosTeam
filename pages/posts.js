import { useEffect, useState } from 'react';
import { getAllposts } from '../api/postData';
import PostCard from '../components/PostCard';
import PostForm from '../components/forms/PostForm';

function PostPage() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllposts().then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log('these are posts:', posts);
  return (
    <>
      {/* <AddProductForm /> */}
      <PostForm />
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
          maxWidth: '100px',
          margin: '0 auto',
        }}
      >
        <h1>Posts!</h1>

      </div>
      <div className="d-flex justify-content-between">
        {posts?.map((post) => (
          <PostCard postObj={post} />))}
      </div>
    </>
  );
}

export default PostPage;
