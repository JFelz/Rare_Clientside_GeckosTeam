import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostsByCategory } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function CategoryPosts() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    getPostsByCategory(categoryId).then((data) => {
      console.log('getPostsByCategory:', categoryPosts);
      setCategoryPosts(data);
    });
  }, [categoryId]);

  const filteredPosts = categoryPosts.filter((post) => post.categoryId === parseInt(categoryId, 10));
  console.log('Filtered Posts:', filteredPosts);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
        }}
      >
        <h1>Posts by Categories</h1>

      </div>
      <div className="d-flex flex-row justify-content-center">
        {filteredPosts?.map((post) => (
          <PostCard key={post?.id} postObj={post} />
        ))}
      </div>
    </>
  );
}
